import React, { useState, useRef } from 'react'
import AppConstants from '../AppConstants'
import ButtonList from '../components/ButtonList'
import CurrentVideoInfo from '../components/CurrentVideoInfo'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import Player from '../components/Player'
import PlaylistSelector from '../components/PlaylistSelector'
import useLocalStorage from '../hooks/UseLocalStorage'
import usePlaylistDataFetcher from '../hooks/UsePlaylistDataFetcher'
import useVideoPlayer from '../hooks/UseVideoPlayer'

export default function ShufflePlayer() {
  const [currentVideo, setCurrentVideo] = useState({})
  const [repeatVideo, setRepeatVideo] = useState(false)
  const [hideVideo, setHideVideo] = useState(false)

  const playerRef = useRef(null)

  const [selectedPlaylistIds, setSelectedPlaylistIds] = useLocalStorage(AppConstants.SelectedPlaylistIdsKey, [])
  const [playlists, setPlaylists] = usePlaylistDataFetcher(selectedPlaylistIds)

  const { currentVideos, setVideoFetchPlaylistIds, isLoaded } = useVideoPlayer(selectedPlaylistIds)

  if (!isLoaded) {
    return <LoadingPlaceholder />
  }

  return <div>
    <Player
      videos={currentVideos}
      repeatVideo={repeatVideo}
      hideVideo={hideVideo}
      playerRef={playerRef}
      setCurrentVideo={setCurrentVideo}
    />

    <CurrentVideoInfo currentVideo={currentVideo} />

    <div className='contentRow'>
      <ButtonList
        repeatVideo={repeatVideo}
        setRepeatVideo={setRepeatVideo}
        hideVideo={hideVideo}
        setHideVideo={setHideVideo}
        playerRef={playerRef}
      />
      <PlaylistSelector
        playlists={playlists}
        isCollapsedDefault={true}
        onCombinePlaylists={() => setVideoFetchPlaylistIds(selectedPlaylistIds)}
        setPlaylistIds={setSelectedPlaylistIds}
        setLoadedPlaylists={setPlaylists}
      />
    </div>

    <div className='shaFooter'>With Love, Happy Software | <a href="https://github.com/happy-software/shuffle_youtube_playlist" target="_blank" rel="noopener noreferrer">Github</a> | Commit: {process.env.REACT_APP_GIT_SHA}</div>
  </div>
}