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


## Changing the Number of Contributions
To change the number or required contibution, we need to change `SET_COUNT` in `web/src/components/pages/contribution/contribution.tsx`.
We also need to change `shortcut-rerecord-toggle` for every `web/locales/*/messages.ftl`.


## Languages
Can we limit the available languages in the drop down menu?
`locales/all.json` controls the available languages in the UI's drop down box.
This has the side effect that we no longer can simply use `https://localhost:9000` because this would automatically redirect us to English which is no longer available.
To fix this, we need to change `DEFAULT_LOCALE` in `web/src/services/localization.ts b/web/src/services/localization.ts` to either `git` or `str`.
We chose to change it to `git`.


## Changing Font
We would like to use [BC Sans Typeface](https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/bc-visual-identity/bc-sans).
[More typography info](https://developer.gov.bc.ca/Design-System/Typography).
Download [FONT](https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/policies-procedures-standards/web-content-development-guides/corporate-identity-assets/visid-files/bc-sans-font-woff.zip?forcedownload=true).
Unzip to `web/font/`.
Change `web/src/components/index.css` and add
```patch
diff --git a/web/src/components/index.css b/web/src/components/index.css
index ccfa3a2a9..a425d4e16 100644
--- a/web/src/components/index.css
+++ b/web/src/components/index.css
@@ -42,6 +42,11 @@ html[lang='az'] {
     --base-font-family: 'Inter', sans-serif;
 }

+html[lang='git'],
+html[lang='str'] {
+    --base-font-family: 'BCSans', sans-serif;
+}
+
 html {
     font-family: var(--base-font-family);
     font-size: var(--font-size);
```
This changes the font to `BCSans` when the selected language is either `Gitksan` or `SENĆOŦEN`.


# Report
When recording utterances on the `speak` page, if someone clicks the report button, where can we find the report?
We've clicked the report button on the speak page and submitted a report of `difficult-to-pronounce`.
The report was recorded in mysql.

```
mysql> use voiceweb;
Database changed
mysql> select * from reported_sentences;
+----+--------------------------------------+------------------------------------------------------------------+---------------------+---------------------+
| id | client_id                            | sentence_id                                                      | reason              | created_at          |
+----+--------------------------------------+------------------------------------------------------------------+---------------------+---------------------+
|  1 | 8f7b3457-1a9f-4c9e-a44c-d33fadb3bb5c | 050848b77fdb38926067f69260010712d4758cd3f206967fb512d0b48bdf1223 | difficult-pronounce | 2022-06-22 22:44:39 |
+----+--------------------------------------+------------------------------------------------------------------+---------------------+---------------------+
1 row in set (0.00 sec)
```
