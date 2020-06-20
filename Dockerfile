FROM node:latest

ENV PORT=8080
ENV WOL_BROADCAST=""
ENV WOL_MAC=""

RUN apt update \
    && apt install -y wakeonlan

COPY ./* /srv/
WORKDIR /srv
RUN npm install

ENTRYPOINT [ "npm", "run", "start"]
