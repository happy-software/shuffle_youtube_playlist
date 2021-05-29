import React, { useState }  from 'react';

function CurrentVideoInfo(props) {
  const titleOpts = {
    flex: 1
  }
  const anchorOpts = {
    paddingLeft: 3, 
    flex: 0
  }

  const [videoInfoCollapsed, setVideoInfoCollapsed] = useState(true);

  return(
    <>
    <div id="videoTitleDisplay" className='currentVideoTitle contentRow' onClick={() => setVideoInfoCollapsed(!videoInfoCollapsed)}>
      <div style={titleOpts}>{props.currentVideo.title}</div>
      <a style={anchorOpts} href={`https://youtube.com/watch?v=${props.currentVideo.video_id}`} target="_blank" rel="noopener noreferrer">
        <img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img>
      </a>
    </div>

    <div className="contentRow">
      <div className={`${videoInfoCollapsed ? 'hide' : ''}`}>
        {props.currentVideo.description}
      </div>
    </div>
    </>
  );
}

export default CurrentVideoInfo;