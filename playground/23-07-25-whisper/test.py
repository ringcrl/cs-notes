# whisper 18.mp3 --language Chinese --initial_prompt "以下是普通话句子"

import whisper

model = whisper.load_model("large")
result = model.transcribe("18.mp3")
print(result["text"])
