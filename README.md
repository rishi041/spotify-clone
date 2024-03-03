# Spotify Clone React Web Client

Spotify Clone Web Client using [Spotify Web Rapid API](https://rapidapi.com/airaudoeduardo/api/spotify81)

This project was bulid with [create-vite](https://github.com/vitejs/vite).

## Features

- Play Preview of audio tracks.
- Control playback (pause, volume, shuffle, etc).
- Search tracks.

## Try it out

https://spotify-clone-rdg.netlify.app/

**Warning:** Spotify full song requires users to authenticate with a valid Spotify Premium subscription.

## How to Run locally

First you need a [Spotify Client ID](https://developer.spotify.com/dashboard/applications).

```bash
$ git clone https://github.com/rishi041/spotify-clone/blob/dev2/README.md
$ cd spotify-clone (folder_name)
$ npm install
```

You will have to define a '.env' file and set the following variables:

```
REACT_APP_CLIENT_ID="YOUR_CLIENT_ID"
REACT_APP_REDIRECT_ID=http://localhost:3000/
```

Now run:

```bash
$ npm run dev
```

and visit http://localhost:3000.

## Screenshots

![browse](images/browse.png?raw=true 'Playlist')
![playlist](images/playlist.png?raw=true 'Artist')
![artist](images/artist.png?raw=true 'Artist')
![devices](images/devices.png?raw=true 'Artist')

More in images folder.
