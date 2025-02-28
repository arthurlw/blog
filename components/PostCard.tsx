import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Post } from '@/lib/api';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="mb-8 pb-8 border-b border-gray-100">
      <h2 className="mb-2 text-2xl">
        <Link href={`/posts/${post.slug}`} className="hover:text-accent no-underline">
          {post.title}
        </Link>
      </h2>
      <div className="text-gray-500 text-sm mb-4">
        {format(parseISO(post.date), 'MMMM dd, yyyy')}
        {post.author && <span> • By {post.author}</span>}
      </div>
      <p className="text-gray-600 text-sm">{post.excerpt}</p>
      <div className="mt-4">
        <Link href={`/posts/${post.slug}`} className="text-accent hover:underline">
          Read more →
        </Link>
      </div>
    </article>
  );
}
