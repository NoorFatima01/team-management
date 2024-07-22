import React from 'react';

import type { Post } from '@/lib/md';
import { getAllPublished } from '@/lib/md';

import BlogCard from '@/components/blog-card';
import PageDescriptionHeader from '@/components/layout/page-description-header';

const BlogsPage = async () => {
  const fetchPosts = async () => {
    const posts: Post[] = getAllPublished('src/blog-content');
    return posts;
  };

  const posts = await fetchPosts();

  return (
    <div className='m-6'>
      <div className='ml-6 mb-6'>
        <PageDescriptionHeader title='Blog Posts' />
      </div>
      {posts.map((post: Post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogsPage;
