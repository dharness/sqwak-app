FROM nginx:mainline

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./www /etc/nginx/www
COPY ./ssl /etc/nginx/ssl
RUN touch /etc/nginx/error.log
