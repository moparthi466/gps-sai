import type { NextApiRequest, NextApiResponse } from 'next'
// If you use custom output, update the path below
import { PrismaClient } from '@prisma/client' // or '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const shippers = await prisma.shippers.findMany()
      res.status(200).json(shippers)
    } catch (error) {
      console.error('GET error:', error)
      res.status(500).json({ error: 'Failed to fetch shippers' })
    }
  }

  else if (req.method === 'POST') {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    try {
      const newShipper = await prisma.shippers.create({
        data: { name }
      })
      res.status(201).json(newShipper)
    } catch (error) {
      console.error('POST error:', error)
      res.status(500).json({ error: 'Failed to create shipper' })
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
