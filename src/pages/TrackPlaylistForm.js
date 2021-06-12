import React from "react";
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import AppConstants from '../AppConstants';

class TrackPlaylistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist_id: '',
      is_default: true,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value  = target.name === 'is_default' ? target.checked : target.value;
    const name   = target.name;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(AppConstants.APIEndpoints.TRACKED_PLAYLISTS, {playlist_id: this.state.playlist_id, is_default: this.state.is_default})
      .then((response) => console.log(response))
      .catch((e) => console.log(`Couldn't track playlist: ${e}`))

    return <Redirect to='/home' />
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Playlist ID:
          <input type="text" name="playlist_id" value={this.state.playlist_id} onChange={this.handleInputChange} placeholder="(e.g. 'PL8g7AzKjYPsNWX5N1pYudn2OetM85N0GS')" />
        </label>
        <label>
          Default Playlist?
          <input type="checkbox" name="is_default" checked={this.state.is_default} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default TrackPlaylistForm;
