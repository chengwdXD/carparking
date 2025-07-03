<script setup lang="ts">
  import { ref,onMounted,computed } from 'vue'
  import { useApiMoto } from '../store/apimoto.ts'
  import searchinput from '../components/searchinput.vue'
  import DarkChange from '../components/DarkChange.vue'
  import Swal from 'sweetalert2'
  const apiCarStore = useApiMoto()
    const datadate = ref<string>('')
  onMounted(async () => {//頁面一載入執行api
 await apiCarStore.motodata('') 

  console.log('API 回傳資料:', apiCarStore.data)
  // console.log('API 總數:', apiCarStore.data.result.count)
  // console.log('總頁數',totalpages.value);
  const date = apiCarStore.data?.result?.results?.[0]?._importdate?.date
  if (typeof date === 'string') {
    datadate.value = date.split(' ')[0]
  } 
})
const searchselect = ref('地址'); //下拉選單預設地址
const searchQuery = ref('')//搜尋條件

const submitSearch = async () => {//按鈕送出事件
  if (!searchQuery.value.trim()) {
    await Swal.fire({
      title: '請輸入搜尋條件',
      confirmButtonText: '確定',
      confirmButtonColor:'#3490dc'
    });
    return;
  }
  const query = `${searchselect.value} ${searchQuery.value}`;
  // 呼叫 API
  await apiCarStore.motodata(query);
  // console.log('搜尋關鍵字:', query);
  console.log('API 回傳資料:', apiCarStore.data)
  // console.log('API 總數:', apiCarStore.data.result.count)
}
const datacount = computed(() => apiCarStore.data?.result?.count || 0)
// const datadate =  computed(() =>apiCarStore.data?.result?.results[0]._importdate.date.split(' ')[0])

//分頁功能
const currentpage = ref(1)
const pageview: number = 20 //一頁最多20筆
const totalpages = computed(() => {
    if (!apiCarStore.data) return 0
    return Math.ceil(apiCarStore.data.result.results.length / pageview)
  })
const totalpagesarray = computed(() => {
    const pages = []
    let startPage = Math.max(currentpage.value - 1, 1)//限制至少為1
    let endPage = Math.min(currentpage.value + 1, totalpages.value)//限制不大於總頁數
  
    // 頁碼顯示範圍
    if (startPage > 1) {
      pages.push(1)  // 第一頁
      if (startPage > 2) pages.push('...')  // 顯示省略號
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  
    if (endPage < totalpages.value) {
      if (endPage < totalpages.value - 1) pages.push('...')  // 顯示省略號
      pages.push(totalpages.value)  // 最後一頁
    }
  
    return pages
  })

 const pageshowdata = computed(() => {
    if (!apiCarStore.data) return []
    const start = (currentpage.value - 1) * pageview
    const end = start + pageview
    return apiCarStore.data.result.results.slice(start, end)
  })

    const gotopage = (page: string | number) => {
    if (typeof page === "number" && page >= 1 && page <= totalpages.value) {
      currentpage.value = page
      window.scrollTo({ top: 0, behavior: "smooth" })//畫面滾到置頂
    }
  }
</script>
<template>
   <div class="relative flex justify-center  min-h-screen bg-gray-100  bg-[url('/images/changemoto.png')] bg-[length:100%_100%] bg-no-repeat bg-center ">
    <div class="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
      <div class="w-full max-w-5xl bg-white  dark:bg-[lightslategray]  shadow-md rounded-lg p-6 z-10">
        <div class="font-mono">臺北市電動車充電站資訊</div>
   <div  class="p-4 flex items-center space-x-2 mx-auto max-w-3xl flex-col md:flex-row">
        <select v-model="searchselect" class="dark:bg-gray-800 dark:text-white px-4 py-2 border rounded w-full mb-5 md:w-auto md:mb-0 cursor-pointer focus-visible:outline-none">
          <option value="地址">地址</option>
          <option value="廠商">廠商</option>
          <option value="名稱">名稱</option>
        </select>
        <!-- 搜尋輸入框 -->
        <searchinput v-model="searchQuery" placeholder="搜尋..." />
        <div class="mt-2 md:mt-0 flex space-x-2 ">
          <button @click="submitSearch" class="bg-blue-700 text-gray-50 px-4 py-2 rounded cursor-pointer">送出</button>
          <DarkChange/>
        </div>
       
      </div>
        <div class="flex text-black">
          <div class="font-mono">資料總數:{{ datacount }}</div>
          <div class="ml-auto text-right font-mono">資料更新日期:{{ datadate }}</div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse border border-gray-300 text-center  ">
            <thead class="bg-gray-900 text-white ">
              <tr>
                <th class="border border-gray-300 px-4 py-2 hidden md:table-cell">#</th>
                <th class="border border-gray-300 px-4 py-2 ">廠商</th>
                <th class="border border-gray-300 px-4 py-2 ">名稱</th>
                <th class="border border-gray-300 px-4 py-2 ">地址</th>
                <th class="border border-gray-300 px-4 py-2 ">google map</th>
              </tr>
            </thead>
          <tbody v-if="apiCarStore.data && apiCarStore.data.result && apiCarStore.data.result.results">
  <tr v-for="(item, key) in pageshowdata" :key="key" class="group">
  <td class="border border-gray-300 px-4 py-2 bg-white dark:bg-[rgb(51,71,94)] text-black dark:text-white group-hover:bg-gray-200 group-hover:dark:bg-[rgb(117,77,77)] hidden md:table-cell">{{ (currentpage - 1) * pageview + key + 1 }}</td>
    <td class="border border-gray-300 px-4 py-2 bg-white dark:bg-[rgb(51,71,94)] text-black dark:text-white group-hover:bg-gray-200 group-hover:dark:bg-[rgb(117,77,77)]">{{ item.廠商 }}</td>
    <td class="border border-gray-300 px-4 py-2 bg-white dark:bg-[rgb(51,71,94)] text-black dark:text-white group-hover:bg-gray-200 group-hover:dark:bg-[rgb(117,77,77)]">{{ item.名稱 }}</td>
    <td class="border border-gray-300 px-4 py-2 bg-white dark:bg-[rgb(51,71,94)] text-black dark:text-white group-hover:bg-gray-200 group-hover:dark:bg-[rgb(117,77,77)]  max-w-xs">{{ item.地址 }}</td>
    <td class="border border-gray-300 px-4 py-2 bg-white dark:bg-[rgb(51,71,94)] text-black dark:text-white group-hover:bg-gray-200 group-hover:dark:bg-[rgb(117,77,77)]">
      <a :href="'https://www.google.com/maps/search/?api=1&query=' + item.地址" target="_blank" class="text-blue-500 flex justify-center">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                      class="size-5 w-8 h-10">
                      <path fill-rule="evenodd"
                        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                        clip-rule="evenodd" />
                    </svg>
      </a>
    </td>
  </tr>
</tbody>

          </table>
        </div>
        <div v-if="!apiCarStore.data" class="text-center text-gray-500 py-4">Loading...</div>
    <!-- 分頁控制 -->
        <div class="flex justify-center mt-4 ">
  
          <button v-if="currentpage > 1" @click="gotopage(currentpage - 1)"
            class="px-4 py-2 bg-gray-300 text-white rounded-md mr-2 cursor-pointer">
            < </button>
            <!--預設隱藏  在sm以上顯示  -->
              <div class="hidden sm:flex items-center">
                <button v-for="page in totalpagesarray" :key="page" @click="gotopage(page)"
                  :class="{ 'bg-blue-500 text-white option': currentpage === page, 'bg-gray-300 text-black': currentpage !== page }"
                  class="px-3 py-2 mx-1 rounded-md cursor-pointer">
                  {{ page }}
                </button>
              </div>
                <!--在sm以上隱藏  -->
              <div class="sm:hidden flex items-center">
                <span class="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
                  {{ currentpage }}
                </span>
              </div>
  
              <button v-if="currentpage < totalpages" @click="gotopage(currentpage + 1)"
                class="px-4 py-2 bg-gray-300 text-white rounded-md ml-2 cursor-pointer">
                >
              </button>
        </div>
  
 
  
      </div>
    </div>
</template>