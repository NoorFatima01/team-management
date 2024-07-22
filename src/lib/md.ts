import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export type Frontmatter = {
  title: string;
  description: string;
  tags: string[];
  isPublished: boolean;
  image: string;
  publishedDate: string;
};

export type Post = {
  frontmatter: Frontmatter;
  slug: string;
};

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`); // Get full path
};

export const getFileContent = (filename: string, folder: string) => {
  const POSTS_PATH = getPath(folder);
  return fs.readFileSync(path.join(POSTS_PATH, filename), 'utf8');
};

export const getAllPosts = (folder: string) => {
  const POSTS_PATH = getPath(folder);

  return (
    fs
      .readdirSync(POSTS_PATH) // get files in directory
      // .filter((path) => /\\.md?$/.test(path)) // only .md files
      .filter((file) => file.endsWith('.md'))
      .map((fileName) => {
        // map over each file
        const source = getFileContent(fileName, folder); // retrieve the file contents
        const slug = fileName.replace(/\.md?$/, ''); // get the slug from the filename
        const { data } = matter(source); // extract frontmatter
        return {
          frontmatter: data as Frontmatter, // cast data to Frontmatter
          slug: slug,
        };
      })
  );
};

export const getAllPublished = (folder: string) => {
  const posts = getAllPosts(folder);

  const published = posts.filter((post) => {
    return post.frontmatter.isPublished === true;
  });

  return published;
};

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder);
  const { data: frontmatter, content } = matter(source);

  return {
    frontmatter,
    content,
  };
};
