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
* Add `str` to `locales/all.json` in order to get that new language to show up in the UI's top-right dropdown box;
* Add `str` to `locales/contributable.json`.  We weren't sure what `locales/contributable.json` is for so we also added `str` to it;
* In order to get the new language name to properly show up in the UI, add its full name to `locales/native-names.json`.  This looks like `"str": "SENĆOŦEN Origin Stories",`;
* Again, we weren't sure what `locales/translated.json` is for and opted to add `str`;
* Under `server/data.ilt/`, create a directory, `str/` and populate it with some corpora file.  Your copora file MUST end with `.txt`;
* Finally, we want the UI to be in English even for `str`, you will have to use the English localizations for your new language.  Create a directory, `web/locales/str/` and copy the two files `cross-locale.ftl` & `messages.ftl` from `web/locales/en/` to `web/locales/str/`.
```bash
cp web/locales/en/* web/locales/str/
```

## Generating Utterances
We also have a crude Lorem Ipsum generator but this is only meant to be used for testing.
```bash
mkdir -p server/data.ilt/git
mkdir -p server/data.ilt/str

./generator.py > server/data.ilt/git/utterances.txt
./generator.py > server/data.ilt/str/utterances.txt
```
