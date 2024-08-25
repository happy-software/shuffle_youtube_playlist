// const APIRoot = "http://localhost:8000" // When running locally
const APIRoot = "https://hytw.hebronlab.com"
const appConstants = {
  APIEndpoints: {
    SHUFFLE: APIRoot + "/shuffle",
    TRACKED_PLAYLISTS: APIRoot + "/tracked-playlists",
    TRACKED_VIDEOS: APIRoot + "/videos",
  },
  SelectedPlaylistIdsKey: "selectedPlaylistIds"
}
export default appConstants