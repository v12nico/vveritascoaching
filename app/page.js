import Link from 'next/link';

export default function Landing() {
  return (
    <main className="landing">
      <Link href="/work" className="landing-enter">enter →</Link>
      <Link href="/work" className="landing-mark">
        <h1>vveritas*</h1>
        <div className="sub">coaching</div>
      </Link>
    </main>
  );
}
