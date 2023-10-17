# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts AS build

# Set the working directory inside the container
RUN makdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Angular application with production configuration
RUN npm run build --prod

# Use a smaller base image for the final application
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the NGINX web server directory
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html/

# Expose port 80 for the NGINX server
EXPOSE 80

# CMD instruction is not required as the default CMD for the nginx:alpine image serves the Angular app
