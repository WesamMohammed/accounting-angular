
FROM node:18.17.0 AS build


RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps





COPY . .
RUN npx ng build 


FROM nginx:alpine


COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80


