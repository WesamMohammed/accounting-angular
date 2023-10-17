# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:18.17.0 AS build

# Set the working directory inside the container
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g @angular/cli@14.2.0
# Copy package.json and package-lock.json files to leverage Docker cache
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install --omit=dev


# Copy the entire project to the container
COPY . .

# Build the Angular application with production configuration

RUN npm run build 

# Use a smaller base image for the final application
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the NGINX web server directory
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expose port 80 for the NGINX server
EXPOSE 80

# CMD instruction is not required as the default CMD for the nginx:alpine image serves the Angular app
