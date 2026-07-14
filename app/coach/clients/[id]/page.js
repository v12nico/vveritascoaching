import { notFound } from 'next/navigation';
import {
  clients, programs, messages, nutrition,
  pillars, pillarDetails, missions, objectives,
} from '../../../../lib/mockData';
import ClientDetailClient from './ClientDetailClient';

export default async function ClientDetailPage({ params }) {
  const { id } = await params;
  const client = clients.find(c => c.id === id);
  if (!client) notFound();

  return (
    <ClientDetailClient
      client={client}
      program={programs.find(p => p.assignedTo.includes(id)) || null}
      thread={messages.find(m => m.clientId === id) || null}
      nutri={nutrition.find(n => n.clientId === id) || null}
      pillarData={pillars.find(p => p.clientId === id) || null}
      pillarDetailsData={pillarDetails.find(p => p.clientId === id) || null}
      mission={missions.find(m => m.clientId === id) || null}
      objectiveData={objectives.find(o => o.clientId === id) || null}
    />
  );
}
