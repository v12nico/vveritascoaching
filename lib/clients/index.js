import olaf from './olaf'
import fanta from './fanta'
import demo from './demo'
import demoCut from './demoCut'

// Single registry. Adding a client is one import and one array entry here —
// the page and all three API routes read from this, so a new dashboard goes
// live without touching four files and forgetting the fourth.
export const ALL = [olaf, fanta, demo, demoCut]

export const CLIENTS = Object.fromEntries(ALL.map(c => [c.token, c]))

export const getClient = (token) => CLIENTS[token] ?? null

export default CLIENTS
