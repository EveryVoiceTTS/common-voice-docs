# Changing the Audio Format
To change the audio codec, the format & the sample rate, you have to add the following lines to `.env-local-docker` which is located at the root of the repository.
```
CV_TRANSCODE_CODEC='pcm_s16le'
CV_TRANSCODE_FORMAT='wav'
CV_TRANSCODE_SAMPLE_RATE='44100'
```
or
```
CV_TRANSCODE_CODEC='pcm_s24le'
CV_TRANSCODE_FORMAT='wav'
CV_TRANSCODE_SAMPLE_RATE='96000'
```

## Available Lossless Audio Codecs
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


## Available Formats
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
