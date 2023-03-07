FROM node:16-alpine AS build-process
ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn install --production --network-timeout 100000

COPY . .

RUN yarn build

FROM nginx:1.21-alpine as production
ENV NODE_ENV production

COPY --from=build-process /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]