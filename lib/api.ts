import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
};

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
  } catch (error) {
    console.error('Error reading post directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Ensure the date is a valid ISO string
  const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

  return {
    slug: realSlug,
    title: data.title,
    date: date,
    excerpt: data.excerpt || '',
    content,
    coverImage: data.coverImage || null,
    author: data.author || null,
  };
}

export async function getPostContent(slug: string) {
  const post = getPostBySlug(slug);
  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return {
    ...post,
    content: contentHtml,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAdjacentPosts(currentSlug: string) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);
  
  return {
    nextPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    previousPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}