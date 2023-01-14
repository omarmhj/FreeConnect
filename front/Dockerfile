FROM node:16-alpine

# Create app directory
WORKDIR /app

#copy the package
COPY package.json ./

#runs npm install
RUN npm install

#copy the application files
COPY . .

#exposes port 3000
EXPOSE 3000

#runs the comand npm start
CMD ["npm", "start"]