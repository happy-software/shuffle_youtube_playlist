import React from 'react';
import ReactPlayer from 'react-player';

function Player(props) {
  return (
    <div className='playerWrapper' style={{ display: props.hideVideo ? 'none' : 'block' }}>
      <ReactPlayer
        className='player'
        ref={props.playerRef}
        url={props.videos.map(v => `https://www.youtube.com/watch?v=${v.video_id}`)}
        controls={true}
        loop={props.repeatVideo}
        playing={true}
        width={"100%"}
        height={"800px"}
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