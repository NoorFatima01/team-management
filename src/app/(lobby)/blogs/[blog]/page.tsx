import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import React from 'react';

import { getAllPublished, getSinglePost } from '@/lib/md';

type Props = {
  params: { blog: string };
};

const SingleBlog = ({ params }: Props) => {
  const { blog } = params;
  const post = getSinglePost(blog, 'src/blog-content');
  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='flex justify-center mb-4'>
        {post.frontmatter.tags.map((tag: string) => (
          <p
            key={tag}
            className='mr-2 bg-primary rounded-full px-4 py-1 text-foreground-muted'
          >
            {tag}
          </p>
        ))}
      </div>
      <div>
        <div className='prose dark:prose-invert mx-auto'>
          <Markdown>{post.content}</Markdown>
        </div>
        <div className='flex justify-center mt-8'>
          <Link href='/blogs'>
            <p className='text-primary hover:underline'>Back to Blogs</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const paths = getAllPublished('src/blog-content').map(({ slug }) => ({
    params: { blog: slug },
  }));
  return paths;
}

export default SingleBlog;
