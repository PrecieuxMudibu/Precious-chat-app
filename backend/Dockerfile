FROM node:14-alpine AS development
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
# COPY src>... <dest>
COPY . .
# Expose port
EXPOSE 3200
# Start the app
CMD [ "npm", "run", "start" ]