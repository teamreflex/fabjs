# Fab API

TypeScript bindings for the internal Fab API.

## Install
```bash
$ npm i fabjs
```

## Usage
```ts
const client = new Fab({
  userId: 970613,
  accessToken: 'accessToken',
  userAgent: 'fab|android|playstore|1.3.2|10|Android SDK built for x86|google|en|US',
});

const artist = client.fetchArtist(8)
const messages = artist.fetchMessages()
const latest = messages[0].payForMessage()
const comments = latest.fetchComments()
```

You can optionally use `email` and `password` properties to login.

The user agent is required as the API checks for a valid version number.

## Caveats
Will not be including:
- Sending comments
- Sending fanletters
- Decryption of image/video/audio files