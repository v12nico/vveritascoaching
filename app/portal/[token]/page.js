import { notFound } from 'next/navigation';
import { clients, programs, messages, nutrition } from '../../../lib/mockData';
import PortalClient from './PortalClient';

export default async function PortalPage({ params }) {
  const { token } = await params;
  const client = clients.find(c => c.token === token);
  if (!client) notFound();

  const program = programs.find(p => p.assignedTo.includes(client.id));
  const thread = messages.find(m => m.clientId === client.id);
  const nutri = nutrition.find(n => n.clientId === client.id);

  return (
    <PortalClient
      client={client}
      program={program || null}
      thread={thread || null}
      nutri={nutri || null}
    />
  );
}
