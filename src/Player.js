import React from 'react';
import ReactPlayer from 'react-player';

function Player(props) {
  function onReady(event) {
    // no-op
  }

  function onError(event) {
    console.log(`BROKEN VIDEO: https://www.youtube.com/watch?v=${props.videoId}`)
    props.onEnd()
  }

  return(<ReactPlayer
    url={`https://www.youtube.com/watch?v=${props.videoId}`}
    controls={true}
    onReady={(event) => onReady(event)}
    onEnded={() => props.onEnd()}
    onError={() => onError()}
    playing={true}
    width={"100%"}
    height={"800px"}
    config={{
      attributes: {},
      tracks: [],
      playerVars: {},
      embedOptions: {
        host: "https://www.youtube-nocookie.com",
      }
    }}
  />);
}

export default Player;