FROM node:lts-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps || exit 1

COPY . .

EXPOSE 3000

# not recommended, this runs the app in development mode in container
CMD ["npm", "run", "dev", "--", "--port", "3000", "--host"]
