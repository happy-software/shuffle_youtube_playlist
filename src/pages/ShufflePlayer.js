import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import CurrentVideoInfo from '../components/CurrentVideoInfo';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import PlayedHistory from '../components/PlayedHistory';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import useVideoHook from '../hooks/VideoHook';

function ShufflePlayer() {
  const [loadedPlaylists,     setLoadedPlaylists] =     useState([]);
  const [currentVideo,        setCurrentVideo] =        useState({});
  const [playedVideos,        setPlayedVideos] =        useState([]);
  const [repeatVideo,         setRepeatVideo] =         useState(false);
  const [hideVideo,           setHideVideo] =           useState(true);
  const [collapseDescription, setCollapseDescription] = useState(true);
  const [playlistIds,         setPlaylistIds] =         useState([]);
  const [videoResult, reloadVideos] =                   useVideoHook(playlistIds);
  useEffect(loadPlaylists, []);
  useEffect(pickNextVideo, [videoResult]);

  function loadPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
      .then(response => setLoadedPlaylists(response.data))
      .catch(error => console.log(`Couldn't retrieve tracked playlists! ${error}`))
  }

  function pickNextVideo() {
    if (!videoResult.isLoaded) { return; }
    function randomInteger(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
    const videoIndex = randomInteger(0, videoResult.videos.length);
    const nextVideo = videoResult.videos[videoIndex];
    playVideo(nextVideo);
  }

  function playVideo(video) {
    setCurrentVideo(video);
    setCollapseDescription(true);
    setPlayedVideos(played => played.concat(video))
  }

  return ( !videoResult.isLoaded ? <LoadingPlaceholder /> : 
    <div>
      <Player
        videoId={currentVideo.video_id}
        onEnd={() => pickNextVideo()}
        repeatVideo={repeatVideo}
        hideVideo={hideVideo}
      />

      <CurrentVideoInfo currentVideo={currentVideo} collapseDescription={collapseDescription} setCollapseDescription={setCollapseDescription} />

      <div className='contentRow'>
        <PlaylistSelector
          playlists={loadedPlaylists}
          onShuffle={() => reloadVideos(playlistIds)}
          setPlaylistIds={setPlaylistIds}
          setLoadedPlaylists={setLoadedPlaylists}
          className='playlistSelector'
        />
        <PlayedHistory
          videos={playedVideos}
          isCollapsedDefault={false}
          onVideoClicked={video => playVideo(video)}
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
