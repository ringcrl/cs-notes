import os
from dotenv import load_dotenv
import requests

load_dotenv()

DISCORD_WEBHOOK_URL = os.environ.get("DISCORD_WEBHOOK_URL")
POLYGON_API = os.environ.get("POLYGON_API")

def send_to_discord(webhook_url, content):
    data = {
        "content": content
    }
    
    response = requests.post(webhook_url, json=data)

    if response.status_code == 204:
        print("Message sent successfully!")
    else:
        print(f"Error sending message: {response.status_code} {response.text}")

def get_ticker_info(name):
    response = requests.get(f'https://api.polygon.io/v2/aggs/ticker/{name}/range/1/hour/2023-04-28/2023-04-30?apiKey={POLYGON_API}')
    return response

ticker_info = get_ticker_info('SOXS').text
send_to_discord(DISCORD_WEBHOOK_URL, ticker_info)
