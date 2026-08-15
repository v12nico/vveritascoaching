import { notFound } from 'next/navigation'
import olaf from '@/lib/clients/olaf'
import fanta from '@/lib/clients/fanta'
import ClientProgram from './ClientProgram'

// Token in the URL rather than a name: /client/olaf would be guessable, and this
// page carries his body weight, his schedule and his own words about why he's here.
const CLIENTS = { [olaf.token]: olaf, [fanta.token]: fanta }

export async function generateMetadata({ params }) {
  const { token } = await params
  const c = CLIENTS[token]
  return { title: c ? `${c.name.toLowerCase()} — vveritas*` : 'vveritas*' }
}

export default async function ClientPage({ params }) {
  const { token } = await params
  const client = CLIENTS[token]
  if (!client) notFound()
  return <ClientProgram c={client} />
}
