# Pakistan Notice Helper

A local-first AI app that helps people in Pakistan identify suspicious messages, scam SMS, fake notices, and phishing attempts.

## Problem

Millions of Pakistanis receive confusing or fraudulent messages daily:
- Fake FBR tax refund SMS
- Counterfeit e-challan traffic fines
- Phishing courier delivery notifications (Pakistan Post, TCS, Leopards)
- Bank fraud alerts and fake reward points
- Easypaisa / JazzCash wallet scams
- WhatsApp account hijacking attempts

Most people cannot tell real from fake. This tool helps them decide.

## How It Works

```
User pastes SMS / uploads screenshot
        |
        v
   Small multimodal model (local, no cloud)
        |
        v
   Returns:
   - Risk label (Likely scam / Verify first / Looks normal)
   - Red flags found
   - Simple explanation in English + Urdu
   - Safe next steps
   - Draft reply
```

## Project Structure

```
pakistan-scam-checker/
├── data/
│   └── examples.jsonl          # 14 labeled scam screenshot examples
├── sample_inputs/              # Real scam message screenshots (public sources)
├── docs/
│   ├── research_notes.md       # Scam pattern research & official advisories
│   └── model_experiment_notes.md
├── experiments/
│   └── modal_qwen36_mtp/      # Qwen3.6 MTP model experiments on Modal
└── README.md
```

## Dataset

`data/examples.jsonl` contains 14 image-based examples sourced from public posts on Reddit, PTA advisories, and security research reports.

Each entry includes:
| Field | Description |
|---|---|
| `image` | Path to screenshot in `sample_inputs/` |
| `category` | traffic_challan, courier, FBR, bank, wallet, unknown |
| `risk_label` | Likely scam / Suspicious / Verify first / Looks normal |
| `source_type` | reddit / official_advisory / other |
| `source_url` | Public URL where the image was found |
| `description` | What the screenshot shows |
| `red_flags` | Array of warning signs |

### Categories Covered

| Category | Count | Examples |
|---|---|---|
| Courier scams | 8 | Fake Pakistan Post, TCS delivery SMS |
| E-Challan scams | 2 | Fake traffic fine from non-9915 numbers |
| Bank scams | 2 | HBL/UBL fraud alerts, smishing |
| FBR tax scams | 1 | Fake tax refund message |
| WhatsApp scams | 1 | Verification code hijacking |

## Getting Started

```bash
git clone https://github.com/kingabzpro/pakistan-scam-checker.git
cd pakistan-scam-checker
```

### Prerequisites

- Python 3.10+
- llama.cpp (for local model inference)
- A multimodal GGUF model (e.g., Qwen3.6-27B-MTP)

### Quick Test

```python
import json

with open("data/examples.jsonl") as f:
    for line in f:
        example = json.loads(line)
        print(f"[{example['risk_label']}] {example['category']}: {example['description'][:80]}...")
```

## Model Experiments

See `docs/model_experiment_notes.md` for details on running Qwen3.6-27B-MTP on Modal with an L40S GPU.

Key findings:
- Model loads in ~12 seconds on L40S (48GB VRAM)
- Inference in ~5 seconds for structured JSON output
- MTP draft token acceptance: ~60%
- Vision projector included for image understanding

## Official Reporting Channels

If you receive a suspicious message in Pakistan:

| Organization | Contact |
|---|---|
| PTA (Telecom) | complaints.pta.gov.pk |
| FIA Cyber Crime | Helpline 1991 |
| SBP (Banking) | 021-111-727-727 |
| FBR (Tax) | fbr.gov.pk |
| National CERT | pkcert.gov.pk |

## Contributing

This is a hackathon project. Contributions welcome:

1. Add more scam screenshots to `sample_inputs/`
2. Add corresponding entries to `data/examples.jsonl`
3. Improve model prompts and detection accuracy
4. Add Urdu language support

**Important:** Do not upload private personal data. All screenshots must be from public sources or anonymized recreations.

## License

Apache License 2.0. See [LICENSE](LICENSE).

## Acknowledgments

- PTA, FIA, FBR, PSCA for public scam advisories
- Reddit r/pakistan and r/PakistaniTech communities
- NCERT Pakistan for cybersecurity advisories
- Security researchers at Resecurity and Group-IB
