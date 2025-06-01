import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '../../../generated/prisma'


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const groups = await prisma.msp_groups.findMany()
      res.status(200).json(groups)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch MSP groups' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
