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

stock_list = ['SOXS']


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


def send_to_discord(webhook_url, content):
    data = {
        "content": content
    }

    response = requests.post(webhook_url, json=data)

    if response.status_code == 204:
        print("Message sent successfully!")
    else:
        print(f"Error sending message: {response.status_code} {response.text}")


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

    response = requests.get(
        f'https://api.polygon.io/v2/aggs/ticker/{name}/range/1/hour/{formatted_ten_days_ago}/{formatted_tomorrow}?apiKey={POLYGON_API}').text

    # response = '{"ticker":"SOXS","queryCount":3553,"resultsCount":64,"adjusted":true,"results":[{"v":335031,"vw":20.4766,"o":20.37,"c":20.46,"h":20.6,"l":20.37,"t":1682409600000,"n":2882},{"v":167390,"vw":20.4538,"o":20.46,"c":20.42,"h":20.5,"l":20.42,"t":1682413200000,"n":1376},{"v":79423,"vw":20.4124,"o":20.42,"c":20.43,"h":20.45,"l":20.36,"t":1682416800000,"n":899},{"v":144841,"vw":20.4058,"o":20.44,"c":20.42,"h":20.45,"l":20.34,"t":1682420400000,"n":1371},{"v":519666,"vw":20.3903,"o":20.4208,"c":20.43,"h":20.6015,"l":20.15,"t":1682424000000,"n":3558},{"v":4.364338e+06,"vw":20.6593,"o":20.43,"c":20.74,"h":20.84,"l":20.385,"t":1682427600000,"n":20544},{"v":6.172668e+06,"vw":20.9958,"o":20.74,"c":21.15,"h":21.25,"l":20.59,"t":1682431200000,"n":28264},{"v":4.309059e+06,"vw":21.3167,"o":21.155,"c":21.44,"h":21.46,"l":21.13,"t":1682434800000,"n":17683},{"v":4.602955e+06,"vw":21.6559,"o":21.4385,"c":21.6484,"h":21.8385,"l":21.423,"t":1682438400000,"n":17953},{"v":3.410581e+06,"vw":21.7808,"o":21.64,"c":21.88,"h":21.95,"l":21.55,"t":1682442000000,"n":15300},{"v":3.005093e+06,"vw":21.8264,"o":21.88,"c":21.91,"h":21.95,"l":21.65,"t":1682445600000,"n":12696},{"v":4.782744e+06,"vw":21.9786,"o":21.905,"c":22.1584,"h":22.1689,"l":21.76,"t":1682449200000,"n":19787},{"v":1.341775e+06,"vw":22.1288,"o":22.14,"c":21.79,"h":22.3291,"l":21.77,"t":1682452800000,"n":7636},{"v":339810,"vw":21.6177,"o":21.81,"c":21.56,"h":21.81,"l":21.54,"t":1682456400000,"n":2199},{"v":259544,"vw":21.3579,"o":21.57,"c":21.28,"h":21.63,"l":21.1799,"t":1682460000000,"n":1251},{"v":138487,"vw":21.2916,"o":21.28,"c":21.34,"h":21.36,"l":21.26,"t":1682463600000,"n":708},{"v":264463,"vw":21.4227,"o":21.7,"c":21.38,"h":21.7,"l":20.5,"t":1682496000000,"n":2655},{"v":105101,"vw":21.3869,"o":21.39,"c":21.38,"h":21.43,"l":21.35,"t":1682499600000,"n":1126},{"v":134596,"vw":21.5238,"o":21.38,"c":21.62,"h":21.68,"l":21.38,"t":1682503200000,"n":1341},{"v":364715,"vw":21.7217,"o":21.62,"c":21.75,"h":21.81,"l":21.57,"t":1682506800000,"n":3559},{"v":683426,"vw":21.644,"o":21.5613,"c":21.55,"h":21.81,"l":21.3685,"t":1682510400000,"n":5638},{"v":6.005016e+06,"vw":21.7098,"o":21.54,"c":21.7204,"h":22.09,"l":21.31,"t":1682514000000,"n":28148},{"v":5.936563e+06,"vw":21.7346,"o":21.73,"c":21.5058,"h":21.985,"l":21.4201,"t":1682517600000,"n":24922},{"v":5.285516e+06,"vw":21.2906,"o":21.5,"c":21.31,"h":21.51,"l":21.125,"t":1682521200000,"n":20213},{"v":3.336451e+06,"vw":21.3287,"o":21.3,"c":21.465,"h":21.51,"l":21.12,"t":1682524800000,"n":11606},{"v":2.560884e+06,"vw":21.6008,"o":21.4699,"c":21.7221,"h":21.8599,"l":21.42,"t":1682528400000,"n":9617},{"v":2.966896e+06,"vw":21.8643,"o":21.7253,"c":21.99,"h":22.03,"l":21.6801,"t":1682532000000,"n":11333},{"v":4.10022e+06,"vw":21.9766,"o":21.99,"c":21.77,"h":22.14,"l":21.737,"t":1682535600000,"n":15757},{"v":406366,"vw":21.7134,"o":21.86,"c":21.6985,"h":21.9,"l":21.6,"t":1682539200000,"n":2146},{"v":90936,"vw":21.662,"o":21.7,"c":21.64,"h":21.71,"l":21.61,"t":1682542800000,"n":613},{"v":51002,"vw":21.66,"o":21.63,"c":21.69,"h":21.69,"l":21.61,"t":1682546400000,"n":137},{"v":28288,"vw":21.7023,"o":21.69,"c":21.7,"h":21.75,"l":21.66,"t":1682550000000,"n":156},{"v":185521,"vw":21.5389,"o":21.7,"c":21.6,"h":21.7,"l":21.33,"t":1682582400000,"n":1673},{"v":133565,"vw":21.6175,"o":21.6,"c":21.73,"h":21.76,"l":21.51,"t":1682586000000,"n":1235},{"v":131455,"vw":21.7716,"o":21.72,"c":21.72,"h":21.82,"l":21.7,"t":1682589600000,"n":1254},{"v":128311,"vw":21.7304,"o":21.73,"c":21.73,"h":21.8,"l":21.67,"t":1682593200000,"n":1195},{"v":1.038647e+06,"vw":21.8684,"o":21.7791,"c":21.95,"h":22.13,"l":21.2,"t":1682596800000,"n":7938},{"v":6.989974e+06,"vw":22.6327,"o":21.95,"c":22.87,"h":23.01,"l":21.84,"t":1682600400000,"n":37148},{"v":7.977149e+06,"vw":22.7329,"o":22.87,"c":22.4886,"h":23.22,"l":22.325,"t":1682604000000,"n":39853},{"v":3.537453e+06,"vw":22.3688,"o":22.48,"c":22.34,"h":22.63,"l":22.15,"t":1682607600000,"n":14010},{"v":3.368008e+06,"vw":22.1699,"o":22.34,"c":22.015,"h":22.3883,"l":22.01,"t":1682611200000,"n":11597},{"v":3.309972e+06,"vw":21.919,"o":22.015,"c":21.81,"h":22.1,"l":21.735,"t":1682614800000,"n":11806},{"v":2.931111e+06,"vw":21.7015,"o":21.81,"c":21.5399,"h":21.88,"l":21.53,"t":1682618400000,"n":10095},{"v":3.637488e+06,"vw":21.568,"o":21.54,"c":21.56,"h":21.695,"l":21.46,"t":1682622000000,"n":13893},{"v":602928,"vw":21.5327,"o":21.55,"c":21.67,"h":21.8,"l":21.27,"t":1682625600000,"n":3683},{"v":213388,"vw":21.5054,"o":21.68,"c":21.5,"h":21.7,"l":21.3,"t":1682629200000,"n":1248},{"v":140952,"vw":21.4735,"o":21.5,"c":21.57,"h":21.59,"l":21.4,"t":1682632800000,"n":470},{"v":78100,"vw":21.5804,"o":21.55,"c":21.6,"h":21.65,"l":21.51,"t":1682636400000,"n":327},{"v":134720,"vw":21.5906,"o":21.42,"c":21.67,"h":21.73,"l":21.42,"t":1682668800000,"n":1263},{"v":51546,"vw":21.6541,"o":21.68,"c":21.62,"h":21.72,"l":21.6,"t":1682672400000,"n":710},{"v":74623,"vw":21.5545,"o":21.62,"c":21.53,"h":21.63,"l":21.48,"t":1682676000000,"n":761},{"v":204299,"vw":21.4742,"o":21.53,"c":21.45,"h":21.62,"l":21.32,"t":1682679600000,"n":2060},{"v":715767,"vw":21.3874,"o":21.52,"c":21.29,"h":21.7185,"l":21.22,"t":1682683200000,"n":5806},{"v":3.774086e+06,"vw":21.2275,"o":21.2885,"c":21.348,"h":21.5,"l":20.89,"t":1682686800000,"n":18223},{"v":6.354859e+06,"vw":21.1035,"o":21.36,"c":21.2999,"h":21.55,"l":20.84,"t":1682690400000,"n":25906},{"v":2.735829e+06,"vw":21.2443,"o":21.29,"c":20.99,"h":21.4987,"l":20.98,"t":1682694000000,"n":11480},{"v":2.490537e+06,"vw":21.0141,"o":20.9822,"c":20.89,"h":21.18,"l":20.86,"t":1682697600000,"n":8860},{"v":3.091247e+06,"vw":20.768,"o":20.885,"c":20.74,"h":20.97,"l":20.62,"t":1682701200000,"n":10415},{"v":1.930219e+06,"vw":20.7216,"o":20.74,"c":20.74,"h":20.81,"l":20.62,"t":1682704800000,"n":7875},{"v":3.668195e+06,"vw":20.5344,"o":20.74,"c":20.4,"h":20.765,"l":20.4,"t":1682708400000,"n":13937},{"v":151405,"vw":20.4184,"o":20.45,"c":20.44,"h":20.4687,"l":20.36,"t":1682712000000,"n":1169},{"v":59391,"vw":20.4811,"o":20.45,"c":20.4999,"h":20.5,"l":20.44,"t":1682715600000,"n":374},{"v":34183,"vw":20.4794,"o":20.5,"c":20.46,"h":20.5,"l":20.45,"t":1682719200000,"n":91},{"v":34794,"vw":20.4416,"o":20.5,"c":20.43,"h":20.5,"l":20.4,"t":1682722800000,"n":223}],"status":"DELAYED","request_id":"cae5f24edea1d7387d8673fbb6617c07","count":64}'

    return response


def smi(data):
    parsed_data = json.loads(data)

    ticker = parsed_data['ticker']
    results = parsed_data['results']
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

    LATEST_SMI = SMI[len(SMI)-1]
    LATEST_SMI_AVG = SMI_AVG[len(SMI_AVG)-1]

    res = f"""
ticker: {ticker}
SMI蓝线: {LATEST_SMI}
SMI红线: {LATEST_SMI_AVG}
日期: {formatted_dt}
"""

    return res


def stock_monitor():
    for stock in stock_list:
        ticker_info = get_ticker_data(stock)
        smi_res = smi(ticker_info)
        print(smi_res)
        send_to_discord(DISCORD_WEBHOOK_URL, smi_res)


stock_monitor()

# 定时任务
schedule.every().hour.at(':00').do(stock_monitor)
while True:
    schedule.run_pending()
    time.sleep(60)  # 等待 60 秒再次检查
