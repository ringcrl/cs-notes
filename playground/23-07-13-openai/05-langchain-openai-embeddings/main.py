from typing import Union

from fastapi import FastAPI, Response

from runner import run

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/question/{question}")
async def read_item(question: str, response: Response):
    response.headers["content-type"] = "text/html; charset=utf-8"
    res = await run(question, "gpt-3.5-turbo")
    return res
