import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import ShufflePlayer from './pages/ShufflePlayer';
import TrackPlaylistForm from './pages/TrackPlaylistForm';
import PlaylistsManager  from './pages/PlaylistsManager';
import PlaylistsSearch   from './pages/PlaylistsSearch';

export default function AppRoot() {
  return(
    <Router>
      <div>
        <Switch>
          <Route path="/track-new-playlist">
            <TrackPlaylistForm />
          </Route>
          <Route path="/manage">
            <PlaylistsManager />
          </Route>
          <Route path="/search">
            <PlaylistsSearch />
          </Route>
          <Route path="/">
            <ShufflePlayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}