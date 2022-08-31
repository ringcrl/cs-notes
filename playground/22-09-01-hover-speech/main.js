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
  const text = extractText(el)[0]
  console.log(text)
  const utterance = new window.SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(utterance)
}

const debounceMove = debounce(move, 1000)

document.onmousemove = debounceMove
