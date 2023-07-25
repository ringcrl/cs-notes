# whisper 18.mp3 --language Chinese --initial_prompt "以下是普通话句子"

import whisper

model = whisper.load_model("base")
result = model.transcribe("18.mp3", initial_prompt="以下是普通话句子")
print(result["text"])
