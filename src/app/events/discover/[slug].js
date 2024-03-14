import { useRouter } from 'next/router';
import { URL } from '@/utils/globals';

const Post = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch data for the specific post using slug
  let res = await axios.get(`${URL}/api/events/id=${slug}`);

  return {
    props: { post },
  };
}

export default Post;
