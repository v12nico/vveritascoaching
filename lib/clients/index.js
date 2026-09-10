// Extensions are explicit so plain Node can import this too — scripts/ reads
// the registry directly, and bare ESM does not resolve extensionless paths.
import olaf from './olaf.js'
import fanta from './fanta.js'
import tayllore from './tayllore.js'
import demo from './demo.js'
import demoCut from './demoCut.js'

// Single registry. Adding a client is one import and one array entry here —
// the page and all three API routes read from this, so a new dashboard goes
// live without touching four files and forgetting the fourth.
export const ALL = [olaf, fanta, tayllore, demo, demoCut]

export const CLIENTS = Object.fromEntries(ALL.map(c => [c.token, c]))

export const getClient = (token) => CLIENTS[token] ?? null

export default CLIENTS
