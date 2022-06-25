from os import path, getenv
from dotenv import load_dotenv

currDir = path.split(path.realpath(__file__))[0]
load_dotenv(currDir + '/' + '.env')

VALUE = getenv('KEY')
print(VALUE)
