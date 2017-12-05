FROM ubuntu:16.04

ARG COMMIT
ENV COMMIT ${COMMIT:-master}
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install -y curl && \
curl -sL https://deb.nodesource.com/setup_8.x | bash -  && \
apt-get install -y nodejs  && \
nodejs -v  && \
npm -v

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

RUN apt-get install -y libnss3 libxss1 libasound2 libpangocairo-1.0-0 libx11-xcb-dev libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libcups2 libxrandr-dev libgconf-2-4 libatk1.0-0 libgtk-3-0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requester/package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY requester /usr/src/app/src

CMD [ "npm", "start" ]
