FROM node:16-alpine AS deps

# Build args
ARG CONVERSION_MONEY=2350
ARG EXPIRED_TOKEN_DAY=1
ARG API_GATEWAY=https://gateway.ocistok.co.id
ARG URL_UPLOAD=https://ocistok.co.id/control-panel/upload_gambar.php
ARG URL_CMS=https://cms.ocistok.id
ARG HOST_NAME=http://localhost:3000
ARG MIDTRANS=production
ARG CLIENT_KEY=Mid-client-S_UQJqsP0cWaWzIU
ARG XENDIT_KEY=xnd_public_production_hIlB62Cuy7JKj7ifLKjVbc2kp2VhkrbwpAzLpYcSz33hKbtrDPX9Q5JdGeJdLNhZ

# Environment vars
ENV CONVERSION_MONEY=$CONVERSION_MONEY
ENV EXPIRED_TOKEN_DAY=$EXPIRED_TOKEN_DAY
ENV API_GATEWAY=$API_GATEWAY
ENV URL_UPLOAD=$URL_UPLOAD
ENV URL_CMS=$URL_CMS
ENV HOST_NAME=$HOST_NAME
ENV MIDTRANS=$MIDTRANS
ENV CLIENT_KEY=$CLIENT_KEY
ENV XENDIT_KEY=$XENDIT_KEY

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

CMD ["npm", "start"]
