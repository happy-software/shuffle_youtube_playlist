import React, { useState } from 'react';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import CurrentVideoInfo from '../components/CurrentVideoInfo';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import VideoSelector from '../components/VideoSelector';
import useLocalStorage from '../hooks/UseLocalStorage';
import usePlaylistDataFetcher from '../hooks/UsePlaylistDataFetcher';
import useVideoPlayer from '../hooks/UseVideoPlayer';

export default function ShufflePlayer() {
  const [repeatVideo, setRepeatVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(true)

  const [selectedPlaylistIds, setSelectedPlaylistIds] = useLocalStorage(AppConstants.SelectedPlaylistIdsKey, []);
  const [playlists, setPlaylists] = usePlaylistDataFetcher(selectedPlaylistIds);

  const {
    currentVideo,
    playedVideos,
    pickNextVideo,
    playVideo,
    setVideoFetchPlaylistIds,
    hideDescription,
    setHideDescription,
    isLoaded
  } = useVideoPlayer(selectedPlaylistIds);

  if (!isLoaded) {
    return <LoadingPlaceholder />;
  }

  return <div>
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
}