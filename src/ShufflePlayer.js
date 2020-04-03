import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import PlaylistSelector from './PlaylistSelector';
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
      currentVideoId: '[waiting_to_load_video_lol]',
    }

    this.pickNextSong = this.pickNextSong.bind(this);
    this.updateSelectedPlaylists = this.updateSelectedPlaylists.bind(this);
    this.shuffleSelectedPlaylists = this.shuffleSelectedPlaylists.bind(this);
  }

  pickNextSong(event) {
    const nextSong   = this.state.videos[Math.floor(Math.random()*this.state.videos.length)];

    this.setState({
        currentVideoId: nextSong.video_id, 
        played_history: this.state.played_history.concat(nextSong.video_id),
        currentTitle:   nextSong.title,
    });
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
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
    .then(response => {
      this.setState({
        playlists: response.data,
        playlist_ids: response.data.filter(playlist => playlist.is_default).map(playlist => playlist.playlist_id),
      }, this.shuffleSelectedPlaylists)
    })
    .catch((e) => console.log(`Couldn't retrieve playlists! ${e}`))
  }

  render() {
    const videoTitleOpts = {
      color: 'pink',
      fontSize: 44,
      textDecoration: 'none'
    };

    const playlistSelectorOpts = {
      color: 'pink',
      fontSize: 22,
      borderStyle: 'solid'
    }

    return (
      <div>
        <Player videoId={this.state.currentVideoId} onEnd={this.pickNextSong} ></Player>
        <button onClick={this.shuffleSelectedPlaylists}>Shuffle Again</button>
        <VideoTitleDisplay videoId={this.state.currentVideoId} title={this.state.currentTitle} style={videoTitleOpts} ></VideoTitleDisplay>
        <PlaylistSelector playlists={this.state.playlists} onChange={this.updateSelectedPlaylists} style={playlistSelectorOpts}></PlaylistSelector>
      </div>
    )
  }
}

export default ShufflePlayer;