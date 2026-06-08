const elements = {
  form: document.querySelector("#noticeForm"),
  text: document.querySelector("#noticeText"),
  image: document.querySelector("#imageInput"),
  preview: document.querySelector("#imagePreview"),
  removeImage: document.querySelector("#removeImage"),
  dropZone: document.querySelector("#dropZone"),
  charCount: document.querySelector("#charCount"),
  button: document.querySelector("#analyzeButton"),
  resetButton: document.querySelector("#resetButton"),
  error: document.querySelector("#formError"),
  status: document.querySelector("#modelStatus"),
  results: document.querySelector("#results"),
  risk: document.querySelector("#riskBadge"),
  source: document.querySelector("#resultSource"),
  uploadHint: document.querySelector("#uploadHint"),
  textHint: document.querySelector("#textHint"),
  saveTrace: document.querySelector("#saveTrace"),
  statusText: document.querySelector(".status-text"),
  languageOptions: document.querySelectorAll(".language-option"),
};

const translations = {
  en: {
    pageTitle: "Pakistan Notice Helper",
    pageDescription: "Check Pakistani notices and messages for common scam signals.",
    statusChecking: "Checking model",
    statusReady: "Modal model ready",
    statusCredentials: "Modal credentials required",
    statusUnavailable: "Modal model unavailable",
    heroEyebrow: "Understand before you act",
    heroTitle: "Does this notice look",
    heroSafe: "safe?",
    heroText: "Check suspicious bills, bank alerts, FBR-style messages, challans, courier notices, and SMS screenshots for common scam signals.",
    trustTitle: "AI-assisted safety check",
    trustText: "The AI reads the notice, identifies scam signals, and returns a structured risk assessment with safer next steps.",
    checkerEyebrow: "Free safety check",
    checkerTitle: "Check a notice or message",
    modelDescription: "Analysis runs on the deployed Qwen3.5 4B multimodal model.",
    uploadLabel: "Upload a screenshot",
    dropImage: "Drop an image here",
    browseImage: "or tap to browse PNG, JPG, or WebP",
    previewAlt: "Selected notice preview",
    removeImage: "Remove image",
    imageMode: "Screenshot mode active — text input is locked",
    pasteLabel: "Or paste the message",
    textPlaceholder: "Paste the SMS, email, bill text, or notice here...",
    languageSupport: "English, Urdu, and Roman Urdu supported",
    textMode: "Text mode active — image upload is locked",
    traceTitle: "Publish privacy-safe trace",
    traceText: "Stores automated redacted text or an image description. Raw text, screenshots, links, identifiers, and model text are not stored.",
    checkButton: "Check this notice",
    checkingButton: "Checking safely...",
    startOver: "Start over",
    examplesEyebrow: "Try an example",
    examplesTitle: "Common messages in Pakistan",
    courierFee: "Courier fee",
    courierFeeText: "Urgent parcel payment link",
    taxRefund: "Tax refund",
    taxRefundText: "Unexpected refund request",
    bankAlert: "Bank alert",
    bankAlertText: "Security code request",
    screenshotsTitle: "Real scam screenshots",
    courierScam: "Courier scam",
    courierScamText: "Fake delivery fee message",
    mobileScam: "Mobile scam",
    mobileScamText: "Fake mobile operator message",
    trafficScam: "Traffic challan",
    trafficScamText: "Fake e-challan fine message",
    resultsEyebrow: "Safety assessment",
    resultsTitle: "What we found",
    explanationTitle: "Simple explanation",
    redFlagsTitle: "Red flags found",
    nextStepsTitle: "Safe next steps",
    replyTitle: "Polite reply draft",
    copy: "Copy",
    copied: "Copied",
    disclaimerTitle: "Important safety note",
    disclaimerText: "Pakistan Notice Helper does not provide official verification. It checks common scam signals and gives safe next steps. Always verify through official websites or helplines before making payments or sharing personal information.",
    footerOne: "Built for safer digital decisions in Pakistan.",
    footerTwo: "Never share OTPs, PINs, passwords, or CVVs.",
    requestStartError: "The app could not start the request.",
    requestReadError: "The app could not read the result.",
    requestFailedError: "The request could not be completed.",
    noResultError: "The app returned no result.",
    analyzeError: "Unable to analyze this input.",
    imageTypeError: "Use a PNG, JPG, or WebP image.",
    imageSizeError: "Please choose an image smaller than 8 MB.",
    exampleImageError: "Could not load the example image.",
    emptyInputError: "Paste a message or upload a screenshot to continue.",
    modelSource: "Analyzed by the deployed Qwen3.5 4B model endpoint.",
    cachedSource: "Cached model result",
    riskLooksNormal: "Looks normal",
    riskVerifyFirst: "Verify first",
    riskSuspicious: "Suspicious",
    riskLikelyScam: "Likely scam",
    riskInappropriate: "Inappropriate",
  },
  ur: {
    pageTitle: "پاکستان نوٹس ہیلپر",
    pageDescription: "پاکستانی نوٹس اور پیغامات میں عام فراڈ کی علامات چیک کریں۔",
    statusChecking: "ماڈل کی دستیابی چیک ہو رہی ہے",
    statusReady: "ماڈل تیار ہے",
    statusCredentials: "ماڈل کی رسائی درکار ہے",
    statusUnavailable: "ماڈل فی الحال دستیاب نہیں",
    heroEyebrow: "عمل کرنے سے پہلے سمجھیں",
    heroTitle: "کیا یہ نوٹس",
    heroSafe: "محفوظ لگتا ہے؟",
    heroText: "مشکوک بل، بینک الرٹ، ایف بی آر کے نام سے آنے والے پیغامات، چالان، کوریئر نوٹس اور ایس ایم ایس اسکرین شاٹس میں فراڈ کی عام نشانیاں جانچیں۔",
    trustTitle: "اے آئی سے حفاظتی جانچ",
    trustText: "اے آئی نوٹس پڑھ کر فراڈ کی ممکنہ نشانیاں بتاتا ہے اور محفوظ اگلے اقدامات تجویز کرتا ہے۔",
    checkerEyebrow: "مفت حفاظتی جانچ",
    checkerTitle: "نوٹس یا پیغام جانچیں",
    modelDescription: "یہ جانچ ایک چھوٹے ملٹی موڈل اے آئی ماڈل سے کی جاتی ہے۔",
    uploadLabel: "اسکرین شاٹ اپ لوڈ کریں",
    dropImage: "تصویر یہاں اپ لوڈ کریں",
    browseImage: "یا پی این جی، جے پی جی یا ویب پی فائل منتخب کرنے کے لیے دبائیں",
    previewAlt: "منتخب نوٹس کا پیش منظر",
    removeImage: "تصویر ہٹائیں",
    imageMode: "اسکرین شاٹ منتخب ہے، متن کا خانہ بند کر دیا گیا ہے",
    pasteLabel: "یا پیغام کا متن درج کریں",
    textPlaceholder: "ایس ایم ایس، ای میل، بل یا نوٹس کا متن یہاں پیسٹ کریں…",
    languageSupport: "انگریزی، اردو اور رومن اردو کی معاونت موجود ہے",
    textMode: "متن درج ہے، تصویر اپ لوڈ کرنے کا اختیار بند ہے",
    traceTitle: "رازداری کے ساتھ گمنام ٹریس شائع کریں",
    traceText: "صرف چھپایا گیا متن یا تصویر کی عمومی تفصیل محفوظ ہوتی ہے۔ اصل پیغام، اسکرین شاٹ، لنک، شناختی معلومات اور ماڈل کا جواب محفوظ نہیں کیا جاتا۔",
    checkButton: "نوٹس جانچیں",
    checkingButton: "جانچ جاری ہے…",
    startOver: "دوبارہ شروع کریں",
    examplesEyebrow: "مثال آزمائیں",
    examplesTitle: "پاکستان میں عام پیغامات",
    courierFee: "کوریئر فیس",
    courierFeeText: "پارسل فیس کی فوری ادائیگی کا لنک",
    taxRefund: "ٹیکس ریفنڈ",
    taxRefundText: "غیر متوقع رقم واپسی کا پیغام",
    bankAlert: "بینک الرٹ",
    bankAlertText: "حفاظتی کوڈ مانگنے والا پیغام",
    screenshotsTitle: "فراڈ کے حقیقی اسکرین شاٹس",
    courierScam: "کوریئر فراڈ",
    courierScamText: "جعلی ڈیلیوری فیس کا پیغام",
    mobileScam: "موبائل فراڈ",
    mobileScamText: "جعلی موبائل آپریٹر پیغام",
    trafficScam: "ٹریفک چالان",
    trafficScamText: "جعلی ای چالان کا پیغام",
    resultsEyebrow: "حفاظتی جائزہ",
    resultsTitle: "جانچ کا نتیجہ",
    explanationTitle: "سادہ وضاحت",
    redFlagsTitle: "خطرے کی نشانیاں",
    nextStepsTitle: "محفوظ اگلے اقدامات",
    replyTitle: "جواب کا شائستہ مسودہ",
    copy: "کاپی کریں",
    copied: "کاپی ہو گیا",
    disclaimerTitle: "اہم حفاظتی نوٹ",
    disclaimerText: "پاکستان نوٹس ہیلپر سرکاری تصدیق فراہم نہیں کرتا۔ یہ فراڈ کی عام نشانیاں دیکھ کر محفوظ اگلے اقدامات بتاتا ہے۔ ادائیگی کرنے یا ذاتی معلومات دینے سے پہلے ہمیشہ متعلقہ ادارے کی سرکاری ویب سائٹ، ایپ یا ہیلپ لائن سے تصدیق کریں۔",
    footerOne: "پاکستان میں محفوظ ڈیجیٹل فیصلوں کے لیے تیار کیا گیا۔",
    footerTwo: "اپنا او ٹی پی، پن، پاس ورڈ یا سی وی وی کبھی شیئر نہ کریں۔",
    requestStartError: "جانچ شروع نہیں ہو سکی۔",
    requestReadError: "جانچ کا نتیجہ موصول نہیں ہو سکا۔",
    requestFailedError: "درخواست مکمل نہیں ہو سکی۔",
    noResultError: "کوئی نتیجہ موصول نہیں ہوا۔",
    analyzeError: "اس مواد کی جانچ نہیں ہو سکی۔",
    imageTypeError: "PNG، JPG یا WebP تصویر استعمال کریں۔",
    imageSizeError: "براہ کرم 8 MB سے چھوٹی تصویر منتخب کریں۔",
    exampleImageError: "مثالی تصویر لوڈ نہیں ہو سکی۔",
    emptyInputError: "پیغام کا متن درج کریں یا اسکرین شاٹ اپ لوڈ کریں۔",
    modelSource: "یہ نتیجہ Qwen3.5 4B ماڈل نے تیار کیا ہے۔",
    cachedSource: "پہلے سے محفوظ ماڈل نتیجہ",
    riskLooksNormal: "معمول کا پیغام",
    riskVerifyFirst: "پہلے تصدیق کریں",
    riskSuspicious: "مشکوک",
    riskLikelyScam: "ممکنہ فراڈ",
    riskInappropriate: "نامناسب",
  },
};

let imageDataUrl = "";
let activeMode = null;
let activeExampleId = "";
let currentLanguage = localStorage.getItem("notice-helper-language") === "ur" ? "ur" : "en";
let currentStatus = null;
let currentRiskLabel = "";

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function applyLanguage(language) {
  currentLanguage = language === "ur" ? "ur" : "en";
  localStorage.setItem("notice-helper-language", currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ur" ? "rtl" : "ltr";
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]').content = t("pageDescription");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = t(element.dataset.i18nAlt);
  });
  elements.languageOptions.forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setStatus(currentStatus);
  if (currentRiskLabel) setRiskLabel(currentRiskLabel);
  if (elements.button.classList.contains("loading")) {
    elements.button.querySelector(".button-label").textContent = t("checkingButton");
  }
}

function setRiskLabel(label) {
  currentRiskLabel = label;
  const keys = {
    "Looks normal": "riskLooksNormal",
    "Verify first": "riskVerifyFirst",
    Suspicious: "riskSuspicious",
    "Likely scam": "riskLikelyScam",
    Inappropriate: "riskInappropriate",
  };
  elements.risk.textContent = t(keys[label] || label);
}

async function callGradioApi(name, data) {
  const response = await fetch(`/gradio_api/call/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!response.ok) throw new Error(t("requestStartError"));
  const { event_id: eventId } = await response.json();
  const stream = await fetch(`/gradio_api/call/${name}/${eventId}`);
  if (!stream.ok || !stream.body) throw new Error(t("requestReadError"));

  const reader = stream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() || "";
    for (const chunk of chunks) {
      const event = chunk.match(/^event:\s*(.+)$/m)?.[1];
      const raw = chunk.match(/^data:\s*(.+)$/m)?.[1];
      if (event === "error") throw new Error(t("requestFailedError"));
      if (event === "complete" && raw) {
        const values = JSON.parse(raw);
        return values[0];
      }
    }
  }
  throw new Error(t("noResultError"));
}

function setStatus(status) {
  if (!status) {
    elements.statusText.textContent = t("statusChecking");
    return;
  }
  currentStatus = status;
  const modelName = status.label?.match(/:\s*(.+)$/)?.[1] || "";
  elements.statusText.textContent = status.connected
    ? `${t("statusReady")}${currentLanguage === "en" && modelName ? `: ${modelName}` : ""}`
    : status.label?.toLowerCase().includes("credentials")
      ? t("statusCredentials")
      : t("statusUnavailable");
  elements.status.classList.toggle("connected", Boolean(status.connected));
}

async function loadStatus() {
  try {
    setStatus(await callGradioApi("status", []));
  } catch {
    setStatus({ connected: false, label: "Modal model unavailable" });
  }
}

function showError(message = "") {
  elements.error.textContent = message;
  elements.error.classList.toggle("visible", Boolean(message));
}

function setMode(mode) {
  activeMode = mode;
  const isImage = mode === "image";
  const isText = mode === "text";

  elements.text.disabled = isImage;
  elements.dropZone.classList.toggle("disabled", isText);
  elements.image.disabled = isText;

  elements.uploadHint.classList.toggle("visible", isImage);
  elements.textHint.classList.toggle("visible", isText);
  elements.resetButton.classList.toggle("visible", Boolean(mode));
}

function setLoading(loading) {
  elements.button.disabled = loading;
  elements.button.classList.toggle("loading", loading);
  elements.button.querySelector(".button-label").textContent =
    loading ? t("checkingButton") : t("checkButton");
}

function renderList(selector, items) {
  const list = document.querySelector(selector);
  list.replaceChildren(...items.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
}

function renderResult(payload) {
  if (!payload.ok) throw new Error(t("analyzeError"));
  const result = payload.assessment;
  setStatus(payload.status);
  elements.risk.className = `risk-badge risk-${result.risk_label.toLowerCase().replaceAll(" ", "-")}`;
  setRiskLabel(result.risk_label);
  document.querySelector("#explanationText").textContent = result.simple_explanation;
  renderList("#redFlagsList", result.red_flags);
  renderList("#nextStepsList", result.safe_next_steps);

  const replyCard = document.querySelector("#replyCard");
  const replyText = document.querySelector("#replyText");
  const replyAllowed = ["Verify first", "Suspicious"].includes(result.risk_label);
  if (replyAllowed && result.reply_draft && result.reply_draft.trim()) {
    replyText.textContent = result.reply_draft;
    replyCard.hidden = false;
  } else {
    replyCard.hidden = true;
  }

  elements.source.textContent = payload.source === "model"
    ? t("modelSource")
    : payload.source === "cached_modal_example"
      ? t("cachedSource")
      : "";
  elements.source.classList.toggle(
    "cached-result",
    payload.source === "cached_modal_example",
  );
  elements.results.hidden = false;
  elements.results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useImage(file) {
  if (!file) return;
  activeExampleId = "";
  const allowed = ["image/png", "image/jpeg", "image/webp"];
  if (!allowed.includes(file.type)) return showError(t("imageTypeError"));
  if (file.size > 8 * 1024 * 1024) return showError(t("imageSizeError"));
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imageDataUrl = String(reader.result);
    elements.preview.src = imageDataUrl;
    elements.dropZone.classList.add("has-image");
    showError();
    setMode("image");
  });
  reader.readAsDataURL(file);
}

elements.image.addEventListener("change", () => useImage(elements.image.files[0]));
elements.removeImage.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  imageDataUrl = "";
  activeExampleId = "";
  elements.image.value = "";
  elements.preview.removeAttribute("src");
  elements.dropZone.classList.remove("has-image");
  setMode(null);
});
["dragenter", "dragover"].forEach((name) => elements.dropZone.addEventListener(name, (event) => {
  event.preventDefault();
  elements.dropZone.classList.add("dragging");
}));
["dragleave", "drop"].forEach((name) => elements.dropZone.addEventListener(name, (event) => {
  event.preventDefault();
  elements.dropZone.classList.remove("dragging");
}));
elements.dropZone.addEventListener("drop", (event) => useImage(event.dataTransfer.files[0]));
elements.text.addEventListener("input", () => {
  activeExampleId = "";
  elements.charCount.textContent = `${elements.text.value.length.toLocaleString()} / 12,000`;
  if (elements.text.value.trim().length === 1) {
    setMode("text");
  }
  if (elements.text.value.trim().length === 0 && activeMode === "text") {
    setMode(null);
  }
});

document.querySelectorAll(".example-card").forEach((button) => {
  button.addEventListener("click", async () => {
    if (button.dataset.image) {
      try {
        const response = await fetch(button.dataset.image);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          imageDataUrl = String(reader.result);
          activeExampleId = button.dataset.exampleId || "";
          elements.preview.src = imageDataUrl;
          elements.dropZone.classList.add("has-image");
          showError();
          setMode("image");
          document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
        });
        reader.readAsDataURL(blob);
      } catch {
        showError(t("exampleImageError"));
      }
    } else if (button.dataset.example) {
      elements.text.value = button.dataset.example;
      elements.text.dispatchEvent(new Event("input"));
      activeExampleId = button.dataset.exampleId || "";
      elements.text.focus();
      setMode("text");
      document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
    }
  });
});

elements.resetButton.addEventListener("click", () => {
  imageDataUrl = "";
  activeExampleId = "";
  elements.image.value = "";
  elements.preview.removeAttribute("src");
  elements.dropZone.classList.remove("has-image");
  elements.text.value = "";
  elements.charCount.textContent = "0 / 12,000";
  elements.results.hidden = true;
  showError();
  setMode(null);
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError();
  if (!elements.text.value.trim() && !imageDataUrl) {
    return showError(t("emptyInputError"));
  }

  if (activeMode === "image") {
    elements.text.value = "";
    elements.charCount.textContent = "0 / 12,000";
  } else if (activeMode === "text") {
    imageDataUrl = "";
    elements.image.value = "";
    elements.preview.removeAttribute("src");
    elements.dropZone.classList.remove("has-image");
  }

  setLoading(true);
  try {
    const useCachedExample = currentLanguage === "en" && Boolean(activeExampleId);
    const submittedImage = useCachedExample ? "" : imageDataUrl;
    renderResult(await callGradioApi(
      "analyze",
      [
        elements.text.value,
        submittedImage,
        useCachedExample ? activeExampleId : "",
        elements.saveTrace.checked,
        currentLanguage,
      ],
    ));
  } catch (error) {
    showError(error.message || t("requestFailedError"));
  } finally {
    setLoading(false);
  }
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(`#${button.dataset.copy}`);
    await navigator.clipboard.writeText(target.innerText);
    button.textContent = t("copied");
    setTimeout(() => { button.textContent = t("copy"); }, 1200);
  });
});

elements.languageOptions.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

applyLanguage(currentLanguage);
loadStatus();
