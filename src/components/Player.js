import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function Player(props) {
  const [isPlaying, setIsPlaying] = useState(false);

  function onReady() {
    setIsPlaying(true);
  }

  function onError() {
    console.log(`BROKEN VIDEO: ${JSON.stringify(props.videoId, null, 2)}`)
    props.onEnd()
  }

  return(
    <div style={{display: props.hideVideo ? 'none' : 'block'}}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${props.videoId}`}
        controls={true}
        loop={props.repeatVideo}
        onReady={(event) => onReady(event)}
        onEnded={() => props.onEnd()}
        onError={() => onError()}
        playing={isPlaying}
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