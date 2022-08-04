# pull official base image
FROM node:13.12.0-alpine

COPY . /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
WORKDIR /app
RUN npm install 
RUN npm install react-scripts@4.0.3 -g

# start app
CMD ["npm", "start"]
