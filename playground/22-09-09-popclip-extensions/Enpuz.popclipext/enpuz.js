const sentence = popclip.input.text.split(' ').join('-')
// popclip.pasteText(sentence)
popclip.openUrl(`http://enpuz.com/${sentence}=`)
