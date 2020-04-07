import React from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

class VideoPool extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: true
    }
    this.toggleCollapsedState = this.toggleCollapsedState.bind(this)
    this.videoClicked = this.videoClicked.bind(this)
  }

  toggleCollapsedState(){
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  videoClicked(videoId){
    this.props.onVideoClicked(null, videoId);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div 
          className={`${this.props.className}Title`} 
          onClick={this.toggleCollapsedState}
        ><b>{this.props.title} (Expand/Collapse)</b></div>

        <div className={`${this.props.className}List ${this.state.collapsed?'hide':''}`}>
          {this.props.videos.map((video, index) =>
            <VideoTitleDisplay 
              key={index}
              index={index}
              selected={video.video_id === this.props.currentVideoIndex}
              videoId={video.video_id} 
              title={video.title}
              videoClicked={this.videoClicked}
              className={`${this.props.className}Item`} 
            />
          )}
        </div>
      </div>
    );
  }
}

export default VideoPool;