from string import whitespace
from bs4 import BeautifulSoup
from os import path
import requests
import json


def get_content_from_url(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.find('h1', class_='rno-title-module-title').text

    content = soup.find('div', class_='J-innerMain').text
    content = content.strip()  # 去除两边空格
    content = content.translate(str.maketrans('', '', whitespace))  # 去除中间空格

    return {
        "title": title,
        "content": content,
        "url": url
    }


# json 文件路径
file_path = path.join(path.dirname(__file__), 'temp_result.json')
# 读取 json 文件
with open(file_path, 'r') as f:
    data = json.load(f)

# 目标文件路径
file_path = path.join(path.dirname(__file__), 'result.json')

# 读取 data 列表中的每一个 url，获取内容，添加到 result 列表中
result = []
for url in data:
    res = get_content_from_url(url)
    result.append(res)

# 将 result 列表写入目标文件
with open(file_path, 'w') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
