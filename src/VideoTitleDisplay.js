import React from 'react';

class VideoTitleDisplay extends React.Component {
  render() {
    const videoTitleDisplayOpts = {
      color: !!this.props.selected ? 'blue' : 'pink',
      fontSize: this.props.fontSize ?? 22,
      textDecoration: 'none',
      display: this.props.collapsed? 'none' : 'block',
    };

    console.log(this.props.key);
    console.log(this.props.currentVideoIndex);
    console.log(this.props.selected);

    return(
      <div id="videoTitleDisplay">
        <a 
          href={'https://youtube.com/watch?v=' + this.props.videoId} 
          style={videoTitleDisplayOpts}
        >
          {this.props.title}
        </a>
      </div>
      );
  }
}

export default VideoTitleDisplay;