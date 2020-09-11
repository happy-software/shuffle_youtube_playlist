import React, { useState }  from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

function VideoPool(props) {
  const [videoPoolCollapsed, setVideoPoolCollapsed] = useState(props.isCollapsedDefault);

  return (
    <div className={`videoPool`}>
      <div 
        className={`videoPoolTitle`} 
        onClick={() => setVideoPoolCollapsed(!videoPoolCollapsed)}
      >Video History (Expand/Collapse)</div>

      <div className={`videoPoolList ${videoPoolCollapsed ?'hide' : ''}`}>
        {
        props.videos.map((video, index) =>
          <VideoTitleDisplay 
            key={index}
            videoId={video.video_id} 
            title={video.title}
            onVideoClicked={(videoId) => props.onVideoClicked(videoId)}
            className={`videoPoolItem`} 
          />
        )}
      </div>
    </div>
  );
}

export default VideoPool;