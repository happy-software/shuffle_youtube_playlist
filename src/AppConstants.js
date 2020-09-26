let APIRoot = "http://localhost:8000"; // When running locally
// let APIRoot = "https://happy-youtube-watcher.herokuapp.com";
let APIRootYoutube = "https://www.googleapis.com/youtube/v3";
export default {
  APIEndpoints: {
    SHUFFLE: APIRoot + "/shuffle",
    TRACKED_PLAYLISTS: APIRoot + "/tracked-playlists",
    YOUTUBE_PLAYLISTS: APIRootYoutube + "/playlists",
    TRACKED_VIDEOS:    APIRoot + "/videos",
  },
};