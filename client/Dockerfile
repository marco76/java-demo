FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./src/dist /usr/share/nginx/html

# this deploy only the frontend ui

# build local
# docker build -t javaee/angular-demo .

# test locally
# docker run -it -p 80:80 javaee/angular-demo

# deploy
# docker tag javaee/angular-demo gcr.io/javademo-166015/angular-demo
# docker push gcr.io/javademo-166015/angular-demo

# docker push javaee/angular-demo