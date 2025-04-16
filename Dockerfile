# Base V2 web-account-console-v2
FROM node:22

# Set working directory
WORKDIR /app

# Enable Corepack for managing package managers like Yarn
RUN corepack enable

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all project files
COPY . .

# Build the application
RUN yarn build

# Expose port (default Next.js runs on 3000)
EXPOSE 7110

# Start the application on the specified port
CMD ["yarn", "start", "-p", "7110"]
