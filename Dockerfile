FROM node:15.3.0-alpine3.10 as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

RUN apk update && apk add dos2unix
RUN dos2unix ./docker/run.sh

FROM nginx:1.19.3-alpine

COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docker/config.js /configs/config.js
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/docker/run.sh /run.sh
RUN chmod +x /run.sh

ENTRYPOINT ["/run.sh"]
CMD ["nginx", "-g", "daemon off;"]