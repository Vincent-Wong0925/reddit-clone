import React from 'react';
import './App.css';
import Searchbar from './features/search/Searchbar';
import SubredditsList from './features/subreddit/SubredditsList';

function App() {
  return (
    <>
      <Searchbar />
      <SubredditsList />
    </>
  );
}

export default App;
