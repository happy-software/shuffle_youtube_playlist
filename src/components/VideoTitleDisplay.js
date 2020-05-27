import React from 'react';

function VideoTitleDisplay(props) {
  function onClick(){
    if (typeof props.onVideoClicked == 'function') {
      props.onVideoClicked(props.videoId);
     } else {
      console.log('😎');
    }
  }

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
      onClick={() => onClick()}
      className={`${props.className}${props.selected?' selected':''}`}
    >
      <div style={titleOpts}>{props.title}</div>
      <a style={anchorOpts} href={`https://youtube.com/watch?v=${props.videoId}`}>
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
    </div>
  );
}

export default VideoTitleDisplay;