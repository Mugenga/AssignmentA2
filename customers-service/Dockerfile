FROM node:23.9.0-alpine
# Set working directory
WORKDIR /app
# copy package.json file
COPY package*.json ./
# Install packages
RUN npm install
# Copy app files
COPY . .
# Run on port 3000
EXPOSE 3000
# Commands to start application
CMD ["npm", "start"]
