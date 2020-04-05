import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ShufflePlayer from './ShufflePlayer';

export default function AppRoot() {
  return(
    <Router>
      <div>
        <Switch>
          <Route path="/track-new-playlist">
            <h1>Route not set up yet</h1>
          </Route>
          <Route path="/">
            <ShufflePlayer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}