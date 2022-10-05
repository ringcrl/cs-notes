const sentence = popclip.input.text
  .replace(/ /g, '-')
  .replace(/,/g, '+')
  .replace(/'/g, '~')
// popclip.pasteText(sentence)
popclip.openUrl(`http://enpuz.com/${sentence}=`)
