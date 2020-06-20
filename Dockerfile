FROM node:latest

RUN apt update \
    && apt install -y wakeonlan

ENV PORT=8080
ENV WOL_BROADCAST=""
ENV WOL_MAC=""

COPY ./* /srv/
WORKDIR /srv
RUN npm install

CMD [ "npm", "run", "start"]
