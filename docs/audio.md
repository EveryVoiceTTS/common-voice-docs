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



# Audio Recording in the Browser
What audio format/bit/sample rate is recorded by the browser?


## Default Sample Rate?
https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext

`sampleRate` Optional

Indicates the sample rate to use for the new context.
The value must be a floating-point value indicating the sample rate, in samples per second, for which to configure the new context; additionally, the value must be one which is supported by AudioBuffer.sampleRate.
The value will typically be between 8,000 Hz and 96,000 Hz; the default will vary depending on the output device, but the sample rate 44,100 Hz is the most common.
**If the sampleRate property is not included in the options, or the options are not specified when creating the audio context, the new context's output device's preferred sample rate is used by default.**


## Common Voice's AudioWeb Class
Common-Voice web UI has a AudioWeb object:
web/src/components/pages/contribution/speak/audio-web.ts


## Resources
[MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
[MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder)
[AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
[AudioContext::AudioContext()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext)


## How Common Voice Sets up the Audio Analyzer
`web/src/components/pages/contribution/speak/audio-web.ts`

`AudioWeb::init()`

```ts
// Set up the analyzer node, and allocate an array for its data
// FFT size 64 gives us 32 bins. But those bins hold frequencies up to
// 22kHz or more, and we only care about lower frequencies which is where
// most human voice lies, so we use fewer bins.
analyzerNode.fftSize = 128;
analyzerNode.smoothingTimeConstant = 0.96;
this.frequencyBins = new Uint8Array(analyzerNode.frequencyBinCount);
```


## Figuring out the Hacky Way
```diff
diff --git a/web/src/components/pages/contribution/speak/speak.tsx b/web/src/components/pages/contribution/speak/speak.tsx
index 4d023c1cf..3a9357bcc 100755
--- a/web/src/components/pages/contribution/speak/speak.tsx
+++ b/web/src/components/pages/contribution/speak/speak.tsx
@@ -360,6 +360,7 @@ class SpeakPage extends React.Component<Props, State> {

   private startRecording = async () => {
     try {
+      console.log(`startRecording: ${JSON.stringify(this.audio)}`);
       await this.audio.start();
       this.maxVolume = -1; // Initialize to -1 in case updateVolume is never called.
       this.recordingStartTime = Date.now();
```

Start recording an utterance then look into your browser's log console.
```
AudioContext {baseLatency: 0.01, outputLatency: 0, destination: AudioDestinationNode, currentTime: 0, sampleRate: 48000, …}
audioWorklet: AudioWorklet {}
baseLatency: 0.01
currentTime: 6.84
destination: AudioDestinationNode
channelCount: 2
channelCountMode: "explicit"
channelInterpretation: "speakers"
context: AudioContext
audioWorklet: AudioWorklet {}
baseLatency: 0.01
currentTime: 82.06933333333333
destination: AudioDestinationNode {maxChannelCount: 2, context: AudioContext, numberOfInputs: 1, numberOfOutputs: 0, channelCount: 2, …}
listener: AudioListener {positionX: AudioParam, positionY: AudioParam, positionZ: AudioParam, forwardX: AudioParam, forwardY: AudioParam, …}
onstatechange: null
outputLatency: 0.053
sampleRate: 48000
state: "running"
[[Prototype]]: AudioContext
maxChannelCount: 2
numberOfInputs: 1
numberOfOutputs: 0
[[Prototype]]: AudioDestinationNode
listener: AudioListener
forwardX: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
forwardY: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
forwardZ: AudioParam {value: -1, automationRate: 'a-rate', defaultValue: -1, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
positionX: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
positionY: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
positionZ: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
upX: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
upY: AudioParam {value: 1, automationRate: 'a-rate', defaultValue: 1, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
upZ: AudioParam {value: 0, automationRate: 'a-rate', defaultValue: 0, minValue: -3.4028234663852886e+38, maxValue: 3.4028234663852886e+38}
[[Prototype]]: AudioListener
onstatechange: null
outputLatency: 0.053
sampleRate: 48000
state: "running"
[[Prototype]]: AudioContext
```
