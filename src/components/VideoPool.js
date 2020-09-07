import React, { useState }  from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

function VideoPool(props) {
  const [videoPoolCollapsed, setVideoPoolCollapsed] = useState(props.isCollapsedDefault);

  return (
    <div className={`videoPool`}>
      <div 
        className={`videoPoolTitle`} 
        onClick={() => setVideoPoolCollapsed(!videoPoolCollapsed)}
      >{props.title} (Expand/Collapse)</div>

      <div className={`videoPoolList ${videoPoolCollapsed ?'hide' : ''}`}>
        {
        props.videos.reverse().map((video) =>
          <VideoTitleDisplay 
            key={video.video_id}
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