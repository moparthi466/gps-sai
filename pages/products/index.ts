import type { NextApiRequest, NextApiResponse } from 'next'
// Adjust path if using custom output path
import { PrismaClient } from '@prisma/client' // or '@prisma/client' if using default

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.products.findMany()
      res.status(200).json(products)
    } catch (error) {
      console.error('GET error:', error)
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  }

  else if (req.method === 'POST') {
    const { name, quantity_in_stock, unit_price } = req.body

    if (!name || quantity_in_stock == null || unit_price == null) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
      const newProduct = await prisma.products.create({
        data: {
          name,
          quantity_in_stock,
          unit_price
        }
      })
      res.status(201).json(newProduct)
    } catch (error) {
      console.error('POST error:', error)
      res.status(500).json({ error: 'Failed to create product' })
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
