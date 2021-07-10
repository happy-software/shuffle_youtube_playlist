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
      server_errors: [],
      redirect_home: false,
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
    this.setState({server_errors: []})
    axios.post(AppConstants.APIEndpoints.TRACKED_PLAYLISTS, {playlist_id: this.state.playlist_id, is_default: this.state.is_default})
      .then(this.setState({redirect_home: true}))
      .catch((e) => this.setState({server_errors: [e], redirect_home: false}))

    return <Redirect to='/' />
  }

  render() {
    if (this.state.redirect_home) {
      return(<Redirect to="/" />)
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <label>Playlist ID: </label>
        <input type="text" name="playlist_id" value={this.state.playlist_id} onChange={this.handleInputChange} placeholder="(e.g. 'PL8g7AzKjYPsNWX5N1pYudn2OetM85N0GS')" style={{"width": "40%"}}/>

        <label> Default Playlist? </label>
        <input type="checkbox" name="is_default" checked={this.state.is_default} onChange={this.handleInputChange} />

        <p><input type="submit" value="Submit" /></p>

        <div style={{"margin-top": "25px"}} className={`${this.state.server_errors.length > 0 ? '' : 'hide'}`}>
          Submission Errors: {this.state.server_errors.map((e, index) => <li key={index}>{e.response.data.errors}</li>)}
        </div>
      </form>
    )
  }
}

export default TrackPlaylistForm;
