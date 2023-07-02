import { useState, useEffect, }  from 'react'
import axios from 'axios'
import AppConstants from '../AppConstants'

const initialFetchResult = {
  videos: [],
  isLoaded: false, 
  error: null,
  isError: false,
}

export default function useVideoHook(initialPlaylistIds) {
  const [playlistIds, setPlaylistIds] = useState(initialPlaylistIds)
  const [fetchResult, setFetchResult] = useState(initialFetchResult)
  useEffect(() => { fetchData(playlistIds, setFetchResult) }, [playlistIds])
  return [fetchResult, setPlaylistIds]
}

async function fetchData(ids, setResult) {
  try { 
    setResult(initialFetchResult)
    const response = await axios.post(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: ids })
    setResult({
      ...initialFetchResult,
      videos: response.data.songs,
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