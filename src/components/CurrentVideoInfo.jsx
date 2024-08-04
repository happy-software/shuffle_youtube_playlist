import React from 'react';
import { Textfit } from '@tomplum/react-textfit';

function CurrentVideoInfo(props) {
  var titleOpts = {
    flex: 1,
    height: "110px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  const anchorOpts = {
    paddingLeft: 3,
    paddingRight: 10,
    flex: 0
  }
  return (
    <>
      <div id="videoTitleDisplay" className='currentVideoTitle' onClick={() => props.setCollapseDescription(!props.collapseDescription)}>
        <Textfit style={titleOpts} mode="multi" max={44}>{props.currentVideo.title}</Textfit>
        <a style={anchorOpts} href={`https://youtube.com/watch?v=${props.currentVideo.video_id}`} target="_blank" rel="noopener noreferrer">
          <img alt='Go to Youtube Site' src={'/arrow-up-right.svg'}></img>
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