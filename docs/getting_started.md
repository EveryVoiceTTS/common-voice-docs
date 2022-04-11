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
