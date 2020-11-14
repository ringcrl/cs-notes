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
      const sourceMoney = this.inputVal || 0
      const distMoney = (Number(sourceMoney * percent) + Number(sourceMoney)).toFixed(3)
      const diffMoney = (distMoney - sourceMoney).toFixed(3)
      const strPercent = (percent * 100).toFixed(2)
      return `
        原始金额：${sourceMoney}
        结果金额：${distMoney}
        涨跌额：${diffMoney}
        涨跌百分比：${strPercent}%
      `
    },
  },
  mounted() {
    console.log('mounted')
  },
})
window.app = app
