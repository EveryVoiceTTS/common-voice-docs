# `s3fs-fuse`
[`s3fs`](https://github.com/s3fs-fuse/s3fs-fuse) allows Linux, macOS, and FreeBSD to mount an S3 bucket via FUSE.
`s3fs` preserves the native object format for files, allowing use of other tools like [AWS CLI](https://github.com/aws/aws-cli).


Installing `s3fs` inside an EC2 instance.
```bash
sudo apt install s3fs
```

Mounting a bucket inside an EC2 instance.
```bash
mkdir -p ~/mount
s3fs smallteamtest ~/mount
```
