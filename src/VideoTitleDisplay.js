import React from 'react';

class VideoTitleDisplay extends React.Component {
  render() {
    return(
      <div id="videoTitleDisplay">
        <a href={'https://youtube.com/watch?v=' + this.props.videoId} style={this.props.style}>{this.props.title}</a>
      </div>
      );
  }
}

export default VideoTitleDisplay;