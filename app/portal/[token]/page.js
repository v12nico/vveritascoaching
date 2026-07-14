import { notFound } from 'next/navigation';
import {
  clients, programs, messages, nutrition, groceryLists,
  missions, pillars, objectives, checkInConfig, pillarDetails,
  progressData, inPersonData, coachInfo,
} from '../../../lib/mockData';
import PortalClient from './PortalClient';

export default async function PortalPage({ params }) {
  const { token } = await params;
  const client = clients.find(c => c.token === token);
  if (!client) notFound();

  return (
    <PortalClient
      client={client}
      program={programs.find(p => p.assignedTo.includes(client.id)) || null}
      thread={messages.find(m => m.clientId === client.id) || null}
      nutri={nutrition.find(n => n.clientId === client.id) || null}
      groceryList={groceryLists.find(g => g.clientId === client.id) || null}
      mission={missions.find(m => m.clientId === client.id) || null}
      pillarData={pillars.find(p => p.clientId === client.id) || null}
      objectiveData={objectives.find(o => o.clientId === client.id) || null}
      checkInQ={checkInConfig.find(c => c.clientId === client.id) || null}
      pillarDetailsData={pillarDetails.find(p => p.clientId === client.id) || null}
      progressInfo={progressData.find(p => p.clientId === client.id) || null}
      inPerson={inPersonData.find(d => d.clientId === client.id) || null}
      coachData={coachInfo.find(c => c.clientId === client.id) || null}
    />
  );
}
