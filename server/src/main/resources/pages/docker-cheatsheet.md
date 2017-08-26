## General

Image = 'Stamp' used to produce one or many containers

Container = Independent instance of an image

## Build

Build an image on the base of a Docker file. There is a . [dot] at the end (path).

``` docker build -t javaee/java-demo . ```

### Run

Run an image and redirect the container port 8080 to the host 80`

``` docker run -it -p 80:8080 java-demo:latest ```

Run in detached mode (background) and redirect the container port 80 to the host 80`

``` docker run -it -p 80:80 java-demo:latest ```

### Manage

Access the terminal of a Docker container

``` docker exec -it [container ID] /bin/bash ```

### Clean

Stop all the container

```docker stop $(docker ps -a -q)```


Delete all the containers

```docker rm $(docker ps -a -q)```

Delete all the images

```docker rmi $(docker images -q)```

Delete all the images in case of conflict (images referenced in multiple repositories)

```docker rmi -f $(docker images -q)```