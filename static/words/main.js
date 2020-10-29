const url = 'https://service-rv6yi1om-1257430323.gz.apigw.tencentcs.com'

/* eslint-disable-next-line */
const app = new Vue({
  el: '#app',
  data() {
    return {
      inputValue: '',
      wordList: [],
    }
  },
  methods: {
    async getWordList() {
      const res = await fetch(`${url}/api/words/get`)
      const list = await res.json()
      this.wordList = list
    },
    async onDeleteBtnClick(item) {
      await fetch(`${url}/api/words/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
        }),
      })
      this.getWordList()
    },
    async onAddBtnClick() {
      if (!this.inputValue) {
        return
      }

      await fetch(`${url}/api/words/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: this.inputValue,
        }),
      })
      this.inputValue = ''
      this.getWordList()
    },
  },
  mounted() {
    document.querySelector('#app').style.display = 'block'
    this.getWordList()
  },
})
