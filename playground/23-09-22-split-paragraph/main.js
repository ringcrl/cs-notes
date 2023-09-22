const paragraphs = [
  '你好', // []
  '你好。', // ['你好。']
  '你好，我是小', // []
  '你好，我是小明。我今年 18 ', // ['你好，我是小明。']
  '你好，我是小明。我今年 18 岁。', // ['你好，我是小明。', '我今年 18 岁。' ]
  '地球离太阳1.496e8公里', // []
  '地球离太阳1.496e8公里。', // ['地球离太阳1.496e8公里。']
  'hello world', // []
  'hello world.', // ['hello world.']
  'hello world!' // ['hello world!']
]

function splitParagraph (paragraph) {
  // 使用正则表达式匹配句子
  const sentences = paragraph.match(/[^。!?.\d]+[。！.!?]/g)
  // sentences可能为null，需要转化为[]
  return sentences || []
}

for (const paragraph of paragraphs) {
  console.log(splitParagraph(paragraph))
}
