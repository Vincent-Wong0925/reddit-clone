import React, { useState } from 'react';
import './App.css';
import Searchbar from './features/search/Searchbar';
import SubredditsList from './features/subreddit/SubredditsList';
import PostList from './features/post/PostList';

function App() {
  const [showSubreddits, setShowSubreddits] = useState(false);

  function toggleSubreddits(e) {
    setShowSubreddits(!showSubreddits);
  }

  return (
    <>
      <Searchbar toggleSubreddits={toggleSubreddits} />
      <div className='content-container'>
        <SubredditsList showSubreddits={showSubreddits} />
        <PostList />
      </div>
    </>
  );
}

export default App;
