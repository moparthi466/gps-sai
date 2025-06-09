import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'// adjust if using default @prisma/client

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const statuses = await prisma.order_statuses.findMany()
      res.status(200).json(statuses)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch order statuses' })
    }
  } else if (req.method === 'POST') {
    const { order_status_id, name } = req.body
    try {
      const newStatus = await prisma.order_statuses.create({
        data: {
          order_status_id,
          name
        }
      })
      res.status(201).json(newStatus)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to create order status' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
