import { getAllPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';

export default function Home() {
  const posts = getAllPosts();
  
  return (
    <>
      <h1 className="mb-10 text-2xl font-bold">Posts</h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}