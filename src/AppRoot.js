import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import ShufflePlayer from './pages/ShufflePlayer';
import TrackPlaylistForm from './pages/TrackPlaylistForm';

export default function AppRoot() {
  return(
    <Router>
      <div>
        <Switch>
          <Route path="/track-new-playlist">
            <TrackPlaylistForm />
          </Route>
          <Route path="/">
            <ShufflePlayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}