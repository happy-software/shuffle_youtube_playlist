// let APIRoot = "http://localhost:8000"; // When running locally
let APIRoot = "https://happy-youtube-watcher.herokuapp.com";
const AppConstants = {
  APIEndpoints: {
    SHUFFLE: APIRoot + "/shuffle",
    TRACKED_PLAYLISTS: APIRoot + "/tracked-playlists",
    TRACKED_VIDEOS:    APIRoot + "/videos",
  },
}
export default AppConstants;
