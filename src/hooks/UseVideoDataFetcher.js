import { useState, useEffect, } from 'react'
import axios from 'axios'
import AppConstants from '../AppConstants'

const initialFetchResult = {
  videos: [],
  isLoaded: false,
  error: null,
  isError: false,
}

export default function useVideoDataFetcher() {
  const [playlistIds, setPlaylistIds] = useState([])
  const [fetchResult, setFetchResult] = useState(initialFetchResult)

  // Effect hook for fetching data when playlist IDs change
  useEffect(() => {
    fetchData(playlistIds, setFetchResult)
  }, [playlistIds])
  return [fetchResult, setPlaylistIds]
}

async function fetchData(playlistIds, setFetchResult) {
  setFetchResult(initialFetchResult)

  try {
    const response = await axios.post(AppConstants.APIEndpoints.SHUFFLE, { playlist_ids: playlistIds })

    setFetchResult({
      ...initialFetchResult,
      videos: response.data.songs,
      isLoaded: true
    })
  } catch (error) {
    setFetchResult({
      ...initialFetchResult,
      error: error,
      isError: true
    })
  }
}