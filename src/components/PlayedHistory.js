import React, { useState }  from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

function PlayedHistory({ videos, onVideoClicked, isCollapsedDefault }) {
  const [collapsed, setCollapsed] = useState(isCollapsedDefault);
  const playedVideos = videos.slice().reverse();

  return (
    <div className={`videoPool`}>
      <div 
        className={`videoPoolTitle`} 
        onClick={() => setCollapsed(!collapsed)}
      >Video History (Expand/Collapse)</div>

      <div className={`videoPoolList ${collapsed ? 'hide' : ''}`}>
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
