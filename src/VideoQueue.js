import React from 'react';
import VideoTitleDisplay from './VideoTitleDisplay';

class VideoQueue extends React.Component {
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

  videoClicked(index){
    this.props.onVideoClicked(null, index);
  }

  render() {
    return (
      <div id="videoQueue" className={this.props.className}>
        <div 
          className={`${this.props.className}Title`} 
          onClick={this.toggleCollapsedState}
        ><b>Song Pool (click to Expand/Collapse)</b></div>

        <div className={`videoQueueList ${this.state.collapsed?'hide':''}`}>
          {this.props.videos.map((video, index) =>
            <VideoTitleDisplay 
              key={index}
              index={index}
              selected={index === this.props.currentVideoIndex}
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

export default VideoQueue;