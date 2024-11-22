import React from 'react';
import './App.css';
import Searchbar from './features/search/Searchbar';
import SubredditList from './features/subreddit/SubredditList';

function App() {
  return (
    <>
      <Searchbar />
      <SubredditList />
    </>
  );
}

export default App;
