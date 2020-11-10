/* eslint-disable-next-line */
const app = new Vue({
  el: '#app',
  data() {
    return {
      inputVal: '',
      inputRange: '',
    }
  },
  computed: {
    result() {
      const range = this.inputRange || 50
      const MID = 50
      const diff = range - 50
      const percent = diff / MID
      const money = (Number(this.inputVal * percent) + Number(this.inputVal)).toFixed(3)
      const strPercent = (percent * 100).toFixed(2)
      return `金额：${money}；百分比：${strPercent}%`
    },
  },
  mounted() {
    console.log('mounted')
  },
})
window.app = app
