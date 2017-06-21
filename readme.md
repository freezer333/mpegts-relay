# Simple MPEG-TS Relay
This script accepts MPEG-TS data over TCP and rebroadcasts it to any subscribed TCP sockets.  

This is useful for turning a single RTSP stream (from a camera) into multiple MPEG-TS streams that can be consumed
by any number of applications (live viewing, recording, analytics, etc.).

The script accepts incoming MPEG-TS on port 5000, and allows subscribers to connect to it on port 6000.

## Testing

Start the relay script

```
node index.js
```

There are no dependencies for the relay script other than Node.js to be installed and on your path.

Launch an FFMPEG script to pull from an RTSP source and push MPEG-TS to the relay script

```
ffmpeg -rtsp_transport tcp -i <RTSP SOURCE HERE> -r 30 -vcodec mpeg1video -filter:v scale=w=1280:h=720 -f mpegts tcp://localhost:5000
```

You can subscribe to the relay MPEG-TS by executing another FFMPEG.  For example, you can record to mp4 suitable for playback on the web.

```
ffmpeg -i tcp://localhost:6000 -y -r 30 -filter:v scale=w=960:h=540 recorded.mp4
```

You can launch as many of these FFMPEG recording scripts as you want, there is still only a single RTSP pull.

You can consume tcp://localhost:6000 from OpenCV as well.