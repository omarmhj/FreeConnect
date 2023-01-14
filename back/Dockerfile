FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies

COPY package.json ./

#runs npm install
RUN npm install

#copy the application files
COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]
