<p align="center">
  <img src="static/logo.png" alt="Pakistan Notice Helper logo" width="130">
</p>

<h1 align="center">Pakistan Notice Helper</h1>

<p align="center">
  <strong>Check suspicious Pakistani messages before you trust, pay, or reply.</strong>
</p>

<p align="center">
  A bilingual, multimodal safety assistant for notices, bills, SMS messages,<br>
  bank alerts, challans, courier updates, and customs messages.
</p>

<p align="center">
  <a href="https://huggingface.co/spaces/build-small-hackathon/pakistan-notice-helper"><img src="https://img.shields.io/badge/Live_Demo-Hugging_Face-FFD21E?style=for-the-badge&amp;logo=huggingface&amp;logoColor=black" alt="Open the live demo"></a>
  <a href="https://www.youtube.com/watch?v=EgYA3jrZTm0"><img src="https://img.shields.io/badge/Watch_Demo-YouTube-FF0000?style=for-the-badge&amp;logo=youtube&amp;logoColor=white" alt="Watch the demo on YouTube"></a>
  <a href="https://huggingface.co/blog/build-small-hackathon/building-pakistan-notice-helper"><img src="https://img.shields.io/badge/Build_Story-Read-00875A?style=for-the-badge" alt="Read the build story"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&amp;logoColor=white" alt="Python 3.10+">
  <img src="https://img.shields.io/badge/Gradio-6.16-FF7C00?logo=gradio&amp;logoColor=white" alt="Gradio 6.16">
  <img src="https://img.shields.io/badge/Model-Qwen3.5--4B-6F42C1" alt="Qwen3.5-4B">
  <img src="https://img.shields.io/badge/Runtime-llama.cpp-111111" alt="llama.cpp">
  <img src="https://img.shields.io/badge/Hosted_on-Modal-00D4AA" alt="Hosted on Modal">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
  <img src="https://img.shields.io/badge/Languages-English_%7C_Urdu-01411C" alt="English and Urdu">
</p>

## What It Does

Paste text or upload a screenshot to receive:

| Result | What you get |
| --- | --- |
| **Risk assessment** | Looks normal, Verify first, Suspicious, or Likely scam |
| **Clear explanation** | A simple response in English or Urdu |
| **Red flags** | The suspicious details that influenced the assessment |
| **Safe next steps** | Practical actions that avoid risky links and contacts |
| **Reply draft** | A polite response that does not expose personal information |

The mobile-first interface has a persistent English/Urdu switch. Urdu mode uses
a right-to-left layout and asks the live model to answer in Urdu. Roman Urdu and
mixed-language inputs are also supported.

> [\!IMPORTANT]
>
> Pakistan Notice Helper checks common scam signals, but it does not provide
> official verification, legal advice, or financial advice. Always verify through
> an official website or helpline before paying or sharing personal information.

## Project Links

- **Try it:** [Hugging Face Space](https://huggingface.co/spaces/build-small-hackathon/pakistan-notice-helper)
- **Watch it:** [YouTube demo](https://www.youtube.com/watch?v=EgYA3jrZTm0)
- **Read the story:** [Building Pakistan Notice Helper](https://huggingface.co/blog/build-small-hackathon/building-pakistan-notice-helper)
- **Explore the data:** [Privacy-safe trace dataset](https://huggingface.co/datasets/build-small-hackathon/pakistan-notice-helper-traces)
- **See the announcement:** [LinkedIn project post](https://www.linkedin.com/posts/1abidaliawan_after-3-straight-days-of-building-testing-ugcPost-7469716521095794688-TlqZ/)

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

<div align="center">
  <a href="https://www.youtube.com/watch?v=EgYA3jrZTm0">
    <img src="https://img.youtube.com/vi/EgYA3jrZTm0/maxresdefault.jpg" alt="Watch the Pakistan Notice Helper demo on YouTube" width="760">
  </a>
  <br>
  <strong><a href="https://www.youtube.com/watch?v=EgYA3jrZTm0">Watch the full demo on YouTube</a></strong>
</div>

The demo includes a real user testing the app on a phone, taking screenshots
of messages, and checking them with Pakistan Notice Helper.

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

The web app requires the Qwen model endpoint to be deployed and available
before it starts.

### 1. Install and authenticate

```powershell
git clone https://github.com/kingabzpro/pakistan-notice-helper.git
cd pakistan-notice-helper

python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

modal setup
```

`modal setup` opens a browser to authenticate your Modal account and configures
the CLI. This account token is used only to run and deploy Modal code.

### 2. Download and deploy the model server

```powershell
modal run model_server.py::download_model
modal deploy model_server.py
```

The first command downloads Qwen3.5-4B Q8 and its vision projector to a
persistent Modal Volume. The second command deploys the private
OpenAI-compatible `llama.cpp` server and prints its `.modal.run` endpoint URL.

### 3. Generate model proxy credentials

The model server uses Modal Proxy Auth. In the Modal Dashboard, open
**Settings > Proxy Auth Tokens**, create a new token, and copy both values:

- Token ID beginning with `wk-`
- Token secret beginning with `ws-`

The secret is shown only once. These proxy credentials are different from the
account token created by `modal setup`.

### 4. Configure and test the app

Set the credentials in the same terminal that will run the app:

```powershell
$env:MODAL_PROXY_KEY = "wk-..."
$env:MODAL_PROXY_SECRET = "ws-..."

# Only required if your deployment printed a different endpoint URL:
$env:MODEL_BASE_URL = "https://your-workspace--pakistan-scam-checker-qwen35-4b-q8-serve.modal.run"
$env:MODEL_NAME = "qwen3.5-4b-q8"

python app.py --test-endpoint
python app.py
```

The endpoint test sends a synthetic notice to the deployed model and verifies
the response contract before the UI starts. Never commit proxy credentials.

To use your own OpenAI-compatible `llama.cpp` server instead of Modal, set
`MODEL_BASE_URL`, `MODEL_NAME`, and optionally `MODEL_API_KEY`. Image analysis
also requires the Qwen vision projector (`mmproj-F16.gguf`) to be loaded by the
server.

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
