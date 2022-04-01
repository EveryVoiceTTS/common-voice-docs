# Notes

## Links
* [Common Voice - Github](https://github.com/common-voice/common-voice) Mozilla Common Voice, a platform for collecting speech donations in order to create public domain datasets for training voice recognition-related tools.
* [Matrix Chat](https://chat.mozilla.org/#/room/#common-voice:mozilla.org)
* [Discourse](https://discourse.mozilla.org/c/voice/239)
* [Auth0](https://auth0.com/)
* [stream-transcoder.js](https://www.npmjs.com/package/stream-transcoder) Flexible media transcoding using FFmpeg. Stream media in and out - converting it on the fly.


## Why `You're on the staging server.`
Originating from `web/src/components/layout/layout.tsx`
It uses `web/src/utility.ts:isProduction()` which simply check if the `window.location.origin === URLS.HTTP_ROOT` where `URLS.HTTP_ROOT` is `https://commonvoice.mozilla.org`.


## File Changed so Far.
* `server/src/lib/api.ts` `saveAvatarClip()` which I don't think I should've change because it's probably not related to the recordings.
* `server/src/lib/bucket.ts` `getRandomClips()`
* `server/src/lib/clip.ts`
