
chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'toggle')
  })
})

// 接收iframe传来的信息，转发给content.js
chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === 'ajaxInterceptor' && msg.to === 'background') {
    if (msg.key === 'ajaxInterceptor_switchOn') {
      if (msg.value === true) {
        chrome.action.setIcon({
          path: {
            16: '/images/16.png',
            32: '/images/32.png',
            48: '/images/48.png',
            128: '/images/128.png'
          }
        })
      } else {
        chrome.action.setIcon({
          path: {
            16: '/images/16_gray.png',
            32: '/images/32_gray.png',
            48: '/images/48_gray.png',
            128: '/images/128_gray.png'
          }
        })
      }
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { ...msg, to: 'content' })
      const id = tabs[0].id

      chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
          const url = new URL(tabs[0].url)
          const host = url.host

          chrome.cookies.getAll({
            domain: host
          }, (cookies) => {
            const cookiesStr = cookies.map(c => c.name + '=' + c.value).join(';')
            console.log('ccccccc========', cookiesStr)
            chrome.tabs.sendMessage(id, { cookiesStr, to: 'content' })
            // $container.textContent = cookiesStr;
          })
        }
      )
    })
  }
})

chrome.storage.local.get(['ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (result) => {
  if (result.hasOwnProperty('ajaxInterceptor_switchOn')) {
    if (result.ajaxInterceptor_switchOn) {
      chrome.action.setIcon({ path: '/images/16.png' })
    } else {
      chrome.action.setIcon({ path: '/images/16_gray.png' })
    }
  }
})
