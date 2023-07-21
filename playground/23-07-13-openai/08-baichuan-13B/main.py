import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.generation.utils import GenerationConfig
tokenizer = AutoTokenizer.from_pretrained(
    "/Users/ringcrl/Documents/github/Baichuan-13B-Chat", use_fast=False, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    "/Users/ringcrl/Documents/github/Baichuan-13B-Chat", torch_dtype=torch.float16, trust_remote_code=True).to("mps")
model.generation_config = GenerationConfig.from_pretrained(
    "/Users/ringcrl/Documents/github/Baichuan-13B-Chat")
messages = []
messages.append({"role": "user", "content": "世界上第二高的山峰是哪座"})
response = model.chat(tokenizer, messages)
print(response)
