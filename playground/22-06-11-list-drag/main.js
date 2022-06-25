const app = new Vue({
  el: '#app',
  data: {
    list: [
      { label: '列表1' },
      { label: '列表2' },
      { label: '列表3' },
      { label: '列表4' },
      { label: '列表5' },
      { label: '列表6' }
    ],
    dragIndex: '',
    enterIndex: ''
  },
  methods: {
    dragstart (index) {
      this.dragIndex = index
    },
    dragenter (e, index) {
      e.preventDefault()
      // 避免源对象触发自身的dragenter事件
      if (this.dragIndex !== index) {
        const source = this.list[this.dragIndex]
        this.list.splice(this.dragIndex, 1)
        this.list.splice(index, 0, source)
        // 排序变化后目标对象的索引变成源对象的索引
        this.dragIndex = index
      }
    },
    dragover (e, index) {
      e.preventDefault()
    }
  }
})
