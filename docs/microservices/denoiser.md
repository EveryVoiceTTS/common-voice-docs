# Denoiser

## RNNoise
* [xiph / rnnoise - GitHub](https://github.com/xiph/rnnoise): Recurrent neural network for audio noise reduction.
* [rnnoise-nodejs - GitHub](https://github.com/cedrickchee/rnnoise-nodejs): Node.js bindings to Xiph's RNNoise denoising C library.
* [rnnoise_python - GitHub](https://github.com/Shb742/rnnoise_python): python wrapper for rnnoise library.
* [RNNoise Topics - GitHub](https://github.com/topics/rnnoise)
* [rnnoise-wasm - GitHub](https://github.com/shiguredo/rnnoise-wasm): SIMD-accelerated WebAssembly build of RNNoise

## Sox
* [sox - npm](https://www.npmjs.com/package/sox)
* [node-sox - GitHub](https://github.com/andrewrk/node-sox): (unmaintained) node.js interface to the sox audio utility.

* [Transcoding audio with AWS Lambda](https://blog.danillouz.dev/transcoding-audio-with-aws-lambda/)

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


[aws-lambda-cpp](https://github.com/awslabs/aws-lambda-cpp)
```bash
aws iam create-role --role-name lambda-demo --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name lambda-denoiser --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```
```bash
aws \
  lambda \
    create-function \
      --function-name denoiser-runtime \
      --zip-file fileb://runtime.zip \
      --handler function.handler \
      --runtime provided \
      --role arn:aws:iam::123456789012:role/lambda-role
```


```bash
zip runtime.zip bootstrap
aws lambda publish-layer-version --layer-name bash-runtime --zip-file fileb://runtime.zip
aws lambda update-function-configuration --function-name denoiser-runtime  --layers arn:aws:lambda:ca-central-1:194183794986:layer:bash-runtime:1
zip function.zip function.sh sox
aws lambda update-function-code --function-name denoiser-runtime --zip-file fileb://function.zip
```


From the Docker image, extract
```bash
mkdir tools
cd tools
docker container cp denoise:/usr/local/lib .
docker container cp denoise:/usr/local/bin/.libs/rnnoise_demo .
docker container cp sox:/usr/sox-14.4.2/bin/sox .
mv rnnoise_demo rnnoise
zip -r ../tools.zip .
```
```bash
aws lambda publish-layer-version --layer-name bash-denoise-tools --zip-file fileb://tools.zip
```

## Sox
```bash
mkdir tools
cd tools
mkdir lib bin
cd lib
docker container cp sox:/opt/lib/libsox.la .
docker container cp sox:/opt/lib/libsox.a .
docker container cp sox:/usr/lib64/libgsm.so.1.0.12 libgsm.so.1
cd ..
cd bin
docker container cp sox:/opt/bin/sox .
zip -r ../tools.zip .
```
```bash
aws lambda publish-layer-version --layer-name sox --zip-file fileb://tools.zip
```
