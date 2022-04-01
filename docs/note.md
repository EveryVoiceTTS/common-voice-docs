# Notes

## Links
* [Common Voice - Github](https://github.com/common-voice/common-voice) Mozilla Common Voice, a platform for collecting speech donations in order to create public domain datasets for training voice recognition-related tools.
* [Matrix Chat](https://chat.mozilla.org/#/room/#common-voice:mozilla.org)
* [Discourse](https://discourse.mozilla.org/c/voice/239)
* [Auth0](https://auth0.com/)
* [stream-transcoder.js](https://www.npmjs.com/package/stream-transcoder) Flexible media transcoding using FFmpeg. Stream media in and out - converting it on the fly.


## Tasks

Hey Samuel, I mentioned I would pass on the info about what we’re looking for.
My guess is you’d want to be more involved in the ML part of the project no?
This is really a web development project.

Here’s a description:
We’re looking for a developer to create an instance of Mozilla Common Voice (https://github.com/common-voice/common-voice) the stack is Docker, React, TypeScript, MySQL, S3.
Common Voice was set up to do crowd-source recording of audio, so there are some changes that would need to be made.
Namely:
- we need the data to be unavailable to the public
- we need registration to be limited
- we need minor style and markup changes (ie taking away the language around Mozilla and adding some markup around the project)
- Common Voice currently collects audio in a lossy format (mp3), we need to change this to lossless
  16bit, 48k sample rate, lossless wav files
- Perhaps add some server-side scripting to automate signal processing/de-noising/backup
- Is it set up so that auth0 let’s us define a list of email address or something that are whitelisted for signing up?
    The recordings should also only be accessible to pre-defined sets of users.
    Do you have a sense of whether it will be easier to password protect the entire site or whether we could have tiers of access for particular recordings?

Let me know if you have any questions though!


## Auth0
Like it or not, you need a [Auth0](https://auth0.com/) account to get Common Voice to work.
Add the following lines to `.env-local-docker` which is locate at the root of the git repository.
```
CV_AUTH0_DOMAIN="dev-24cisdir.us.auth0.com"
CV_AUTH0_CLIENT_ID="<YOUR_ID>"
CV_AUTH0_CLIENT_SECRET="<YOU_HAVE_A_SECRET>"
```

### Whitelisting emails
* [Auth0 Rules](https://auth0.com/docs/customize/rules)
* [Manage User Access to Applications](https://auth0.com/docs/manage-users/user-accounts/manage-user-access-to-applications)
* [Rules examples](https://github.com/auth0/rules/tree/aeaf93bc058408e260192d0941a688963449d6be/src/rules)
* [Whitelist for a Specific App](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist-for-app.js) Only allow access to users with whitelist email addresses on a specific app.
* [Whitelist](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist.js) Only allow access to users with specific whitelist email addresses.
* [Whitelist on Specific Connection](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-whitelist-on-a-connection.js) Only allow access to users coming from a whitelist on specific connection.
* [Email domain whitelist](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-domain-whitelist.js) Only allow access to users with specific whitelist email domains.
* [Whitelist on the cloud](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/dropbox-whitelist.js) Determine access to users based on a whitelist of emails stored in Dropbox.
* [Add country to the user profile](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/add-country.js) Add a country attribute to the user based on their IP address.
* [Disable social signups](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/disable-social-signup.js) Disable signups from social connections.
* [Force email verification](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/email-verified.js) Only allow access to users with verified emails.

Looking at [Whitelist for a Specific App](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist-for-app.js) seems to be promising.
```javascript
/**
 * @title Whitelist for a Specific App
 * @overview Only allow access to users with whitelist email addresses on a specific app
 * @gallery true
 * @category access control
 *
 * This rule will only allow access to users with specific email addresses on a specific app.
 *
 */

function (user, context, callback) {

  // Access should only be granted to verified users.
  if (!user.email || !user.email_verified) {
    return callback(new UnauthorizedError('Access denied.'));
  }

  // only enforce for NameOfTheAppWithWhiteList
  // bypass this rule for all other apps
  if(context.clientName !== 'NameOfTheAppWithWhiteList'){
    return callback(null, user, context);
  }

  const whitelist = [ 'user1@example.com', 'user2@example.com' ]; // authorized users
  const userHasAccess = whitelist.some(function (email) {
    return email === user.email;
  });

  if (!userHasAccess) {
    return callback(new UnauthorizedError('Access denied.'));
  }

  callback(null, user, context);
}
```


## Languages
Can we limit the available languages?
`locales/all.json` controls the available languages in the UI's drop down box.
It looks like the UI's language and the utterances' language are the same meaning that if you select English, you get the UI in English and you also get the utterances in English.

### How to Add a New Language
Since we haven't found a wait to have the UI in one language and the utterances in another language, we've decided to add a new language code for the utterances and copy the localizations of English to that new language.
* Add `git` & `str` to `locales/all.json` in order to get those new languages to show up in the UI's top-right dropdown box;
* We weren't sure what `locales/contributable.json` is for so we also added `git` & `str` to it;
* In order to get the new language names to properly show up in the UI, we added their full names to `locales/native-names.json`;
* Again, we weren't sure what `locales/translated.json` is for and opted to add `git` & `str` to it;
* Under `server/data`, we created two directories, `git/` & `str/` and populated them with some `utterances.txt`;
* Finally, we want the UI to be in English even for `git` & `str` so we've decided to use the English localizations for them.  We create two directories, `git/` & `str/` under `web/locales/` and simply copied the two files from `en/`, `cross-locale.ftl` & `messages.ftl` to each of the new languages' directory.
```bash
cp en/* git/
cp en/* str/
```


## Changing the Audio Format
To change the audio codec, the format & the sample rate, you have to add the following lines to `.env-local-docker` which is located at the root of the repository.
```
CV_TRANSCODE_CODEC='pcm_s16le'
CV_TRANSCODE_FORMAT='wav'
CV_TRANSCODE_SAMPLE_RATE='44100'
```

### Available Lossless Audio Codecs
```bash
ffmpeg -codecs |& grep ".EA..S"
```
or
```bash
docker container exec -it web ffmpeg -codecs |& grep ".EA..S"
```
```bash
docker container exec -it web ffmpeg -codecs \
 |& grep ".EA..S" \
 | sed -e 's| \([^ ]\+\) \([^ ]\+\) \+\(.\+\)|\1\t\2\t\3|' \
 | tabulate --sep $'\t' --format pipe
```
| Attributes | Name | Description |
|--------|------------------|----------------------------------------------------------------|
| DEA..S | alac             | ALAC (Apple Lossless Audio Codec)                              |
| DEA.LS | dts              | DCA (DTS Coherent Acoustics) (decoders: dca ) (encoders: dca ) |
| DEA..S | flac             | FLAC (Free Lossless Audio Codec)                               |
| DEA..S | mlp              | MLP (Meridian Lossless Packing)                                |
| DEA..S | pcm_f32be        | PCM 32-bit floating point big-endian                           |
| DEA..S | pcm_f32le        | PCM 32-bit floating point little-endian                        |
| DEA..S | pcm_f64be        | PCM 64-bit floating point big-endian                           |
| DEA..S | pcm_f64le        | PCM 64-bit floating point little-endian                        |
| DEA..S | pcm_s16be        | PCM signed 16-bit big-endian                                   |
| DEA..S | pcm_s16be_planar | PCM signed 16-bit big-endian planar                            |
| DEA..S | pcm_s16le        | PCM signed 16-bit little-endian                                |
| DEA..S | pcm_s16le_planar | PCM signed 16-bit little-endian planar                         |
| DEA..S | pcm_s24be        | PCM signed 24-bit big-endian                                   |
| DEA..S | pcm_s24daud      | PCM D-Cinema audio signed 24-bit                               |
| DEA..S | pcm_s24le        | PCM signed 24-bit little-endian                                |
| DEA..S | pcm_s24le_planar | PCM signed 24-bit little-endian planar                         |
| DEA..S | pcm_s32be        | PCM signed 32-bit big-endian                                   |
| DEA..S | pcm_s32le        | PCM signed 32-bit little-endian                                |
| DEA..S | pcm_s32le_planar | PCM signed 32-bit little-endian planar                         |
| DEA..S | pcm_s64be        | PCM signed 64-bit big-endian                                   |
| DEA..S | pcm_s64le        | PCM signed 64-bit little-endian                                |
| DEA..S | pcm_s8           | PCM signed 8-bit                                               |
| DEA..S | pcm_s8_planar    | PCM signed 8-bit planar                                        |
| DEA..S | pcm_u16be        | PCM unsigned 16-bit big-endian                                 |
| DEA..S | pcm_u16le        | PCM unsigned 16-bit little-endian                              |
| DEA..S | pcm_u24be        | PCM unsigned 24-bit big-endian                                 |
| DEA..S | pcm_u24le        | PCM unsigned 24-bit little-endian                              |
| DEA..S | pcm_u32be        | PCM unsigned 32-bit big-endian                                 |
| DEA..S | pcm_u32le        | PCM unsigned 32-bit little-endian                              |
| DEA..S | pcm_u8           | PCM unsigned 8-bit                                             |
| DEA..S | s302m            | SMPTE 302M                                                     |
| DEA..S | truehd           | TrueHD                                                         |
| DEA..S | tta              | TTA (True Audio)                                               |
| DEA.LS | wavpack          | WavPack (encoders: wavpack libwavpack )                        |


### Available Formats
```bash
ffmpeg -formats
```
or
```bash
docker container exec -it web ffmpeg -formats
```


## S3 File Name
`server/src/lib/clip.ts`:`saveClip()`
Saving the audio content on S3.
```js
   const { client_id, headers } = request;
   const sentenceId = headers.sentence_id as string;

   const folder = client_id + '/';
   const filePrefix = sentenceId;
   const clipFileName = folder + filePrefix + '.' + config.TRANSCODE.FORMAT;

   await this.s3
     .upload({
       Bucket: config.CLIP_BUCKET_NAME,
       Key: clipFileName,
       Body: audioOutput,
     })
     .promise();
```


I think utterances are identified by a `client_id + sentenceId`.
The recording are saved in a bucket and there metadata in a database.
`this.model.db.clipExists(client_id, sentenceId)`
```js
    await this.model.saveClip({
      client_id: client_id,
      localeId: sentence.locale_id,
      original_sentence_id: sentenceId,
      path: clipFileName,
      sentence: sentence.text,
    });
```


## S3proxy
What is stored in our S3 proxy.
This is similar to `ls`.
```bash
curl http://127.0.0.1:9001/common-voice-clips \
| xmllint --format -
```
```
<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>common-voice-clips</Name>
  <Prefix/>
  <MaxKeys>1000</MaxKeys>
  <Marker/>
  <IsTruncated>false</IsTruncated>
  <Contents>
    <Key>18f74bcf-210c-43e6-b443-78248399c0ce/</Key>
    <LastModified>2022-01-18T19:28:13Z</LastModified>
    <ETag>"d41d8cd98f00b204e9800998ecf8427e"</ETag>
    <Size>4096</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a</ID>
      <DisplayName>CustomersName@amazon.com</DisplayName>
    </Owner>
  </Contents>
  <Contents>
    <Key>18f74bcf-210c-43e6-b443-78248399c0ce/00003ee1748579223ce314d00265913ba19835024b6e536f0d425230da27a629.mp3</Key>
    <LastModified>2022-01-18T19:25:38Z</LastModified>
    <ETag>"31c67dbfbb001f63468af54c228b77b6"</ETag>
    <Size>35901</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a</ID>
      <DisplayName>CustomersName@amazon.com</DisplayName>
    </Owner>
  </Contents>
</ListBucketResult>
```


Retrieve a file and check what file type it is.
```bash
curl http://127.0.0.1:9001/common-voice-clips/18f74bcf-210c-43e6-b443-78248399c0ce/00003ee1748579223ce314d00265913ba19835024b6e536f0d425230da27a629.mp3 \
| file -
```
```
/dev/stdin: Audio file with ID3 version 2.4.0, contains:MPEG ADTS, layer III, v1, 48 kbps, 32 kHz, Monaural
```

## Why `You're on the staging server.`
Originating from `web/src/components/layout/layout.tsx`
It uses `web/src/utility.ts:isProduction()` which simply check if the `window.location.origin === URLS.HTTP_ROOT` where `URLS.HTTP_ROOT` is `https://commonvoice.mozilla.org`.


## Backup

### Microsoft Azure
Can we use Microsoft Azure instead of AWS S3?
* [Access Azure Blob Storage from Your Apps using S3 Java API](https://devblogs.microsoft.com/cse/2016/05/22/access-azure-blob-storage-from-your-apps-using-s3-api/)
* [S3Proxy](https://github.com/gaul/s3proxy) S3Proxy implements the S3 API and proxies requests, enabling several use cases:
    * translation from S3 to Backblaze B2, EMC Atmos, Google Cloud, Microsoft Azure, and OpenStack Swift
    * testing without Amazon by using the local filesystem
    * extension via middlewares
    * embedding into Java applications
* [S3Proxy - Storage backend examples Azure Blob](https://github.com/gaul/s3proxy/wiki/Storage-backend-examples#azure-blob)

The common voice docker stack uses S3Proxy.
If we can configure S3Proxy to ingest the current S3 requests from the server and send them to Microsoft Azure, that would solve our connection problem.
It looks like the S3Proxy container is quite configurable with [environment variables](https://github.com/gaul/s3proxy/blob/master/Dockerfile).

Here's what the S3Proxy command looks like:
```bash
docker container exec -it s3proxy cat run-docker-container.sh
```
```
#!/bin/sh

exec java \
    -DLOG_LEVEL="${LOG_LEVEL}" \
    -Ds3proxy.endpoint="${S3PROXY_ENDPOINT}" \
    -Ds3proxy.virtual-host="${S3PROXY_VIRTUALHOST}" \
    -Ds3proxy.authorization="${S3PROXY_AUTHORIZATION}" \
    -Ds3proxy.identity="${S3PROXY_IDENTITY}" \
    -Ds3proxy.credential="${S3PROXY_CREDENTIAL}" \
    -Ds3proxy.cors-allow-all="${S3PROXY_CORS_ALLOW_ALL}" \
    -Ds3proxy.cors-allow-origins="${S3PROXY_CORS_ALLOW_ORIGINS}" \
    -Ds3proxy.cors-allow-methods="${S3PROXY_CORS_ALLOW_METHODS}" \
    -Ds3proxy.cors-allow-headers="${S3PROXY_CORS_ALLOW_HEADERS}" \
    -Ds3proxy.ignore-unknown-headers="${S3PROXY_IGNORE_UNKNOWN_HEADERS}" \
    -Djclouds.provider="${JCLOUDS_PROVIDER}" \
    -Djclouds.identity="${JCLOUDS_IDENTITY}" \
    -Djclouds.credential="${JCLOUDS_CREDENTIAL}" \
    -Djclouds.endpoint="${JCLOUDS_ENDPOINT}" \
    -Djclouds.region="${JCLOUDS_REGION}" \
    -Djclouds.regions="${JCLOUDS_REGIONS}" \
    -Djclouds.keystone.version="${JCLOUDS_KEYSTONE_VERSION}" \
    -Djclouds.keystone.scope="${JCLOUDS_KEYSTONE_SCOPE}" \
    -Djclouds.keystone.project-domain-name="${JCLOUDS_KEYSTONE_PROJECT_DOMAIN_NAME}" \
    -Djclouds.filesystem.basedir="/data" \
    -jar /opt/s3proxy/s3proxy \
    --properties /dev/null
```

If we start from [S3Proxy - Storage backend examples Azure Blob](https://github.com/gaul/s3proxy/wiki/Storage-backend-examples#azure-blob)
```
s3proxy.endpoint=http://127.0.0.1:8080
s3proxy.authorization=aws-v2-or-v4
s3proxy.identity=local-identity
s3proxy.credential=local-credential
jclouds.provider=azureblob
jclouds.identity=xxxxxxxxx
jclouds.credential=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

and the common voice's `docker-compose.yaml`, we can probably set it up to use Microsoft Azure.
```yaml
  s3proxy:
    environment:
      - S3PROXY_AUTHORIZATION=none
```

We need to set a minimum of environment variables.
```yaml
  s3proxy:
    environment:
      - S3PROXY_ENDPOINT=http://0.0.0.0:80
      - S3PROXY_AUTHORIZATION=aws-v2-or-v4
      - S3PROXY_IDENTITY=local-identity
      - S3PROXY_CREDENTIAL=local-credential
      - JCLOUDS_PROVIDER=azureblob
      - JCLOUDS_IDENTITY=xxxxxxxx
      - JCLOUDS_CREDENTIAL=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```


### nextcloud
[WEBDAV WITH CURL](https://code.blogs.iiidefix.net/posts/webdav-with-curl/)

[list files/folders in owncloud with php curl](https://stackoverflow.com/a/26676902)
```
curl -X PROPFIND -u user:password "http://yourserver.com/owncloud/remote.php/webdav/"
```
* PROPFIND = get the list of files/folders
* MKCOL = create folder
* DELETE = delete file/folder
* MOVE = move or rename a file or folder
* PUT = upload file
* GET = download file

webdav.list_files
```
<?xml version="1.0"?>
<a:propfind xmlns:a="DAV:">
<a:prop><a:resourcetype/></a:prop>
</a:propfind>
```

Note that the order of the following command is crutial, or so it seems.
```bash
curl \
  -u LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL:PPPPP-PPPPP-PPPPP-PPPPP-PPPPP \
  -i \
  -X PROPFIND \
  https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL/CommonVoice/ \
  --upload-file - \
  -H "Depth: 1" \
  < webdav.list_files
```

##### NextCloud@NRC
https://nextcloud.nrc-cnrc.gc.ca
It uses your MS Teams password.
If your are looking for a guide: [NextCloud NRC User Guide Advance](https://nextcloud.nrc-cnrc.gc.ca/f/42866)

## Task a New Image to Perform NRC Related Tasks
### Backup
We've implemented an initial solution using nextcloud.
For this purpose, we've added a `task` container to common-voice's current docker stack.
This container runs `crond`.
The script `synchronize2webdav.py` handle making a copy of the audio file from S3Proxy to nextcloud.
#### Setting up backup
You need to copy and populate `.env-tasks`
```bash
cp .env-tasks.example .env-tasks
```
* `WEBDAV_HOSTNAME` as the form `https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/2c523d8d-449f-4176-bb05-d8bde72ad65f/`
* `WEBDAV_LOGIN` as the form `LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL`
* `WEBDAV_PASSWORD` as the form `PPPPP-PPPPP-PPPPP-PPPPP-PPPPP`

#### `crond`
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


## File Changed so Far.
* `server/src/lib/api.ts` `saveAvatarClip()` which I don't think I should've change because it's probably not related to the recordings.
* `server/src/lib/bucket.ts` `getRandomClips()`
* `server/src/lib/clip.ts`
