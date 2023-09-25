import React, { useState, useEffect } from 'react';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import CurrentVideoInfo from '../components/CurrentVideoInfo';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import VideoSelector from '../components/VideoSelector';
import useLocalStorage from '../hooks/UseLocalStorage';
import usePlaylistDataFetcher from '../hooks/UsePlaylistDataFetcher';
import useVideoDataFetcher from '../hooks/UseVideoDataFetcher';

export default function ShufflePlayer() {
  const [currentVideo, setCurrentVideo] = useState({})
  const [playedVideos, setPlayedVideos] = useState([])
  const [repeatVideo, setRepeatVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(true)
  const [hideDescription, setHideDescription] = useState(true)

  const [selectedPlaylistIds, setSelectedPlaylistIds] = useLocalStorage(AppConstants.SelectedPlaylistIdsKey, []);
  const [playlists, setPlaylists] = usePlaylistDataFetcher(selectedPlaylistIds);
  const [videoFetchResult, setVideoFetchPlaylistIds] = useVideoDataFetcher()
  useEffect(pickNextVideo, [videoFetchResult])

  function pickNextVideo() {
    if (!videoFetchResult.isLoaded) { return; }
    function randomInteger(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
    const videoIndex = randomInteger(0, videoFetchResult.videos.length);
    const nextVideo = videoFetchResult.videos[videoIndex];
    playVideo(nextVideo);
  }

  function playVideo(video) {
    setCurrentVideo(video);
    setHideDescription(true);
    setPlayedVideos(played => [...played, video])
  }

  return (!videoFetchResult.isLoaded ? <LoadingPlaceholder /> :
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
          onShuffle={() => setVideoFetchPlaylistIds(selectedPlaylistIds)}
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