import React from "react"
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import ShufflePlayer from './pages/ShufflePlayer'
import TrackPlaylistForm from './pages/TrackPlaylistForm'
import PlaylistsSearch from './pages/PlaylistsSearch'

export default function AppRoot() {
  return <Router>
    <div>
      <Routes>
        <Route path="/track-new-playlist" element={<TrackPlaylistForm />}></Route>
        <Route path="/search" element={<PlaylistsSearch />}></Route>
        <Route exact path="/" element={<ShufflePlayer />}></Route>
      </Routes>
    </div>
  </Router>
}