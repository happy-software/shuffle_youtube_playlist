import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConstants from '../AppConstants';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import SearchField from 'react-search-field'

const List = props => (
  <div className="list">
    <div className="list-header">
      {/* once we decide on a table structure, we can fill out the headers here */}
    </div>

    <div className="list-body">
      {
        filteredList(props.queryString, props.list).map((item, index) => (
          <ul key={index}>
            <li>
              <a href={`https://youtube.com/watch?v=${item.videoId}`}
                target="_blank"
                rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          </ul>
        ))
      }
    </div>
  </div>
);

function filteredList(queryString, list) {
  return list.filter(item => matchingItem(item, queryString))
}

function matchingItem(item, queryString) {
  if (queryString === "") { return true }
  queryString = queryString.toLowerCase();
  if (item.videoId.toString().toLowerCase().search(queryString) >= 0 ||
    item.title.toString().toLowerCase().search(queryString) >= 0 ||
    item.description.toString().toLowerCase().search(queryString) >= 0
  ) {
    return true;
  }

  return false;
}

function PlaylistsSearch(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState([]);
  const [queryString, setQueryString] = useState("");

  useEffect(loadVideos, [isLoaded]);

  function loadVideos() {
    if (isLoaded) return;
    axios.get(AppConstants.APIEndpoints.TRACKED_VIDEOS)
      .then(response => {
        setIsLoaded(true);
        setLoadedVideos(response.data)
      })
      .catch(error => console.log(`Couldn't retrieve tracked videos: ${error}`))
  }

  return (
    <div>
      <div className="pageTitle">Search All Videos</div>
      <div className="searchFieldContainer">
        <SearchField classNames="searchField" onChange={(value) => setQueryString(value)} placeholder="Search Videos..." />
      </div>
      {!isLoaded ? <LoadingPlaceholder /> : <List queryString={queryString} list={loadedVideos} />}
    </div>
  );
}

export default PlaylistsSearch;