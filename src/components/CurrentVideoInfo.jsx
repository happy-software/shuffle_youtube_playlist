import React from 'react';

function CurrentVideoInfo(props) {
  const titleOpts = {
    flex: 1
  }
  const anchorOpts = {
    paddingLeft: 3, 
    flex: 0
  }

  return(
    <div id="videoTitleDisplay" className='currentVideoTitle' >
      <div style={titleOpts}>{props.currentVideo.title}</div>
      <a style={anchorOpts} href={`https://youtube.com/watch?v=${props.currentVideo.video_id}`} target="_blank" rel="noopener noreferrer">
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
      {/*TODO: Create a collapsable section here for video description*/}
    </div>
  );
}

export default CurrentVideoInfo;