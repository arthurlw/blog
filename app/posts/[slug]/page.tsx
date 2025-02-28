import { format } from 'date-fns';
import Link from 'next/link';
import { getPostContent, getAllPosts, getAdjacentPosts } from '@/lib/api';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostContent(resolvedParams.slug);
  
  return {
    title: `${post.title} | Minimalist Markdown Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPostContent(resolvedParams.slug);
  const { nextPost, previousPost } = getAdjacentPosts(resolvedParams.slug);
  
  return (
    <article>
      <header className="mb-8 pb-4 border-b border-gray-100">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <div className="text-gray-500 text-sm">
          {format(new Date(post.date), 'MMMM dd, yyyy')}
          {post.author && <span> • By {post.author}</span>}
        </div>
      </header>
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
        {previousPost ? (
          <Link 
            href={`/posts/${previousPost.slug}`} 
            className="text-accent hover:underline"
          >
            ← Previous post
          </Link>
        ) : (
          <Link href="/" className="text-accent hover:underline">
            ← Back to home
          </Link>
        )}
        {nextPost && (
          <Link 
            href={`/posts/${nextPost.slug}`} 
            className="text-accent hover:underline"
          >
            Next post →
          </Link>
        )}
      </div>
    </article>
  );
}