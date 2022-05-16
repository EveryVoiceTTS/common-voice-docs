# Denoiser

```bash
docker \
  container \
    run \
      --rm \
      -it \
      --volume $PWD/mfa/Librispeech:/libri:ro \
      --volume $PWD/denoiser/test:/output \
      common-voice_denoiser \
      rnnoise \
        /libri/19/19-198-0023.wav \
        /output/19-198-0023.wav
```
