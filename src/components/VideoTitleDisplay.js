import React from 'react'

export default function VideoTitleDisplay({ video, onVideoClicked, className }) {
  const titleOpts = {
    flex: 1
  }
  const anchorOpts = {
    paddingLeft: 3,
    flex: 0
  }

  return <div id="videoTitleDisplay" className={`${className}`}>
    <div onClick={() => onVideoClicked(video)} style={titleOpts}>{video.title}</div>
    <a style={anchorOpts} href={`https://youtube.com/watch?v=${video.video_id}`} target="_blank" rel="noopener noreferrer">
      <img alt='Go to Youtube' src={'/arrow-up-right.svg'} />
    </a>
  </div>
}