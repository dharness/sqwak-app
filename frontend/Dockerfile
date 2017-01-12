FROM node:6

COPY ./app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY ./app /usr/src/app

EXPOSE 3000