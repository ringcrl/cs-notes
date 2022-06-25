new Vue({
  el: '#app',
  data: {
    type: '',
    question: '',
    answer: '',
    newType: '',
    newQuestion: '',
    newAnswer: '',
    recallAnswer: '',
    filterType: '',
    contentList: [],
    currContentIndex: 0,
    view: 'content', // content | list
    options: [],
    isShowAnswer: true,
    idPool: [],
    mode: 'create', // create | review
  },
  methods: {
    async updateList() {
      const list = await axios.post('/get', {
        type: this.filterType,
      });
      this.contentList = list.data;
      this.idPool = [];
      this.updateIndex();
    },
    updateIndex() {
      this.recallAnswer = '';
      const index = this.getNoRepeatIndex();
      this.setIndex(index);
    },
    setIndex(index) {
      this.currContentIndex = index;
      this.updateCurrContent(this.currContentIndex);
    },
    onListItemClick(index) {
      document.documentElement.scrollTop = 0;
      this.setIndex(index);
      this.toggleView();
    },
    getNoRepeatIndex() {
      if (this.idPool.length === this.contentList.length) {
        return 0;
      }
      let index = Math.floor(Math.random() * this.contentList.length);
      while (this.idPool.includes(this.contentList[index].id)) {
        index = Math.floor(Math.random() * this.contentList.length);
      }
      this.idPool.push(this.contentList[index].id);
      return index;
    },
    async addContent() {
      if (!this.question) {
        return alert('输入内容');
      }
      await axios.post('/add', {
        question: this.question,
        answer: this.answer,
        type: this.type,
      });
      this.question = '';
      this.answer = '';
      this.updateList();
    },
    async delContent(id) {
      await axios.post('/del', {
        id,
      });
      this.contentList = this.contentList.filter((item) => item.id !== id);
      this.idPool = this.idPool.filter((item) => item.id !== id);
      this.updateIndex();
    },
    async setContent(id) {
      await axios.post('/set', {
        id,
        question: this.newQuestion,
        answer: this.newAnswer,
        type: this.newType,
      });
      const contentIndex = this.contentList.findIndex((item) => item.id === id);
      this.contentList[contentIndex].question = this.newQuestion;
      this.contentList[contentIndex].answer = this.newAnswer;
      this.contentList[contentIndex].type = this.newType;
      this.contentList = this.contentList.filter((item) => item.type === this.filterType);
    },
    toggleView() {
      if (this.view === 'content') {
        this.view = 'list';
      } else {
        this.view = 'content';
      }
    },
    updateCurrContent(index) {
      if (this.contentList.length === 0) return;
      this.newQuestion = this.contentList[index].question;
      this.newAnswer = this.contentList[index].answer;
      this.newType = this.contentList[index].type;
    },
    setCache() {
      localStorage.setItem('type', this.type);
      localStorage.setItem('filterType', this.filterType);
    },
    restoreCache() {
      if (localStorage.getItem('type')) {
        this.type = localStorage.getItem('type');
      }
      if (localStorage.getItem('filterType')) {
        this.filterType = localStorage.getItem('filterType');
      }
      if (localStorage.getItem('mode')) {
        this.mode = localStorage.getItem('mode');
      }
    },
    async getTypes() {
      const res = await axios.post('/get_types', {});
      this.options = res.data.map((item) => item.type);
    },
    toggleMode() {
      if (this.mode === 'create') {
        this.mode = 'review';
      } else {
        this.mode = 'create';
      }
      localStorage.setItem('mode', this.mode);
    },
  },
  watch: {
    currContentIndex(val) {
      if (this.contentList.length === 0) {
        this.newQuestion = '';
        this.newAnswer = '';
        this.newType = '';
        return;
      }
      this.updateCurrContent(val);
    },
    type() {
      this.setCache();
    },
    filterType() {
      this.setCache();
      this.updateList();
    },
  },
  async mounted() {
    this.restoreCache();
    await this.getTypes();
  },
});
