# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy all source code first
COPY . ./

# Install dependencies (this will run postinstall script)
RUN yarn install 

# Build the TypeScript code
RUN yarn run build

# Command to run the application in production
CMD ["node", "./dist/index.js"]
