# Microsoft Azure
Can we use Microsoft Azure instead of AWS S3?
* [Access Azure Blob Storage from Your Apps using S3 Java API](https://devblogs.microsoft.com/cse/2016/05/22/access-azure-blob-storage-from-your-apps-using-s3-api/)
* [S3Proxy](https://github.com/gaul/s3proxy) S3Proxy implements the S3 API and proxies requests, enabling several use cases:
    * translation from S3 to Backblaze B2, EMC Atmos, Google Cloud, Microsoft Azure, and OpenStack Swift
    * testing without Amazon by using the local filesystem
    * extension via middlewares
    * embedding into Java applications
* [S3Proxy - Storage backend examples Azure Blob](https://github.com/gaul/s3proxy/wiki/Storage-backend-examples#azure-blob)

The common voice docker stack uses S3Proxy.
If we can configure S3Proxy to ingest the current S3 requests from the server and send them to Microsoft Azure, that would solve our connection problem.
It looks like the S3Proxy container is quite configurable with [environment variables](https://github.com/gaul/s3proxy/blob/master/Dockerfile).

Here's what the S3Proxy command looks like:
```bash
docker container exec -it s3proxy cat run-docker-container.sh
```
```
#!/bin/sh

exec java \
    -DLOG_LEVEL="${LOG_LEVEL}" \
    -Ds3proxy.endpoint="${S3PROXY_ENDPOINT}" \
    -Ds3proxy.virtual-host="${S3PROXY_VIRTUALHOST}" \
    -Ds3proxy.authorization="${S3PROXY_AUTHORIZATION}" \
    -Ds3proxy.identity="${S3PROXY_IDENTITY}" \
    -Ds3proxy.credential="${S3PROXY_CREDENTIAL}" \
    -Ds3proxy.cors-allow-all="${S3PROXY_CORS_ALLOW_ALL}" \
    -Ds3proxy.cors-allow-origins="${S3PROXY_CORS_ALLOW_ORIGINS}" \
    -Ds3proxy.cors-allow-methods="${S3PROXY_CORS_ALLOW_METHODS}" \
    -Ds3proxy.cors-allow-headers="${S3PROXY_CORS_ALLOW_HEADERS}" \
    -Ds3proxy.ignore-unknown-headers="${S3PROXY_IGNORE_UNKNOWN_HEADERS}" \
    -Djclouds.provider="${JCLOUDS_PROVIDER}" \
    -Djclouds.identity="${JCLOUDS_IDENTITY}" \
    -Djclouds.credential="${JCLOUDS_CREDENTIAL}" \
    -Djclouds.endpoint="${JCLOUDS_ENDPOINT}" \
    -Djclouds.region="${JCLOUDS_REGION}" \
    -Djclouds.regions="${JCLOUDS_REGIONS}" \
    -Djclouds.keystone.version="${JCLOUDS_KEYSTONE_VERSION}" \
    -Djclouds.keystone.scope="${JCLOUDS_KEYSTONE_SCOPE}" \
    -Djclouds.keystone.project-domain-name="${JCLOUDS_KEYSTONE_PROJECT_DOMAIN_NAME}" \
    -Djclouds.filesystem.basedir="/data" \
    -jar /opt/s3proxy/s3proxy \
    --properties /dev/null
```

If we start from [S3Proxy - Storage backend examples Azure Blob](https://github.com/gaul/s3proxy/wiki/Storage-backend-examples#azure-blob)
```
s3proxy.endpoint=http://127.0.0.1:8080
s3proxy.authorization=aws-v2-or-v4
s3proxy.identity=local-identity
s3proxy.credential=local-credential
jclouds.provider=azureblob
jclouds.identity=xxxxxxxxx
jclouds.credential=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

and the common voice's `docker-compose.yaml`, we can probably set it up to use Microsoft Azure.
```yaml
  s3proxy:
    environment:
      - S3PROXY_AUTHORIZATION=none
```

We need to set a minimum of environment variables.
```yaml
  s3proxy:
    environment:
      - S3PROXY_ENDPOINT=http://0.0.0.0:80
      - S3PROXY_AUTHORIZATION=aws-v2-or-v4
      - S3PROXY_IDENTITY=local-identity
      - S3PROXY_CREDENTIAL=local-credential
      - JCLOUDS_PROVIDER=azureblob
      - JCLOUDS_IDENTITY=xxxxxxxx
      - JCLOUDS_CREDENTIAL=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```
