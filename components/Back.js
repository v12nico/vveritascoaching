import Link from 'next/link';

export default function Back({ href = '/work' }) {
  return (
    <Link href={href} className="back">←</Link>
  );
}
