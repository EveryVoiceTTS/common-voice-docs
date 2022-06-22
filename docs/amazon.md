# Amazon
[What Is Amazon Linux 2?](https://linuxhint.com/what_is_amazon_linux_2/)

## EC2
### Docker
[How to Install Docker on Ubuntu 22.04](https://www.cloudbooklet.com/how-to-install-docker-on-ubuntu-22-04/)

```bash
sudo apt update
sudo apt upgrade
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt-cache policy docker-ce
sudo apt install docker-ce
sudo systemctl status docker
sudo usermod -aG docker ubuntu
```

### AWS CLI
[Installing or updating the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
```bash
sudo apt install unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

#### Config
[Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
`~/.aws/credentials`
```
[default]
aws_access_key_id=AKIAIOSFODNN7EXAMPLE
aws_secret_access_key=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

`~/.aws/config`
```
[default]
region=ca-central-1
output=json
```

#### Misc Commands
```bash
aws s3 ls
```

## Running a Docker Image on EC2
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html



## Amazon Elastic Transcoder
Using Amazon Elastic Transcoder is more expansive than running our own lambda service.
[Amazon Elastic Transcoder](https://aws.amazon.com/elastictranscoder/)
[Transcoding audio with AWS Lambda](https://blog.danillouz.dev/transcoding-audio-with-aws-lambda/)
[SoX - Sound eXchange | HomePage](http://sox.sourceforge.net/)
[An audio conversion use case: comparison of execution speed between SoX, FFmpeg and MPlayer](https://www.stefaanlippens.net/audio_conversion_execution_speed_comparison_of_SoX_FFmpeg_MPlayer/#:~:text=For%2030%20second%20fragments%2C%20FFmpeg,to%20the%20desired%20fragment%20length.)


## Lambda
* [Tutorial – Publishing a custom runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html): In this tutorial, you create a Lambda function with a custom runtime. You start by including the runtime in the function's deployment package. Then you migrate it to a layer that you manage independently from the function. Finally, you share the runtime layer with the world by updating its resource-based permissions policy.



# ECR
* [Amazon ECR Public Gallery](https://gallery.ecr.aws/)
* [ECR Lambda Python](https://gallery.ecr.aws/lambda/python)
* [ECR Amazon Linux](https://gallery.ecr.aws/amazonlinux/amazonlinux)
* [ECR Lambda Provided](https://gallery.ecr.aws/lambda/provided)

[Creating a container image for use on Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html)
```bash
aws ecr create-repository --repository-name common-voice --region ca-central-1
```
```json
{
   "repository": {
      "repositoryArn": "arn:aws:ecr:ca-central-1:194183794986:repository/common-voice",
         "registryId": "194183794986",
         "repositoryName": "common-voice",
         "repositoryUri": "194183794986.dkr.ecr.ca-central-1.amazonaws.com/common-voice",
         "createdAt": "2022-05-24T16:40:41-04:00",
         "imageTagMutability": "MUTABLE",
         "imageScanningConfiguration": {
            "scanOnPush": false
         },
         "encryptionConfiguration": {
            "encryptionType": "AES256"
         }
   }
}
```


```bash
aws ecr get-login-password \
| docker login --username AWS --password-stdin 194183794986.dkr.ecr.ca-central-1.amazonaws.com/common-voice
```


```bash
docker tag common-voice_web:latest 194183794986.dkr.ecr.ca-central-1.amazonaws.com/common-voice
docker push 194183794986.dkr.ecr.ca-central-1.amazonaws.com/common-voice
```

[Deploy applications on Amazon ECS using Docker Compose](https://aws.amazon.com/blogs/containers/deploy-applications-on-amazon-ecs-using-docker-compose/)
[Deploying Docker containers on ECS](https://docs.docker.com/cloud/ecs-integration/)
[Docker compose CLI Install](https://github.com/docker/compose-cli/blob/main/INSTALL.md)


```bash
#docker context create ecs
#PATH=.:$PATH ./docker-linux-amd64 context create ecs common-voice
PATH=.:$PATH ./docker-linux-amd64 context create ecs ecs.common-voice
```
```bash
#PATH=.:$PATH ./docker-linux-amd64 context use common-voice
PATH=.:$PATH ./docker-linux-amd64 --context ecs.common-voice compose up
```
