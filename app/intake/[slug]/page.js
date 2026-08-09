import { Suspense } from 'react';
import IntakeWizard from '@/components/IntakeWizard';
import Back from '@/components/Back';

// A personalized link — /intake/marcus. The slug ties the submission to a
// client and keys their autosave, so the same link resumes where they left off.
// Static routes win over this one in Next's matcher, so /intake/christian keeps
// its own hand-built page.

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `intake — ${slug} — vveritas*` };
}

export default async function ClientIntakePage({ params }) {
  const { slug } = await params;

  // The slug identifies the client; it does NOT prefill their name. A slug is a
  // first name or a nickname, and dropping "marcus" into a required "full name"
  // field just teaches people to trust the form less. Real prefill comes from
  // ?name= on the enrollment link.
  return (
    <div className="page ik-page">
      <Back href="/work" />
      <Suspense fallback={null}>
        <IntakeWizard slug={slug} />
      </Suspense>
    </div>
  );
}
