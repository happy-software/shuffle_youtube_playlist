import React from 'react'
import ReactPlayer from 'react-player'

export default function Player(props) {
  const YOUTUBE_PLAYLIST_VIDEO_LIMIT = 200

  function onReady() {
    console.log("onReady");
  }

  function onStart() {
    console.log("onStart");
  }

  function onPlay() {
    var internalPlayer = props.playerRef.current?.getInternalPlayer()
    var videoData = internalPlayer.getVideoData()
    var video = props.videos.find(v => v.video_id === videoData.video_id)
    props.setCurrentVideo(video)
  }

  function onProgress(progress) {
    console.log("onProgress");
    console.log(progress);
  }

  function onDuration(duration) {
    console.log("onDuration");
    console.log(duration);
  }

  function onPause() {
    console.log("onPause");
  }

  function onBuffer() {
    console.log("onBuffer");
  }

  function onBufferEnd() {
    console.log("onBufferEnd");
  }

  function onSeek() {
    console.log("onSeek");
  }

  function onPlaybackRateChange() {
    console.log("onPlaybackRateChange");
  }

  function onEnded() {
    console.log("onEnded");
  }

  function onError() {
    var internalPlayer = props.playerRef.current?.getInternalPlayer()
    var videoUrl = internalPlayer.getVideoUrl()
    if (!videoUrl) return
    console.log(`BROKEN VIDEO: ${getVideoId(videoUrl)}`)
    internalPlayer.nextVideo()
  }

  function onClickPreview() {
    console.log("onClickPreview");
  }

  function onEnablePIP() {
    console.log("onEnablePIP");
  }

  function onDisablePIP() {
    console.log("onDisablePIP");
  }

  function getVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search)
    return urlParams.get('v')
  }

  return <div className='playerWrapper' style={{ display: props.hideVideo ? 'none' : 'block' }}>
    <ReactPlayer
      className='player'
      ref={props.playerRef}
      url={props.videos?.slice(0, YOUTUBE_PLAYLIST_VIDEO_LIMIT).map(v => `https://www.youtube.com/watch?v=${v.video_id}`)}
      controls={true}
      loop={props.repeatVideo}
      playing={true}
      width={"100%"}
      height={"800px"}
      onReady={onReady}
      onStart={onStart}
      onPlay={onPlay}
      onProgress={(progress) => onProgress(progress)}
      onDuration={(duration) => onDuration(duration)}
      onPause={onPause}
      onBuffer={onBuffer}
      onBufferEnd={onBufferEnd}
      onSeek={onSeek}
      onPlaybackRateChange={onPlaybackRateChange}
      onEnded={onEnded}
      onError={onError}
      onClickPreview={onClickPreview}
      onEnablePIP={onEnablePIP}
      onDisablePIP={onDisablePIP}
      config={{
        youtube: {
          playerVars: {},
          embedOptions: {
            host: "https://www.youtube-nocookie.com",
          }
        },
        attributes: {},
        tracks: [],
      }}
    />
  </div>
}