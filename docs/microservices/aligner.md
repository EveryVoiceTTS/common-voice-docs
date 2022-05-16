# Aligner

* [Montreal Forced Aligner](https://montreal-forced-aligner.readthedocs.io/en/latest/first_steps/index.html)
* [Montreal Forced Aligner - Github](https://github.com/MontrealCorpusTools/Montreal-Forced-Aligner)
* [Acoustic models](https://mfa-models.readthedocs.io/en/latest/acoustic/index.html)
* [Pronunciation dictionaries](https://mfa-models.readthedocs.io/en/latest/dictionary/index.html)


## G2P Model
Output information about the G2P model.
```bash
mfa \
  model \
  inspect \
  acoustic \
  french_qc
```

```
- Acoustic model: french_qc
  - Version: 1.0.0
  - Architecture: gmm-hmm
  - Phone type: triphone
  - Features:
    - Feature type: mfcc
    - Frame shift: 10
    - Performs speaker adaptation: False
    - Performs LDA on features: False

  - Phones: @, E, N, O, R, S, Z, ^,
            a, b, cinq, d, deux, e, f, g,
            huit, i, j, k, l, m, n, neuf,
            o, p, s, t, to, u, un, v,
            w, y, and z
  - Configuration options:
    - Multilingual IPA: False
```


## Validate
```bash
mfa \
  validate \
    ~/mfa_data/my_corpus \
    french_ipa \
    french_qc \
    ~/mfa_data/my_corpus_aligned
```


## Align
```bash
mfa \
  align \
    ~/mfa_data/my_corpus \
    french_ipa \
    french_qc \
    ~/mfa_data/my_corpus_aligned
```

```bash
docker container run --rm -it --volume $PWD/Librispeech:/Librispeech common-voice_mfa mfa validate /Librispeech/19  /Librispeech/librispeech-lexicon.txt french_qc /Librispeech/test
```
