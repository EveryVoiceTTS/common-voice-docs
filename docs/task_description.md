# Task's Description

Hey Samuel, I mentioned I would pass on the info about what we’re looking for.
My guess is you’d want to be more involved in the ML part of the project no?
This is really a web development project.

Here’s a description:
We’re looking for a developer to create an instance of Mozilla Common Voice (https://github.com/common-voice/common-voice) the stack is Docker, React, TypeScript, MySQL, S3.
Common Voice was set up to do crowd-source recording of audio, so there are some changes that would need to be made.
Namely:
- we need the data to be unavailable to the public
- we need registration to be limited
- we need minor style and markup changes (ie taking away the language around Mozilla and adding some markup around the project)
- Common Voice currently collects audio in a lossy format (mp3), we need to change this to lossless
  16bit, 48k sample rate, lossless wav files
- Perhaps add some server-side scripting to:
    - automate signal processing;
    - de-noising.  This is an example of a denoising tool we might use. https://github.com/xiph/rnnoise;
    - We might also want to automate forced alignment with MFA;
    - backup the sentence db `mysqldump -u root --password=PASSWORD voiceweb > voiceweb.sql`
    - backup audio files to nextcloud;
- Is it set up so that auth0 let’s us define a list of email address or something that are whitelisted for signing up?
    The recordings should also only be accessible to pre-defined sets of users.
    Do you have a sense of whether it will be easier to password protect the entire site or whether we could have tiers of access for particular recordings?

Let me know if you have any questions though!
