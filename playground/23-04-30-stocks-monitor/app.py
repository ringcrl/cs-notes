import os
import requests
import json
import schedule
import time
# import talib as ta # linux 上运行不起来，先不用了
import numpy as np
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

DISCORD_WEBHOOK_URL = os.environ.get("DISCORD_WEBHOOK_URL")
POLYGON_API = os.environ.get("POLYGON_API")

stock_list = ['SOXS', 'TSLQ', 'AMAGN', 'FNGD']

# region 指标


def ema(prices, period):
    if len(prices) < period:
        raise ValueError("数据长度过短，请至少提供与时间段相等的数据长度。")

    alpha = 2 / (period + 1)
    ema_series = np.empty_like(prices, dtype=float)
    ema_series[:] = np.NaN

    first_not_nan_index = np.where(~np.isnan(prices))[0][0]
    ema_series[first_not_nan_index] = prices[first_not_nan_index]

    for i in range(first_not_nan_index + 1, len(prices)):
        if np.isnan(prices[i]):
            ema_series[i] = ema_series[i - 1]
        else:
            ema_series[i] = alpha * \
                (prices[i] - ema_series[i - 1]) + ema_series[i - 1]

    return ema_series


def ta_max(prices, period):
    if len(prices) < period:
        raise ValueError("数据长度过短，请至少提供与时间段相等的数据长度。")

    max_series = np.empty_like(prices, dtype=float)
    max_series[:] = np.NaN

    for i in range(period - 1, len(prices)):
        max_series[i] = np.nanmax(prices[i - period + 1:i + 1])

    return max_series


def ta_min(prices, period):
    if len(prices) < period:
        raise ValueError("数据长度过短，请至少提供与时间段相等的数据长度。")

    min_series = np.empty_like(prices, dtype=float)
    min_series[:] = np.NaN

    for i in range(period - 1, len(prices)):
        min_series[i] = np.nanmin(prices[i - period + 1:i + 1])

    return min_series


def smi(data):
    results = data
    latest_timestamp_ms = results[len(results)-1]['t']
    timestamp_s = latest_timestamp_ms / 1000
    dt = datetime.fromtimestamp(timestamp_s)
    formatted_dt = dt.strftime("%Y-%m-%d %H:%M")

    HIGH = np.array([result['h'] for result in results])
    LOW = np.array([result['l'] for result in results])
    CLOSE = np.array([result['c'] for result in results])

    SMI_A = 5
    SMI_B = 3
    SMI_HH = ta_max(HIGH, period=SMI_A)
    SMI_LL = ta_min(LOW, period=SMI_A)
    SMI_DIFF = SMI_HH-SMI_LL
    SMI_AVG_DIFF = ema(ema(SMI_DIFF, SMI_B), SMI_B)
    SMI_RDIFF = CLOSE-(SMI_LL+SMI_HH)/2
    SMI_AVGREL = ema(ema(SMI_RDIFF, SMI_B), SMI_B)
    SMI = SMI_AVGREL/(SMI_AVG_DIFF/2)*100
    SMI_AVG = ema(SMI, SMI_B)
    return SMI, SMI_AVG, formatted_dt

# endregion

# region discord 通知


def send_to_discord(webhook_url, content):
    data = {
        "content": content
    }

    response = requests.post(webhook_url, json=data)

    if response.status_code == 204:
        print("Message sent successfully!")
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
    response = requests.get(
        f'https://api.polygon.io/v2/aggs/ticker/{name}/range/1/hour/{formatted_ten_days_ago}/{formatted_tomorrow}?apiKey={POLYGON_API}').text

    print('response', response)

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

    if val > T2:
        return 'T2'
    elif val < T2 and val > T1:
        return 'T1'
    elif val < B1 and val > B2:
        return 'B1'
    elif val < B2:
        return 'B2'
    else:
        return ''


def handle_ticker_data(data):
    parsed_data = json.loads(data)

    ticker = parsed_data.get('ticker', None)
    results = parsed_data.get('results', None)

    if results is None:
        return None

    SMI, SMI_AVG, formatted_dt = smi(results)

    LATEST_SMI = SMI[len(SMI)-1]
    LATEST_SMI_AVG = SMI_AVG[len(SMI_AVG)-1]

    status = get_status(LATEST_SMI)

    res = f"""
ticker: {ticker}
SMI蓝线: {LATEST_SMI}
SMI红线: {LATEST_SMI_AVG}
状态: {status}
日期: {formatted_dt}
"""

    return res

# endregion

# region 主程序


def stock_monitor():
    for stock in stock_list:
        ticker_data = get_ticker_data(stock)
        ticker_res = handle_ticker_data(ticker_data)

        print('ticker_res', ticker_res)

        if ticker_res is None:
            continue

        send_to_discord(DISCORD_WEBHOOK_URL, ticker_res)


stock_monitor()

# endregion

# region 定时任务
schedule.every().hour.at(':00').do(stock_monitor)
while True:
    schedule.run_pending()
    time.sleep(60)  # 等待 60 秒再次检查

# endregion
