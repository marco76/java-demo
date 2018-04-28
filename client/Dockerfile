FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./src/dist /usr/share/nginx/html

# build local
# docker build -t javaee/angular-demo .
# docker run -it -p 80:80 javaee/angular-demo
# docker tag javaee/angular-demo gcr.io/javademo-166015/angular-demo
# docker push gcr.io/javademo-166015/angular-demo