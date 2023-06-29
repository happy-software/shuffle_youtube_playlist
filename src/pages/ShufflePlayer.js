import React, { useState, useEffect }  from 'react';
import ButtonList from '../components/ButtonList'
import CurrentVideoInfo from '../components/CurrentVideoInfo'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import Player from '../components/Player'
import PlaylistSelector from '../components/PlaylistSelector'
import VideoSelector from '../components/VideoSelector'
import PlaylistHook from '../hooks/PlaylistHook'
import VideoHook from '../hooks/VideoHook'

function ShufflePlayer() {
  const [currentVideo,        setCurrentVideo]        = useState({})
  const [playedVideos,        setPlayedVideos]        = useState([])
  const [repeatVideo,         setRepeatVideo]         = useState(false)
  const [hideVideo,           setHideVideo]           = useState(true)
  const [hideDescription,     setHideDescription]     = useState(true)

  // load playlists
  const [playlistsResult,] = PlaylistHook() 
  
  // load videos 
  const [videosResult, fetchPlaylistVideos] = VideoHook() 

  // pick a video after load
  useEffect(pickNextVideo, [videosResult])

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
        <ButtonList 
          repeatVideo={repeatVideo}
          setRepeatVideo={setRepeatVideo}
          hideVideo={hideVideo}
          setHideVideo={setHideVideo}
          pickNextVideo={() => pickNextVideo()}
        />
        <PlaylistSelector
          playlists={playlistsResult.playlists}
          isCollapsedDefault={true}
          onCombine={playlistIds => fetchPlaylistVideos(playlistIds)}
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
