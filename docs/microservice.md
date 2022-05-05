# Task a New Image to Perform NRC Related Tasks

## Backup
We've implemented an initial solution using nextcloud.
For this purpose, we've added a `task` container to common-voice's current docker stack.
This container runs `crond`.
The script `synchronize2webdav.py` handle making a copy of the audio file from S3Proxy to nextcloud.


### Setting up backup
You need to copy and populate `.env-tasks`
```bash
cp .env-tasks.example .env-tasks
```
* `WEBDAV_HOSTNAME` as the form `https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/2c523d8d-449f-4176-bb05-d8bde72ad65f/`
* `WEBDAV_LOGIN` as the form `LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL`
* `WEBDAV_PASSWORD` as the form `PPPPP-PPPPP-PPPPP-PPPPP-PPPPP`


### `crond`
This mircroservice was inspired by [Running cron jobs in a Docker Alpine container](https://devopsheaven.com/cron/docker/alpine/linux/2017/10/30/run-cron-docker-alpine.html).

`crond`'s image is quite minimalist.
It runs scripts under `/etc/periodic/*` using `run-parts`.
Note that your scipts can't be `*.sh` since `run-parts` is capricious:
```
run-parts runs a number of scripts or programs found in a single directory directory.
Filenames should consist entirely of upper and lower case letters, digits, underscores, and hyphens.
Subdirectories of directory and files with other names will be silently ignored.

Scripts	must follow the #!/bin/interpretername convention in order to be executed.
They will not automatically be executed by /bin/sh.

The files found will be run in the lexical sort order of the filenames.
```
