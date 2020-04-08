import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import PlaylistSelector from './PlaylistSelector';
import VideoPool from './VideoPool';
import VideoTitleDisplay from './VideoTitleDisplay';
import axios from 'axios';

class ShufflePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      playedHistory: [],
      playlists: [],
      playlist_ids: [],
      loadingResults: true,
      currentTitle: '',
      currentVideoId: '',
    }

    this.pickNextVideo = this.pickNextVideo.bind(this);
    this.updateSelectedPlaylists = this.updateSelectedPlaylists.bind(this);
    this.getTrackedPlaylists = this.getTrackedPlaylists.bind(this);
    this.shuffleSelectedPlaylists = this.shuffleSelectedPlaylists.bind(this);
  }

  pickNextVideo(event, videoId) {
    let nextVideoIndex = -1;
    if (videoId) {
      nextVideoIndex = this.state.videos.findIndex(video => video.video_id === videoId);
    } else {
      nextVideoIndex = Math.floor(Math.random()*this.state.videos.length) % this.state.videos.length;
    }
    const nextVideo = this.state.videos[nextVideoIndex];
    this.setState({ 
      currentVideoIndex: nextVideoIndex,
      currentVideoId: nextVideo.video_id,
      playedHistory: this.state.playedHistory.concat(nextVideo),
      currentTitle: nextVideo.title,
    });

    const videoCount  = this.state.playedHistory.length;	
    console.log(`${videoCount}: https://youtube.com/watch?v=${nextVideo.video_id}\t${nextVideo.title}`);
  }

  updateSelectedPlaylists(playlist_id) {
    const newPlaylists = this.state.playlists.map(playlist => {
      if (playlist.playlist_id === playlist_id) {
        return {
          ...playlist,
          is_default: !playlist.is_default,
        }
      }
      return playlist;
    });
    this.setState({
      playlists: newPlaylists,
      playlist_ids: newPlaylists.filter(playlist => playlist.is_default).map(playlist => playlist.playlist_id),
    });
  }

  getTrackedPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
    .then(response => {
      this.setState({
        playlists: response.data,
        playlist_ids: response.data.filter(playlist => playlist.is_default).map(playlist => playlist.playlist_id),
      })
    })
    .catch((e) => console.log(`Couldn't retrieve playlists! ${e}`))
  }

  shuffleSelectedPlaylists() {
    axios.post(AppConstants.APIEndpoints.SHUFFLE, {playlist_ids: this.state.playlist_ids})
    .then(response => {
      const videos = response.data.songs;
      this.setState({videos: videos, loadingResults: false});
      this.pickNextVideo();
    })
    .catch((e) => console.log(`Couldn't retrieve playlist videos! ${e}`))
  }

  componentDidMount() {
    this.shuffleSelectedPlaylists();
    this.getTrackedPlaylists();
  }

  render() {
    return (
      <div>
        <Player 
          videoId={this.state.currentVideoId} 
          onEnd={this.pickNextVideo}
        />
        <div className='contentRow'>
          <VideoTitleDisplay 
            key={this.state.currentVideoId}
            videoId={this.state.currentVideoId} 
            title={this.state.currentTitle}
            className='currentVideoTitle' 
          />
          <button 
            onClick={this.pickNextVideo}
            className='nextVideoButton'
          >Next Video</button>
        </div>
        <div className='contentRow'>
          <PlaylistSelector 
            playlists={this.state.playlists} 
            onChange={this.updateSelectedPlaylists}
            onShuffle={this.shuffleSelectedPlaylists}
            className='playlistSelector'
          />
          <VideoPool 
            title='Composed Playlist'
            videos={this.state.videos} 
            currentVideoIndex={this.state.currentVideoId}
            isCollapsedDefault={true}
            onVideoClicked={this.pickNextVideo}
            className='videoPool'
          />
          <VideoPool 
            title='Video History'
            videos={this.state.playedHistory} 
            isCollapsedDefault={false}
            currentVideoIndex={this.state.currentVideoId}
            onVideoClicked={this.pickNextVideo}
            className='videoPool'
          />
        </div>
      </div>
    )
  }
}

export default ShufflePlayer;
