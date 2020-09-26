import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import SearchField from 'react-search-field'
import TypeChecker from 'typeco';

const List = props => (
  <div className="list">
    <div className="list-header">
      <ul>
        <li>Video ID</li>
        <li>Title</li>
        <li>Playlist ID</li>
        <li>Playlist Name</li>
        <li>Channel</li>
        <li>Description</li>
      </ul>
    </div>

    <div className="list-body">
      {
        filteredList(props.queryString, props.list).map((item, index) => (
          <ul key={index}>
            {/*<li>{item.videoId}</li>*/}
            <li>{item.title}</li>
{/*            <li>{item.playlistId}</li>
            <li>{item.playlistName}</li>
            <li>{item.channelName}</li>
            <li>{item.description}</li>*/}
          </ul>
        ))
      }
    </div>
  </div>
);

function filteredList(queryString, list) {
  // if (videoId, title, playlistId, playlistName, channelName, description)
  //   has *queryString* 
  return list.filter(item => matchingItem(item, queryString))
}

function matchingItem(item, queryString) {
  console.log(`Filtering on list with queryString: ${queryString}`)
  if (queryString === "") { return true } 
  
  if (item.videoId.toString().search(queryString) ||
    item.title.toString().search(queryString)
    ) {
    console.log(`videoID or title includes ${queryString}`)
    return true;
  }
}



function PlaylistsSearch(props) {
  const [loadedVideos, setLoadedVideos] = useState([]);
  const [displayResults, setDisplayResults] = useState([]);
  const [queryString, setQueryString] = useState("");
  const getMatchedList = (searchText) => {
    if (TypeChecker.isEmpty(searchText)) return loadedVideos;
  };

  const handleInput = value => {
    setQueryString(value);
  }

  function loadVideos() {
    axios.get(AppConstants.APIEndpoints.TRACKED_VIDEOS)
    .then(response => setLoadedVideos(response.data))
    .catch(error => console.log(`Couldn't retrieve tracked videos: ${error}`))
  }

  useEffect(loadVideos, []);

  return(
    <div>
      <SearchField onChange={handleInput} placeholder="Search Videos..." />
      <List queryString={queryString} list={loadedVideos} />
    </div>
    );
}

export default PlaylistsSearch;  