import React from 'react';
import ReactPlayer from 'react-player';

function Player(props) {
  function onReady(event) {
    console.log("Player ready");
  }
  return(<ReactPlayer
    url={`https://www.youtube.com/watch?v=${props.videoId}`}
    controls={true}
    onReady={(event) => onReady(event)}
    onEnded={() => props.onEnd()}
    onError={() => props.onEnd()}
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