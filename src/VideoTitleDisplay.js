import React from 'react';

class VideoTitleDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: `https://youtube.com/watch?v=${this.props.videoId}`
    }
    this.clickEvent = this.clickEvent.bind(this);
  }

  clickEvent(){
    this.props.videoClicked ? this.props.videoClicked(this.props.videoId) : console.log('😎');
  }

  render() {
    const titleOpts = {
      flex: 1
    }
    const anchorOpts = {
      paddingLeft: 3, 
      flex: 0
    }


    return(
      <div 
        id="videoTitleDisplay" 
        onClick={this.clickEvent}
        className={`${this.props.className}${this.props.selected?' selected':''}`}
      >
        <div style={titleOpts}>{this.props.title}</div>
        <a style={anchorOpts} href={this.state.url}><img alt='Go to Youtube' src={'/arrow-up-right.svg'}></img></a>
      </div>
      );
  }
}

export default VideoTitleDisplay;