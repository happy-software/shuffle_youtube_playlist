// const APIRoot = "http://localhost:8000"; // When running locally
const APIRoot = "https://happy-youtube-watcher.herokuapp.com";
const appConstants = {
  APIEndpoints: {
    SHUFFLE: APIRoot + "/shuffle",
    TRACKED_PLAYLISTS: APIRoot + "/tracked-playlists",
    TRACKED_VIDEOS:    APIRoot + "/videos",
  },
};

export default appConstants;