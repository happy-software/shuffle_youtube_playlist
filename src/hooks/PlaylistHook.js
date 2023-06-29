import {
    useState, 
    useEffect,
  }  from 'react'
  import axios from 'axios'
  import AppConstants from '../AppConstants'
  
  const initialFetchResult = {
    playlists: [],
    isLoaded: false, 
    error: null,
    isError: false,
  }
  
  export default function PlaylistHook() {
    const [playlistIds, setPlaylistIds] = useState([])    
    const [fetchResult, setFetchResult] = useState(initialFetchResult)
    useEffect(() => { fetchData(playlistIds, setFetchResult) }, [playlistIds])
    return [fetchResult, setPlaylistIds]
  }
  
  async function fetchData(ids, setResult) {
    try { 
      setResult(initialFetchResult)      
      const response = await axios.get(AppConstants.APIEndpoints.TRACKED_PLAYLISTS)
      setResult({
        ...initialFetchResult,
        playlists: response.data,
        isLoaded: true
      })
    } catch (error) {
      setResult({
        ...initialFetchResult,
        error: error,
        isError: true
      })
    }
  }