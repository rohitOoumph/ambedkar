import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'pledge-submissions.json')

export interface PledgeSubmission {
  name: string
  email: string
  timestamp: string
  date: string
}

export async function savePledgeSubmission(name: string, email: string): Promise<void> {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true })

    // Read existing submissions
    let submissions: PledgeSubmission[] = []
    try {
      const fileContent = await fs.readFile(SUBMISSIONS_FILE, 'utf-8')
      submissions = JSON.parse(fileContent)
    } catch (error) {
      // File doesn't exist yet, start with empty array
      submissions = []
    }

    // Add new submission
    const newSubmission: PledgeSubmission = {
      name,
      email,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    submissions.push(newSubmission)

    // Write back to file
    await fs.writeFile(
      SUBMISSIONS_FILE,
      JSON.stringify(submissions, null, 2),
      'utf-8'
    )
  } catch (error) {
    console.error('Error saving pledge submission:', error)
    // Don't throw - we don't want to fail the request if storage fails
  }
}

export async function getPledgeSubmissions(): Promise<PledgeSubmission[]> {
  try {
    const fileContent = await fs.readFile(SUBMISSIONS_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // File doesn't exist or can't be read
    return []
  }
}

