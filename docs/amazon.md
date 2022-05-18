# Amazon

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
[Amazon Elastic Transcoder](https://aws.amazon.com/elastictranscoder/)
[Transcoding audio with AWS Lambda](https://blog.danillouz.dev/transcoding-audio-with-aws-lambda/)
[SoX - Sound eXchange | HomePage](http://sox.sourceforge.net/)
[An audio conversion use case: comparison of execution speed between SoX, FFmpeg and MPlayer](https://www.stefaanlippens.net/audio_conversion_execution_speed_comparison_of_SoX_FFmpeg_MPlayer/#:~:text=For%2030%20second%20fragments%2C%20FFmpeg,to%20the%20desired%20fragment%20length.)


## Lambda
* [Tutorial – Publishing a custom runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html): In this tutorial, you create a Lambda function with a custom runtime. You start by including the runtime in the function's deployment package. Then you migrate it to a layer that you manage independently from the function. Finally, you share the runtime layer with the world by updating its resource-based permissions policy.
