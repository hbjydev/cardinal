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

COPY --from=build /build/build ./build
COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json .

RUN npm install --only=prod

CMD [ "npm", "start" ]
