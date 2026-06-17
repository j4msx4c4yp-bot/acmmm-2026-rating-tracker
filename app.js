const STORAGE_KEY = "acmmm-2026-final-ratings";
const SEED_VERSION_KEY = "acmmm-2026-final-ratings-seed-version";
const SEED_VERSION = "2026-06-16-screenshot-import-v1";
const MAX_SCORES = 5;
const AUTO_REFRESH_INTERVAL_MS = 30000;
const HISTOGRAM_MIN_SCORE = 1;
const HISTOGRAM_MAX_SCORE = 5;
const HISTOGRAM_BIN_SIZE = 0.2;
const HISTOGRAM_BIN_EPSILON = 1e-9;
const SEEDED_RECORDS = [
  { paperId: "366", scores: [3, 2, 4, 4, 2] },
  { paperId: "438", scores: [4, 4, 4, 4] },
  { paperId: "642", scores: [2, 3, 2, 3, 2] },
  { paperId: "666", scores: [3, 4, 1, 2, 2] },
  { paperId: "4029", scores: [5, 2, 4, 2, 3] },
  { paperId: "4424", scores: [3, 2, 2, 2, 2] },
  { paperId: "5142", scores: [4, 2, 2, 3] },
  { paperId: "5693", scores: [4, 3, 4, 2, 2] },
  { paperId: "7053", scores: [2, 2, 3, 2, 3] },
  { paperId: "7092", scores: [4, 4, 4, 3] },
  { paperId: "7096", scores: [4, 4, 4, 4] },
  { paperId: "7281", scores: [3, 2, 2, 2, 3] },
  { paperId: "7334", scores: [3, 3, 5, 4, 4] },
  { paperId: "7838", scores: [3, 3, 3, 2] },
  { paperId: "8953", scores: [4, 4, 4, 3, 2] },
  { paperId: "5590", scores: [2, 2, 3, 2, 3] },
  { paperId: "5368", scores: [3, 3, 4, 4, 3] },
  { paperId: "4052", scores: [3, 4, 4, 4, 2] },
  { paperId: "2241", scores: [2, 2, 2, 3, 2] },
  { paperId: "6856", scores: [2, 2, 2, 3] },
  { paperId: "4925", scores: [2, 2, 4, 5, 5] },
  { paperId: "5641", scores: [3, 3, 3, 4] },
  { paperId: "4813", scores: [3, 4, 1, 4, 1] },
  { paperId: "5303", scores: [3, 2, 2, 2, 2] },
  { paperId: "8635", scores: [2, 2, 2, 2, 3] },
  { paperId: "2359", scores: [4, 3, 3, 2] },
  { paperId: "5814", scores: [3, 3, 2, 3, 2] },
  { paperId: "6691", scores: [1, 4, 3, 3, 2] },
  { paperId: "8706", scores: [2, 3, 2, 2, 3] },
  { paperId: "8827", scores: [3, 2, 2, 2, 3] },
  { paperId: "7817", scores: [4, 4, 4, 4] },
  { paperId: "7820", scores: [2, 2, 2, 2, 2] },
  { paperId: "9413", scores: [4, 1, 4, 4] },
  { paperId: "4077", scores: [5, 4, 3, 5] },
  { paperId: "9700", scores: [2, 3, 3, 1, 2] },
  { paperId: "7391", scores: [4, 4, 3, 3] },
  { paperId: "1", scores: [2, 2, 2, 3] },
  { paperId: "2833", scores: [4, 4, 3, 4] },
  { paperId: "100000", scores: [1, 1, 1, 1] },
  { paperId: "2979", scores: [1, 2, 2, 3] },
  { paperId: "4358", scores: [3, 3, 4, 4, 5] },
  { paperId: "7378", scores: [4, 5, 3, 2, 3] },
  { paperId: "8287", scores: [4, 4, 2, 4, 3] },
  { paperId: "12312", scores: [4, 3, 3, 2] },
  { paperId: "3480", scores: [3, 2, 2, 2, 2] },
  { paperId: "4586", scores: [2, 2, 2, 1, 2] },
  { paperId: "4587", scores: [2, 2, 3, 2, 2] },
  { paperId: "6782", scores: [2, 2, 3, 2] },
  { paperId: "6815", scores: [2, 1, 2, 4, 1] },
  { paperId: "3788", scores: [4, 3, 4, 4, 4] },
  { paperId: "7173", scores: [3, 2, 2, 4, 4] },
  { paperId: "7179", scores: [4, 4, 3, 4] },
  { paperId: "5358", scores: [4, 2, 2, 3, 3] },
  { paperId: "9650", scores: [3, 2, 3, 1, 2] },
  { paperId: "7290", scores: [3, 3, 3, 5, 2] },
  { paperId: "9064", scores: [2, 1, 3, 2, 2] },
  { paperId: "3691", scores: [3, 3, 1, 2, 3] },
  { paperId: "5477", scores: [2, 2, 4, 4, 5] },
  { paperId: "5063", scores: [2, 3, 4, 3, 2] },
  { paperId: "1001", scores: [2, 4, 4, 2] },
  { paperId: "2180", scores: [4, 4, 4, 3, 2] },
];

const submitPanel = document.querySelector("#submitPanel");
const resultsPanel = document.querySelector("#resultsPanel");
const paperRows = document.querySelector("#paperRows");
const notice = document.querySelector("#notice");
const ratingsTable = document.querySelector("#ratingsTable");
const scoreHistogram = document.querySelector("#scoreHistogram");
const emptyState = document.querySelector("#emptyState");

const controls = {
  showSubmit: document.querySelector("#showSubmit"),
  showResults: document.querySelector("#showResults"),
  addPaper: document.querySelector("#addPaper"),
  resetForm: document.querySelector("#resetForm"),
  ratingForm: document.querySelector("#ratingForm"),
  refreshResults: document.querySelector("#refreshResults"),
  clearData: document.querySelector("#clearData"),
  exportData: document.querySelector("#exportData"),
  paperCount: document.querySelector("#paperCount"),
  q25: document.querySelector("#q25"),
  q50: document.querySelector("#q50"),
  q75: document.querySelector("#q75"),
  lastUpdated: document.querySelector("#lastUpdated"),
};

let resultsRefreshTimer = null;
let isRenderingResults = false;

function isSupabaseConfigured() {
  const config = window.ACMMM_CONFIG || {};
  return Boolean(
    config.supabaseUrl &&
      config.supabaseAnonKey &&
      !config.supabaseUrl.includes("YOUR_PROJECT_REF") &&
      !config.supabaseAnonKey.includes("YOUR_SUPABASE_ANON_KEY"),
  );
}

function getSupabaseConfig() {
  const config = window.ACMMM_CONFIG || {};
  return {
    url: String(config.supabaseUrl || "").replace(/\/$/, ""),
    anonKey: String(config.supabaseAnonKey || ""),
  };
}

async function supabaseRequest(path, options = {}) {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let details = {};
    try {
      details = await response.json();
    } catch {
      details = { message: response.statusText };
    }
    const error = new Error(details.message || "Supabase request failed");
    error.status = response.status;
    error.details = details;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

function mapDbRecord(record) {
  return {
    paperId: record.paper_id,
    scores: Array.isArray(record.scores) ? record.scores.map(Number) : [],
    average: Number(record.average),
    createdAt: record.created_at,
  };
}

async function loadRemoteRecords() {
  const records = await supabaseRequest("ratings?select=paper_id,scores,average,created_at");
  return records.map(mapDbRecord);
}

async function insertRemoteRecord(entry) {
  const payload = {
    paper_id: entry.paperId,
    scores: entry.scores,
    average: average(entry.scores),
  };
  const records = await supabaseRequest("ratings", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });
  return mapDbRecord(records[0]);
}

async function loadRecords() {
  if (isSupabaseConfigured()) return loadRemoteRecords();
  return loadLocalRecords();
}

function loadLocalRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function seedInitialRecords() {
  if (isSupabaseConfigured()) return;
  if (localStorage.getItem(SEED_VERSION_KEY) === SEED_VERSION) return;

  const records = loadLocalRecords();
  const existingIds = new Set(records.map((record) => record.paperId.toLowerCase()));
  const importedAt = "2026-06-16T13:28:39+08:00";
  const recordsToAdd = SEEDED_RECORDS.filter((record) => !existingIds.has(record.paperId.toLowerCase())).map(
    (record) => ({
      ...record,
      average: average(record.scores),
      createdAt: importedAt,
    }),
  );

  if (recordsToAdd.length) {
    saveLocalRecords([...records, ...recordsToAdd].sort(sortByPaperId));
  }
  localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
}

function normalizePaperId(value) {
  return value.trim();
}

function parseScore(value) {
  if (value === "") return null;
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
}

function average(scores) {
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function formatScore(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "-";
}

function paperSortKey(id) {
  const numeric = Number(id);
  return Number.isFinite(numeric) ? { type: "number", value: numeric } : { type: "text", value: id };
}

function sortByPaperId(a, b) {
  const left = paperSortKey(a.paperId);
  const right = paperSortKey(b.paperId);
  if (left.type === "number" && right.type === "number") return left.value - right.value;
  return String(a.paperId).localeCompare(String(b.paperId), undefined, { numeric: true, sensitivity: "base" });
}

function quantile(values, percentile) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => b - a);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function buildHistogramBins(values) {
  const binCount = Math.round((HISTOGRAM_MAX_SCORE - HISTOGRAM_MIN_SCORE) / HISTOGRAM_BIN_SIZE);
  const bins = Array.from({ length: binCount }, (_, index) => {
    const min = HISTOGRAM_MIN_SCORE + index * HISTOGRAM_BIN_SIZE;
    const max = min + HISTOGRAM_BIN_SIZE;
    return {
      min,
      max,
      label: `${min.toFixed(1)}-${max.toFixed(1)}`,
      count: 0,
    };
  });

  values.forEach((value) => {
    if (!Number.isFinite(value)) return;
    const clampedValue = Math.min(Math.max(value, HISTOGRAM_MIN_SCORE), HISTOGRAM_MAX_SCORE);
    const index = Math.min(
      Math.floor((clampedValue - HISTOGRAM_MIN_SCORE) / HISTOGRAM_BIN_SIZE + HISTOGRAM_BIN_EPSILON),
      bins.length - 1,
    );
    bins[index].count += 1;
  });

  return bins;
}

function renderHistogram(values) {
  const bins = buildHistogramBins(values);
  const maxCount = Math.max(...bins.map((bin) => bin.count), 1);

  scoreHistogram.innerHTML = "";
  bins.forEach((bin) => {
    const height = `${Math.max((bin.count / maxCount) * 100, bin.count ? 4 : 0)}%`;
    const item = document.createElement("div");
    item.className = "histogram-bin";
    item.title = `${bin.label}: ${bin.count} 篇 paper`;
    item.innerHTML = `
      <span class="histogram-count">${bin.count}</span>
      <div class="histogram-track">
        <div class="histogram-bar" style="--bar-height: ${height}"></div>
      </div>
      <span class="histogram-label">${bin.label}</span>
    `;
    scoreHistogram.append(item);
  });
}

async function showPanel(target) {
  submitPanel.classList.toggle("active", target === "submit");
  resultsPanel.classList.toggle("active", target === "results");
  if (target === "results") {
    startResultsAutoRefresh();
    await renderResults();
  } else {
    stopResultsAutoRefresh();
  }
}

function startResultsAutoRefresh() {
  if (resultsRefreshTimer) return;
  resultsRefreshTimer = window.setInterval(() => {
    if (!resultsPanel.classList.contains("active") || document.hidden) return;
    renderResults({ silent: true });
  }, AUTO_REFRESH_INTERVAL_MS);
}

function stopResultsAutoRefresh() {
  if (!resultsRefreshTimer) return;
  window.clearInterval(resultsRefreshTimer);
  resultsRefreshTimer = null;
}

function showNotice(message, type = "info") {
  notice.textContent = message;
  notice.className = `notice show${type === "warning" ? " warning" : ""}`;
}

function hideNotice() {
  notice.className = "notice";
  notice.textContent = "";
}

function createPaperRow() {
  const row = document.createElement("div");
  row.className = "paper-row";

  const idField = document.createElement("div");
  idField.className = "field";
  idField.innerHTML = `
    <label>Paper ID</label>
    <input class="paper-id-input" type="text" inputmode="numeric" placeholder="例如 1024" required />
  `;

  const scoresField = document.createElement("div");
  scoresField.className = "field scores-field";
  const label = document.createElement("label");
  label.textContent = "Final rating（最多 5 个）";
  const scoreList = document.createElement("div");
  scoreList.className = "score-list";

  for (let i = 0; i < MAX_SCORES; i += 1) {
    const input = document.createElement("input");
    input.className = "score-input";
    input.type = "number";
    input.step = "0.1";
    input.placeholder = `R${i + 1}`;
    input.min = "0";
    scoreList.append(input);
  }

  scoresField.append(label, scoreList);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-row";
  removeButton.type = "button";
  removeButton.textContent = "×";
  removeButton.setAttribute("aria-label", "删除该 paper 输入行");
  removeButton.addEventListener("click", () => {
    row.remove();
    if (!paperRows.children.length) addPaperRow();
  });

  row.append(idField, scoresField, removeButton);
  return row;
}

function addPaperRow() {
  paperRows.append(createPaperRow());
}

function resetForm() {
  paperRows.innerHTML = "";
  addPaperRow();
  hideNotice();
}

function collectFormEntries() {
  const rows = [...paperRows.querySelectorAll(".paper-row")];
  const entries = [];
  const errors = [];
  const seenInForm = new Set();

  rows.forEach((row, index) => {
    const paperId = normalizePaperId(row.querySelector(".paper-id-input").value);
    const scoreValues = [...row.querySelectorAll(".score-input")].map((input) => parseScore(input.value));
    const scores = scoreValues.filter((score) => score !== null);

    if (!paperId && !scores.length) return;
    if (!paperId) {
      errors.push(`第 ${index + 1} 行缺少 paper id。`);
      return;
    }
    if (!scores.length) {
      errors.push(`Paper ${paperId} 至少需要 1 个 final rating。`);
      return;
    }
    if (scores.some((score) => score < 0)) {
      errors.push(`Paper ${paperId} 的 rating 不能为负数。`);
      return;
    }
    const normalizedKey = paperId.toLowerCase();
    if (seenInForm.has(normalizedKey)) {
      errors.push(`Paper ${paperId} 在当前表单中重复。`);
      return;
    }
    seenInForm.add(normalizedKey);
    entries.push({ paperId, scores });
  });

  if (!entries.length && !errors.length) errors.push("请至少填写一个 paper id 和对应 final rating。");
  return { entries, errors };
}

async function handleSubmit(event) {
  event.preventDefault();
  const { entries, errors } = collectFormEntries();
  if (errors.length) {
    showNotice(errors.join(" "), "warning");
    return;
  }

  const saved = [];
  const duplicates = [];

  try {
    controls.ratingForm.querySelector('button[type="submit"]').disabled = true;

    if (isSupabaseConfigured()) {
      for (const entry of entries) {
        try {
          saved.push(await insertRemoteRecord(entry));
        } catch (error) {
          if (error.status === 409 || error.details?.code === "23505") {
            duplicates.push(entry.paperId);
          } else {
            throw error;
          }
        }
      }
    } else {
      const records = await loadRecords();
      const existingIds = new Set(records.map((record) => record.paperId.toLowerCase()));

      entries.forEach((entry) => {
        if (existingIds.has(entry.paperId.toLowerCase())) {
          duplicates.push(entry.paperId);
          return;
        }
        existingIds.add(entry.paperId.toLowerCase());
        saved.push({
          ...entry,
          average: average(entry.scores),
          createdAt: new Date().toISOString(),
        });
      });

      if (saved.length) {
        saveLocalRecords([...records, ...saved].sort(sortByPaperId));
      }
    }

    if (saved.length) {
      resetForm();
      await showPanel("results");
    }

    if (duplicates.length) {
      const suffix = saved.length ? "其余新记录已经保存。" : "没有新增记录。";
      showNotice(`Paper ${duplicates.join(", ")} 已经记录，只保留首次登记的 final rating。${suffix}`, "warning");
      if (!saved.length) await showPanel("submit");
    }
  } catch (error) {
    showNotice(`保存失败：${error.message || "请检查 Supabase 配置和网络连接。"}`, "warning");
  } finally {
    controls.ratingForm.querySelector('button[type="submit"]').disabled = false;
  }
}

async function renderResults(options = {}) {
  if (isRenderingResults) return;
  isRenderingResults = true;

  try {
    let records = [];

    if (!options.silent) {
      ratingsTable.innerHTML = "";
      emptyState.classList.add("show");
      emptyState.textContent = "正在加载记录...";
    }

    try {
      records = (await loadRecords()).sort(sortByPaperId);
    } catch (error) {
      emptyState.textContent = "记录加载失败，请检查 Supabase 配置和网络连接。";
      showNotice(`加载失败：${error.message || "无法读取记录。"}`, "warning");
      return;
    }

    ratingsTable.innerHTML = "";
    emptyState.textContent = "目前还没有记录。请先提交 final rating。";
    emptyState.classList.toggle("show", records.length === 0);

    controls.paperCount.textContent = String(records.length);
    const averages = records.map((record) => record.average ?? average(record.scores));
    controls.q25.textContent = formatScore(quantile(averages, 25));
    controls.q50.textContent = formatScore(quantile(averages, 50));
    controls.q75.textContent = formatScore(quantile(averages, 75));
    renderHistogram(averages);
    controls.lastUpdated.textContent = `最后刷新：${new Date().toLocaleTimeString("zh-CN", { hour12: false })}`;

    records.forEach((record) => {
      const row = document.createElement("tr");
      const date = new Date(record.createdAt);
      const dateText = Number.isNaN(date.getTime()) ? "-" : date.toLocaleString("zh-CN", { hour12: false });
      const scoreChips = record.scores
        .map((score) => `<span class="rating-chip">${score}</span>`)
        .join("");

      row.innerHTML = `
        <td>${escapeHtml(record.paperId)}</td>
        <td><div class="rating-chips">${scoreChips}</div></td>
        <td><strong>${formatScore(record.average ?? average(record.scores))}</strong></td>
        <td>${dateText}</td>
      `;
      ratingsTable.append(row);
    });
  } finally {
    isRenderingResults = false;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function exportData() {
  const records = (await loadRecords()).sort(sortByPaperId);
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "acmmm-2026-final-ratings.json";
  link.click();
  URL.revokeObjectURL(url);
}

function clearData() {
  if (isSupabaseConfigured()) {
    showNotice("共享数据库模式下不支持公开清空全部记录；如需删除或修正，请在 Supabase 后台操作。", "warning");
    return;
  }
  const confirmed = window.confirm("确定清空所有已记录 final rating 吗？");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
  renderResults();
}

controls.showSubmit.addEventListener("click", () => showPanel("submit"));
controls.showResults.addEventListener("click", () => showPanel("results"));
controls.addPaper.addEventListener("click", addPaperRow);
controls.resetForm.addEventListener("click", resetForm);
controls.ratingForm.addEventListener("submit", handleSubmit);
controls.refreshResults.addEventListener("click", () => renderResults());
controls.clearData.addEventListener("click", clearData);
controls.exportData.addEventListener("click", exportData);

seedInitialRecords();
resetForm();
renderResults();
