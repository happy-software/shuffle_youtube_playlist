import React from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

function VideoPool(props) {

  function toggleCollapsedState() {
    props.setCollapsed(!props.collapsed)
  }

  function videoClicked(videoId) {
    props.onVideoClicked(null, videoId);
  }

  return (
    <div className={props.className}>
      <div 
        className={`${props.className}Title`} 
        onClick={() => toggleCollapsedState()}
      ><b>{props.title} (Expand/Collapse)</b></div>

      <div className={`${props.className}List ${props.collapsed?'hide':''}`}>
        {props.videos.map((video, index) =>
          <VideoTitleDisplay 
            key={index}
            index={index}
            selected={video.video_id === props.currentVideoIndex}
            videoId={video.video_id} 
            title={video.title}
            videoClicked={() => videoClicked()}
            className={`${props.className}Item`} 
          />
        )}
      </div>
    </div>
  );
}

export default VideoPool;