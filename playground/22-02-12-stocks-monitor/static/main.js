const ORIGIN_MONEY = 100000

const app = new Vue({
  el: '#app',
  data: {
    // 股票信息
    money: ORIGIN_MONEY,
    stocks: 0,
    totalCost: 0,

    operate: '', // buy | sell
    price: '',
    message: '',
    range: 1,
    tradeList: [],

    // 计算方法
    price1: '',
    price2: ''
  },
  methods: {
    submit () {
      if (!this.operate) return alert('选择操作类型')
      if (!this.price) return alert('填写交易价格')
      if (!this.message) return alert('填写交易理由')
      if (!this.isNumber(this.price)) return alert('只能输入数字')

      if (this.operate === 'buy') {
        if (this.money === 0) return alert('只能卖出')

        const tradeMoney = this.money * this.range
        if (this.money < tradeMoney) return alert('余额不足')
        if (tradeMoney < this.price) return alert('最小买入1股')

        this.stocks += tradeMoney / this.price
        this.money -= tradeMoney
        this.totalCost += tradeMoney
      } else {
        if (this.stocks === 0) return alert('只能买入')

        const tradeStocks = this.stocks * this.range

        if (this.stocks < tradeStocks) return alert('股票不足')

        this.stocks -= tradeStocks
        this.money += tradeStocks * this.price

        if (this.stocks === 0) {
          this.totalCost = 0
        }
      }

      const tradeItem = {
        operate: this.operate,
        price: this.price,
        message: this.message
      }

      const beforeTradeItem = this.tradeList[this.tradeList.length - 1]
      if (beforeTradeItem && this.operate === 'sell') {
        tradeItem.diff = `${(((tradeItem.price - beforeTradeItem.price) / beforeTradeItem.price) * 100).toFixed(2)}%`
      }

      this.tradeList.push(tradeItem)
      this.operate = ''
      this.price = ''
      this.message = ''
      this.range = 1
    },
    isNumber (val) {
      const regPos = /^[0-9]+.?[0-9]*/
      if (regPos.test(val)) {
        return true
      }
      return false
    },
    undo () {
      this.tradeList.pop()
    },
    init () {
      document.body.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          return this.submit()
        }
      })
    }
  },
  computed: {
    latestPrice () {
      const latestPrice = this.tradeList[this.tradeList.length - 1]?.price
      return latestPrice ? Number(latestPrice) : 0
    },
    avgPrice () {
      if (this.totalCost === 0) return 0
      return (this.totalCost / this.stocks).toFixed(2)
    },
    output () {
      const currMoney = this.money + this.stocks * this.latestPrice
      return `${((currMoney - ORIGIN_MONEY) / ORIGIN_MONEY * 100).toFixed(2)}%`
    }
  },
  mounted () {
    this.init()
  }
})
