import {
    useState, 
    useEffect,
    useReducer,
}  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';

const videoFetchReducer = (_, event) => {
  switch (event.type) {
    case 'FETCH_SUCCESS':
      return {
        videos: event.data.songs,
        isLoaded: true,
        isError: false,
      };
    case 'FETCH_FAILURE':
      const reducedState = {
        videos: [],
        isLoaded: false,
        error: event.error,
        isError: true,
      };
      console.log("Error encountered during video fetch");
      console.log(reducedState);
      return reducedState;
    default:
      throw new Error(`Unhandled event type: ${event.type}`);
  }
};

const fetchData = async (url, requestBody, raiseEvent, isCancelled) => {
  try {
    const result = await axios.post(url, requestBody);
    if (isCancelled) return;
    raiseEvent({ type: 'FETCH_SUCCESS', data: result.data });
  } catch (error) {
    if (isCancelled) return;
    raiseEvent({ type: 'FETCH_FAILURE', error: error.message });
  }
};

export default function useVideoHook(initialPlaylistIds) {
  const [playlistIds, setPlaylistIds] = useState(initialPlaylistIds);
  const [isCancelled, setIsCancelled] = useState(false);
  const [reducedState, setReducedState] = useReducer(videoFetchReducer, {
    videos: [],
    isLoaded: false, 
    isError: false,
  });

  useEffect(() => {
    fetchData(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: playlistIds }, setReducedState, isCancelled);
    return () => setIsCancelled(true);
  }, [playlistIds, isCancelled]);

  return [reducedState, setPlaylistIds];
};
