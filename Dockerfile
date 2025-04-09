# V1
# Base image V3 web-portal-v2
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install PM2, curl, wget, lsof, and ss
# RUN yarn global add pm2 && \
#     apk add --no-cache curl wget lsof iproute2

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all project files
COPY . .

# Build the application
RUN yarn build

# Expose port (default Next.js runs on 3000)
EXPOSE 7110

# Start the application spesific port yarn
CMD ["yarn", "start", "-p", "7110"]
