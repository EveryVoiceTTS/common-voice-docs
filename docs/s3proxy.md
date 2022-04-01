# S3proxy
What is stored in our S3 proxy.
This is similar to `ls`.
```bash
curl http://127.0.0.1:9001/common-voice-clips \
| xmllint --format -
```
```
<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>common-voice-clips</Name>
  <Prefix/>
  <MaxKeys>1000</MaxKeys>
  <Marker/>
  <IsTruncated>false</IsTruncated>
  <Contents>
    <Key>18f74bcf-210c-43e6-b443-78248399c0ce/</Key>
    <LastModified>2022-01-18T19:28:13Z</LastModified>
    <ETag>"d41d8cd98f00b204e9800998ecf8427e"</ETag>
    <Size>4096</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a</ID>
      <DisplayName>CustomersName@amazon.com</DisplayName>
    </Owner>
  </Contents>
  <Contents>
    <Key>18f74bcf-210c-43e6-b443-78248399c0ce/00003ee1748579223ce314d00265913ba19835024b6e536f0d425230da27a629.mp3</Key>
    <LastModified>2022-01-18T19:25:38Z</LastModified>
    <ETag>"31c67dbfbb001f63468af54c228b77b6"</ETag>
    <Size>35901</Size>
    <StorageClass>STANDARD</StorageClass>
    <Owner>
      <ID>75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a</ID>
      <DisplayName>CustomersName@amazon.com</DisplayName>
    </Owner>
  </Contents>
</ListBucketResult>
```


Retrieve a file and check what file type it is.
```bash
curl http://127.0.0.1:9001/common-voice-clips/18f74bcf-210c-43e6-b443-78248399c0ce/00003ee1748579223ce314d00265913ba19835024b6e536f0d425230da27a629.mp3 \
| file -
```
```
/dev/stdin: Audio file with ID3 version 2.4.0, contains:MPEG ADTS, layer III, v1, 48 kbps, 32 kHz, Monaural
```
