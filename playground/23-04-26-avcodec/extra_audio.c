#include <stdio.h>
#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <input_file> <output_file>\n", argv[0]);
        return 1;
    }

    const char *input_file = argv[1];
    const char *output_file = argv[2];

    AVFormatContext *format_ctx = NULL;
    int ret = avformat_open_input(&format_ctx, input_file, NULL, NULL);
    if (ret < 0) {
        fprintf(stderr, "Could not open input file: %s\n", input_file);
        return 1;
    }

    avformat_find_stream_info(format_ctx, NULL);

    int audio_stream_index = av_find_best_stream(format_ctx, AVMEDIA_TYPE_AUDIO, -1, -1, NULL, 0);
    if (audio_stream_index < 0) {
        fprintf(stderr, "No audio stream found\n");
        return 1;
    }

    AVStream *audio_stream = format_ctx->streams[audio_stream_index];
    AVCodecContext *codec_ctx = avcodec_alloc_context3(NULL);
    avcodec_parameters_to_context(codec_ctx, audio_stream->codecpar);

    const AVCodec *codec = avcodec_find_decoder(codec_ctx->codec_id);
    avcodec_open2(codec_ctx, codec, NULL);

    AVFormatContext *output_format_ctx = NULL;
    avformat_alloc_output_context2(&output_format_ctx, NULL, NULL, output_file);
    AVStream *output_audio_stream = avformat_new_stream(output_format_ctx, NULL);
    avcodec_parameters_copy(output_audio_stream->codecpar, audio_stream->codecpar);

    avio_open(&output_format_ctx->pb, output_file, AVIO_FLAG_WRITE);
    avformat_write_header(output_format_ctx, NULL);

    AVPacket packet;
    AVFrame *frame = av_frame_alloc();

    while (av_read_frame(format_ctx, &packet) >= 0) {
        if (packet.stream_index == audio_stream_index) {
            ret = avcodec_send_packet(codec_ctx, &packet);
            if (ret < 0) {
                fprintf(stderr, "Error sending packet for decoding\n");
                return 1;
            }

            while (ret >= 0) {
                ret = avcodec_receive_frame(codec_ctx, frame);
                if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF) {
                    break;
                } else if (ret < 0) {
                    fprintf(stderr, "Error during decoding\n");
                    return 1;
                }

                AVPacket output_packet;
                av_init_packet(&output_packet);
                output_packet.data = NULL;
                output_packet.size = 0;
                output_packet.pts = frame->pts;
                output_packet.dts = frame->pkt_dts;
                output_packet.duration = frame->pkt_duration;

                av_interleaved_write_frame(output_format_ctx, &output_packet);
            }
        }

        av_packet_unref(&packet);
    }

    av_write_trailer(output_format_ctx);

    av_frame_free(&frame);
    avcodec_close(codec_ctx);
    avcodec_free_context(&codec_ctx);
    avformat_close_input(&format_ctx);
    avformat_free_context(format_ctx);
    avio_closep(&output_format_ctx->pb);
    avformat_free_context(output_format_ctx);

    return 0;
}
