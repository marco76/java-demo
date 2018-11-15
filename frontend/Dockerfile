# this script deploy only the frontend ui

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./src/dist /usr/share/nginx/html

### To build and deploy ###
# build local
# docker build -t javaee/angular-demo .

# test locally
# docker run -it -p 80:80 javaee/angular-demo

# push to docker hub
# docker push javaee/angular-demo