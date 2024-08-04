import React, { useState } from 'react';
import AppConstants from '../AppConstants';
import ButtonList from '../components/ButtonList';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import useLocalStorage from '../hooks/UseLocalStorage';
import usePlaylistDataFetcher from '../hooks/UsePlaylistDataFetcher';
import useVideoPlayer from '../hooks/UseVideoPlayer';

export default function ShufflePlayer() {
  const [repeatVideo, setRepeatVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(true)

  const [selectedPlaylistIds, setSelectedPlaylistIds] = useLocalStorage(AppConstants.SelectedPlaylistIdsKey, []);
  const [playlists, setPlaylists] = usePlaylistDataFetcher(selectedPlaylistIds);

  const {
    currentVideos,
    setVideoFetchPlaylistIds,
    isLoaded
  } = useVideoPlayer(selectedPlaylistIds);

  if (!isLoaded) {
    return <LoadingPlaceholder />;
  }

  return <div>
    <Player
      videos={currentVideos}
      repeatVideo={repeatVideo}
      hideVideo={hideVideo}
    />

    <div className='contentRow'>
      <ButtonList
        repeatVideo={repeatVideo}
        setRepeatVideo={setRepeatVideo}
        hideVideo={hideVideo}
        setHideVideo={setHideVideo}
      />
      <PlaylistSelector
        playlists={playlists}
        isCollapsedDefault={true}
        onShuffle={() => setVideoFetchPlaylistIds(selectedPlaylistIds)}
        setPlaylistIds={setSelectedPlaylistIds}
        setLoadedPlaylists={setPlaylists}
      />
    </div>
  </div>
}