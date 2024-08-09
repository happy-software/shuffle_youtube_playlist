import { useState } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import useEffectOnce from './UseEffectOnce';

export default function usePlaylistDataFetcher(initialPlaylistIds) {
    const [playlists, setPlaylists] = useState([]);

    useEffectOnce(() => {
        axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
            .then(response => {
                response.data = response.data.map(item => ({
                    ...item,
                    is_default: initialPlaylistIds.length > 0 ? initialPlaylistIds.includes(item.playlist_id) : item.is_default
                }))
                setPlaylists(response.data)
            })
            .catch(error => console.log(`Couldn't retrieve tracked playlists! ${error}`))
    }, [initialPlaylistIds]);

    return [playlists, setPlaylists];
}