(() => {
  document.addEventListener("DOMContentLoaded", () => {
    // Create a shadow DOM to encapsulate styles and avoid conflicts
    const chatContainer = document.createElement("div");
    chatContainer.style.position = "fixed";
    chatContainer.style.bottom = "15px";
    chatContainer.style.right = "15px";
    chatContainer.style.zIndex = "9999";

    const shadow = chatContainer.attachShadow({ mode: "open" });
    document.body.appendChild(chatContainer);
    function remove_local_storage() {
      localStorage.removeItem("messages");
    }
    // Inject styles
    const style = document.createElement("style");
    style.textContent = `
    .pulse { animation: pulse 1s infinite; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    .hidden { display: none; }
  `;
    shadow.appendChild(style);

    // Inject HTML
    const html = `
    <div id="aai-chat-button" class="pulse" style="width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="93.011 101.654 275.392 240.314" width="45px" height="40px" xmlns:bx="https://boxy-svg.com" preserveAspectRatio="none"><defs><bx:export><bx:file format="svg" href="#object-2"/><bx:file format="svg" href="#object-0" path="Untitled 2.svg"/><bx:file format="svg" href="#object-3" path="Untitled 3.svg"/><bx:file format="svg" href="#object-4" path="Untitled 4.svg"/><bx:file format="svg" href="#object-5" path="Untitled 5.svg"/><bx:file format="svg" href="#object-6" path="Untitled 6.svg"/><bx:file format="svg" href="#object-7" path="Untitled 7.svg"/><bx:file format="svg" href="#object-8" path="Untitled 8.svg"/><bx:file format="svg" path="Untitled 9.svg"/></bx:export></defs><g id="object-2"><path d="M 178.65 181.685 C 184.274 159.13 198.324 147.85 220.805 147.85 C 254.531 147.85 258.746 173.226 275.609 177.455 C 286.852 180.277 296.686 176.047 305.118 164.768 C 299.499 187.322 285.448 198.601 262.962 198.601 C 229.237 198.601 225.021 173.226 208.159 168.996 C 196.921 166.175 187.08 170.404 178.65 181.685 Z M 136.493 232.437 C 142.118 209.882 156.167 198.601 178.65 198.601 C 212.374 198.601 216.59 223.978 233.452 228.207 C 244.697 231.028 254.531 226.8 262.962 215.519 C 257.343 238.073 243.293 249.354 220.805 249.354 C 187.08 249.354 182.865 223.978 166.003 219.749 C 154.765 216.927 144.924 221.156 136.493 232.437 Z" style="fill: rgb(255, 255, 255);" id="object-1"/></g><path d="M 340.415 257.386 C 340.415 271.302 329.133 282.596 315.206 282.596 L 163.951 282.596 L 113.534 333.013 L 113.534 131.341 C 113.534 117.412 124.827 106.132 138.742 106.132 L 315.206 106.132 C 329.133 106.132 340.415 117.412 340.415 131.341 L 340.415 257.386 Z" style="stroke: rgb(255, 255, 255); stroke-width: 4px;" id="object-0"/><path d="M 172.2 180.159 L 172.2 198.14" style="fill: none; stroke-linecap: round; stroke-width: 17px; stroke: rgb(255, 255, 255);" id="object-3"/><path d="M 196.174 156.184 L 196.174 222.115" style="fill: none; stroke-linecap: round; stroke-width: 17px; stroke: rgb(255, 255, 255);" id="object-4"/><path d="M 220.149 138.204 L 220.149 246.089" style="fill: none; stroke-linecap: round; stroke-width: 17px; stroke: rgb(255, 255, 255);" id="object-5"/><path d="M 244.123 168.171 L 244.123 210.127" style="fill: none; stroke-linecap: round; stroke-width: 17px; stroke: rgb(255, 255, 255);" id="object-6"/><path d="M 268.098 150.191 L 268.098 228.108" style="fill: none; stroke-linecap: round; stroke-width: 17px; stroke: rgb(255, 255, 255);" id="object-7"/><path d="M 292.072 180.159 L 292.072 198.14" style="fill: none; stroke-linecap: round; stroke-width: 17px; stroke: rgb(255, 255, 255);" id="object-8"/></svg>
    </div>
    <div id="aai-chat-window" class="hidden" style="width: 320px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; font-family: Arial, sans-serif; display: none; flex-direction: column;">
      <div style="background-color: #000; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 16px;">Chat</span>
        <div>
        <button id="aai-chat-refresh" style="background: none; color: #fff; border: none; font-size: 16px; cursor: pointer;">&#10227;</button>
        <button id="aai-chat-close" style="background: none; color: #fff; border: none; font-size: 16px; cursor: pointer;">✖</button>
      </div> </div>

      <div id="chat-body" style="flex: 1; max-height: 450px; padding: 10px; overflow-y: auto; background: #fff; display: flex; flex-direction: column; gap: 10px;"></div>
      <div style="background: #f5f5f5; padding: 10px; display: flex; gap: 10px; align-items: center;">
        <input id="aai-input" type="text" placeholder="Type a message..." style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
        <button id="aai-chat-send" style="padding: 8px 16px; background-color: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Send</button>
      </div>
    </div>
  `;
    shadow.innerHTML += html;

    // JavaScript functionality
    shadow.querySelector("#aai-chat-button").addEventListener("click", () => {
      shadow.querySelector("#aai-chat-window").style.display = "flex";
      shadow.querySelector("#aai-chat-button").style.display = "none";
    });

    shadow.querySelector("#aai-chat-refresh").addEventListener("click", () => {
      remove_local_storage()
      displayMessages();
    });
    shadow.querySelector("#aai-chat-close").addEventListener("click", () => {
      shadow.querySelector("#aai-chat-window").style.display = "none";
      shadow.querySelector("#aai-chat-button").style.display = "flex";
    });
    const chatBody = shadow.querySelector("#chat-body");

    const formatDate = (date) => date.toLocaleDateString();
    const saveMessage = (message, sender) => {
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      messages.push({
        date: formatDate(new Date()),
        message,
        sender,
        time: new Date().toLocaleTimeString(),
      });
      localStorage.setItem("messages", JSON.stringify(messages));
      displayMessages();
    };

    const displayMessages = () => {
      var messages = JSON.parse(localStorage.getItem("messages")) || [];
      if (messages.length === 0) {
        getBotResponse("Please give a very short introduction of Your self !");
      }
      if (messages.length > 5) {
        messages = messages.slice(-5);
      }
      chatBody.innerHTML = "";
      messages.forEach((msg) => {
        const messageDiv = document.createElement("div");
        messageDiv.style.marginBottom = "8px";
        messageDiv.style.display = "flex";
        messageDiv.style.flexDirection = "column";
        messageDiv.style.alignItems =
          msg.sender === "bot" ? "flex-end" : "flex-start";

        const messageText = document.createElement("div");
        messageText.innerHTML = msg.message;
        messageText.style.padding = "8px";
        messageText.style.borderRadius = "12px";
        messageText.style.fontSize = "14px";
        messageText.style.backgroundColor =
          msg.sender === "bot" ? "#0000FF" : "#E5E5E5";
        messageText.style.color = msg.sender === "bot" ? "#fff" : "#000";

        const messageTime = document.createElement("small");
        messageTime.textContent = msg.time;
        messageTime.style.fontSize = "10px";
        messageTime.style.color = "#999";
        messageTime.style.marginTop = "4px";

        messageDiv.appendChild(messageText);
        messageDiv.appendChild(messageTime);
        chatBody.appendChild(messageDiv);
      });
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    var _0x5b8d = [
      "Bearer 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",
    ];
    const promptstring = `"You are 'Kelly,' a professional, friendly, and knowledgeable for Keller Williams Realty. Your purpose is to assist visitors with all their real estate needs while representing the brand's commitment to integrity, collaboration, and putting people first. Use the following detailed guidelines to handle inquiries and assist users effectively :

General Guidelines:
Important: give very short replys in a maximum 4 to 5 lines so they think you are a real person chatting with them.
Tone of Voice: Maintain a professional yet friendly tone. Be approachable, supportive, and empathetic. Use clear, jargon-free language unless requested otherwise.
Name and Persona: Introduce yourself as 'Kelly, your real estate assistant.'
Accessibility: Ensure concise and accessible responses for all users, including compatibility with screen readers and high-contrast text options.
Core Objectives:
Help users find properties: Offer precise search filtering based on preferences like location, price, size, and specific features. Provide additional details, photos, and neighborhood information.
Answer FAQs: Address questions about property buying/selling processes, financing options, and market trends. Access an integrated FAQ or knowledge base for common topics.
Schedule Appointments: Streamline scheduling for property viewings or consultations by syncing with agent availability in the CRM system.
Provide Resources: Share links to relevant blog posts, downloadable guides (e.g., "How to Sell Your Property"), or tools like mortgage calculators.
Build Trust: Reinforce Keller Williams' mission to deliver exceptional service and a client-centered approach.
Key Features to Address Visitor Needs:
Home Page Assistance:

Greet visitors warmly: "Hi, I’m Kelly! How can I assist you today? Searching for a home, selling a property, or something else?"
Guide them toward key actions like searching for properties, reading blogs, or scheduling an appointment.
Property Listings Support:

Respond promptly to inquiries like: “Tell me more about this property,” or “Can you show me similar homes?”
Provide details such as location, price, size, features, and market trends.
Consultation Booking:

Ask for their availability and book property viewings or agent consultations. Example:
"I can help schedule a viewing for this home. Does tomorrow at 3 PM work for you?"
Real-Time FAQs:

Handle frequent inquiries such as:
"What’s my property worth?"
"How do I qualify for financing?"
"What’s the current real estate market trend in Austin, TX?"
User Journey Considerations:
Critical Touchpoints for Chatbot Assistance:

Welcome users on the homepage.
Assist users on the property search results page.
Help resolve concerns on the FAQ or contact pages.
Address User Frustrations:

Offer quick solutions for narrowing search results.
Be proactive about delays, ensuring users feel supported: "Our agents are currently helping other clients. Can I answer your questions in the meantime?"
Advanced Goals:
Multilingual Support: Offer services in English, Spanish, and Mandarin.

Auto-detect or ask preferred language: "Would you like assistance in English, Español, or 中文?"
Future Expansion:

Incorporate features like virtual property tours and financing tools.
Potential use for agent onboarding and training support.
Technical Integrations:
CRM: Sync with HubSpot to handle appointments and leads.
CMS: Pull property information dynamically from the WordPress/IDX system.
Availability: Operate 24/7 to assist global clients at any time.
End every conversation by confirming user satisfaction and encouraging further contact:

"Did I answer all your questions today? If not, let me know how I can help further!"
"You can always reach out to a live agent if you'd like more personalized assistance!"
"Act as a knowledgeable real estate guide, offering clear and comprehensive answers while reflecting Keller Williams' values."
`;
    function getLastBotResponse() {
      const chatHistory = JSON.parse(localStorage.getItem("messages"));
      if (chatHistory && Array.isArray(chatHistory)) {
        // Find the last bot response
        for (let i = chatHistory.length - 1; i >= 0; i--) {
          if (chatHistory[i].sender === "bot") {
            return chatHistory[i];
          }
        }
      }
      return { message: "" }; // Return null if no bot response is found
    }
    const getBotResponse = async (userMessage) => {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: _0x5b8d[0],
          },
          body: JSON.stringify({
            model: "deepseek-r1-distill-llama-70b",
            messages: [
              {
                role: "user",
                content:
                  promptstring +
                  "give short answer according to your last responce/question :" +
                  getLastBotResponse().message +
                  userMessage,
              },
            ],
          }),
        },
      );
      function removeThinkTags(input) {
        // Use a regular expression to match <think> tags and everything before them
        const parts = input.split(/<think>.*?<\/think>/gs);
        return parts[parts.length - 1].trim(); // Return the text after the last <think> tag
      }
      const data = await response.json();
      saveMessage(removeThinkTags(data.choices[0].message.content), "bot");
      console.log(data)
      //console.log(
      //  promptstring +
      //  "give answer according to your last responce/question :" +
      //  getLastBotResponse().message +
      //  userMessage,
      //);
    };

    shadow.querySelector("#aai-chat-send").addEventListener("click", () => {
      const input = shadow.querySelector("#aai-input");
      if (input.value.trim()) {
        saveMessage(input.value, "user");
        getBotResponse(input.value);
        input.value = "";
      }
    });

    shadow.querySelector("#aai-input").addEventListener("keypress", (event) => {
      if (
        event.key === "Enter" &&
        shadow.querySelector("#aai-input").value.trim()
      ) {
        saveMessage(shadow.querySelector("#aai-input").value, "user");
        getBotResponse(shadow.querySelector("#aai-input").value);
        shadow.querySelector("#aai-input").value = "";
      }
    });

    // Initial message load
    displayMessages();
  });
})();
