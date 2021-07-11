// let APIRoot = "http://localhost:8000"; // When running locally
let APIRoot = "https://happy-youtube-watcher.herokuapp.com";
export default {
  APIEndpoints: {
    SHUFFLE: APIRoot + "/shuffle",
    TRACKED_PLAYLISTS: APIRoot + "/tracked-playlists",
    TRACKED_VIDEOS:    APIRoot + "/videos",
  },
};