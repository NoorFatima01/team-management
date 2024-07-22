import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Post } from '@/lib/md';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type Props = {
  post: Post;
};

const BlogCard = ({ post }: Props) => {
  return (
    <div className='m-4'>
      <Card>
        <div className='flex'>
          <div className='flex-1 self-center'>
            <CardHeader>
              <CardTitle>{post.frontmatter.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <div>
                  {post.frontmatter.description} <br />
                  {post.frontmatter.publishedDate}
                </div>
              </CardDescription>
            </CardContent>
            <CardContent>
              <Link href={`/blogs/${post.slug}`}>
                <div className='text-primary hover:underline'>Read More</div>
              </Link>
            </CardContent>
          </div>

          <Separator className='h-[15rem]' orientation='vertical' />

          <Image
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={200}
            height={250}
            loading='lazy'
          />
        </div>
      </Card>
    </div>
  );
};

export default BlogCard;
