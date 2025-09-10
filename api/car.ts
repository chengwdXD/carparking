import type { VercelRequest, VercelResponse } from '@vercel/node'//引入vercel提供的型別
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get(
      'https://data.taipei/api/v1/dataset/739cec36-ed1b-4b92-b1f3-ffadf05fe6c7',
      {
        params: {
          scope: 'resourceAquire',
          limit: 1000,
          q: req.query.q || undefined, // 有帶參數或空值
          //https://data.taipei/api/v1/dataset/739cec36-ed1b-4b92-b1f3-ffadf05fe6c7?scope=resourceAquire?q=
        },
      }
    )

    // 回傳 JSON 給前端
    res.status(200).json(response.data)
  } catch (error: any) {
    res.status(500).json({ error: 'Fetch failed', details: error.message })
  }
}