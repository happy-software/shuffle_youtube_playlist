import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import PlayedHistory from '../components/PlayedHistory';
import CurrentVideoInfo from '../components/CurrentVideoInfo';
import useVideoHook from '../hooks/VideoHook';

function randomInteger(min, max, inclusiveMax) {
  return Math.floor(Math.random() * (max - min + (inclusiveMax ? 1 : 0))) + min;
}

function ShufflePlayer() {
  const [loadedPlaylists, setLoadedPlaylists] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({});
  const [playedVideos, setPlayedVideos] = useState([]);
  const [repeatVideo, setRepeatVideo] = useState(false);
  
  const [playlistIds, setPlaylistIds] = useState([]);
  const [videoHookResult, reloadVideos] = useVideoHook(playlistIds);

  function loadPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
    .then(response => {
      setLoadedPlaylists(response.data);
    })
    .catch(error => console.log(`Couldn't retrieve tracked playlists! ${error}`))
  }

  function togglePlaylistSelection(togglePlaylistId) {
    const toggledOnePlaylist = loadedPlaylists.map(p => { 
      return p.playlist_id === togglePlaylistId ? 
        { ...p, is_default: !p.is_default } : p});
    const playlistIds = toggledOnePlaylist
      .filter(p => p.is_default)
      .map(p => p.playlist_id);
    
    setPlaylistIds(playlistIds);
    setLoadedPlaylists(toggledOnePlaylist);
  }

  function onSelectNone() {
    const selectedNoPlaylists = loadedPlaylists.map(p => { 
      return { ...p, is_default: false }});
    setPlaylistIds("");
    setLoadedPlaylists(selectedNoPlaylists);
  }

  function pickNextVideo() {
    if (!videoHookResult.isLoaded) { return; }

    const videoIndex = randomInteger(0, videoHookResult.videos.length, true);
    const nextVideo = videoHookResult.videos[videoIndex];

    setCurrentVideo(nextVideo);
    updatePlayedHistory(nextVideo)
  }

  function selectSpecificVideo(videoId) {
    if (!videoHookResult.isLoaded) { return; }
    const video = videoHookResult.videos.filter(v => v.video_id === videoId)[0];
    setCurrentVideo(video);
    updatePlayedHistory(video);
  }

  function updatePlayedHistory(video) {
    setPlayedVideos(vids => vids.concat(video))
  }

  useEffect(loadPlaylists, []);
  useEffect(pickNextVideo, [videoHookResult.videos, videoHookResult.isLoaded]);

  return ( !videoHookResult.isLoaded ? <LoadingPlaceholder /> : 
    <div>
      <Player videoId={currentVideo.video_id} onEnd={() => pickNextVideo()} repeatVideo={repeatVideo} />
      <CurrentVideoInfo currentVideo={currentVideo} />

      <div className='contentRow'>
        <PlaylistSelector 
          playlists={loadedPlaylists} 
          onCheckboxChange={(playlist_id) => togglePlaylistSelection(playlist_id)}
          onShuffle={() => reloadVideos(playlistIds)}
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
          pickNextVideo={() => pickNextVideo()}
        />
      </div>
    </div>
  )
}

export default ShufflePlayer;
