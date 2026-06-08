---
title: Pakistan Notice Helper
emoji: 📬
colorFrom: green
colorTo: green
sdk: gradio
sdk_version: 6.16.0
app_file: app.py
pinned: true
license: mit
tags:
- backyard-ai
- build-small-hackathon
- gradio
- llama.cpp
- modal
- qwen
- gguf
- multimodal
- vision-language-model
- scam-detection
- online-safety
- pakistan
- urdu
- bilingual
- roman-urdu
- openai-compatible
short_description: Check Pakistani notices for scam risks in English or Urdu.
---

# Pakistan Notice Helper

Pakistan Notice Helper is a bilingual safety assistant for confusing or
suspicious Pakistani notices, bills, SMS messages, bank alerts, challans, and
courier or customs messages. Paste text or upload a screenshot to receive:

- a risk label: **Looks normal**, **Verify first**, **Suspicious**, or **Likely scam**
- a simple English or Urdu explanation
- red flags, safe next steps, and a polite reply draft

The mobile-first interface has a persistent English/Urdu switch. Urdu mode uses
a right-to-left layout and asks the live model to answer in Urdu. Roman Urdu and
mixed-language inputs are also supported.

> Pakistan Notice Helper checks common scam signals but does not provide
> official verification, legal advice, or financial advice. Verify through an
> official website or helpline before paying or sharing personal information.

| Resource | Link |
| --- | --- |
| Live app | [Hugging Face Space](https://huggingface.co/spaces/build-small-hackathon/pakistan-notice-helper) |
| Source | [GitHub repository](https://github.com/kingabzpro/pakistan-notice-helper) |
| Open traces | [Privacy-safe trace dataset](https://huggingface.co/datasets/build-small-hackathon/pakistan-notice-helper-traces) |
| Demo video | [Watch on YouTube](https://www.youtube.com/watch?v=EgYA3jrZTm0) |
| Build story | [Building Pakistan Notice Helper](https://huggingface.co/blog/build-small-hackathon/building-pakistan-notice-helper) |
| Social post | [Project announcement on LinkedIn](https://www.linkedin.com/posts/1abidaliawan_after-3-straight-days-of-building-testing-ugcPost-7469716521095794688-TlqZ/) |

## Hackathon Fit

This is a **Backyard AI** submission for the
[Build Small. Play Big. Hackathon](https://huggingface.co/build-small-hackathon).
It applies a small model to a practical regional safety problem.

| Area | Project evidence |
| --- | --- |
| Core constraints | Public Gradio Space using Qwen3.5-4B, below the 32B limit |
| Backyard AI | A real user tested the phone workflow and plans to use it for future suspicious messages |
| Modal | Qwen3.5-4B is hosted on a Modal L4 GPU endpoint |
| Tiny Titan | The 4B Q8 model passed the final 10-case internal regression suite |
| Llama Champion | Qwen3.5-4B runs through a CUDA-enabled `llama.cpp` server using its OpenAI-compatible API |
| Off-Brand | Custom mobile-first HTML, CSS, and JavaScript interface served through `gradio.Server` instead of the default Gradio UI |
| Sharing is Caring | Privacy-safe workflow traces are published as a Hugging Face dataset |
| Field Notes | Published a blog in the Build Small Hackathon organization sharing my opinions, development experience, model experiments, and lessons learned |

## Demo and User Feedback

The [demo video](https://www.youtube.com/watch?v=EgYA3jrZTm0) includes a real
user using the app on a phone, taking screenshots of messages, and checking
them with Pakistan Notice Helper.

The user especially liked the app's speed and the accuracy of its responses.
They said they plan to use it in the future to check different scam or
suspicious messages.

## Architecture

```text
Text or screenshot
        |
        v
Custom bilingual frontend on gradio.Server
        |
        v
Image preprocessing and structured safety prompt
        |
        v
Qwen3.5-4B Q8_0 MTP on llama.cpp
        |
        v
Modal L4 endpoint
        |
        v
Risk label, explanation, red flags, and safe next steps
```

Gradio provides queueing, API routes, and Hugging Face Spaces hosting without
exposing a default Gradio UI. Live analyses always use the configured model
endpoint. There is no heuristic fallback, and endpoint failures are shown
explicitly. Bundled English examples are cached; Urdu analyses are generated
live.

## Model and Evaluation

- **Model:** `unsloth/Qwen3.5-4B-MTP-GGUF` using `Qwen3.5-4B-Q8_0.gguf`
- **Runtime:** [`llama.cpp` OpenAI-compatible server](https://github.com/ggml-org/llama.cpp/tree/master/examples/server)
- **Client:** [OpenAI Python SDK with a custom `base_url`](https://github.com/openai/openai-python#configuring-the-http-client)
- **Hosting:** Modal L4 GPU
- **Internal evaluation:** 10/10 final regression cases, up from 9/10 initially

The focused test set covers banking notices, authority impersonation, prize
scams, service messages, Urdu text, and screenshots. It is not a claim of
general fraud-detection accuracy.

## Run Locally

```bash
pip install -r requirements.txt
copy .env.example .env
python app.py
```

On macOS or Linux, use `cp .env.example .env`. Add `MODAL_PROXY_KEY` and
`MODAL_PROXY_SECRET` to `.env` before starting live inference. Model URL, name,
token limit, timeout, and retry settings are optional.

See [`docs/local_model_setup.md`](docs/local_model_setup.md) for full setup and deployment
instructions.

## Privacy-Safe Traces

Users can explicitly consent to sharing a minimized workflow trace. Traces may
include language, input type, risk label, latency, response length, and a coarse
error category.

They do **not** include raw notice text, OCR text, screenshots, names, phone
numbers, credentials, or full model responses. See
the trace [`dataset card`](traces/dataset_card.md).

## Privacy and Limitations

- Inputs are processed in memory and are not written to disk by the app.
- Model requests are sent to the configured Modal endpoint.
- Redact CNIC numbers, account details, OTPs, PINs, and other sensitive data.
- Poor images, mixed scripts, abbreviations, or missing context can reduce reliability.
- Verify using contact details obtained independently from the message.

## Official Verification

- [PTA Complaint Management System](https://complaint.pta.gov.pk/)
- [PTA Numbering and Short Codes](https://www.pta.gov.pk/category/numbering-and-short-codes)
- [FIA Complaint Portal](https://complaint.fia.gov.pk/)
- [State Bank of Pakistan](https://www.sbp.org.pk/)
- [Federal Board of Revenue](https://www.fbr.gov.pk/)

Never rely on a verification link contained inside a suspicious message.
