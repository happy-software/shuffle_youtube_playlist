import { useState, useEffect } from 'react';
import useVideoDataFetcher from '../hooks/UseVideoDataFetcher';

export default function useVideoPlayer(selectedPlaylistIds) {
    const [currentVideos, setCurrentVideos] = useState([])
    const [videoFetchResult, setVideoFetchPlaylistIds] = useVideoDataFetcher(selectedPlaylistIds)

    useEffect(shuffleVideos, [videoFetchResult])

    function shuffleVideos() {
        if (!videoFetchResult.isLoaded) { return; }
        const shuffledVideos = fisherYatesShuffle([...videoFetchResult.videos])
        setCurrentVideos(shuffledVideos)
    }

    function fisherYatesShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    return {
        currentVideos,
        setVideoFetchPlaylistIds,
        isLoaded: videoFetchResult.isLoaded
    };
}
