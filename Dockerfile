FROM node:lts-alpine

WORKDIR /app

ADD package.json .
ADD package-lock.json .
RUN npm install

ADD src ./src
ADD tsconfig.json .
RUN npm run build

CMD [ "npm", "start" ]
