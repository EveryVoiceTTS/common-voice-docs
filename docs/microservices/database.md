# Database Backup
* [how to mysqldump remote db from local machine](https://stackoverflow.com/a/2990732)
* [Generate the backup of a single database](https://www.sqlshack.com/how-to-backup-and-restore-mysql-databases-using-the-mysqldump-command/)
We've added the `database_backup` microservice to Common Voice's docker stack to perform periodic full database backup to make sure we have both the sentences and their ids.

## Test
This is a basic sample of what needs to get done to perform the backup.
```bash
mysqldump -P 3306 -h db -u root --password=PASSWORD voiceweb
```
We need to upload the output on the backup server.
```bash
curl -u $WEBDAV_LOGIN:$WEBDAV_PASSWORD -T <local file location> https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/$WEBDAV_LOGIN/
```


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
