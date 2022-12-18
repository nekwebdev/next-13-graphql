FROM node:18-alpine

RUN apk add libc6-compat shadow

ARG userId=1000

RUN groupmod -g ${userId} node && usermod -u ${userId} -g ${userId} node


