from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained(
    "/Users/ringcrl/Documents/github/chatglm2-6b", trust_remote_code=True)

model = AutoModel.from_pretrained(
    "/Users/ringcrl/Documents/github/chatglm2-6b", trust_remote_code=True).to("mps")

model = model.eval()


def main():
    query = "写一句话"
    past_key_values, history = None, []

    while True:

        current_length = 0
        for response, history, past_key_values in model.stream_chat(tokenizer, query, history=history,
                                                                    past_key_values=past_key_values,
                                                                    return_past_key_values=True):
            print(response[current_length:], end="", flush=True)
            current_length = len(response)
        break


if __name__ == "__main__":
    main()
