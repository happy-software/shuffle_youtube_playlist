import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import LoginButton from '../components/LoginButton';
import Player from '../components/Player';
import PlaylistSelector from '../components/PlaylistSelector';
import VideoPool from '../components/VideoPool';
import VideoTitleDisplay from '../components/VideoTitleDisplay';

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState('');

  function updateSelectedPlaylists(playlist_id,selected) {
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

  function onSelectNone() {
    const newPlaylists = playlists.map(p => {
      return {
        ...p,
        is_default: false,
      }
    });
    setPlaylists(newPlaylists);
    setPlaylistIds([]);
  }

  function getUserPlaylists(googleUser, access_token) {
    if(!locked){
      setLocked(true);
      console.log(user);
      console.log(accessToken);
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
      playlist_ids: playlistIds
    }
    axios.post(AppConstants.APIEndpoints.SHUFFLE, body)
    .then(response => {
      setVideos(response.data.songs);
    })
    .catch((e) => console.log(`Couldn't retrieve playlist videos! ${e}`))
  }

  function pickNextVideo(videoId) {
    if (!Array.isArray(videos) || !videos.length) return;

    var nextVideo = null;
    if (!!videoId) {
      nextVideo = videos[videos.findIndex(v => v.video_id === videoId)]
    } else {
      nextVideo = videos[Math.floor(Math.random()*videos.length) % videos.length];
    }

    setCurrentVideoId(nextVideo.video_id);
    setCurrentTitle(nextVideo.title);
    setPlayedHistory(playedHistory.concat(nextVideo))

    console.log(`${playedHistory.length}: https://youtube.com/watch?v=${nextVideo.video_id}\t${nextVideo.title}`);
  }

  useEffect(getComposedPlaylist, []);
  useEffect(getTrackedPlaylists, []);
  useEffect(pickNextVideo, [videos]);
  useEffect(getUserPlaylists, [isLoggedIn]);

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
        <LoginButton 
          isLoggedIn = {isLoggedIn}
          setIsLoggedIn = {setIsLoggedIn}
          setUser = {setUser}
          setAccessToken = {setAccessToken}
        />
        <button 
          onClick={() => pickNextVideo()}
          className='nextVideoButton'
        >Next Video</button>
      </div>
      <div className='contentRow'>
        <PlaylistSelector 
          playlists={playlists} 
          onCheckboxChange={(playlist_id) => updateSelectedPlaylists(playlist_id)}
          onShuffle={() => getComposedPlaylist()}
          onSelectNone={() => onSelectNone()}
          className='playlistSelector'
        />
        <VideoPool 
          title='Composed Playlist'
          videos={videos} 
          currentVideoIndex={currentVideoId}
          collapsed={videoPoolCollapsed}
          setCollapsed={setVideoPoolCollapsed}
          onVideoClicked={(videoId) => pickNextVideo(videoId)}
          className='videoPool'
        />
        <VideoPool 
          title='Video History'
          videos={playedHistory} 
          collapsed={videoHistoryPoolCollapsed}
          setCollapsed={setVideoHistoryPoolCollapsed}
          currentVideoIndex={currentVideoId}
          onVideoClicked={(videoId) => pickNextVideo(videoId)}
          className='videoPool'
        />
      </div>
    </div>
  )
}

export default ShufflePlayer;
