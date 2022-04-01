# Languages
Can we limit the available languages?
`locales/all.json` controls the available languages in the UI's drop down box.
It looks like the UI's language and the utterances' language are the same meaning that if you select English, you get the UI in English and you also get the utterances in English.

## How to Add a New Language
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

## Generating Utterances
```bash
mkdir -p server/data/git
mkdir -p server/data/str

./generator.py > server/data/git/utterances.txt
./generator.py > server/data/str/utterances.txt
```
