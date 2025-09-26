# Use Node.js LTS as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the static site
RUN npm run build

# Install a simple web server globally
RUN npm install -g serve

# Expose port 3000 to allow communication to/from the static site
EXPOSE 3000

# Serve the static site with the serve command
CMD ["serve", "-s", "dist", "-l", "3000"]