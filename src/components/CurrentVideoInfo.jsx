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
    <>
    <div id="videoTitleDisplay" className='currentVideoTitle contentRow' onClick={() => props.setCollapseDescription(!props.collapseDescription)}>
      <div style={titleOpts}>{props.currentVideo.title}</div>
      <a style={anchorOpts} href={`https://youtube.com/watch?v=${props.currentVideo.video_id}`} target="_blank" rel="noopener noreferrer">
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
    </div>

    <div className="contentRow">
      <div className={`${props.collapseDescription ? 'hide' : ''}`}>
        {props.currentVideo.description}
      </div>
    </div>
    </>
  );
}

export default CurrentVideoInfo;