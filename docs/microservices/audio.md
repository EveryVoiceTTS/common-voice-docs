# Audio Backup
We've implemented an initial solution using nextcloud.
For this purpose, we've added a `audio_backup` container to common-voice's current docker stack.
This container runs `crond`.
The script `synchronize2webdav.py` handles making a copy of the audio file from S3Proxy to nextcloud.


## Setting up Backup
### `.env-local-docker`
Make sure to properly configure `CV_DB_ROOT_PASS` in `.env-local-docker`.
```
CV_S3_CONFIG='{"endpoint": "http://s3proxy:80", "accessKeyId": "local-identity", "secretAccessKey": "local-credential", "s3ForcePathStyle": true}'
```

### `.env-tasks`
You need to copy and populate `.env-tasks`
```bash
cp .env-tasks.example .env-tasks
```
```diff
+ WEBDAV_HOSTNAME=https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/2c523d8d-449f-4176-bb05-d8bde72ad65f/
+ WEBDAV_LOGIN=LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL
+ WEBDAV_PASSWORD=PPPPP-PPPPP-PPPPP-PPPPP-PPPPP
```
