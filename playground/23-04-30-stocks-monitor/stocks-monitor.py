import os
import requests
import json
import schedule
import pytz
import numpy as np
import talib as ta
from dotenv import load_dotenv
from time import sleep
from datetime import datetime, timedelta, time

# Ubuntu20.04 安装 TA_Lib 失败
# https://sharegpt.com/c/h48JVMF

# echarts 展示数据
# https://echarts.apache.org/examples/zh/editor.html?c=line-simple

load_dotenv()

DISCORD_WEBHOOK_URL = os.environ.get("DISCORD_WEBHOOK_URL")
POLYGON_API = os.environ.get("POLYGON_API")

eastern_tz = pytz.timezone('US/Eastern')

stock_list = ['SOXS', 'TSLQ', 'AMGN', 'FNGD', 'QQQ', 'SPY']

# region 指标


def smi(data):
    results = data

    HIGH = np.array([result['h'] for result in results])
    LOW = np.array([result['l'] for result in results])
    CLOSE = np.array([result['c'] for result in results])

    SMI_A = 5
    SMI_B = 3
    SMI_LL = ta.MIN(LOW, SMI_A)
    SMI_HH = ta.MAX(HIGH, SMI_A)
    SMI_DIFF = SMI_HH-SMI_LL
    SMI_AVG_DIFF = ta.EMA(ta.EMA(SMI_DIFF, SMI_B), SMI_B)
    SMI_RDIFF = CLOSE-(SMI_LL+SMI_HH)/2
    SMI_AVGREL = ta.EMA(ta.EMA(SMI_RDIFF, SMI_B), SMI_B)
    SMI = SMI_AVGREL/(SMI_AVG_DIFF/2)*100
    SMI_AVG = ta.EMA(SMI, SMI_B)

    SMI_NAN = np.isnan(SMI)
    SMI[SMI_NAN] = 0

    SMI_AVG_NAN = np.isnan(SMI_AVG)
    SMI_AVG[SMI_AVG_NAN] = 0

    return SMI, SMI_AVG

# endregion

# region discord 通知


def send_to_discord(webhook_url, content):
    data = {
        "content": content
    }

    response = requests.post(webhook_url, json=data)

    if response.status_code == 204:
        print(f"Message sent:{content}")
    else:
        print(f"Error sending message: {response.status_code} {response.text}")

# endregion

# region 获取数据


def get_ticker_data(name):
    # 获取当前日期
    today = datetime.today()

    # 获取明天的日期
    tomorrow = today + timedelta(days=1)
    # 获取 10 天前的日期
    days_ago = today - timedelta(days=5)
    # 将日期格式化为 '2023-04-28' 形式
    formatted_tomorrow = tomorrow.strftime("%Y-%m-%d")
    formatted_ten_days_ago = days_ago.strftime("%Y-%m-%d")

    # https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__range__multiplier___timespan___from___to

    url = f'https://api.polygon.io/v2/aggs/ticker/{name}/range/1/hour/{formatted_ten_days_ago}/{formatted_tomorrow}?apiKey={POLYGON_API}'
    print(url)

    response = requests.get(url).text

    return response

# endregion

# region 处理数据，获取推送材料


def get_status(val):
    VAL1 = 30
    VAL2 = 70
    T1 = VAL1
    T2 = VAL2
    B1 = -VAL1
    B2 = -VAL2

    if val >= T2:
        return 'T2'
    elif val < T2 and val >= T1:
        return 'T1'
    elif val <= B1 and val > B2:
        return 'B1'
    elif val <= B2:
        return 'B2'
    else:
        return ''


def handle_ticker_data(data):
    parsed_data = json.loads(data)

    ticker = parsed_data.get('ticker', None)
    results = parsed_data.get('results', None)

    if results is None:
        return None

    SMI, SMI_AVG = smi(results)

    TIME = np.array([datetime.fromtimestamp(result['t'] / 1000).astimezone(
        eastern_tz).strftime("%y-%m-%d %H:%M") for result in results])

    CLOSE = np.array([result['c'] for result in results])

    print(f"""{ticker}
{json.dumps(TIME.tolist())}
{json.dumps(SMI.tolist())}
{json.dumps(CLOSE.tolist())}""")

    LATEST_SMI = round(SMI[len(SMI)-1])
    LATEST_SMI_AVG = round(SMI_AVG[len(SMI_AVG)-1])
    LATEST_TIME = TIME[len(TIME)-1]

    status = get_status(LATEST_SMI)

    res = f"""{LATEST_TIME} {ticker} {LATEST_SMI} {LATEST_SMI_AVG} {status}
    
"""
    print(res)

    if status in ['T2', 'B2']:
        return res

    return None

# endregion

# region 时间判断


def is_time_between(start, end, check_time=None):
    if start < end:
        return start <= check_time <= end
    else:  # 跨越午夜
        return check_time >= start or check_time <= end


def is_opening():
    # 获取当前时间和星期
    now = datetime.now()
    current_time = now.time()
    current_weekday = now.weekday()  # 周一为 0，周二为 1，...，周日为 6

    # 设置时间范围
    start_time = time(16, 0)  # 16:00
    end_time = time(8, 0)    # 8:00 (第二天)

    # 判断当前时间是否在指定范围内
    if (0 <= current_weekday <= 4 and is_time_between(start_time, end_time, current_time)) or (current_weekday == 5 and current_time < end_time):
        return True
    else:
        return False


# endregion

# region 主程序


def stock_monitor():

    try:
        if (is_opening() is False):
            print('is_opening() is False')
            return

        for stock in stock_list:
            ticker_data = get_ticker_data(stock)

            ticker_res = handle_ticker_data(ticker_data)

            if ticker_res is None:
                continue

            send_to_discord(DISCORD_WEBHOOK_URL, ticker_res)

    except Exception as e:
        print(f"函数执行失败，错误信息：{e}")


stock_monitor()

# endregion

# region 定时任务
schedule.every(10).minutes.do(stock_monitor)
while True:
    schedule.run_pending()
    sleep(60)  # 等待 60 秒再次检查

# endregion
