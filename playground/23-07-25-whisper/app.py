import gradio as gr
import whisper

WHISPER_MODEL = whisper.load_model("large")


def transcribe(aud_inp):
    if aud_inp is None:
        return ""

    result = WHISPER_MODEL.transcribe(
        aud_inp, language="Chinese", initial_prompt="以下是普通话句子")

    return result['text']


with gr.Blocks() as demo:
    message = gr.Textbox(label="文本识别结果",
                         placeholder="通过下面录音自动识别")
    audio_comp = gr.Microphone(source="microphone", type="filepath", label="语音输入框",
                               interactive=True, streaming=False)
    audio_comp.change(transcribe, inputs=[
                      audio_comp], outputs=[message])

demo.launch(debug=True)
