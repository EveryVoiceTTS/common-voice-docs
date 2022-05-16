# Getting Started

## Cloning the Repository
Start by cloning the repository and switch to the `dev/ilt` branch.
```bash
git clone https://github.com/SamuelLarkin/common-voice.git
cd common-voice
git checkout dev/ilt
```

## Configuration
### Docker Environment Variables
Common Voice uses a file to set some environment variables that are used by the services.
```bash
cp .env-local-docker.example .env-local-docker
```
Default values are fine but feel free to changes them.

### Using S3 Bucket
```diff
- CV_S3_CONFIG='{"endpoint": "http://s3proxy:80", "accessKeyId": "local-identity", "secretAccessKey": "local-credential", "s3ForcePathStyle": true}'
+ CV_S3_CONFIG='{"endpoint": "https://s3.amazonaws.com", "accessKeyId": "my_access_key_id", "secretAccessKey": "my_secret_access_key", "s3For    cePathStyle": true}'
+ BUCKET_LOCATION="ca-central-1"
+ CV_CLIP_BUCKET_NAME=smallteamtest
+ CV_DATASET_BUCKET_NAME=smallteamtest
```

### Configuring `Auth0`
```diff
+ CV_AUTH0_DOMAIN="dev-example1.us.auth0.com"
+ CV_AUTH0_CLIENT_ID="client_id"
+ CV_AUTH0_CLIENT_SECRET="client_secret"
```

### Changing Audio Format
We need higher quality audio recordings.
```diff
+ CV_TRANSCODE_CODEC='pcm_s16le'
+ CV_TRANSCODE_FORMAT='wav'
+ CV_TRANSCODE_SAMPLE_RATE='44111'
```

### Changing the Sentence Directory
Importing all language utterances can be extemely long.
You can create a subset or a different list of language utterances to import a new directory and have that directory use a the source of utterances by:
```diff
+ CV_SENTENCES_FOLDER="server/data.project"
```


## Tasks Environment Variables
We've added a new service that does backup.  It needs to know some credentials to access the nextcloud server.
```bash
cp .env-tasks.example .env-tasks
```
which looks like this
```
WEBDAV_HOSTNAME="nextcloud.nrc-cnrc.gc.ca"
WEBDAV_LOGIN="LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL"
WEBDAV_PASSWORD="PPPPP-PPPPP-PPPPP-PPPPP-PPPPP"
```
You need to head to https://nextclould.nrc-cnrc.gc.ca and create a token which is your password.
Then populate the `WEBDAV_LOGIN` & `WEBDAV_PASSWORD`.

## Running
Finally, start the services.
Note that we specify a user/group because the stack can write some files/diretories that will be owned by root and you won't be able to delete them later.
```bash
CURRENT_UID=$(id -u):$(id -g) docker-compose --project-name "common-voice" up
```
