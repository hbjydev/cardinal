FROM node:lts-alpine AS build

WORKDIR /build

ADD package.json .
ADD package-lock.json .
RUN npm install

ADD src ./src
ADD tsconfig.json .
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /build/dist ./dist
COPY --from=build /build/package.json .
COPY --from=build /buikd/package-lock.json .

RUN npm install --only=prod

CMD [ "npm", "start" ]
