import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

// 定義型別
interface CarStation {
  _id: number
  _importdate: {
    date: string
    timezone_type: number
    timezone: string
  }
  序號: string
  廠商: string
  名稱: string
  地址: string
  縣市: string
  縣市代碼: string
}

interface ApiCarResponse {
  result: {
    limit: number
    offset: number
    count: number
    sort: string
    results: CarStation[]
  }
}

export const useApiCar = defineStore('apidatacar', () => {
  const data = ref<ApiCarResponse | null>(null)
  const fixedData = ref<ApiCarResponse | null>(null)

  async function cardata(query = '') {
   
    let url = '/api/car'
    if (query && query !== 'none') {
      url += `?q=${encodeURIComponent(query)}`
    }

    try {
      const response = await axios.get<ApiCarResponse>(url)
      data.value = response.data
      if (!fixedData.value) {
        fixedData.value = response.data // 第一次抓到就存固定資料
      }
      console.log('測試 API:', url)
    } catch (error) {
      console.error('API 請求失敗:', error)
    }
  }

  return {
    data,
    fixedData,
    cardata
  }
})
