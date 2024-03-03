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

First you need to subscribe Spotify Rapid API [Spotify API](https://developer.spotify.com/dashboard/applications).

```bash
$ git clone https://github.com/rishi041/spotify-clone
$ cd spotify-clone (folder_name)
$ npm install
```

You will have to define a '.env' file and set the following variables:

```
VITE_X_RAPID_API_KEY='YOUR_SPOTIFY_X_RAPID_API_KEY'
VITE_X_RAPID_API_HOST='spotify81.p.rapidapi.com'
VITE_USER_ID='c58e5jvzwc47uaecx4zudqz25'

# VITE_USER_ID='31vdqxjygx2apwbjrzxyzv72n47u'
```

Now run:

```bash
$ npm run dev
```

and visit http://localhost:3000.

## Screenshots

![browse](Images/HomePage.PNG?raw=true 'HomePage')
![search](Images/SearchPage.PNG?raw=true 'search')
![playlist](Images/PlaylistPage.PNG?raw=true 'PlaylistPage')
![secondPlaylist](Images/PlaylistPage2.PNG?raw=true 'secondPlaylist')

More in images folder.
