FROM node:8.9-alpine
COPY index.js .
RUN ln -sf /dev/stdout /debug.log
CMD [ "node", "index.js" ]