import re
from os import path
import json

with open(path.join(path.dirname(__file__), "temp_source.txt"), 'r') as f:
    content = f.read()

links = re.findall(r'"link": "(https://\S+)"', content)

print(links)

with open(path.join(path.dirname(__file__), "temp_result.json"), 'w') as f:
    json.dump(links, f)
