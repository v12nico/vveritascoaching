import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="void">
      <p>nothing here.</p>
      <Link href="/">← back</Link>
    </main>
  );
}
