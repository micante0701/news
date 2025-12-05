// 建立變形詞對應表
const inflectionMap = {};
for (const [base, forms] of Object.entries(variants)) {
    forms.forEach(f => inflectionMap[f.toLowerCase()] = base);
}

const article = document.getElementById("article");
const original = article.innerHTML;

// 排序單字，處理雙字詞/較長詞優先
const allKeys = Object.keys(definitions)
    .concat(Object.keys(inflectionMap))
    .sort((a, b) => b.length - a.length)
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const regex = new RegExp(`\\b(${allKeys.join("|")})\\b`, "gi");

// 取代單字為 tooltip 結構
const html = original.replace(regex, match => {
    const lower = match.toLowerCase();
    const base = definitions[match] ? match : inflectionMap[lower];
    const meaning = definitions[base];
    if (meaning) {
        return `<span class="tooltip-word" data-word="${base}">${match}<span class="tooltip-box">${meaning}</span></span>`;
    }
    return match;
});

article.innerHTML = html;

// hover + 點擊事件控制 active 狀態
document.querySelectorAll(".tooltip-word").forEach(span => {
    // 滑鼠 hover（桌機）
    span.addEventListener("mouseenter", () => span.classList.add("active"));
    span.addEventListener("mouseleave", () => span.classList.remove("active"));
});