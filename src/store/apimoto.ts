import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useApiMoto = defineStore('apidatamoto', () => {
  const data = ref<any>(null)//ts的型別

  async function motodata(query = '') {
    let url = '/api/moto'

    if (query && query !== 'none') {//如果有帶搜尋條件時
      url += `&q=${encodeURIComponent(query)}`
    }

    try {
      const response = await axios.get(url)
      data.value = response.data
      console.log('測試 API:', url)
    } catch (error) {
      console.error('API 請求失敗:', error)
    }
  }

  return {
    data,
    motodata
  }
})