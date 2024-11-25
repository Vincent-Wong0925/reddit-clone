import React from 'react';
import './App.css';
import Searchbar from './features/search/Searchbar';
import SubredditsList from './features/subreddit/SubredditsList';
import PostList from './features/post/PostList';

function App() {
  return (
    <>
      <Searchbar />
      <div className='content-container'>
        <SubredditsList />
        <PostList />
      </div>
    </>
  );
}

export default App;
