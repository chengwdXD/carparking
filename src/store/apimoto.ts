import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
interface MotoStation {
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

interface ApiMotoResponse {
  result: {
    limit: number
    offset: number
    count: number
    sort: string
    results: MotoStation[]
  }
}
export const useApiMoto = defineStore('apidatamoto', () => {
  const data = ref<ApiMotoResponse | null>(null)
    const fixedData = ref<ApiMotoResponse | null>(null)

  async function motodata(query = '') {
    let url = '/api/moto'

    if (query && query !== 'none') {//如果有帶搜尋條件時
      url += `?q=${encodeURIComponent(query)}`
    }

    try {
      const response = await axios.get<ApiMotoResponse>(url)
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
    motodata
  }
})