import React from 'react';

function VideoTitleDisplay({ video, onVideoClicked, className }) {
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
      onClick={() => onVideoClicked(video)}
      className={`${className}`}
    >
      <div style={titleOpts}>{video.title}</div>
      <a 
        style={anchorOpts} 
        href={`https://youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
    </div>
  );
}

export default VideoTitleDisplay;