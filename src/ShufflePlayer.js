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
      currentVideoId: '[waiting_to_load_video_lol]',
      count: 0,
      loadingResults: true,
      currentTitle: '',
    }

    this.pickNextSong = this.pickNextSong.bind(this);
    this.updateSelectedPlaylists = this.updateSelectedPlaylists.bind(this);
    this.shuffleSelectedPlaylists = this.shuffleSelectedPlaylists.bind(this);
  }

  pickNextSong(event) {
    const nextSong   = this.state.videos[Math.floor(Math.random()*this.state.videos.length)];
    const nextSongId = nextSong.video_id;
    const songCount  = this.state.played_history.length;

    this.setState({
        currentVideoId: nextSongId, 
        played_history: this.state.played_history.concat(nextSongId),
        currentTitle:   nextSong.title,
    });

    console.log(`${songCount}: https://youtube.com/watch?v=${nextSongId}\t${nextSong.title}`);
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
    console.log(`Shuffling playlists with ids: ${this.state.playlist_ids}`)
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
      console.log(response.data);
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
        <VideoTitleDisplay title={this.state.currentTitle} style={videoTitleOpts} ></VideoTitleDisplay>
        <PlaylistSelector playlists={this.state.playlists} onChange={this.updateSelectedPlaylists} style={playlistSelectorOpts}></PlaylistSelector>
      </div>
    )
  }
}

export default ShufflePlayer;