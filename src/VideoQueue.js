import React from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

class VideoQueue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        collapsed: true
    }
    this.toggleCollapsedState = this.toggleCollapsedState.bind(this)
  }

  toggleCollapsedState(){
      this.setState({
          collapsed: !this.state.collapsed
      })
  }

  render() {
    return (
      <div id="playlistSelector" style={this.props.style}>
        <div onClick={this.toggleCollapsedState}><b>Song Queue (click to Expand/Collapse)</b></div>
        {this.props.videos.map((video, index) =>
          <VideoTitleDisplay 
            key={index}
            fontSize={this.props.style.fontSize}
            collapsed={this.state.collapsed}
            selected={index === this.props.currentVideoIndex}
            videoId={video.video_id} 
            title={video.title}
          />
        )}
      </div>
    );
  }
}

export default VideoQueue;