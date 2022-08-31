function debounce (func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

const extractText = (DOMElement) => [...DOMElement.childNodes] // has childNodes inside, including text ones
  .filter(child => child.nodeType === 3) // get only text nodes
  .filter(child => child.textContent.trim()) // eliminate empty text
  .map(textNode => textNode.textContent) // extract text content

function move (e) {
  const el = document.elementFromPoint(e.clientX, e.clientY)
  const texts = extractText(el)
  console.log(texts)
  const text = texts.join()
  if (!text) return
  const utterance = new window.SpeechSynthesisUtterance()
  utterance.text = text // 要合成的文本
  // utterance.lang = 'en-US' // 美式英语发音（默认自动选择）
  utterance.rate = 1.6 // 二倍速（默认为 1，范围 0.1～10）
  // utterance.pitch = 2 // 高音调（数字越大越尖锐，默认为 1，范围 0～2 ）
  // utterance.volume = 0.5 // 音量 0.5 倍（默认为1，范围 0～1）
  window.speechSynthesis.speak(utterance)
}

const debounceMove = debounce(move, 1000)

document.addEventListener('mousemove', debounceMove)
