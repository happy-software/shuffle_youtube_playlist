import React, { useState, useEffect }  from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import PlaylistSelector from './PlaylistSelector';
import VideoPool from './VideoPool';
import VideoTitleDisplay from './VideoTitleDisplay';
import axios from 'axios';
import LoginButton from './LoginButton';

function ShufflePlayer(props) {
  const [videos, setVideos] = useState([]);
  const [playedHistory, setPlayedHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistIds, setPlaylistIds] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [videoPoolCollapsed, setVideoPoolCollapsed] = useState(true);
  const [videoHistoryPoolCollapsed, setVideoHistoryPoolCollapsed] = useState(false);
  const [locked, setLocked] = useState(false);

  function updateSelectedPlaylists(playlist_id) {
    const newPlaylists = playlists.map(p => {
      if (p.playlist_id === playlist_id) { 
        return {
          ...p,
          is_default: !p.is_default,
        }
      }
      return p;
    });
    setPlaylists(newPlaylists);
    setPlaylistIds(newPlaylists.filter(p => p.is_default).map(p => p.playlist_id));
  }

  function getUserPlaylists(user, access_token) {
    if(!locked){
      setLocked(true);
      axios.get(AppConstants.APIEndpoints.YOUTUBE_PLAYLISTS, {
        headers: { Authorization: "Bearer " + access_token },
        params: { part: 'id', mine: true }
      })
      .then(response => console.log(response))
      .catch(e => console.log(`Couldn't retrieve user playlists! ${e}`))
      .finally(setLocked(false))
    }
  }

  function getTrackedPlaylists() {
    axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
    .then(response => {
      setPlaylists(response.data)
      setPlaylistIds(response.data.filter(p => p.is_default).map(p => p.playlist_id));
    })
    .catch((e) => console.log(`Couldn't retrieve tracked playlists! ${e}`))
  }

  function getComposedPlaylist() {
    const body = {
      playlistIds: playlistIds
    }
    axios.post(AppConstants.APIEndpoints.SHUFFLE, body)
    .then(response => {
      setVideos(response.data.songs);
    })
    .catch((e) => console.log(`Couldn't retrieve playlist videos! ${e}`))
  }

  function pickNextVideo(event, videoId) {
    if (!Array.isArray(videos) || !videos.length) return;

    var nextVideo = null;
    if (!!videoId) {
      nextVideo = videos[videos.findIndex(v => v.video_id === videoId)]
    } else {
      nextVideo = videos[Math.floor(Math.random()*videos.length) % videos.length];
      setCurrentVideoId(nextVideo.video_id);
    }

    setCurrentTitle(nextVideo.title);
    setPlayedHistory(playedHistory.concat(nextVideo))

    console.log(`${playedHistory.length}: https://youtube.com/watch?v=${nextVideo.video_id}\t${nextVideo.title}`);
  }

  useEffect(() => {
    getComposedPlaylist();
    getTrackedPlaylists();
  }, []);

  useEffect(() => { 
    pickNextVideo();
  }, [videos])

  return (
    <div>
      <Player 
        videoId={currentVideoId} 
        onEnd={() => pickNextVideo()}
      />
      <div className='contentRow'>
        <VideoTitleDisplay 
          key={currentVideoId}
          videoId={currentVideoId} 
          title={currentTitle}
          className='currentVideoTitle' 
        />
        <LoginButton isSignedIn={() => getUserPlaylists()} />
        <button 
          onClick={() => pickNextVideo()}
          className='nextVideoButton'
        >Next Video</button>
      </div>
      <div className='contentRow'>
        <PlaylistSelector 
          playlists={playlists} 
          onChange={() => updateSelectedPlaylists()}
          onShuffle={() => getComposedPlaylist()}
          className='playlistSelector'
        />
        <VideoPool 
          title='Composed Playlist'
          videos={videos} 
          currentVideoIndex={currentVideoId}
          collapsed={videoPoolCollapsed}
          setCollapsed={setVideoPoolCollapsed}
          onVideoClicked={() => pickNextVideo()}
          className='videoPool'
        />
        <VideoPool 
          title='Video History'
          videos={playedHistory} 
          collapsed={videoHistoryPoolCollapsed}
          setCollapsed={setVideoHistoryPoolCollapsed}
          currentVideoIndex={currentVideoId}
          onVideoClicked={() => pickNextVideo()}
          className='videoPool'
        />
      </div>
    </div>
  )
}

export default ShufflePlayer;
