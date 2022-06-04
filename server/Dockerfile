# create Dockerfile for deployment
FROM node:alpine
# setup WORKDIR
WORKDIR /home/node/
# copy server.js
COPY server.js ./
# copy package.json to WORKDIR
COPY package*.json ./
# copy .env to WORKDIR
COPY .env ./
# copy models to WORKDIR
COPY models/ ./model/
# copy routes to WORKDIR
COPY routes/ ./routes/

# set node_env to production
ENV NODE_ENV="production"
RUN npm ci --only=production

EXPOSE 3001
CMD [ "node", "server.js" ]