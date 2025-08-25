# Use Node.js official image
FROM node:21-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose app port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
