# Use Node.js base image
FROM node:22.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 8080

# Start the backend server
CMD ["node", "server.js"]
