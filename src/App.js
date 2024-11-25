import React from 'react';
import './App.css';
import Searchbar from './features/search/Searchbar';
import SubredditsList from './features/subreddit/SubredditsList';
import PostList from './features/post/PostList';

function App() {
  return (
    <>
      <Searchbar />
      <SubredditsList />
      <PostList />
    </>
  );
}

export default App;
