FROM node:14.17.3 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build
FROM nginx:latest
RUN apt-get update
RUN apt-get install dos2unix -y
COPY --from=build /usr/local/app/dist/fitness-client /home
COPY ./proxy_default.conf /etc/nginx/conf.d/default.conf
RUN dos2unix /etc/nginx/conf.d/default.conf
EXPOSE 80
