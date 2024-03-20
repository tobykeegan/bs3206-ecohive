import { getServerSession } from 'next-auth';

export default async function eventPost({ params: { slug } }) {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  console.log('slug', slug);
  return (
    <p className="text-2xl">
      Showing the event post for the slug <strong>{slug}</strong>
    </p>
  );
}
