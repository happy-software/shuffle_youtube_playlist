import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import VideoPool from '../components/VideoPool';
import CurrentVideoInfo from '../components/CurrentVideoInfo';

function ShufflePlayer(props) {
  const [isLoaded,        setIsLoaded]        = useState(false);
  const [loadedPlaylists, setLoadedPlaylists] = useState([]);
  const [loadedVideos,    setLoadedVideos]    = useState([]);
  const [currentVideo,    setCurrentVideo]    = useState({});
  const [playedVideos,    setPlayedVideos]    = useState([]);
  const [repeatVideo,     setRepeatVideo]     = useState(false);

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
    .then(response => {
      setLoadedVideos(response.data.songs);
      if ('mediaSession' in navigator) {
        console.log("Was able to get mediaSession from navigator - setting up actionHandlers now")
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: "The title is always Hebron",
          artwork: [],
          playbackState: 'playing'
        });
        navigator.mediaSession.setActionHandler('seekbackward', function() { console.log("seekbackward called") });
        navigator.mediaSession.setActionHandler('seekforward', function() { console.log("seekforward called") });
        navigator.mediaSession.setActionHandler('seekto', function() { console.log("seekto called") });
        navigator.mediaSession.setActionHandler("play", function() { console.log("Trying to play"); });
        navigator.mediaSession.setActionHandler("pause", function() { console.log("Trying to pause"); });
        navigator.mediaSession.setActionHandler('previoustrack', function() { console.log("Trying to pick previous video from mediaSession API"); pickPreviousVideo() });
        navigator.mediaSession.setActionHandler('nexttrack', function() { console.log("Trying to pick next video from mediaSession API"); pickNextVideo() });
      }
    })
    .catch(error => console.log(`Couldn't retrieve playlist videos! ${error}`))
  }

  function togglePlaylistSelection(togglePlaylistId) {
    const toggledOnePlaylist = loadedPlaylists.map(p => { 
      return p.playlist_id === togglePlaylistId ? { ...p, is_default: !p.is_default } : p});
    setLoadedPlaylists(toggledOnePlaylist);
  }

  function onSelectNone() {
    const selectedNoPlaylists = loadedPlaylists.map(p => { 
      return { ...p, is_default: false }});
    setLoadedPlaylists(selectedNoPlaylists);
  }

  function pickPreviousVideo() {
    if (!Array.isArray(playedVideos) || playedVideos.length <= 1) { return; }
    const nextVideo = playedVideos[playedVideos.length - 2];
    setCurrentVideo(nextVideo);
    setPlayedVideos(playedVideos.concat(nextVideo))
    console.log(`${playedVideos.length}: https://youtube.com/watch?v=${nextVideo.video_id}\t${nextVideo.title}`);
  }

  function randomVideoIndex() {
    return Math.floor(Math.random()*loadedVideos.length) % loadedVideos.length;
  }

  function pickNextVideo(videoId) {
    if (!loadedVideos.length) { return; }
    if (repeatVideo) { 
      setCurrentVideo(currentVideo);
      return;
    }
    const nextVideo = !!videoId ? 
      loadedVideos.filter(v => v.video_id === videoId)[0] :
      loadedVideos[randomVideoIndex()];

    setCurrentVideo(nextVideo);
    setPlayedVideos(playedVideos.concat(nextVideo))
  }

  useEffect(loadVideos, []);
  useEffect(loadPlaylists, []);
  useEffect(pickNextVideo, [loadedVideos]);

  return (
    <div>
      <LoadingPlaceholder isLoaded={isLoaded} />
      <Player videoId={currentVideo.video_id} onEnd={() => pickNextVideo()} />
      <CurrentVideoInfo currentVideo={currentVideo} />

      <div className='contentRow'>
        <PlaylistSelector 
          playlists={loadedPlaylists} 
          onCheckboxChange={(playlist_id) => togglePlaylistSelection(playlist_id)}
          onShuffle={() => loadVideos()}
          onSelectNone={() => onSelectNone()}
          className='playlistSelector'
        />
        <VideoPool 
          videos={playedVideos}
          currentVideo={currentVideo}
          setCurrentVideo={setCurrentVideo}
          isCollapsedDefault={false}
          onVideoClicked={(videoId) => pickNextVideo(videoId)}
        />
        <ButtonList 
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
