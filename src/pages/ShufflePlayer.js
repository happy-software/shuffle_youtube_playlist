import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import PlayedHistory from '../components/PlayedHistory';
import CurrentVideoInfo from '../components/CurrentVideoInfo';

function ShufflePlayer(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedPlaylists, setLoadedPlaylists] = useState([]);
  const [loadedVideos, setLoadedVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [playedVideos, setPlayedVideos] = useState([]);
  const [repeatVideo, setRepeatVideo] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);

  function loadPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
    .then(response => {
      setLoadedPlaylists(response.data);
      setIsLoaded(true);
    })
    .catch(error => console.log(`Couldn't retrieve tracked playlists! ${error}`))
  }

  function loadVideos() {
    const playlistIdsToLoad = loadedPlaylists
      .filter(p => p.is_default)
      .map(p => p.playlist_id);
    const requestBody = { playlist_ids: playlistIdsToLoad };
    axios.post(AppConstants.APIEndpoints.SHUFFLE, requestBody)
    .then(response => setLoadedVideos(response.data.songs))
    .catch(error => console.log(`Couldn't retrieve playlist videos! ${error}`))
  }

  function togglePlaylistSelection(togglePlaylistId) {
    const toggledOnePlaylist = loadedPlaylists.map(p => { 
      return p.playlist_id === togglePlaylistId ? 
        { ...p, is_default: !p.is_default } : p});
    setLoadedPlaylists(toggledOnePlaylist);
  }

  function onSelectNone() {
    const selectedNoPlaylists = loadedPlaylists.map(p => { 
      return { ...p, is_default: false }});
    setLoadedPlaylists(selectedNoPlaylists);
  }

  function randomVideoIndex() {
    return Math.floor(Math.random()*loadedVideos.length) % loadedVideos.length;
  }

  function pickNextVideo() {
    if (!loadedVideos.length) { return; }
    const nextVideo = loadedVideos[randomVideoIndex()];

    setCurrentVideo(nextVideo);
    updatePlayedHistory(nextVideo)
  }

  function selectSpecificVideo(videoId) {
    if (!loadedVideos.length) { return; }
    const video = loadedVideos.filter(v => v.video_id === videoId)[0];
    setCurrentVideo(video);
    updatePlayedHistory(video);
  }

  function updatePlayedHistory(video) {
    setPlayedVideos(playedVideos.concat(video))
  }

  useEffect(loadVideos, []);
  useEffect(loadPlaylists, []);
  useEffect(pickNextVideo, [loadedVideos]);

  return ( !isLoaded ? <LoadingPlaceholder /> : 
    <div>
      <Player
        videoId={currentVideo.video_id}
        onEnd={() => pickNextVideo()}
        repeatVideo={repeatVideo}
        hideVideo={hideVideo}
      />
      <CurrentVideoInfo currentVideo={currentVideo} />

      <div className='contentRow'>
        <PlaylistSelector 
          playlists={loadedPlaylists} 
          onCheckboxChange={(playlist_id) => togglePlaylistSelection(playlist_id)}
          onShuffle={() => loadVideos()}
          onSelectNone={() => onSelectNone()}
          className='playlistSelector'
        />
        <PlayedHistory 
          videos={playedVideos}
          isCollapsedDefault={false}
          onVideoClicked={(videoId) => selectSpecificVideo(videoId)}
        />
        <ButtonList 
          repeatVideo={repeatVideo}
          setRepeatVideo={setRepeatVideo}
          hideVideo={hideVideo}
          setHideVideo={setHideVideo}
          pickNextVideo={() => pickNextVideo()}
        />
      </div>
    </div>
  )
}

export default ShufflePlayer;
