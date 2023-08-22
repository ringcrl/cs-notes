import os
import time

from dotenv import load_dotenv

from qcloud_vod.vod_upload_client import VodUploadClient
from qcloud_vod.model import VodUploadRequest

# 加载 .env 文件中的环境变量
load_dotenv()

SecretId = os.environ.get('SecretId')
SecretKey = os.environ.get('SecretKey')

client = VodUploadClient(SecretId, SecretKey)

request = VodUploadRequest()
request.MediaFilePath = "./500.jpg"

try:
    start_time = time.time()
    response = client.upload("ap-guangzhou", request)
    end_time = time.time()
    upload_time_ms = (end_time - start_time) * 1000
    print(f"上传时间: {upload_time_ms:.2f} 毫秒")
    print(f"FileId: {response.FileId}")
    print(f"文件地址: {response.MediaUrl}")
except Exception as err:
    # 处理业务异常
    print(err)
