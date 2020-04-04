import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import PlaylistSelector from './PlaylistSelector';
import VideoQueue from './VideoQueue';
import VideoTitleDisplay from './VideoTitleDisplay';
import axios from 'axios';

class ShufflePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      played_history: [],
      playlists: [],
      playlist_ids: [],
      loadingResults: true,
      currentTitle: '',
      currentVideoId: '',
      currentVideoIndex: -1
    }

    this.pickNextSong = this.pickNextSong.bind(this);    
    this.updateSelectedPlaylists = this.updateSelectedPlaylists.bind(this);
    this.getTrackedPlaylists = this.getTrackedPlaylists.bind(this);
    this.shuffleSelectedPlaylists = this.shuffleSelectedPlaylists.bind(this);
  }

  pickNextSong(event) {
    const nextSongIndex = (this.state.currentVideoIndex + 1) % this.state.videos.length;
    const nextSong = this.state.videos[nextSongIndex];
    this.setState({
        currentVideoId: nextSong.video_id, 
        played_history: this.state.played_history.concat(nextSong.video_id),
        currentTitle:   nextSong.title,
        currentVideoIndex: nextSongIndex,
    });	

    const songCount  = this.state.played_history.length;	
    console.log(`${songCount}: https://youtube.com/watch?v=${nextSong.video_id}\t${nextSong.title}`);
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
      const songs = response.data.songs;
      this.setState({videos: songs, loadingResults: false});
      this.pickNextSong();
    })
    .catch((e) => console.log(`Couldn't retrieve playlist songs! ${e}`))
  }

  componentDidMount() {
    this.shuffleSelectedPlaylists();
    this.getTrackedPlaylists();
  }

  render() {
    const videoTitleFontSize = 44;

    const playlistSelectorOpts = {
      color: 'pink',
      fontSize: 22,
      borderStyle: 'solid'
    }

    const videoQueueOpts = {
      color: 'pink',
      borderStyle: 'solid',
      fontSize: 18,
      display: 'block'
    }

    return (
      <div>
        <Player 
          videoId={this.state.currentVideoId} 
          onEnd={this.pickNextSong}
        />
        <button 
          onClick={this.shuffleSelectedPlaylists}
        >Shuffle Again</button>
        <VideoTitleDisplay 
          videoId={this.state.currentVideoId} 
          title={this.state.currentTitle}
          fontSize={videoTitleFontSize}
        />
        <PlaylistSelector 
          playlists={this.state.playlists} 
          onChange={this.updateSelectedPlaylists} 
          style={playlistSelectorOpts}
        />
        <VideoQueue 
          videos={this.state.videos} 
          currentVideoIndex={this.state.currentVideoIndex} 
          style={videoQueueOpts}
        />
      </div>
    )
  }
}

export default ShufflePlayer;
