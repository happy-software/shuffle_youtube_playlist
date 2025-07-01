import React from 'react'
import ReactPlayer from 'react-player'
import { Honeybadger } from "@honeybadger-io/react"

export default function Player(props) {
  const YOUTUBE_PLAYLIST_VIDEO_LIMIT = 200

  function onPlay() {
    const internalPlayer = props.playerRef.current?.getInternalPlayer()
    const videoData = internalPlayer.getVideoData()
    const video = props.videos.find(v => v.video_id === videoData.video_id)
    props.setCurrentVideo(video)
  }

  async function onError() {
    const internalPlayer = props.playerRef.current?.getInternalPlayer()
    const videoUrl = internalPlayer.getVideoUrl()

    const currentVideoIndex = internalPlayer.getPlaylistIndex()
    // use JS destructuring syntax to exclude the `description` property from the rest of the object, it can be too long
    const { description, ...errorVideo } = props.videos[currentVideoIndex]
    errorVideo.videoIndex = currentVideoIndex

    console.log(`BROKEN VIDEO: ${JSON.stringify(errorVideo)}`)

    try {
      await Honeybadger.notifyAsync({
        message: 'BROKEN VIDEO',
        context: {
          video_url: videoUrl,
          ...errorVideo
        }
      })
    } catch (e) {
      console.log(e)
    }

    if (currentVideoIndex === 0 || !videoUrl) {
      window.location.reload()
    } else {
      internalPlayer.nextVideo()
    }
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