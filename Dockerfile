# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install global dependencies (like Nx CLI and PM2)
RUN npm install -g nx pm2

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies for the entire workspace
RUN npm install --legacy-peer-deps

# Copy the rest of the Nx workspace code to the container
COPY . .

# Build the `grow` and `clinicspots` applications
RUN nx build grow --prod
RUN nx build clinicspots --prod

# Expose the ports for both apps
EXPOSE 4200 4000

# Start both `grow` and `clinicspots` apps using pm2
CMD ["pm2", "start", "nx", "--", "serve", "grow", "&", "pm2", "start", "nx", "--", "serve", "clinicspots", "-p", "4000", "-H", "0.0.0.0"]
