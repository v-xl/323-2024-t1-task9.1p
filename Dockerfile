FROM node:20-alpine
WORKDIR /home/node
COPY src/app.js /home/node/
EXPOSE 3000
USER node
RUN npm install express mongodb
CMD [ "node", "app.js" ]
