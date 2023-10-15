from flask import Flask, request
import requests
import json
import random
import openai
import os

app = Flask(__name__)

openai_api_key = "sk-9Jgzq1fRZENK6N1QY1J6bQwK3s7DlElEiZs8HUIEZKemTZ5k@4287"
openai_api_base = 'https://api.closeai-proxy.xyz/v1'
openai.api_key = openai_api_key  # 修改这里为自己申请的api_key
openai.api_base = openai_api_base  # 修改这里为自己申请的api_key

os.environ["OPENAI_API_BASE"] = openai_api_base
os.environ["OPENAI_API_KEY"] = openai_api_key


@app.route('/', methods=['POST', 'GET'])
def hello_world():
    return openai_api_base


@app.route('/message', methods=['POST', 'GET'])
def mess():  # put application's code here
    print(request.args)
    message = request.args.get('data')
    print("收到消息：{}".format(message))
    messages = [
        {"role": "system", "content": "You are chatgpt."},
        {"role": "user", "content": message}]
    print("交给gpt查询中")
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        max_tokens=1024,
        messages=messages
    )
    result = completion.choices[0].message.content
    print("查询完成")
    print(completion)
    res = {
        "data": result,
        "code": 200
    }
    return res


if __name__ == '__main__':
    # app.run(threaded = False,processes=5,host="0.0.0.0",port="5000")
    app.run(host="0.0.0.0", port="5000")
