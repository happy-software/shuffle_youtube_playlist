import {
    useState, 
    useEffect,
    useReducer,
}  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';

const stateEventReducer = (state, event) => {
  switch (event.type) {
    case 'FETCH_INIT':
      return { 
        ...state, 
        isLoaded: false, 
        isError: false 
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoaded: true,
        isError: false,
        data: {
          loadedVideos: event.payload.songs,
        }
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoaded: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialPlaylistIds, initialData) => {
  // changes in the playlistIds will trigger a fetch
  const [playlistIds, setPlaylistIds] = useState(initialPlaylistIds);

  const initialState = { data: initialData, isLoaded: false, isError: false, };
  // handle updates due to state events
  const [state, updateState] = useReducer(stateEventReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      updateState({ type: 'FETCH_INIT' });

      try {
        console.log("fetching again");
        const requestBody = { playlist_ids: playlistIds };
        const result = await axios.post(AppConstants.APIEndpoints.SHUFFLE, requestBody);

        if (!didCancel) {
          updateState({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          updateState({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [playlistIds]);

  return [state, setPlaylistIds];
};

export default useDataApi;