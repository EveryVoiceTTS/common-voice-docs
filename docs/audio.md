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
* [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
* [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder)
* [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
* [AudioContext::AudioContext()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext)


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


## Payload Type

Capturing traffic between the browser and the server using the build-in developer tools in Brave, we can see that the payload sent to `http://localhost:9000/api/v1/git/clips` contains the string `OPUS` which suggests that the audio format used during transfer is OPUS.
```
Eß£BB÷BòBóBwebmBBSgÿÿÿÿÿÿÿI©f*×±B@MChromeWAChromeT®k¿®½×sÅÝ¡"¸0¡A_OPUSc¢OpusHead»áµG;bd C¶uÿÿÿÿÿÿÿç£A0{8_äÁ6øE]êQ%Õ³ÝDúEÁzC\Ù¯p'@¤_ÈØÐÌR:®kv03ï<¸yÐKMåÛwÝ ÙjÓe/`ÿò5PªR0ÀøxùÝ×A?_^æ5!*ÓDÜc0Á@Ð§_íã÷Ü\#,v³:Xèår6×võ:­Xn
```



# Getting 96kHZ@24 bits

From what I understand, the sample rate is specified when creating the `AudioContext`.
But the bit depth is specified when creating the `MediaRecorder`.
Both are handled in the AudioWeb under `web/src/components/pages/contribution/speak/audio-web.ts`.
Another required change is to make sure the browser's audio buffer is in raw mode.
Under `web/src/utility.ts`::`getAudioFormat()`, we determine the audio buffer internal encoding to be `audio/ogg; codecs=opus` by default.
Let's change the default to be `audio/wav`.

```diff
diff --git a/web/src/components/pages/contribution/speak/audio-web.ts b/web/src/components/pages/contribution/speak/audio-web.ts
index 7a6a5cd4b..8931abcf3 100644
--- a/web/src/components/pages/contribution/speak/audio-web.ts
+++ b/web/src/components/pages/contribution/speak/audio-web.ts
@@ -112,7 +116,7 @@ export default class AudioWeb {
    * the page is reloaded if the user decides to do so.
    *
    */
-  async init() {
+  async init(sampleRate: number=96000) {
     if (this.isReady()) {
       return;
     }
@@ -121,7 +125,7 @@ export default class AudioWeb {

     this.microphone = microphone;
     const audioContext = new (window.AudioContext ||
-      window.webkitAudioContext)();
+      window.webkitAudioContext)({sampleRate: sampleRate});
     const sourceNode = audioContext.createMediaStreamSource(microphone);
     const volumeNode = audioContext.createGain();
     const analyzerNode = audioContext.createAnalyser();
@@ -139,7 +143,12 @@ export default class AudioWeb {
     analyzerNode.connect(outputNode);

     // and set up the recorder.
-    this.recorder = new window.MediaRecorder(outputNode.stream);
+    this.recorder = new window.MediaRecorder(
+      outputNode.stream,
+      {
+        mimeType: "audio/webm;codecs=PCM",
+      },
+    );

     // Set up the analyzer node, and allocate an array for its data
     // FFT size 64 gives us 32 bins. But those bins hold frequencies up to
diff --git a/web/src/utility.ts b/web/src/utility.ts
index a8e0cfd5c..dccc8480a 100644
--- a/web/src/utility.ts
+++ b/web/src/utility.ts
@@ -90,7 +90,8 @@ export function getManageSubscriptionURL(account: UserClient) {
 }

 export const getAudioFormat = (() => {
-  const preferredFormat = 'audio/ogg; codecs=opus';
+  //const preferredFormat = 'audio/ogg; codecs=opus';
+  const preferredFormat = "audio/wav";
   const audio = document.createElement('audio');
   const format = audio.canPlayType(preferredFormat)
     ? preferredFormat
```

## Payload
The client now sends a playload that seems to be PCM.
```
I©f*×±sÅ6Å4I©f*×±

~A_PCM/FLOAT/IEEEáµG»bd C¶uÿÿÿÿÿÿÿç£O£ODâ2^V@1I @°²Lá:2
```



# Investigation Notes
Where is the default audio format hardcoded.

`~/git/Common-Voice/web/src/utility.ts`
```
export const getAudioFormat = (() => {
  const preferredFormat = 'audio/ogg; codecs=opus';
  const audio = document.createElement('audio');
  const format = audio.canPlayType(preferredFormat)
    ? preferredFormat
    : 'audio/wav';
  return function getAudioFormat() {
    return format;
  };
})();
```


This is where we create the audio blob which is encoded according to `getAudioFormat()`.

`~/git/Common-Voice/web/src/components/pages/contribution/speak/audio-web.ts`
```
  stop(): Promise<AudioInfo> {
      if (!this.isReady()) {
        console.error('Cannot stop audio before microphone is ready.');
        return Promise.reject();
      }

      return new Promise((res: Function, rej: Function) => {
        this.jsNode.onaudioprocess = undefined;
        this.recorder.removeEventListener('stop', this.recorderListeners.stop);
        this.recorderListeners.stop = (e: Event) => {
          let blob = new Blob(this.chunks, { type: getAudioFormat() });
          res({
            url: URL.createObjectURL(blob),
            blob: blob,
          });
        };
        this.recorder.addEventListener('stop', this.recorderListeners.stop);
        this.recorder.stop();
      });
    }
```


I think we are better off not asking for a specific sample rate when Transcoding because we might try to upscale the sample rate.

`server/src/lib/clip.ts`
```
      const audioOutput = new Transcoder(audioInput)
        .audioCodec(config.TRANSCODE.AUDIO_CODEC)
        .format(config.TRANSCODE.FORMAT)
        .channels(1)
        .sampleRate(config.TRANSCODE.SAMPLE_RATE)
        //.sampleRate(config.TRANSCODE.SAMPLE_RATE)
        .on('error', (error: string) => {
          this.clipSaveError(
            headers,
```



# Supported Codecs in Browser
[Audio Formats](https://github.com/ai/audio-recorder-polyfill)

Chrome records natively only to .webm files. Firefox to .ogg.

[manually encoding to wav](https://github.com/awslabs/aws-lex-browser-audio-capture/blob/master/lib/worker.js)


## Script that Lists Supported Codecs
```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>createMediaStreamDestination() demo</title>
  </head>
  <body>
    <h1>createMediaStreamDestination() demo</h1>

    <p>Encoding a pure sine wave to an Opus file</p>
    <button>Make sine wave</button>
    <audio controls></audio>
    <div id="codecs"></div>

    <script>
       //const mimeType = "audio/ogg; codecs=opus";
       const mimeType = "audio/wav";
       //const mimeType = "audio/pcm;rate=96000";
       //const mimeType = "audio/x-ogg-pcm";
       //const mimeType = "audio/x-ogg-flac";
       //const mimeType = "audio/webm;codecs=PCM";

      const b = document.querySelector("button");
      let clicked = false;
      const chunks = [];
      const ac = new AudioContext({sampleRate: 96000});
      const osc = ac.createOscillator();
      const dest = ac.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(
         dest.stream,
         {
            mimeType: "audio/webm;codecs=PCM",
         },
      );
      osc.connect(dest);

      b.addEventListener("click", (e) => {
        if (!clicked) {
          mediaRecorder.start();
          osc.start(0);
          e.target.textContent = "Stop recording";
          clicked = true;
        } else {
          mediaRecorder.stop();
          osc.stop(0);
          e.target.disabled = true;
        }
      });

      mediaRecorder.ondataavailable = (evt) => {
        // Push each chunk (blobs) in an array
        console.log(evt.data.type);
        chunks.push(evt.data);
      };

      mediaRecorder.onstop = (evt) => {
         // https://www.digipres.org/formats/mime-types/
        // Make blob out of our blobs, and open it.
        const blob = new Blob(chunks, { type: mimeType});
        document.querySelector("audio").src = URL.createObjectURL(blob);
      };
    </script>


    <script>
      // https://stackoverflow.com/questions/41739837/all-mime-types-supported-by-mediarecorder-in-firefox-and-chrome/42307926#42307926
      function getSupportedMimeTypes(media, types, codecs) {
        const isSupported = MediaRecorder.isTypeSupported;
        const supported = [];
        types.forEach((type) => {
          const mimeType = `${media}/${type}`;
          codecs.forEach((codec) => [
            `${mimeType};codecs=${codec}`,
            `${mimeType};codecs=${codec.toUpperCase()}`,
            // /!\ false positive /!\
            // `${mimeType};codecs:${codec}`,
            // `${mimeType};codecs:${codec.toUpperCase()}` 
          ].forEach(variation => {
            if(isSupported(variation)) 
              supported.push(variation);
          }));
          if (isSupported(mimeType))
            supported.push(mimeType);
        });
        return supported;
      };

      function displayCodecs(codecs, type) {
        const el = document.getElementById("codecs");

        let node = document.createElement("div");
        el.appendChild(node);

        title = document.createElement("H1");
        title.innerText = type;
        node.appendChild(title);

        codecs.forEach((codec, id) => {
          const p = document.createElement("p");
          p.innerText = codec;
          if (id === 0) {
            p.setAttribute("style", "color:red");
          }
          node.appendChild(p);
        });
      }

      // Usage ------------------

      const videoTypes = ["webm", "ogg", "mp4", "x-matroska"];
      const audioTypes = ["webm", "ogg", "mp3", "x-matroska"];
      const codecs = ["should-not-be-supported","vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];

      const supportedVideos = getSupportedMimeTypes("video", videoTypes, codecs);
      const supportedAudios = getSupportedMimeTypes("audio", audioTypes, codecs);

      displayCodecs(supportedAudios, "Audio");
      displayCodecs(supportedVideos, "Video");
    </script>
  </body>
</html>
```

## Brave
### Audio
* audio/webm;codecs=opus
* audio/webm;codecs=OPUS
* audio/webm;codecs=pcm
* audio/webm;codecs=PCM
* audio/webm

## Video
* video/webm;codecs=vp9
* video/webm;codecs=VP9
* video/webm;codecs=vp9.0
* video/webm;codecs=VP9.0
* video/webm;codecs=vp8
* video/webm;codecs=VP8
* video/webm;codecs=vp8.0
* video/webm;codecs=VP8.0
* video/webm;codecs=avc1
* video/webm;codecs=AVC1
* video/webm;codecs=h264
* video/webm;codecs=H264
* video/webm;codecs=opus
* video/webm;codecs=OPUS
* video/webm;codecs=pcm
* video/webm;codecs=PCM
* video/webm
* video/x-matroska;codecs=vp9
* video/x-matroska;codecs=VP9
* video/x-matroska;codecs=vp9.0
* video/x-matroska;codecs=VP9.0
* video/x-matroska;codecs=vp8
* video/x-matroska;codecs=VP8
* video/x-matroska;codecs=vp8.0
* video/x-matroska;codecs=VP8.0
* video/x-matroska;codecs=avc1
* video/x-matroska;codecs=AVC1
* video/x-matroska;codecs=h264
* video/x-matroska;codecs=H264
* video/x-matroska;codecs=opus
* video/x-matroska;codecs=OPUS
* video/x-matroska;codecs=pcm
* video/x-matroska;codecs=PCM
* video/x-matroska


## Firefox
### Audio
* audio/webm;codecs=opus
* audio/webm
* audio/ogg;codecs=opus
* audio/ogg

### Video
* video/webm;codecs=vp8
* video/webm;codecs=vp8.0
* video/webm;codecs=opus
* video/webm


# Audio File without Duration
Marc has noticed that our audio files don't have a valid header.
The `duration` is hardcoded for all audio files regardless of its duration to `Duration       : 06:12:49.62 = 2147483647 samples ~ 1.67772e+06 CDDA sectors`.

```
Input File     : '5061f5c3-3bf9-42c6-a268-435c146efaf6/feca9ee51da4347a10d293ca0c4afb1a5fc43120e16d568d987e5839adee4e9f.wav'
Channels       : 1
Sample Rate    : 96000
Precision      : 16-bit
Duration       : 06:12:49.62 = 2147483647 samples ~ 1.67772e+06 CDDA sectors
File Size      : 1.07M
Bit Rate       : 384
Sample Encoding: 16-bit Signed Integer PCM
```

Note that we've changed how the web client records audio because we wanted higher sample rate and lossless audio.
The web client send and then the server code uses [stream-transcoder.js](https://www.npmjs.com/package/stream-transcoder#new-transcoderfile) which is a wrapper on top of `ffmpeg` to unwrap the raw audio to a WAV file.

Someone on stackoverflow asked: [FFmpeg converting from video to audio missing duration](https://stackoverflow.com/questions/27390502/ffmpeg-converting-from-video-to-audio-missing-duration) which seems related to our current issue and the answer points to it been a problem with streamed files and `ffmpeg`.

[WAV File Format](https://docs.fileformat.com/audio/wav/)

We are going to see if we can write the audio stream to a temporary file and have that file converted to raw audio to see if the duration field in the header gets properly populated.
