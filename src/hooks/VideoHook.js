import {
    useState, 
    useEffect,
    useReducer,
}  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';

const initialReducedState = {
  videos: [],
  isLoaded: false, 
  error: null,
  isError: false,
};

const videoFetchReducer = (_, event) => {
  switch (event.type) {
    case 'FETCH_INIT':
      return initialReducedState;
    case 'FETCH_SUCCESS':
      return {
        ...initialReducedState,
        videos: event.data.songs,
        isLoaded: true,
      };
    case 'FETCH_FAILURE':
      const reducedState = {
        ...initialReducedState,
        error: event.error,
        isError: true,
      };
      console.log("Error encountered during video fetch");
      console.log(reducedState.error);
      return reducedState;
    default:
      throw new Error(`Unhandled event type: ${event.type}`);
  }
};

const fetchData = async (url, requestBody, raiseEvent, isCancelled) => {
  raiseEvent({ type: 'FETCH_INIT' });
  try {
    const result = await axios.post(url, requestBody);
    if (isCancelled) return;
    raiseEvent({ type: 'FETCH_SUCCESS', data: result.data });
  } catch (error) {
    if (isCancelled) return;
    raiseEvent({ type: 'FETCH_FAILURE', error: error });
  }
};

export default function useVideoHook(initialPlaylistIds) {
  const [playlistIds, setPlaylistIds] = useState(initialPlaylistIds);
  const [reducedState, setReducedState] = useReducer(videoFetchReducer, initialReducedState);

  useEffect(() => {
    let isCancelled = false;
    fetchData(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: playlistIds }, setReducedState, isCancelled);
    return () => isCancelled = true;
  }, [playlistIds]);

  return [reducedState, setPlaylistIds];
};
