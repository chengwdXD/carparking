import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get(
      'https://data.taipei/api/v1/dataset/739cec36-ed1b-4b92-b1f3-ffadf05fe6c7',
      {
        params: {
          scope: 'resourceAquire',
          limit: 1000,
          q: req.query.q || undefined, // 支援查詢參數
        },
      }
    )

    // 回傳 JSON 給前端
    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(500).json({ error: 'Fetch failed', details: error.message })
  }
}
