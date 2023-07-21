from os import path
import json

# 读取 result.json 文件列表，把列表中所有对象的 content 字段取出来，写入 result.txt 文件中

json_file_path = path.join(path.dirname(__file__), 'result.json')

with open(json_file_path, 'r') as f:
    data = json.load(f)

txt_file_path = path.join(path.dirname(__file__), 'result.txt')

for item in data:
    with open(txt_file_path, 'a') as f:
        f.write(item['content'])
        f.write('\n')
