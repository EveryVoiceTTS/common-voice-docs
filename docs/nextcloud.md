# NextCloud
[WEBDAV WITH CURL](https://code.blogs.iiidefix.net/posts/webdav-with-curl/)

[list files/folders in owncloud with php curl](https://stackoverflow.com/a/26676902)
```
curl -X PROPFIND -u user:password "http://yourserver.com/owncloud/remote.php/webdav/"
```
* PROPFIND = get the list of files/folders
* MKCOL = create folder
* DELETE = delete file/folder
* MOVE = move or rename a file or folder
* PUT = upload file
* GET = download file

webdav.list_files
```
<?xml version="1.0"?>
<a:propfind xmlns:a="DAV:">
<a:prop><a:resourcetype/></a:prop>
</a:propfind>
```

Note that the order of the following command is crutial, or so it seems.
```bash
curl \
  -u LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL:PPPPP-PPPPP-PPPPP-PPPPP-PPPPP \
  -i \
  -X PROPFIND \
  https://nextcloud.nrc-cnrc.gc.ca/remote.php/dav/files/LLLLLLLL-LLLL-LLLL-LLLL-LLLLLLLLLLLL/CommonVoice/ \
  --upload-file - \
  -H "Depth: 1" \
  < webdav.list_files
```

## NextCloud@NRC
https://nextcloud.nrc-cnrc.gc.ca
It uses your MS Teams password.
If your are looking for a guide: [NextCloud NRC User Guide Advance](https://nextcloud.nrc-cnrc.gc.ca/f/42866)
