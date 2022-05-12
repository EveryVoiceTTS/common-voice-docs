# Task a New Image to Perform NRC Related Tasks

## Audio Backup
We've implemented an initial solution using nextcloud.
For this purpose, we've added a `task` container to common-voice's current docker stack.
This container runs `crond`.
The script `synchronize2webdav.py` handle making a copy of the audio file from S3Proxy to nextcloud.


### Setting up Backup
You need to copy and populate `.env-tasks`
```bash
cp .env-tasks.example .env-tasks
```
* `WEBDAV_HOSTNAME` as the form `https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/2c523d8d-449f-4176-bb05-d8bde72ad65f/`
* `WEBDAV_LOGIN` as the form `LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL`
* `WEBDAV_PASSWORD` as the form `PPPPP-PPPPP-PPPPP-PPPPP-PPPPP`


## Database Backup
* [how to mysqldump remote db from local machine](https://stackoverflow.com/a/2990732)
* [Generate the backup of a single database](https://www.sqlshack.com/how-to-backup-and-restore-mysql-databases-using-the-mysqldump-command/)
Test done from `db` microservice.
```
mysqldump -P 3306 -h db -u root --password=PASSWORD voiceweb
```
We need to upload the output on the backup server.
```
curl -u $WEBDAV_LOGIN:$WEBDAV_PASSWORD -T <local file location> https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/$WEBDAV_LOGIN/
```


## `crond`
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
[`run-parts's` man page](https://nixdoc.net/man-pages/Linux/man8/run-parts.8.html)


### Help
```bash
crond --help
BusyBox v1.34.1 (2022-04-04 10:19:27 UTC) multi-call binary.

Usage: crond [-fbS] [-l N] [-d N] [-L LOGFILE] [-c DIR]

        -f      Foreground
        -b      Background (default)
        -S      Log to syslog (default)
        -l N    Set log level. Most verbose 0, default 8
        -d N    Set log level, log to stderr
        -L FILE Log to FILE
        -c DIR  Cron dir. Default:/var/spool/cron/crontabs
```
