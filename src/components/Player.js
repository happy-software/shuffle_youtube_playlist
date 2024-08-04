import React from 'react';
import ReactPlayer from 'react-player';

function Player(props) {
  const YOUTUBE_PLAYLIST_VIDEO_LIMIT = 200;
  function onError() {
    var internalPlayer = props.playerRef.current?.getInternalPlayer();
    var videoUrl = internalPlayer.getVideoUrl()
    if (!videoUrl) return;
    console.log(`BROKEN VIDEO: ${getVideoId(videoUrl)}`);
    internalPlayer.nextVideo();
  }

  function getVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  }

  return (
    <div className='playerWrapper' style={{ display: props.hideVideo ? 'none' : 'block' }}>
      <ReactPlayer
        className='player'
        ref={props.playerRef}
        url={props.videos.slice(0, YOUTUBE_PLAYLIST_VIDEO_LIMIT).map(v => `https://www.youtube.com/watch?v=${v.video_id}`)}
        controls={true}
        loop={props.repeatVideo}
        playing={true}
        width={"100%"}
        height={"800px"}
        onError={onError}
        config={{
          youtube: {
            playerVars: {},
            embedOptions: {
              host: "https://www.youtube-nocookie.com",
            }
          },
          attributes: {},
          tracks: [],
        }}
      />
    </div>
  );
}

export default Player;