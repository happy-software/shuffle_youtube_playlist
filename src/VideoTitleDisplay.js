import React from 'react';

class VideoTitleDisplay extends React.Component {

  render() {
    return(
      <div id="videoTitleDisplay" style={this.props.style}>
        {this.props.title}
      </div>
      );
  }
}

export default VideoTitleDisplay;