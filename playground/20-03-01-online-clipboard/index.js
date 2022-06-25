import axios from 'axios';
import Clipboard from 'clipboard';
import './bulma.css';
import './style.css';

import getApi from './api';

class OnlineCliboard {
  async init() {
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    const addText = document.querySelector('.add-text');
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', async () => {
      if (!addText.value) {
        alert('请输入内容');
        return;
      }
      const result = await this.inserData(addText.value);
      if (result.data.status === 0) {
        this.render();
        this.clearValue();
      }
    });
  }

  clearValue() {
    const addText = document.querySelector('.add-text');
    addText.value = '';
  }

  async render() {
    const data = await this.getData();
    const clipboardDatas = data.data;
    const result = document.querySelector('.result');
    result.innerHTML = '';
    const ul = document.createElement('ul');
    for (const item of clipboardDatas) {
      const li = document.createElement('li');
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('button', 'is-small', 'is-danger');
      deleteBtn.innerText = '删除';
      deleteBtn.addEventListener('click', async () => {
        const result = await this.deleteData(item.cb_id);
        if (result.data.status === 0) {
          this.render();
        }
      });

      const copyBtn = document.createElement('button');
      copyBtn.classList.add('button', 'is-small');
      copyBtn.innerText = '复制';
      copyBtn.addEventListener('click', () => {
        alert('复制成功!');
      });
      copyBtn.setAttribute('data-clipboard-text', item.cb_data);
      new Clipboard(copyBtn);

      const clipboardText = document.createElement('span');
      const formatTime = `${new Date(item.cb_time).toLocaleDateString().slice(5)} ${
        new Date(item.cb_time).toLocaleTimeString('zh-cn', { hour12: false }).slice(0, 5)}`;
      clipboardText.innerText = `(${formatTime}) ${item.cb_data}`;
      clipboardText.classList.add('clipboard-text');

      const operaWrapper = document.createElement('div');
      operaWrapper.classList.add('opera-wrapper');

      li.appendChild(clipboardText);
      operaWrapper.appendChild(deleteBtn);
      operaWrapper.appendChild(copyBtn);
      li.appendChild(operaWrapper);
      ul.appendChild(li);
    }
    result.appendChild(ul);
  }

  getData() {
    return axios.get(`${getApi()}/api/clipboard/get`);
  }

  inserData(data) {
    return axios.post(`${getApi()}/api/clipboard/insert`, {
      cb_data: data,
    });
  }

  deleteData(id) {
    return axios.delete(`${getApi()}/api/clipboard/delete/${id}`);
  }
}

const onlineCliboard = new OnlineCliboard();
onlineCliboard.init();
