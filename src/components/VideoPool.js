import React from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

function VideoPool(props) {
  return (
    <div className={props.className}>
      <div 
        className={`${props.className}Title`} 
        onClick={() => props.setCollapsed(!props.collapsed)}
      ><b>{props.title} (Expand/Collapse)</b></div>

      <div className={`${props.className}List ${props.collapsed?'hide':''}`}>
        {props.videos.map((video, index) =>
          <VideoTitleDisplay 
            key={index}
            index={index}
            selected={video.video_id === props.currentVideoIndex}
            videoId={video.video_id} 
            title={video.title}
            onVideoClicked={(videoId) => props.onVideoClicked(videoId)}
            className={`${props.className}Item`} 
          />
        )}
      </div>
    </div>
  );
}

export default VideoPool;