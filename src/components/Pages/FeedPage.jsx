import React from 'react';
import Sidebar from '../Feed/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Feed/Widgets';

function FeedPage() {
  return (
    <>
      <Sidebar className="sidebar" />
      <Feed />
      <Widgets />
    </>
  );
}

export default FeedPage;
