# Languages
Can we limit the available languages?
`locales/all.json` controls the available languages in the UI's drop down box.
It looks like the UI's language and the utterances' language are the same meaning that if you select English, you get the UI in English and you also get the utterances in English.

## Default Language/Locale
To change the default locale, we need to change `export const DEFAULT_LOCALE = 'mok';` in `web/src/services/localization.ts`.
Note that the choice of `DEFAULT_LOCALE` must be in the list `locales/all.json`.

## How to Add a New Language
Since we haven't found a wait to have the UI in one language and the utterances in another language, we've decided to add a new language code for the utterances and copy the localizations of English to that new language.
Note that you need to chose a valid iso code or else Common-Voice will not accept it.
You can find ISO-639-3 code here:
* [List of ISO 639-3 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) then click the first letter of your code.
* [List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

Let's see how to add `str` to Common-Voice:
* Visit https://github.com/EveryVoiceTTS/common-voice and make sure you are on branch `dev/ilt`;
* Add `str` to `locales/all.json` in order to get that new language to show up in the UI's top-right dropdown box;
* Add `str` to `locales/contributable.json`.  We weren't sure what `locales/contributable.json` is for so we also added `str` to it;
* In order to get the new language name to properly show up in the UI, add its full name to `locales/native-names.json`.  This looks like `"str": "SENĆOŦEN Origin Stories",`.;
* Again, we weren't sure what `locales/translated.json` is for and opted to add `str`;
* We want the UI to be in English even for `str`, you will have to use the English localizations for your new language.  We need to modify our template `web/locales/en/messages.ftl` to add our new language code with its description.
    * Open `web/locales/en/messages.ftl`,
    * Find the proper `##Languages` section and add `str = SENĆOŦEN`,
    * Create a directory, `web/locales/str/` and copy the two files `cross-locale.ftl` & `messages.ftl` from `web/locales/en/` to `web/locales/str/`,
   ```bash
   cp web/locales/en/* web/locales/str/
   ```
    * We also need to update `messages.ftl` for all other locales.  For this, copy the modified `web/locales/en/messages.ftl` to all other `web/locales/*/`.
* Commit your changes;
* Wait for the new image to deploy the development;
* Validate your changes on https://staging.everyvoice.ca which is the development server;
* If your changes are correct, update the `ilt` branch with `dev/ilt`;
* Wait for the new image to deploy to the production environment;
* Finally, validate your changes on the production server https://studio.everyvoice.ca.

To add your sentences, you need to add them to `https://github.com/EveryVoiceTTS/common-voice-corpora` under `data/<ISO-639-3 Language Code>/`.
Note that Your corpora file MUST end with `.txt`.


## Generating Utterances
We also have a crude Lorem Ipsum generator but this is only meant to be used for testing.
```bash
mkdir -p server/data.ilt/git
mkdir -p server/data.ilt/str

./generator.py > server/data.ilt/git/utterances.txt
./generator.py > server/data.ilt/str/utterances.txt
```
