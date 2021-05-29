import React from 'react';

function VideoTitleDisplay(props) {
  const titleOpts = {
    flex: 1
  }
  const anchorOpts = {
    paddingLeft: 3, 
    flex: 0
  }

  return (
    <div 
      id="videoTitleDisplay" 
      onClick={() => props.onVideoClicked(props.videoId)}
      className={`${props.className}`}
    >
      <div style={titleOpts}>{props.title}</div>
      <a 
        style={anchorOpts} 
        href={`https://youtube.com/watch?v=${props.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
    </div>
  );
}

export default VideoTitleDisplay;