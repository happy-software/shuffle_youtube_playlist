import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import CurrentVideoInfo from '../components/CurrentVideoInfo';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import VideoSelector from '../components/VideoSelector';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import useVideoHook from '../hooks/VideoHook';

function ShufflePlayer() {
  const [playlists, setPlaylists] = useState([])
  const [currentVideo, setCurrentVideo] = useState({})
  const [playedVideos, setPlayedVideos] = useState([])
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState(() => {
    const saved = localStorage.getItem("selectedPlaylistIds");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  })
  const [repeatVideo, setRepeatVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(true)
  const [hideDescription, setHideDescription] = useState(true)

  const [videosResult, fetchPlaylistVideos] = useVideoHook(selectedPlaylistIds)
  useEffect(pickNextVideo, [videosResult])
  useEffect(() => {
    localStorage.setItem("selectedPlaylistIds", JSON.stringify(selectedPlaylistIds));
  }, [selectedPlaylistIds]);

  useCallbackOnce(loadPlaylists)

  function useCallbackOnce(callbackFunction, condition = true) {
    const isCalledRef = React.useRef(false);

    React.useEffect(() => {
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        callbackFunction();
      }
    }, [callbackFunction, condition]);
  }

  function loadPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
      .then(response => {
        response.data = response.data.map(item => ({
          ...item,
          is_default: selectedPlaylistIds.length > 0 ? selectedPlaylistIds.includes(item.playlist_id) : item.is_default
        }))
        setPlaylists(response.data)
      })
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

  return (!videosResult.isLoaded ? <LoadingPlaceholder /> :
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
        <ButtonList
          repeatVideo={repeatVideo}
          setRepeatVideo={setRepeatVideo}
          hideVideo={hideVideo}
          setHideVideo={setHideVideo}
          pickNextVideo={() => pickNextVideo()}
        />
        <PlaylistSelector
          playlists={playlists}
          isCollapsedDefault={true}
          onShuffle={() => fetchPlaylistVideos(selectedPlaylistIds)}
          setPlaylistIds={setSelectedPlaylistIds}
          setLoadedPlaylists={setPlaylists}
          className='playlistSelector'
        />
        <VideoSelector
          videos={playedVideos}
          isCollapsedDefault={true}
          onVideoClicked={video => playVideo(video)}
        />
      </div>
    </div>
  )
}

export default ShufflePlayer;
