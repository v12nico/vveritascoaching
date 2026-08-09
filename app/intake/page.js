import { Suspense } from 'react';
import IntakeWizard from '@/components/IntakeWizard';
import Back from '@/components/Back';

export const metadata = {
  title: 'intake — vveritas*',
};

export default function IntakePage() {
  return (
    <div className="page ik-page">
      <Back href="/work" />
      <Suspense fallback={null}>
        <IntakeWizard />
      </Suspense>
    </div>
  );
}
