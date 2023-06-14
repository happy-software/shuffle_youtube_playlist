import React from 'react';
import ReactPlayer from 'react-player';

function Player(props) {
  function onReady(event) {
    // no-op
  }

  function onError(event) {
    console.log(`BROKEN VIDEO: ${JSON.stringify(props.videoId, null, 2)}`)
    props.onEnd()
  }

  return(
    <div className='playerWrapper' style={{display: props.hideVideo ? 'none' : 'block'}}>
      <ReactPlayer
        className='player'
        url={`https://www.youtube.com/watch?v=${props.videoId}`}
        controls={true}
        loop={props.repeatVideo}
        onReady={(event) => onReady(event)}
        onEnded={() => props.onEnd()}
        onError={() => onError()}
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