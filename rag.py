from flask import Flask, request, jsonify
import torch
import pickle
import os
from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

app = Flask(__name__)

# Load the model
model = SentenceTransformer("jinaai/jina-embeddings-v2-small-en", trust_remote_code=True)
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)

# Directory for embeddings storage
EMBEDDINGS_DIR = "embeddings"
os.makedirs(EMBEDDINGS_DIR, exist_ok=True)

# Function to chunk text
def chunk_text(text, chunk_size=100):
    """Splits text into smaller chunks of a given size."""
    words = text.split()
    return [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]

# Function to load embeddings
def load_embeddings(file_name):
    embeddings_path = os.path.join(EMBEDDINGS_DIR, f"{file_name}_embeddings.pkl")
    chunks_path = os.path.join(EMBEDDINGS_DIR, f"{file_name}_chunks.pkl")
    
    if os.path.exists(embeddings_path) and os.path.exists(chunks_path):
        with open(embeddings_path, "rb") as ef, open(chunks_path, "rb") as cf:
            return pickle.load(ef), pickle.load(cf)
    
    return None, None

# Function to save embeddings
def save_embeddings(file_name, embeddings, chunks):
    embeddings_path = os.path.join(EMBEDDINGS_DIR, f"{file_name}_embeddings.pkl")
    chunks_path = os.path.join(EMBEDDINGS_DIR, f"{file_name}_chunks.pkl")

    with open(embeddings_path, "wb") as ef, open(chunks_path, "wb") as cf:
        pickle.dump(embeddings, ef)
        pickle.dump(chunks, cf)




@app.route("/generate_embeddings", methods=["POST"])
def generate_embeddings():
    """Generates embeddings from a text file and saves them."""
    data = request.get_json()
    file_name = data.get("file_name")

    if not file_name:
        return jsonify({"error": "file_name is required"}), 400

    file_path = os.path.join(EMBEDDINGS_DIR , file_name)  # Assuming files are stored in 'files/' directory

    if not os.path.exists(file_path):
        return jsonify({"error": f"File {file_name} not found"}), 404

    # Read text from the file
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    if not text:
        return jsonify({"error": "File is empty"}), 400

    # Chunk the text and generate embeddings
    chunks = chunk_text(text, chunk_size=50)
    embeddings = model.encode(chunks, convert_to_tensor=True, device=device)

    # Save embeddings
    save_embeddings(file_name, embeddings, chunks)

    return jsonify({"message": f"Embeddings for {file_name} generated and saved successfully."})


@app.route("/query", methods=["POST"])
def query():
    """Finds the most relevant text chunks based on a given prompt."""
    data = request.get_json()
    
    # Debug: Print received data
    print("Received request data:", data)

    if not data or "prompt" not in data or "file_name" not in data:
        return jsonify({"error": "prompt and file_name are required"}), 400

    file_name = data["file_name"]
    prompt = data["prompt"]
    
    # Load embeddings for the requested file
    embeddings, chunks = load_embeddings(file_name)
    if embeddings is None or chunks is None:
        return jsonify({"error": f"No embeddings found for file {file_name}. Generate embeddings first."}), 404

    # Convert to float32 to avoid dtype mismatch
    prompt_embedding = model.encode(prompt, convert_to_tensor=True, device=device).to(dtype=torch.float32)
    embeddings = embeddings.to(dtype=torch.float32)

    # Compute similarity scores
    similarity_scores = cos_sim(prompt_embedding, embeddings).cpu().numpy()[0]

    # Get top 3 most relevant chunks
    top_chunks = sorted(zip(chunks, similarity_scores), key=lambda x: x[1], reverse=True)[:3]

    return jsonify({
        "results": [
            {"score": float(score), "chunk": chunk} for chunk, score in top_chunks
        ]
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

