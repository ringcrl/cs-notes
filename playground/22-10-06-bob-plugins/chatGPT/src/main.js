

var lang = require("./lang.js");

function supportLanguages() {
    return lang.supportLanguages.map(([standardLang]) => standardLang);
}

function translate(query, completion) {
    const ChatGPTModels = [
        "gpt-3.5-turbo",
        "gpt-4",
        "gpt-4-0314",
        "gpt-4-32k",
        "gpt-4-32k-0314"
    ];
    const api_keys = $option.api_keys.split(",").map((key) => key.trim());
    const api_key = api_keys[Math.floor(Math.random() * api_keys.length)];
    const isChatGPTModel = ChatGPTModels.indexOf($option.model) > -1;
    const apiUrlPath = isChatGPTModel ? "/v1/chat/completions" : "/v1/completions";

    let systemPrompt = "You are a helpful assistant.";
    let userPrompt = "用中文解释下面内容：";

    const header = {
        "Content-Type": "application/json",
    };
    const body = {
        model: $option.model,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    };


    header["Authorization"] = `Bearer ${api_key}`
    
    if (isChatGPTModel) {
        body["messages"] = [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
            { role: "user", content: `"${query.text}"` },
        ];
    } else {
        body["prompt"] = userPrompt;
    }

    (async () => {
        const resp = await $http.request({
            method: "POST",
            url:
                $option.api_url + apiUrlPath,
            header,
            body,
        });

        if (resp.error) {
            const { statusCode } = resp.response;
            let reason;
            if (statusCode >= 400 && statusCode < 500) {
                reason = "param";
            } else {
                reason = "api";
            }
            completion({
                error: {
                    type: reason,
                    message: `接口响应错误 - ${resp.data.error.message}`,
                    addition: JSON.stringify(resp),
                },
            });
        } else {
            const { choices } = resp.data;
            if (!choices || choices.length === 0) {
                completion({
                    error: {
                        type: "api",
                        message: "接口未返回结果",
                    },
                });
                return;
            }
            if (isChatGPTModel) {
                targetTxt = choices[0].message.content.trim();
            } else {
                targetTxt = choices[0].text.trim();
            }

            if (targetTxt.startsWith('"') || targetTxt.startsWith("「")) {
                targetTxt = targetTxt.slice(1);
            }
            if (targetTxt.endsWith('"') || targetTxt.endsWith("」")) {
                targetTxt = targetTxt.slice(0, -1);
            }

            completion({
                result: {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: targetTxt.split("\n"),
                },
            });
        }
    })().catch((err) => {
        completion({
            error: {
                type: err._type || "unknown",
                message: err._message || "未知错误",
                addition: err._addition,
            },
        });
    });
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;