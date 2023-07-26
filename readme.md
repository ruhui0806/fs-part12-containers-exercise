# Description

This repo is the submission repository for the part12 in full stack open course.

The remote repository's name is: fs-part12-containers-exercise

The local repository's name is changed correspondingly: fs-part12-containers-exercise

Commands

<li> list all the folders & files in the image

    docker run node:16 ls

<li> # createa container from an image

    container run IMAGE-NAME

<li> -it flags: interact with the container, bash will allow you to bash mode, which is helpful if you want to run some program/files, e.g., "node index.js" inside the container

    docker container run -it ubuntu bash

<li> ls command will list all the files, and --rm will remove the container

    docker container run --rm ubuntu ls

<li> the container run accepts --name flag that we can use to give a name for the container

    docker container run -it --name hello-node node:16 bash

<li>  Start an existing container again via:

    docker start CONTAINER-NAME-OR-ID

<li> Stop / existing a running container:

    docker kill CONTAINER-NAME-OR-ID

<li> after the container is stoped, you can restart it with the interactive mode, where you can install packages inside a running container

    docker start -i CONTAINER-NAME-OR-ID

<li> create a new image that includes the changes we have made

    commit CONTAINER-ID-OR-CONTAINER-NAME NEW-IMAGE-NAME

<li>
