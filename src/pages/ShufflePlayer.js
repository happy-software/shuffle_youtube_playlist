import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import VideoPool from '../components/VideoPool';
import VideoTitleDisplay from '../components/VideoTitleDisplay';

function ShufflePlayer(props) {
  const [loadedPlaylists, setLoadedPlaylists] = useState([]);
  const [loadedVideos, setLoadedVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    video_id: null
  });
  const [playedVideos, setPlayedVideos] = useState([]);
  const [googleState, setGoogleState] = useState({
    apiRequestLock: false,
    isLoggedIn: false,
    user: '',
    accessToken: '',
  })
  const [repeatVideo, setRepeatVideo] = useState(false);

  function loadPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
    .then(response => setLoadedPlaylists(response.data))
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

  function getGoogleUserPlaylists() {
    if(googleState.isLoggedIn && !googleState.apiRequestLock){
      setGoogleState(state => ({ ...state, apiRequestLock: true}));
      axios.get(AppConstants.APIEndpoints.YOUTUBE_PLAYLISTS, {
        headers: { Authorization: "Bearer " + googleState.accessToken },
        params: { part: 'id', mine: true }
      })
      .then(response => console.log(response))
      .catch(e => console.log(`Couldn't retrieve user playlists! ${e}`))
      .finally(setGoogleState(state => ({ ...state, apiRequestLock: false})))
    }
  }

  function pickPreviousVideo() {
    if (!Array.isArray(playedVideos) || playedVideos.length <= 1) { return; }
    const nextVideo = playedVideos[playedVideos.length - 2];
    setCurrentVideo(nextVideo);
    setPlayedVideos(playedVideos.concat(nextVideo))
    console.log(`${playedVideos.length}: https://youtube.com/watch?v=${nextVideo.video_id}\t${nextVideo.title}`);
  }

  function pickNextVideo(videoId) {
    if (!Array.isArray(loadedVideos) || !loadedVideos.length) { return; }
    if (repeatVideo) { 
      var currentvideo = currentVideo;
      setCurrentVideo({}); 
      setCurrentVideo(currentvideo)
      return;
    }
    const nextVideo = !!videoId ? 
      loadedVideos[loadedVideos.findIndex(v => v.video_id === videoId)] :
      loadedVideos[Math.floor(Math.random()*loadedVideos.length) % loadedVideos.length];
    setCurrentVideo(nextVideo);
    setPlayedVideos(playedVideos.concat(nextVideo))
    console.log(`${playedVideos.length}: https://youtube.com/watch?v=${nextVideo.video_id}\t${nextVideo.title}`);
  }

  useEffect(loadVideos, []);
  useEffect(loadPlaylists, []);
  useEffect(pickNextVideo, [loadedVideos]);
  useEffect(getGoogleUserPlaylists, [googleState.isLoggedIn === true]);

  return (
    <div>
      <Player 
        videoId={currentVideo.video_id} 
        onEnd={() => pickNextVideo()}
      />
      <div className='contentRow'>
        <VideoTitleDisplay 
          key={currentVideo.video_id}
          videoId={currentVideo.video_id} 
          title={currentVideo.title}
          className='currentVideoTitle' 
        />
      </div>
      <div className='contentRow'>
        <PlaylistSelector 
          playlists={loadedPlaylists} 
          onCheckboxChange={(playlist_id) => togglePlaylistSelection(playlist_id)}
          onShuffle={() => loadVideos()}
          onSelectNone={() => onSelectNone()}
          className='playlistSelector'
        />
        <VideoPool 
          title='Video History'
          videos={playedVideos}
          currentVideo={currentVideo}
          setCurrentVideo={setCurrentVideo}
          isCollapsedDefault = {false}
          onVideoClicked={(videoId) => pickNextVideo(videoId)}
        />
        <ButtonList 
          googleState={googleState}
          setGoogleState={setGoogleState}
          repeatVideo={repeatVideo}
          setRepeatVideo={setRepeatVideo}
          pickNextVideo={() => pickNextVideo()}
          pickPreviousVideo={() => pickPreviousVideo()}
        />
      </div>
    </div>
  )
}

export default ShufflePlayer;
