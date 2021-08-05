import React, { useState }  from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

function PlayedHistory({ videos, onVideoClicked, isCollapsedDefault }) {
  const [videoPoolCollapsed, setVideoPoolCollapsed] = useState(isCollapsedDefault);
  const playedVideos = videos.slice().reverse();

  return (
    <div className={`videoPool`}>
      <div 
        className={`videoPoolTitle`} 
        onClick={() => setVideoPoolCollapsed(!videoPoolCollapsed)}
      >Video History (Expand/Collapse)</div>

      <div className={`videoPoolList ${videoPoolCollapsed ?'hide' : ''}`}>
        {
        playedVideos.map((video, index) =>
          <VideoTitleDisplay 
            key={index}
            video={video}
            onVideoClicked={onVideoClicked}
            className='videoPoolItem'
          />
        )}
      </div>
    </div>
  );
}

export default PlayedHistory;
