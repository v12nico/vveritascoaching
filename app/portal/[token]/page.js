import { notFound } from 'next/navigation';
import {
  clients, programs, messages, nutrition, groceryLists,
  missions, pillars, objectives, checkInConfig,
} from '../../../lib/mockData';
import PortalClient from './PortalClient';

export default async function PortalPage({ params }) {
  const { token } = await params;
  const client = clients.find(c => c.token === token);
  if (!client) notFound();

  const program     = programs.find(p => p.assignedTo.includes(client.id)) || null;
  const thread      = messages.find(m => m.clientId === client.id) || null;
  const nutri       = nutrition.find(n => n.clientId === client.id) || null;
  const groceryList = groceryLists.find(g => g.clientId === client.id) || null;
  const mission     = missions.find(m => m.clientId === client.id) || null;
  const pillarData  = pillars.find(p => p.clientId === client.id) || null;
  const objectiveData = objectives.find(o => o.clientId === client.id) || null;
  const checkInQ    = checkInConfig.find(c => c.clientId === client.id) || null;

  return (
    <PortalClient
      client={client}
      program={program}
      thread={thread}
      nutri={nutri}
      groceryList={groceryList}
      mission={mission}
      pillarData={pillarData}
      objectiveData={objectiveData}
      checkInQ={checkInQ}
    />
  );
}
