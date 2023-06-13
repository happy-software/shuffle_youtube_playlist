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
  const [playlists,           setPlaylists]           = useState([])
  const [currentVideo,        setCurrentVideo]        = useState({})
  const [playedVideos,        setPlayedVideos]        = useState([])
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState([])
  const [repeatVideo,         setRepeatVideo]         = useState(false)
  const [hideVideo,           setHideVideo]           = useState(true)
  const [hideDescription,     setHideDescription]     = useState(true)
  
  const [videosResult, fetchPlaylistVideos] = useVideoHook(selectedPlaylistIds) 
  useEffect(loadPlaylists, [])
  useEffect(pickNextVideo, [videosResult])

  function loadPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
      .then(response => setPlaylists(response.data))
      .catch(error => console.log(`Couldn't retrieve tracked playlists! ${error}`))
  }

  function pickNextVideo() {
    if (!videosResult.isLoaded) { return; }
    function randomInteger(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
    const videoIndex = randomInteger(0, videosResult.videos.length);
    const nextVideo = videosResult.videos[videoIndex];
    playVideo(nextVideo);
  }

  function playVideo(video) {
    setCurrentVideo(video);
    setHideDescription(true);
    setPlayedVideos(played => played.concat(video))
  }

  return ( !videosResult.isLoaded ? <LoadingPlaceholder /> : 
    <div>
      <Player
        videoId={currentVideo.video_id}
        onEnd={() => pickNextVideo()}
        repeatVideo={repeatVideo}
        hideVideo={hideVideo}
      />

      <CurrentVideoInfo 
        currentVideo={currentVideo} 
        collapseDescription={hideDescription} 
        setCollapseDescription={setHideDescription} 
      />

      <div className='contentRow'>
        <PlaylistSelector
          playlists={playlists}
          onShuffle={() => fetchPlaylistVideos(selectedPlaylistIds)}
          setPlaylistIds={setSelectedPlaylistIds}
          setLoadedPlaylists={setPlaylists}
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
