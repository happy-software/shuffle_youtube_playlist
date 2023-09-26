import { useState, useEffect } from 'react';
import useVideoDataFetcher from '../hooks/UseVideoDataFetcher';

export default function useVideoPlayer(selectedPlaylistIds) {
    const [currentVideo, setCurrentVideo] = useState({})
    const [playedVideos, setPlayedVideos] = useState([])
    const [hideDescription, setHideDescription] = useState(true)
    const [videoFetchResult, setVideoFetchPlaylistIds] = useVideoDataFetcher(selectedPlaylistIds)

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

    return {
        currentVideo,
        playedVideos,
        pickNextVideo,
        playVideo,
        setVideoFetchPlaylistIds,
        hideDescription,
        setHideDescription,
        isLoaded: videoFetchResult.isLoaded
    };
}
