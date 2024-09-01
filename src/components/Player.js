import React from 'react'
import ReactPlayer from 'react-player'
import { Honeybadger } from "@honeybadger-io/react"

export default function Player(props) {
  const YOUTUBE_PLAYLIST_VIDEO_LIMIT = 200

  function onPlay() {
    var internalPlayer = props.playerRef.current?.getInternalPlayer()
    var videoData = internalPlayer.getVideoData()
    var video = props.videos.find(v => v.video_id === videoData.video_id)
    props.setCurrentVideo(video)
  }

  function onError() {
    var internalPlayer = props.playerRef.current?.getInternalPlayer()
    var videoUrl = internalPlayer.getVideoUrl()
    if (!videoUrl) return

    var videoId = getVideoId(videoUrl)
    console.log(`BROKEN VIDEO: ${videoId}`)
    Honeybadger.notify(`BROKEN VIDEO: ${videoId}`);

    var currentVideoIndex = internalPlayer.getPlaylistIndex()
    if (currentVideoIndex === 0) {
      console.log("Recovering from broken first video...")
      props.onErrorRecovery()
    } else {
      internalPlayer.nextVideo()
    }
  }

  function getVideoId(url) {
    const urlParams = new URLSearchParams(new URL(url).search)
    return urlParams.get('v')
  }

  return <div className='playerWrapper' style={{ display: props.hideVideo ? 'none' : 'block' }}>
    <ReactPlayer
      className='player'
      ref={props.playerRef}
      url={props.videos.slice(0, YOUTUBE_PLAYLIST_VIDEO_LIMIT).map(v => `https://www.youtube.com/watch?v=${v.video_id}`)}
      controls={true}
      loop={props.repeatVideo}
      playing={true}
      width={"100%"}
      height={"800px"}
      onPlay={onPlay}
      onError={onError}
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