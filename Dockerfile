# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on (in this case, port 4000)
EXPOSE 4000

# Command to run the app in development mode
CMD ["npm", "run", "dev:clinicspots"]

