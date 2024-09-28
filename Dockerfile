FROM node:20 AS build

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client/ .
RUN npm run build

FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY --from=build /app/client/build ./client/build

EXPOSE 5000

CMD ["npm", "run", "server"]
