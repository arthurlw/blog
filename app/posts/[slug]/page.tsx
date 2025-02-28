import { format } from 'date-fns';
import Link from 'next/link';
import { getPostContent, getAllPosts } from '@/lib/api';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
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

export default async function Post({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const resolvedParams = await params;
  const post = await getPostContent(resolvedParams.slug);
  
  return (
    <article>
      <header className="mb-8 pb-4 border-b border-gray-100">
        <h1 className="mb-2">{post.title}</h1>
        <div className="text-gray-500 text-sm">
          {format(new Date(post.date), 'MMMM dd, yyyy')}
          {post.author && <span> • By {post.author}</span>}
        </div>
      </header>
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      
      <div className="mt-8 pt-4 border-t border-gray-100">
        <Link href="/" className="text-accent hover:underline">
          ← Back to home
        </Link>
      </div>
    </article>
  );
}