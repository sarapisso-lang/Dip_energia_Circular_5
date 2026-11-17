/* =========================================================
   Dashboard HOBO INNOVATOR — lógica e interacciones
   Réplica web del dashboard Gradio del notebook.
   Los datos reales vienen de js/data.js y los modelos se
   ajustan en el navegador (sin servidor).
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const sum = (a) => a.reduce((s, v) => s + v, 0);
  const mean = (a) => (a.length ? sum(a) / a.length : NaN);
  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtNum = (v, d = 2) => (v === null || v === undefined || Number.isNaN(v) ? '—' : Number(v).toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d }));
  const fmtInt = (v) => (v === null || v === undefined || Number.isNaN(v) ? '—' : Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 }));
  const fmtPct = (v, d = 1) => `${fmtNum(v, d)} %`;
  const fmtDate = (d) => {
    if (!(d instanceof Date) || Number.isNaN(d.getTime())) return '—';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* ---------------------------------------------------------
     Catálogo de variables
     --------------------------------------------------------- */
  const VARS = [
    { key: 'hum_foliar', label: 'Humedad foliar', short: 'HF', unit: '%', dec: 2, group: 'main' },
    { key: 'lluvia', label: 'Lluvia', short: 'Lluvia', unit: 'mm', dec: 2, group: 'main' },
    { key: 'radiacion', label: 'Radiación solar', short: 'Rad', unit: 'W/m²', dec: 1, group: 'main' },
    { key: 'temp', label: 'Temperatura', short: 'Temp', unit: '°C', dec: 2, group: 'main' },
    { key: 'hr', label: 'Humedad relativa', short: 'HR', unit: '%', dec: 1, group: 'main' },
    { key: 'vel_viento', label: 'Velocidad del viento', short: 'Viento', unit: 'm/s', dec: 2, group: 'main' },
    { key: 'rafagas', label: 'Ráfagas', short: 'Ráfagas', unit: 'm/s', dec: 2, group: 'main' },
    { key: 'dir_viento', label: 'Dirección del viento', short: 'Dir', unit: '°', dec: 1, group: 'main' },
    { key: 'pt_rocio', label: 'Punto de rocío', short: 'Rocío', unit: '°C', dec: 2, group: 'main' },
    { key: 'hora', label: 'Hora del día', short: 'Hora', unit: 'h', dec: 0, group: 'derived' },
    { key: 'mes', label: 'Mes', short: 'Mes', unit: '', dec: 0, group: 'derived' },
    { key: 'hoja_mojada', label: 'Hoja mojada', short: 'Hoja', unit: '', dec: 0, group: 'derived' },
    { key: 'dif_rocio', label: 'Diferencia de rocío', short: 'ΔRocío', unit: '°C', dec: 2, group: 'derived' },
    { key: 'hora_sin', label: 'Hora (seno)', short: 'sin', unit: '', dec: 3, group: 'derived' },
    { key: 'hora_cos', label: 'Hora (coseno)', short: 'cos', unit: '', dec: 3, group: 'derived' },
    { key: 'cluster', label: 'Clúster', short: 'Clúster', unit: '', dec: 0, group: 'derived' },
  ];
  const VAR = Object.fromEntries(VARS.map((v) => [v.key, v]));
  const EDA_VARS = VARS.filter((v) => v.key !== 'mes' || true); // todas las numéricas
  const MAIN_VARS = VARS.filter((v) => v.group === 'main');

  /* ---------------------------------------------------------
     Datos
     --------------------------------------------------------- */
  const DATA = HOBO_DATA.rows.map((r) => {
    const d = new Date(r[0]);
    const o = {
      fecha: d,
      fechaISO: r[0],
      hum_foliar: r[1], lluvia: r[2], radiacion: r[3], temp: r[4], hr: r[5],
      vel_viento: r[6], rafagas: r[7], dir_viento: r[8], pt_rocio: r[9],
    };
    o.hora = d.getHours();
    o.mes = d.getMonth() + 1;
    o.hora_sin = Math.sin((2 * Math.PI * o.hora) / 24);
    o.hora_cos = Math.cos((2 * Math.PI * o.hora) / 24);
    o.hoja_mojada = o.hum_foliar >= 50 ? 1 : 0;
    o.dif_rocio = o.temp - o.pt_rocio;
    o.cluster = null;
    return o;
  });

  /* ---------------------------------------------------------
     Estadística descriptiva
     --------------------------------------------------------- */
  function quantile(sorted, p) {
    if (!sorted.length) return NaN;
    const idx = (sorted.length - 1) * p;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return sorted[lo];
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
  }

  function describe(values) {
    const n = values.length;
    const m = mean(values);
    const variance = n > 1 ? sum(values.map((v) => (v - m) ** 2)) / (n - 1) : 0;
    const sd = Math.sqrt(variance);
    const sorted = [...values].sort((a, b) => a - b);
    const m2 = sum(values.map((v) => (v - m) ** 2)) / n;
    const m3 = sum(values.map((v) => (v - m) ** 3)) / n;
    const m4 = sum(values.map((v) => (v - m) ** 4)) / n;
    const skew = n > 2 && sd > 0 ? (n / ((n - 1) * (n - 2))) * sum(values.map((v) => ((v - m) / sd) ** 3)) : 0;
    const kurt = m2 > 0 ? m4 / (m2 * m2) - 3 : 0;
    return {
      count: n,
      mean: m,
      std: sd,
      min: sorted[0],
      q25: quantile(sorted, 0.25),
      q50: quantile(sorted, 0.5),
      q75: quantile(sorted, 0.75),
      max: sorted[n - 1],
      skew,
      kurt,
      m2, m3, m4,
    };
  }

  function pearson(xs, ys) {
    const n = xs.length;
    const mx = mean(xs);
    const my = mean(ys);
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - mx;
      const dy = ys[i] - my;
      sxy += dx * dy;
      sxx += dx * dx;
      syy += dy * dy;
    }
    return sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0;
  }

  /* ---------------------------------------------------------
     Álgebra para modelos
     --------------------------------------------------------- */
  function solveLinearSystem(A, b) {
    const n = A.length;
    const M = A.map((row, i) => [...row, b[i]]);
    for (let c = 0; c < n; c++) {
      let pivot = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[pivot][c])) pivot = r;
      if (Math.abs(M[pivot][c]) < 1e-12) continue;
      [M[c], M[pivot]] = [M[pivot], M[c]];
      const pv = M[c][c];
      for (let j = c; j <= n; j++) M[c][j] /= pv;
      for (let r = 0; r < n; r++) {
        if (r === c) continue;
        const f = M[r][c];
        if (!f) continue;
        for (let j = c; j <= n; j++) M[r][j] -= f * M[c][j];
      }
    }
    return M.map((row) => row[n]);
  }

  function makeScaler(X) {
    const d = X[0].length;
    const means = new Array(d).fill(0);
    const stds = new Array(d).fill(0);
    for (const row of X) for (let j = 0; j < d; j++) means[j] += row[j];
    for (let j = 0; j < d; j++) means[j] /= X.length;
    for (const row of X) for (let j = 0; j < d; j++) stds[j] += (row[j] - means[j]) ** 2;
    for (let j = 0; j < d; j++) stds[j] = Math.sqrt(stds[j] / Math.max(1, X.length - 1)) || 1;
    return { means, stds };
  }

  function transformRow(row, scaler) {
    return row.map((v, j) => (v - scaler.means[j]) / scaler.stds[j]);
  }

  function fitRidge(X, y, lambda = 1e-4) {
    const n = X.length;
    const p = X[0].length;
    const meanY = mean(y);
    const A = Array.from({ length: p }, () => new Array(p).fill(0));
    const b = new Array(p).fill(0);
    for (let i = 0; i < n; i++) {
      const row = X[i];
      const dy = y[i] - meanY;
      for (let j = 0; j < p; j++) {
        b[j] += row[j] * dy;
        for (let k = j; k < p; k++) A[j][k] += row[j] * row[k];
      }
    }
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < j; k++) A[j][k] = A[k][j];
      A[j][j] += lambda;
    }
    const weights = solveLinearSystem(A, b);
    return { weights, intercept: meanY };
  }

  function predictLinear(model, row) {
    return model.intercept + row.reduce((s, v, i) => s + v * model.weights[i], 0);
  }

  function sigmoid(z) {
    if (z >= 0) return 1 / (1 + Math.exp(-z));
    const e = Math.exp(z);
    return e / (1 + e);
  }

  function fitLogistic(X, y, weightsSample, opts = {}) {
    const n = X.length;
    const p = X[0].length;
    const Xb = X.map((row) => [1, ...row]);
    const w = new Array(p + 1).fill(0);
    const lr = opts.lr ?? 0.5;
    const epochs = opts.epochs ?? 900;
    let best = w.slice();
    let bestLoss = Infinity;
    let sinceBest = 0;
    for (let epoch = 0; epoch < epochs; epoch++) {
      const grad = new Array(p + 1).fill(0);
      let loss = 0;
      for (let i = 0; i < n; i++) {
        let z = 0;
        for (let j = 0; j <= p; j++) z += w[j] * Xb[i][j];
        const pr = sigmoid(z);
        const err = (pr - y[i]) * weightsSample[i];
        for (let j = 0; j <= p; j++) grad[j] += err * Xb[i][j];
        loss += -weightsSample[i] * (y[i] * Math.log(pr + 1e-12) + (1 - y[i]) * Math.log(1 - pr + 1e-12));
      }
      for (let j = 0; j <= p; j++) {
        grad[j] = grad[j] / n + (j > 0 ? 1e-4 * w[j] : 0);
        w[j] -= lr * grad[j];
      }
      loss /= n;
      if (loss < bestLoss - 1e-7) {
        bestLoss = loss;
        best = w.slice();
        sinceBest = 0;
      } else {
        sinceBest++;
        if (sinceBest > 120) break;
      }
    }
    return { weights: best };
  }

  function predictLogistic(model, row) {
    const z = model.weights[0] + row.reduce((s, v, i) => s + v * model.weights[i + 1], 0);
    return sigmoid(z);
  }

  /* ---------------------------------------------------------
     Modelos (entrenamiento perezoso y cacheado)
     --------------------------------------------------------- */
  const cache = {};

  function getRegression() {
    if (cache.reg) return cache.reg;
    const features = ['hum_foliar', 'hr', 'radiacion', 'vel_viento', 'rafagas', 'lluvia', 'dir_viento', 'hora_sin', 'hora_cos'];
    const X = DATA.map((d) => features.map((f) => d[f]));
    const y = DATA.map((d) => d.temp);
    const trainEnd = Math.floor(DATA.length * 0.70);
    const testStart = Math.floor(DATA.length * 0.85);
    const scaler = makeScaler(X.slice(0, trainEnd));
    const Xtr = X.slice(0, trainEnd).map((r) => transformRow(r, scaler));
    const model = fitRidge(Xtr, y.slice(0, trainEnd), 1e-4);
    const yTrue = y.slice(testStart);
    const Xte = X.slice(testStart).map((r) => transformRow(r, scaler));
    const yPred = Xte.map((r) => predictLinear(model, r));
    const errors = yTrue.map((v, i) => v - yPred[i]);
    const mse = mean(errors.map((e) => e * e));
    const rmse = Math.sqrt(mse);
    const mae = mean(errors.map((e) => Math.abs(e)));
    const mape = mean(yTrue.map((v, i) => Math.abs((v - yPred[i]) / (Math.abs(v) < 1e-6 ? 1e-6 : v)))) * 100;
    const yMean = mean(yTrue);
    const r2 = 1 - sum(errors.map((e) => e * e)) / sum(yTrue.map((v) => (v - yMean) ** 2));
    cache.reg = { features, scaler, model, yTrue, yPred, errors, rmse, mae, mape, r2 };
    return cache.reg;
  }

  function getClassification() {
    if (cache.clf) return cache.clf;
    const features = ['temp', 'hr', 'pt_rocio', 'radiacion', 'vel_viento', 'rafagas', 'lluvia', 'hora_sin', 'hora_cos', 'dif_rocio'];
    const X = DATA.map((d) => features.map((f) => d[f]));
    const y = DATA.map((d) => d.hoja_mojada);
    const trainEnd = Math.floor(DATA.length * 0.70);
    const valEnd = Math.floor(DATA.length * 0.85);

    const scaler = makeScaler(X.slice(0, trainEnd));
    const Xtr = X.slice(0, trainEnd).map((r) => transformRow(r, scaler));
    const ytr = y.slice(0, trainEnd);
    const nPos = sum(ytr);
    const nNeg = ytr.length - nPos;
    const wPos = ytr.length / (2 * Math.max(1, nPos));
    const wNeg = ytr.length / (2 * Math.max(1, nNeg));
    const sw = ytr.map((v) => (v === 1 ? wPos : wNeg));
    const model = fitLogistic(Xtr, ytr, sw, { lr: 0.5, epochs: 1100 });

    const Xte = X.slice(valEnd).map((r) => transformRow(r, scaler));
    const yTrue = y.slice(valEnd);
    const prob = Xte.map((r) => predictLogistic(model, r));
    const pred = prob.map((p) => (p >= 0.5 ? 1 : 0));

    let tn = 0, fp = 0, fn = 0, tp = 0;
    for (let i = 0; i < yTrue.length; i++) {
      if (yTrue[i] === 0 && pred[i] === 0) tn++;
      else if (yTrue[i] === 0 && pred[i] === 1) fp++;
      else if (yTrue[i] === 1 && pred[i] === 0) fn++;
      else tp++;
    }
    const total = tn + fp + fn + tp;
    const accuracy = (tn + tp) / total;
    const precision0 = tn / Math.max(1, tn + fn);
    const recall0 = tn / Math.max(1, tn + fp);
    const f1_0 = (2 * precision0 * recall0) / Math.max(1e-9, precision0 + recall0);
    const precision1 = tp / Math.max(1, tp + fp);
    const recall1 = tp / Math.max(1, tp + fn);
    const f1_1 = (2 * precision1 * recall1) / Math.max(1e-9, precision1 + recall1);
    const support0 = tn + fp;
    const support1 = fn + tp;
    const macroP = (precision0 + precision1) / 2;
    const macroR = (recall0 + recall1) / 2;
    const macroF = (f1_0 + f1_1) / 2;
    const weightedP = (precision0 * support0 + precision1 * support1) / total;
    const weightedR = (recall0 * support0 + recall1 * support1) / total;
    const weightedF = (f1_0 * support0 + f1_1 * support1) / total;

    // Curva ROC
    const pairs = yTrue.map((v, i) => ({ y: v, p: prob[i] })).sort((a, b) => b.p - a.p);
    const P = sum(yTrue);
    const N = yTrue.length - P;
    let tpc = 0, fpc = 0, prev = null;
    const fpr = [0], tpr = [0];
    for (const q of pairs) {
      if (prev !== null && q.p !== prev) {
        fpr.push(fpc / Math.max(1, N));
        tpr.push(tpc / Math.max(1, P));
      }
      prev = q.p;
      if (q.y === 1) tpc++;
      else fpc++;
    }
    fpr.push(fpc / Math.max(1, N));
    tpr.push(tpc / Math.max(1, P));
    fpr.push(1);
    tpr.push(1);
    let auc = 0;
    for (let i = 1; i < fpr.length; i++) auc += ((fpr[i] - fpr[i - 1]) * (tpr[i] + tpr[i - 1])) / 2;

    cache.clf = {
      features, scaler, model, prob, pred, yTrue,
      cm: { tn, fp, fn, tp }, total, accuracy,
      precision0, recall0, f1_0, precision1, recall1, f1_1,
      support0, support1, macroP, macroR, macroF, weightedP, weightedR, weightedF,
      fpr, tpr, auc,
    };
    return cache.clf;
  }

  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function kmeans(X, k = 3, iters = 60) {
    const n = X.length;
    const d = X[0].length;
    const rng = mulberry32(20240607);
    const dist2 = (a, b) => {
      let s = 0;
      for (let j = 0; j < d; j++) s += (a[j] - b[j]) ** 2;
      return s;
    };
    const centroids = [X[Math.floor(rng() * n)].slice()];
    while (centroids.length < k) {
      const d2 = X.map((x) => Math.min(...centroids.map((c) => dist2(x, c))));
      const total = sum(d2);
      let r = rng() * total;
      let idx = 0;
      for (let i = 0; i < n; i++) {
        r -= d2[i];
        if (r <= 0) { idx = i; break; }
      }
      centroids.push(X[idx].slice());
    }
    const labels = new Array(n).fill(0);
    for (let it = 0; it < iters; it++) {
      let changed = false;
      for (let i = 0; i < n; i++) {
        let best = 0, bd = Infinity;
        for (let c = 0; c < k; c++) {
          const dd = dist2(X[i], centroids[c]);
          if (dd < bd) { bd = dd; best = c; }
        }
        if (labels[i] !== best) { labels[i] = best; changed = true; }
      }
      const sums = Array.from({ length: k }, () => new Array(d).fill(0));
      const counts = new Array(k).fill(0);
      for (let i = 0; i < n; i++) {
        counts[labels[i]]++;
        for (let j = 0; j < d; j++) sums[labels[i]][j] += X[i][j];
      }
      for (let c = 0; c < k; c++) if (counts[c]) for (let j = 0; j < d; j++) centroids[c][j] = sums[c][j] / counts[c];
      if (!changed) break;
    }
    return { labels, centroids };
  }

  function getClusters() {
    if (cache.clust) return cache.clust;
    const features = ['temp', 'hr', 'radiacion', 'vel_viento'];
    const X = DATA.map((d) => features.map((f) => d[f]));
    const scaler = makeScaler(X);
    const Z = X.map((r) => transformRow(r, scaler));
    const { labels, centroids } = kmeans(Z, 3, 80);

    // Reordenar clústeres por temperatura media: 0 = frío, 2 = cálido
    const order = centroids.map((c, i) => ({ i, temp: c[0] })).sort((a, b) => a.temp - b.temp).map((o) => o.i);
    const remap = {};
    order.forEach((old, idx) => { remap[old] = idx; });
    const finalLabels = labels.map((l) => remap[l]);
    DATA.forEach((d, i) => { d.cluster = finalLabels[i]; });

    const profiles = [0, 1, 2].map((c) => {
      const rows = DATA.filter((d) => d.cluster === c);
      return {
        id: c,
        n: rows.length,
        pct: (rows.length / DATA.length) * 100,
        temp: mean(rows.map((d) => d.temp)),
        hr: mean(rows.map((d) => d.hr)),
        rad: mean(rows.map((d) => d.radiacion)),
        wind: mean(rows.map((d) => d.vel_viento)),
        humFoliar: mean(rows.map((d) => d.hum_foliar)),
      };
    });
    cache.clust = { features, scaler, centroids, profiles };
    return cache.clust;
  }

  function getTimeSeries() {
    if (cache.ts) return cache.ts;
    const look = 24;
    const y = DATA.map((d) => d.temp);
    const X = [];
    const Y = [];
    const idx = [];
    for (let i = look; i < y.length; i++) {
      X.push([1, ...y.slice(i - look, i)]);
      Y.push(y[i]);
      idx.push(i);
    }
    const split = Math.floor(X.length * 0.90);
    const p = X[0].length;
    const A = Array.from({ length: p }, () => new Array(p).fill(0));
    const b = new Array(p).fill(0);
    for (let i = 0; i < split; i++) {
      const row = X[i];
      for (let j = 0; j < p; j++) {
        b[j] += row[j] * Y[i];
        for (let k = j; k < p; k++) A[j][k] += row[j] * row[k];
      }
    }
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < j; k++) A[j][k] = A[k][j];
      A[j][j] += j === 0 ? 1e-8 : 0.02;
    }
    const w = solveLinearSystem(A, b);
    const actual = [];
    const predicted = [];
    const dates = [];
    for (let i = split; i < X.length; i++) {
      actual.push(Y[i]);
      predicted.push(X[i].reduce((s, v, j) => s + v * w[j], 0));
      dates.push(DATA[idx[i]].fecha);
    }
    const errors = actual.map((v, i) => v - predicted[i]);
    cache.ts = {
      actual, predicted, dates,
      mae: mean(errors.map((e) => Math.abs(e))),
      rmse: Math.sqrt(mean(errors.map((e) => e * e))),
      look, split: X.length - split,
    };
    return cache.ts;
  }

  /* ---------------------------------------------------------
     Tema y gráficas
     --------------------------------------------------------- */
  const COLORS = {
    blue: '#1565c0', blue2: '#42a5f5', green: '#2e7d32', green2: '#66bb6a',
    amber: '#f59e0b', red: '#d32f2f', violet: '#7e57c2', teal: '#00897b',
    slate: '#607d8b', cluster: ['#1565c0', '#2e7d32', '#f59e0b'],
  };

  function theme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    return {
      dark,
      text: dark ? '#d7e6f2' : '#243b52',
      muted: dark ? '#8fa9bf' : '#6b8199',
      grid: dark ? 'rgba(255,255,255,.09)' : 'rgba(18,38,58,.08)',
      surface: dark ? '#0f2132' : '#ffffff',
    };
  }

  function chartLayout(opts = {}) {
    const t = theme();
    const axis = (title) => ({
      title: { text: title || '', font: { size: 11.5, color: t.muted } },
      gridcolor: t.grid,
      zeroline: false,
      linecolor: t.grid,
      tickfont: { size: 11, color: t.muted },
      automargin: true,
    });
    return {
      margin: opts.margin || { l: 56, r: 18, t: 14, b: 46 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { family: 'Inter, system-ui, sans-serif', size: 12, color: t.text },
      hoverlabel: { bgcolor: t.surface, bordercolor: t.grid, font: { color: t.text, size: 12 } },
      xaxis: axis(opts.xTitle),
      yaxis: axis(opts.yTitle),
      legend: { orientation: 'h', x: 0, y: 1.12, font: { size: 11, color: t.muted }, bgcolor: 'rgba(0,0,0,0)' },
      showlegend: !!opts.showlegend,
      bargap: opts.bargap ?? 0.05,
      hovermode: opts.hovermode || 'closest',
    };
  }

  const PLOT_CONFIG = {
    responsive: true,
    displaylogo: false,
    displayModeBar: false,
  };

  function plot(el, traces, layout) {
    if (!el) return;
    if (!window.Plotly) {
      el.innerHTML = '<div class="chart-fallback">No se pudo cargar la librería de gráficas (vendor/plotly.min.js).</div>';
      return;
    }
    window.Plotly.react(el, traces, layout, PLOT_CONFIG);
  }

  /* ---------------------------------------------------------
     Renderizado de tablas
     --------------------------------------------------------- */
  function renderTable(el, headers, rows, opts = {}) {
    if (!el) return;
    const thead = `<thead><tr>${headers.map((h) => `<th${opts.firstLeft ? '' : ''}>${h}</th>`).join('')}</tr></thead>`;
    const tbody = `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;
    el.innerHTML = thead + tbody;
  }

  /* ---------------------------------------------------------
     Pestañas
     --------------------------------------------------------- */
  const TABS = $$('.tab');
  const PANELS = $$('.panel');
  const rendered = new Set();
  let currentTab = '1';

  function activateTab(id, force = false) {
    const num = String(id);
    tabButtons.forEach((b) => {
      const active = b.dataset.tab === num;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
      b.tabIndex = active ? 0 : -1;
    });
    PANELS.forEach((p) => {
      const active = p.id === `panel-${num}`;
      p.hidden = !active;
      p.classList.toggle('is-active', active);
    });
    currentTab = num;
    if (!rendered.has(num) || force) {
      const fn = TAB_RENDERERS[num];
      if (fn) {
        fn();
        rendered.add(num);
      }
    }
  }
  const tabButtons = TABS;

  TABS.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    btn.addEventListener('keydown', (e) => {
      const idx = TABS.indexOf(btn);
      let next = null;
      if (e.key === 'ArrowRight') next = TABS[(idx + 1) % TABS.length];
      if (e.key === 'ArrowLeft') next = TABS[(idx - 1 + TABS.length) % TABS.length];
      if (e.key === 'Home') next = TABS[0];
      if (e.key === 'End') next = TABS[TABS.length - 1];
      if (next) {
        e.preventDefault();
        next.focus();
        activateTab(next.dataset.tab);
      }
    });
  });

  /* ---------------------------------------------------------
     Tema
     --------------------------------------------------------- */
  const themeToggle = $('#theme-toggle');
  function applyTheme(mode) {
    document.documentElement.dataset.theme = mode;
    themeToggle.setAttribute('aria-label', mode === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    try { localStorage.setItem('hobo-theme', mode); } catch (e) { /* noop */ }
  }
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    if (TAB_RENDERERS[currentTab] && CHART_TABS.has(currentTab)) {
      rendered.delete(currentTab);
      activateTab(currentTab, true);
    }
  });
  try {
    const qTheme = new URLSearchParams(window.location.search).get('theme');
    const saved = localStorage.getItem('hobo-theme');
    const mode = qTheme === 'dark' || qTheme === 'light'
      ? qTheme
      : (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
    applyTheme(mode);
  } catch (e) {
    applyTheme('light');
  }
  const CHART_TABS = new Set(['4', '5', '6', '7', '8', '9', '10']);

  /* ---------------------------------------------------------
     Pestaña 2 · DataFrame
     --------------------------------------------------------- */
  const TABLE_COLS = [
    { key: 'fecha', label: 'Fecha', fmt: (d) => fmtDate(d.fecha), raw: (d) => d.fechaISO },
    ...MAIN_VARS.map((v) => ({ key: v.key, label: v.unit ? `${v.label} (${v.unit})` : v.label, fmt: (d) => fmtNum(d[v.key], v.dec), raw: (d) => String(d[v.key]) })),
    { key: 'hora', label: 'Hora', fmt: (d) => fmtInt(d.hora), raw: (d) => String(d.hora) },
    { key: 'mes', label: 'Mes', fmt: (d) => fmtInt(d.mes), raw: (d) => String(d.mes) },
    { key: 'hoja_mojada', label: 'Hoja mojada', fmt: (d) => (d.hoja_mojada ? '1 · Mojada' : '0 · Seca'), raw: (d) => String(d.hoja_mojada) },
    { key: 'dif_rocio', label: 'Dif. rocío (°C)', fmt: (d) => fmtNum(d.dif_rocio, 2), raw: (d) => String(d.dif_rocio) },
    { key: 'cluster', label: 'Clúster', fmt: (d) => (d.cluster === null ? '—' : fmtInt(d.cluster)), raw: (d) => String(d.cluster) },
  ];

  const dfState = { page: 1, pageSize: 100, query: '' };
  let dfFiltered = DATA;

  function applyDataFilter() {
    const q = dfState.query.trim().toLowerCase();
    if (!q) {
      dfFiltered = DATA;
      return;
    }
    dfFiltered = DATA.filter((d) => {
      if (fmtDate(d.fecha).toLowerCase().includes(q) || d.fechaISO.toLowerCase().includes(q)) return true;
      return TABLE_COLS.some((c) => c.raw(d).toLowerCase().includes(q));
    });
  }

  function renderDataFrame() {
    if (!DATA.some((d) => d.cluster !== null)) getClusters();
    applyDataFilter();
    const total = dfFiltered.length;
    const pages = Math.max(1, Math.ceil(total / dfState.pageSize));
    dfState.page = clamp(dfState.page, 1, pages);
    const start = (dfState.page - 1) * dfState.pageSize;
    const pageRows = dfFiltered.slice(start, start + dfState.pageSize);
    renderTable(
      $('#df-table'),
      TABLE_COLS.map((c) => c.label),
      pageRows.map((d) => TABLE_COLS.map((c) => escapeHTML(c.fmt(d))))
    );
    $('#df-count').textContent = `${fmtInt(total)} registros`;
    $('#df-page-info').textContent = `Página ${dfState.page} de ${pages}`;
    $('#df-prev').disabled = dfState.page <= 1;
    $('#df-next').disabled = dfState.page >= pages;
  }

  $('#df-search').addEventListener('input', (e) => {
    dfState.query = e.target.value;
    dfState.page = 1;
    renderDataFrame();
  });
  $('#df-page-size').addEventListener('change', (e) => {
    dfState.pageSize = Number(e.target.value);
    dfState.page = 1;
    renderDataFrame();
  });
  $('#df-prev').addEventListener('click', () => { dfState.page--; renderDataFrame(); });
  $('#df-next').addEventListener('click', () => { dfState.page++; renderDataFrame(); });

  $('#download-csv').addEventListener('click', () => {
    const header = TABLE_COLS.map((c) => c.label).join(';');
    const lines = dfFiltered.map((d) => TABLE_COLS.map((c) => {
      const val = c.raw(d);
      return /[;"\n]/.test(val) ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(';'));
    const blob = new Blob(['\uFEFF' + header + '\n' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'datos_hobo_filtrados.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });

  /* ---------------------------------------------------------
     Pestaña 3 · Estadísticas
     --------------------------------------------------------- */
  function renderStats() {
    if (!DATA.some((d) => d.cluster !== null)) getClusters();
    const vars = VARS;
    const rows = vars.map((v) => {
      const values = DATA.map((d) => d[v.key]).filter((x) => typeof x === 'number' && !Number.isNaN(x));
      const s = describe(values);
      return {
        label: v.unit ? `${v.label} (${v.unit})` : v.label,
        s,
      };
    });
    const headers = ['Variable', 'count', 'mean', 'std', 'min', '25 %', '50 %', '75 %', 'max', 'Asimetría', 'Curtosis', 'Nulos'];
    renderTable($('#stats-table'), headers, rows.map(({ label, s }) => [
      label,
      fmtInt(s.count),
      fmtNum(s.mean, 3),
      fmtNum(s.std, 3),
      fmtNum(s.min, 2),
      fmtNum(s.q25, 2),
      fmtNum(s.q50, 2),
      fmtNum(s.q75, 2),
      fmtNum(s.max, 2),
      fmtNum(s.skew, 3),
      fmtNum(s.kurt, 3),
      '0',
    ]));

    const tempVals = DATA.map((d) => d.temp);
    const nulls = VARS.reduce((s, v) => s + DATA.filter((d) => d[v.key] === null || d[v.key] === undefined || Number.isNaN(d[v.key])).length, 0);
    const kpis = [
      { label: 'Registros totales', value: fmtInt(DATA.length), hint: 'serie horaria depurada' },
      { label: 'Variables numéricas', value: fmtInt(VARS.length), hint: 'incluye derivadas' },
      { label: 'Valores nulos', value: fmtInt(nulls), hint: 'tras limpieza e interpolación' },
      { label: 'Temperatura media', value: `${fmtNum(mean(tempVals), 2)} °C`, hint: `máx. ${fmtNum(Math.max(...tempVals), 2)} °C` },
    ];
    $('#stats-kpis').innerHTML = kpis.map(kpiCard).join('');
  }

  /* ---------------------------------------------------------
     Pestaña 4 · Univariado
     --------------------------------------------------------- */
  function kde(values, gridSize = 140) {
    const n = values.length;
    const m = mean(values);
    const sd = Math.sqrt(mean(values.map((v) => (v - m) ** 2))) || 1;
    const bw = 1.06 * sd * Math.pow(n, -1 / 5) || 1;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = bw * 3;
    const x0 = min - pad;
    const x1 = max + pad;
    const xs = [];
    const ys = [];
    const norm = 1 / (n * bw * Math.sqrt(2 * Math.PI));
    for (let g = 0; g < gridSize; g++) {
      const x = x0 + ((x1 - x0) * g) / (gridSize - 1);
      let s = 0;
      for (let i = 0; i < n; i++) {
        const z = (x - values[i]) / bw;
        s += Math.exp(-0.5 * z * z);
      }
      xs.push(x);
      ys.push(s * norm);
    }
    return { x: xs, y: ys, bw };
  }

  function renderUniv() {
    const key = $('#univ-select').value;
    const v = VAR[key];
    const values = DATA.map((d) => d[key]).filter((x) => typeof x === 'number' && !Number.isNaN(x));
    const s = describe(values);
    const stats = [
      ['n', fmtInt(s.count)],
      ['media', fmtNum(s.mean, 2)],
      ['mediana', fmtNum(s.q50, 2)],
      ['desv.', fmtNum(s.std, 2)],
      ['mín.', fmtNum(s.min, 2)],
      ['Q1', fmtNum(s.q25, 2)],
      ['Q3', fmtNum(s.q75, 2)],
      ['máx.', fmtNum(s.max, 2)],
    ];
    $('#univ-stats').innerHTML = stats.map(([l, val]) => `<div class="stat-pill"><span>${l}</span><strong>${val}${v.unit ? ' ' + v.unit : ''}</strong></div>`).join('');

    const nBins = key === 'lluvia' ? 18 : key === 'hoja_mojada' || key === 'mes' || key === 'cluster' ? 12 : 40;
    const binWidth = (s.max - s.min) / nBins || 1;
    const k = kde(values);
    // La densidad se escala al conteo del histograma
    const densityTrace = {
      x: k.x,
      y: k.y.map((y) => y * values.length * binWidth),
      type: 'scatter',
      mode: 'lines',
      name: 'Densidad',
      line: { color: COLORS.amber, width: 2.4, shape: 'spline' },
      hoverinfo: 'skip',
    };
    const histTrace = {
      x: values,
      type: 'histogram',
      nbinsx: nBins,
      marker: { color: COLORS.blue, opacity: 0.72, line: { color: 'rgba(255,255,255,.35)', width: 1 } },
      hovertemplate: `${v.label}: %{x}<br>Frecuencia: %{y}<extra></extra>`,
    };
    const layout = chartLayout({ xTitle: v.unit ? `${v.label} (${v.unit})` : v.label, yTitle: 'Frecuencia' });
    layout.bargap = 0.02;
    plot($('#univ-hist'), [histTrace, densityTrace], layout);

    const boxTrace = {
      y: values,
      type: 'box',
      name: v.label,
      boxpoints: 'outliers',
      jitter: 0.35,
      pointpos: 0,
      marker: { color: COLORS.green, size: 4, opacity: 0.55 },
      line: { color: COLORS.green, width: 2 },
      fillcolor: 'rgba(46,125,50,.16)',
      hovertemplate: `${v.label}: %{y}<extra></extra>`,
    };
    const boxLayout = chartLayout({ yTitle: v.unit ? `${v.label} (${v.unit})` : v.label });
    boxLayout.margin = { l: 52, r: 18, t: 14, b: 30 };
    plot($('#univ-box'), [boxTrace], boxLayout);

    $('#univ-hist-title').textContent = `Distribución de ${v.label.toLowerCase()}`;
    $('#univ-box-title').textContent = `Diagrama de caja · ${v.label.toLowerCase()}`;
  }

  /* ---------------------------------------------------------
     Pestaña 5 · Bivariado
     --------------------------------------------------------- */
  function renderBiv() {
    const xKey = $('#biv-x').value;
    const yKey = $('#biv-y').value;
    const vx = VAR[xKey];
    const vy = VAR[yKey];
    const xs = DATA.map((d) => d[xKey]);
    const ys = DATA.map((d) => d[yKey]);
    const unique = new Set(xs).size;

    let traces = [];
    let layout;
    if (unique < 15) {
      traces = [{
        x: xs,
        y: ys,
        type: 'box',
        boxpoints: 'outliers',
        marker: { color: COLORS.blue, size: 4, opacity: 0.5 },
        line: { width: 1.6 },
        fillcolor: 'rgba(21,101,192,.14)',
        hovertemplate: `${vx.label}: %{x}<br>${vy.label}: %{y}<extra></extra>`,
      }];
      layout = chartLayout({ xTitle: vx.unit ? `${vx.label} (${vx.unit})` : vx.label, yTitle: vy.unit ? `${vy.label} (${vy.unit})` : vy.label });
    } else {
      traces = [{
        x: xs,
        y: ys,
        type: DATA.length > 1200 ? 'scattergl' : 'scatter',
        mode: 'markers',
        marker: { color: COLORS.blue, size: 5, opacity: 0.42, line: { width: 0 } },
        hovertemplate: `${vx.label}: %{x}<br>${vy.label}: %{y}<extra></extra>`,
      }];
      if ($('#biv-trend').checked) {
        const mx = mean(xs);
        const my = mean(ys);
        let sxx = 0, sxy = 0;
        for (let i = 0; i < xs.length; i++) {
          sxx += (xs[i] - mx) ** 2;
          sxy += (xs[i] - mx) * (ys[i] - my);
        }
        const slope = sxx ? sxy / sxx : 0;
        const intercept = my - slope * mx;
        const x0 = Math.min(...xs);
        const x1 = Math.max(...xs);
        traces.push({
          x: [x0, x1],
          y: [intercept + slope * x0, intercept + slope * x1],
          type: 'scatter',
          mode: 'lines',
          name: 'Tendencia',
          line: { color: COLORS.red, width: 2, dash: 'dash' },
          hoverinfo: 'skip',
        });
        layout = chartLayout({ xTitle: vx.unit ? `${vx.label} (${vx.unit})` : vx.label, yTitle: vy.unit ? `${vy.label} (${vy.unit})` : vy.label, showlegend: true });
      } else {
        layout = chartLayout({ xTitle: vx.unit ? `${vx.label} (${vx.unit})` : vx.label, yTitle: vy.unit ? `${vy.label} (${vy.unit})` : vy.label });
      }
    }
    $('#biv-title').textContent = `Relación entre ${vx.label.toLowerCase()} e ${vy.label.toLowerCase()}`;
    plot($('#biv-chart'), traces, layout);
  }

  /* ---------------------------------------------------------
     Pestaña 6 · Correlación
     --------------------------------------------------------- */
  function renderCorr() {
    if (!DATA.some((d) => d.cluster !== null)) getClusters();
    const vars = VARS;
    const labels = vars.map((v) => v.short);
    const matrix = vars.map((a) => vars.map((b) => pearson(DATA.map((d) => d[a.key]), DATA.map((d) => d[b.key]))));
    const text = matrix.map((row) => row.map((v) => v.toFixed(2)));
    const size = Math.max(340, vars.length * 34);
    const el = $('#corr-chart');
    el.style.height = `${Math.max(470, size)}px`;
    plot(el, [{
      z: matrix,
      x: labels,
      y: labels,
      type: 'heatmap',
      colorscale: 'RdBu',
      reversescale: true,
      zmin: -1,
      zmax: 1,
      text,
      texttemplate: '%{text}',
      textfont: { size: 9.5 },
      hovertemplate: '%{y} × %{x}<br>r = %{z:.3f}<extra></extra>',
      colorbar: { thickness: 12, len: 0.75, tickfont: { size: 10 } },
    }], chartLayout({ margin: { l: 78, r: 20, t: 16, b: 74 } }));
  }

  /* ---------------------------------------------------------
     Pestaña 7 · Regresión
     --------------------------------------------------------- */
  function kpiCard({ label, value, hint }) {
    return `<article class="kpi"><span class="kpi-label">${label}</span><strong class="kpi-value">${value}</strong><span class="kpi-hint">${hint}</span></article>`;
  }

  function renderRegression() {
    const r = getRegression();
    $('#reg-kpis').innerHTML = [
      { label: 'Coeficiente R²', value: fmtNum(r.r2, 4), hint: 'varianza explicada' },
      { label: 'RMSE', value: `${fmtNum(r.rmse, 3)} °C`, hint: 'error cuadrático medio' },
      { label: 'MAE', value: `${fmtNum(r.mae, 3)} °C`, hint: 'error absoluto medio' },
      { label: 'MAPE', value: fmtPct(r.mape, 2), hint: 'error porcentual medio' },
    ].map(kpiCard).join('');

    const t = theme();
    const lo = Math.min(...r.yTrue, ...r.yPred);
    const hi = Math.max(...r.yTrue, ...r.yPred);
    const scatter = {
      x: r.yTrue,
      y: r.yPred,
      type: 'scattergl',
      mode: 'markers',
      marker: { color: COLORS.blue, size: 6, opacity: 0.45 },
      hovertemplate: 'Real: %{x:.2f} °C<br>Predicho: %{y:.2f} °C<extra></extra>',
    };
    const layout = chartLayout({ xTitle: 'Temperatura real (°C)', yTitle: 'Temperatura predicha (°C)' });
    layout.shapes = [{ type: 'line', x0: lo, y0: lo, x1: hi, y1: hi, line: { color: t.muted, width: 1.6, dash: 'dash' } }];
    layout.annotations = [{ x: hi, y: lo, xanchor: 'right', yanchor: 'bottom', text: 'y = x', showarrow: false, font: { size: 10, color: t.muted } }];
    plot($('#reg-scatter'), [scatter], layout);

    plot($('#reg-errors'), [{
      x: r.errors,
      type: 'histogram',
      nbinsx: 34,
      marker: { color: COLORS.orange || '#f59e0b', opacity: 0.78, line: { color: 'rgba(255,255,255,.4)', width: 1 } },
      hovertemplate: 'Error: %{x:.2f} °C<br>Frecuencia: %{y}<extra></extra>',
    }], chartLayout({ xTitle: 'Error de predicción (°C)', yTitle: 'Frecuencia' }));
  }

  const REG_SLIDERS = [
    { id: 'r-hum', label: 'Humedad foliar', min: 0, max: 100, step: 1, value: 50, unit: '%', dec: 0 },
    { id: 'r-hr', label: 'Humedad relativa', min: 10, max: 100, step: 1, value: 70, unit: '%', dec: 0 },
    { id: 'r-rad', label: 'Radiación', min: 0, max: 1200, step: 10, value: 300, unit: 'W/m²', dec: 0 },
    { id: 'r-vel', label: 'Velocidad del viento', min: 0, max: 30, step: 0.5, value: 5, unit: 'm/s', dec: 1 },
    { id: 'r-raf', label: 'Ráfagas', min: 0, max: 50, step: 0.5, value: 8, unit: 'm/s', dec: 1 },
    { id: 'r-lluvia', label: 'Lluvia', min: 0, max: 10, step: 0.1, value: 0, unit: 'mm', dec: 1 },
    { id: 'r-dir', label: 'Dirección del viento', min: 0, max: 360, step: 5, value: 180, unit: '°', dec: 0 },
    { id: 'r-hora', label: 'Hora del día', min: 0, max: 23, step: 1, value: 12, unit: 'h', dec: 0 },
  ];

  function sliderMarkup(s, prefix) {
    const fill = ((s.value - s.min) / (s.max - s.min)) * 100;
    return `<div class="slider-row">
      <div class="slider-top">
        <label for="${prefix}${s.id}">${s.label}</label>
        <output id="out-${prefix}${s.id}" for="${prefix}${s.id}">${fmtNum(s.value, s.dec)}${s.unit ? ' ' + s.unit : ''}</output>
      </div>
      <input type="range" id="${prefix}${s.id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}" style="--fill:${fill}%">
    </div>`;
  }

  function bindSlider(s, prefix) {
    const input = $(`#${prefix}${s.id}`);
    const out = $(`#out-${prefix}${s.id}`);
    const update = () => {
      const p = ((Number(input.value) - s.min) / (s.max - s.min)) * 100;
      input.style.setProperty('--fill', `${p}%`);
      out.textContent = `${fmtNum(Number(input.value), s.dec)}${s.unit ? ' ' + s.unit : ''}`;
    };
    input.addEventListener('input', update);
    update();
    return input;
  }

  function sliderValue(s, prefix) {
    return Number($(`#${prefix}${s.id}`).value);
  }

  function initRegSliders() {
    const wrap = $('#reg-sliders');
    wrap.innerHTML = REG_SLIDERS.map((s) => sliderMarkup(s, '')).join('');
    REG_SLIDERS.forEach((s) => bindSlider(s, ''));
  }

  function predictRegression() {
    const r = getRegression();
    const hum = sliderValue(REG_SLIDERS[0], '');
    const hr = sliderValue(REG_SLIDERS[1], '');
    const rad = sliderValue(REG_SLIDERS[2], '');
    const vel = sliderValue(REG_SLIDERS[3], '');
    const raf = sliderValue(REG_SLIDERS[4], '');
    const lluvia = sliderValue(REG_SLIDERS[5], '');
    const dir = sliderValue(REG_SLIDERS[6], '');
    const hora = sliderValue(REG_SLIDERS[7], '');
    const hsin = Math.sin((2 * Math.PI * hora) / 24);
    const hcos = Math.cos((2 * Math.PI * hora) / 24);
    const row = [hum, hr, rad, vel, raf, lluvia, dir, hsin, hcos];
    const z = transformRow(row, r.scaler);
    const pred = predictLinear(r.model, z);
    const box = $('#reg-result');
    box.classList.remove('is-good', 'is-bad');
    box.classList.add('is-neutral');
    box.querySelector('strong').textContent = `${fmtNum(pred, 2)} °C`;
  }

  /* ---------------------------------------------------------
     Pestaña 8 · Clasificación
     --------------------------------------------------------- */
  function renderClassification() {
    const c = getClassification();
    $('#clf-kpis').innerHTML = [
      { label: 'Exactitud', value: fmtPct(c.accuracy * 100, 2), hint: `${fmtInt(c.total)} muestras de test` },
      { label: 'Precisión · mojada', value: fmtPct(c.precision1 * 100, 2), hint: 'VP / (VP + FP)' },
      { label: 'Recall · mojada', value: fmtPct(c.recall1 * 100, 2), hint: 'VP / (VP + FN)' },
      { label: 'F1-Score · mojada', value: fmtPct(c.f1_1 * 100, 2), hint: 'media armónica' },
      { label: 'AUC ROC', value: fmtNum(c.auc, 4), hint: 'capacidad discriminante' },
    ].map(kpiCard).join('');
    $('#clf-auc-chip').textContent = `AUC = ${fmtNum(c.auc, 4)}`;

    const { tn, fp, fn, tp } = c.cm;
    const row0 = tn + fp;
    const row1 = fn + tp;
    const z = [[tn, fp], [fn, tp]];
    const text = [
      [`${fmtInt(tn)}\n(${fmtPct((tn / Math.max(1, row0)) * 100, 1)})`, `${fmtInt(fp)}\n(${fmtPct((fp / Math.max(1, row0)) * 100, 1)})`],
      [`${fmtInt(fn)}\n(${fmtPct((fn / Math.max(1, row1)) * 100, 1)})`, `${fmtInt(tp)}\n(${fmtPct((tp / Math.max(1, row1)) * 100, 1)})`],
    ];
    const cmLayout = chartLayout({ xTitle: 'Predicho', yTitle: 'Real', margin: { l: 100, r: 24, t: 20, b: 60 } });
    cmLayout.yaxis.type = 'category';
    cmLayout.xaxis.type = 'category';
    plot($('#clf-cm'), [{
      z,
      x: ['Hoja seca', 'Hoja mojada'],
      y: ['Hoja seca', 'Hoja mojada'],
      type: 'heatmap',
      colorscale: 'Blues',
      zmin: 0,
      zmax: Math.max(tn, fp, fn, tp),
      text,
      texttemplate: '%{text}',
      textfont: { size: 15, color: '#0d2b45' },
      hovertemplate: 'Real: %{y}<br>Predicho: %{x}<br>Casos: %{z}<extra></extra>',
      colorbar: { thickness: 10, len: 0.7, tickfont: { size: 9 } },
      xgap: 3,
      ygap: 3,
    }], cmLayout);

    const rocLayout = chartLayout({ xTitle: 'Falsos positivos (1 − especificidad)', yTitle: 'Sensibilidad (recall)', showlegend: true });
    rocLayout.shapes = [{ type: 'line', x0: 0, y0: 0, x1: 1, y1: 1, line: { color: theme().muted, width: 1.4, dash: 'dash' } }];
    plot($('#clf-roc'), [
      { x: c.fpr, y: c.tpr, type: 'scatter', mode: 'lines', name: `AUC = ${fmtNum(c.auc, 4)}`, line: { color: COLORS.red, width: 2.6 }, fill: 'tozeroy', fillcolor: 'rgba(211,47,47,.07)', hovertemplate: 'FPR: %{x:.3f}<br>TPR: %{y:.3f}<extra></extra>' },
      { x: [0, 1], y: [0, 1], type: 'scatter', mode: 'lines', name: 'Azar', line: { color: theme().muted, width: 1.2, dash: 'dash' }, hoverinfo: 'skip' },
    ], rocLayout);

    const reportRows = [
      ['Hoja Seca (Clase 0)', fmtPct(c.precision0 * 100, 2), fmtPct(c.recall0 * 100, 2), fmtPct(c.f1_0 * 100, 2), fmtInt(c.support0)],
      ['Hoja Mojada (Clase 1)', fmtPct(c.precision1 * 100, 2), fmtPct(c.recall1 * 100, 2), fmtPct(c.f1_1 * 100, 2), fmtInt(c.support1)],
      ['Exactitud Global (Accuracy)', fmtPct(c.accuracy * 100, 2), fmtPct(c.accuracy * 100, 2), fmtPct(c.accuracy * 100, 2), fmtInt(c.total)],
      ['Macro avg', fmtPct(c.macroP * 100, 2), fmtPct(c.macroR * 100, 2), fmtPct(c.macroF * 100, 2), fmtInt(c.total)],
      ['Weighted avg', fmtPct(c.weightedP * 100, 2), fmtPct(c.weightedR * 100, 2), fmtPct(c.weightedF * 100, 2), fmtInt(c.total)],
    ];
    renderTable($('#clf-report'), ['Métrica / Clase', 'Precisión', 'Recall', 'F1-score', 'Soporte'], reportRows);
  }

  const CLF_SLIDERS = [
    { id: 'c-temp', label: 'Temperatura', min: 5, max: 40, step: 0.5, value: 15, unit: '°C', dec: 1 },
    { id: 'c-hr', label: 'Humedad relativa', min: 10, max: 100, step: 1, value: 95, unit: '%', dec: 0 },
    { id: 'c-rocio', label: 'Punto de rocío', min: 0, max: 40, step: 0.5, value: 14, unit: '°C', dec: 1 },
    { id: 'c-rad', label: 'Radiación', min: 0, max: 1200, step: 10, value: 0, unit: 'W/m²', dec: 0 },
    { id: 'c-vel', label: 'Velocidad del viento', min: 0, max: 30, step: 0.5, value: 2, unit: 'm/s', dec: 1 },
    { id: 'c-raf', label: 'Ráfagas', min: 0, max: 50, step: 0.5, value: 3, unit: 'm/s', dec: 1 },
    { id: 'c-lluvia', label: 'Lluvia', min: 0, max: 10, step: 0.1, value: 0, unit: 'mm', dec: 1 },
    { id: 'c-hora', label: 'Hora del día', min: 0, max: 23, step: 1, value: 5, unit: 'h', dec: 0 },
  ];

  function initClfSliders() {
    const wrap = $('#clf-sliders');
    wrap.innerHTML = CLF_SLIDERS.map((s) => sliderMarkup(s, '')).join('');
    CLF_SLIDERS.forEach((s) => bindSlider(s, ''));
  }

  function predictClassification() {
    const c = getClassification();
    const temp = sliderValue(CLF_SLIDERS[0], '');
    const hr = sliderValue(CLF_SLIDERS[1], '');
    const rocio = sliderValue(CLF_SLIDERS[2], '');
    const rad = sliderValue(CLF_SLIDERS[3], '');
    const vel = sliderValue(CLF_SLIDERS[4], '');
    const raf = sliderValue(CLF_SLIDERS[5], '');
    const lluvia = sliderValue(CLF_SLIDERS[6], '');
    const hora = sliderValue(CLF_SLIDERS[7], '');
    const hsin = Math.sin((2 * Math.PI * hora) / 24);
    const hcos = Math.cos((2 * Math.PI * hora) / 24);
    const difRocio = temp - rocio;
    const row = [temp, hr, rocio, rad, vel, raf, lluvia, hsin, hcos, difRocio];
    const z = transformRow(row, c.scaler);
    const prob = predictLogistic(c.model, z);
    const mojada = prob >= 0.5;
    const box = $('#clf-result');
    box.classList.remove('is-good', 'is-bad', 'is-neutral');
    box.classList.add(mojada ? 'is-bad' : 'is-good');
    box.querySelector('strong').textContent = `${mojada ? 'Hoja mojada' : 'Hoja seca'} · ${fmtPct(prob * 100, 1)}`;
  }

  /* ---------------------------------------------------------
     Pestaña 9 · Clustering
     --------------------------------------------------------- */
  const CLUSTER_INFO = [
    { name: 'Clúster 0 · Frío y húmedo', color: COLORS.cluster[0], desc: 'Condiciones nocturnas y de madrugada, ideales para la condensación y el rocío.' },
    { name: 'Clúster 1 · Templado y seco', color: COLORS.cluster[1], desc: 'Transición durante el día, con menor humedad relativa y radiación moderada.' },
    { name: 'Clúster 2 · Cálido y radiante', color: COLORS.cluster[2], desc: 'Horas centrales del día con alta radiación solar y temperaturas máximas.' },
  ];

  function renderClusters() {
    const cl = getClusters();
    const traces = CLUSTER_INFO.map((info, c) => {
      const rows = DATA.filter((d) => d.cluster === c);
      return {
        x: rows.map((d) => d.temp),
        y: rows.map((d) => d.hr),
        type: 'scattergl',
        mode: 'markers',
        name: info.name,
        marker: { color: info.color, size: 5, opacity: 0.45 },
        hovertemplate: `Temp: %{x:.2f} °C<br>HR: %{y:.1f} %<extra>${info.name}</extra>`,
      };
    });
    // Centroides en unidades reales
    traces.push({
      x: cl.profiles.map((p) => p.temp),
      y: cl.profiles.map((p) => p.hr),
      type: 'scatter',
      mode: 'markers',
      name: 'Centroides',
      marker: { color: '#12263a', size: 15, symbol: 'x-thin', line: { width: 3, color: '#ffffff' } },
      hovertemplate: 'Centroide<br>Temp: %{x:.2f} °C<br>HR: %{y:.1f} %<extra></extra>',
    });
    const layout = chartLayout({ xTitle: 'Temperatura (°C)', yTitle: 'Humedad relativa (%)', showlegend: true });
    plot($('#cluster-chart'), traces, layout);

    $('#cluster-profiles').innerHTML = cl.profiles.map((p, i) => {
      const info = CLUSTER_INFO[i];
      return `<article class="cluster-profile" style="border-left-color:${info.color}">
        <div class="cluster-profile-head"><strong>${info.name}</strong><span>${fmtInt(p.n)} · ${fmtPct(p.pct, 1)}</span></div>
        <p>${info.desc}</p>
        <div class="cluster-metrics">
          <span>Temp ${fmtNum(p.temp, 2)} °C</span>
          <span>HR ${fmtNum(p.hr, 1)} %</span>
          <span>Rad ${fmtNum(p.rad, 0)} W/m²</span>
          <span>Viento ${fmtNum(p.wind, 2)} m/s</span>
        </div>
      </article>`;
    }).join('');
  }

  /* ---------------------------------------------------------
     Pestaña 10 · Series temporales
     --------------------------------------------------------- */
  function renderTimeSeries() {
    const ts = getTimeSeries();
    $('#ts-kpis').innerHTML = [
      { label: 'MAE', value: `${fmtNum(ts.mae, 3)} °C`, hint: 'error absoluto medio' },
      { label: 'RMSE', value: `${fmtNum(ts.rmse, 3)} °C`, hint: 'error cuadrático medio' },
      { label: 'Pasos evaluados', value: fmtInt(ts.split), hint: `ventana de ${ts.look} horas` },
    ].map(kpiCard).join('');

    const t = theme();
    const x = ts.actual.map((_, i) => i);
    const dates = ts.dates.map((d) => fmtDate(d));
    plot($('#ts-chart'), [
      {
        x, y: ts.actual, type: 'scatter', mode: 'lines', name: 'Real (Test)',
        line: { color: COLORS.blue, width: 2 },
        customdata: dates,
        hovertemplate: 'Hora %{x}<br>%{customdata}<br>Real: %{y:.2f} °C<extra></extra>',
      },
      {
        x, y: ts.predicted, type: 'scatter', mode: 'lines', name: 'Predicho (LSTM)',
        line: { color: COLORS.red, width: 2, dash: 'dash' },
        customdata: dates,
        hovertemplate: 'Hora %{x}<br>%{customdata}<br>Predicho: %{y:.2f} °C<extra></extra>',
      },
    ], chartLayout({ xTitle: 'Horas de simulación', yTitle: 'Temperatura (°C)', showlegend: true }));
  }

  /* ---------------------------------------------------------
     Inicialización de controles
     --------------------------------------------------------- */
  function fillSelect(el, selected) {
    el.innerHTML = EDA_VARS.map((v) => `<option value="${v.key}"${v.key === selected ? ' selected' : ''}>${v.label}${v.unit ? ` (${v.unit})` : ''}</option>`).join('');
  }

  function initControls() {
    fillSelect($('#univ-select'), 'temp');
    fillSelect($('#biv-x'), 'temp');
    fillSelect($('#biv-y'), 'hr');
    $('#univ-select').addEventListener('change', renderUniv);
    $('#biv-x').addEventListener('change', renderBiv);
    $('#biv-y').addEventListener('change', renderBiv);
    $('#biv-trend').addEventListener('change', renderBiv);
    initRegSliders();
    initClfSliders();
    $('#reg-predict').addEventListener('click', predictRegression);
    $('#clf-predict').addEventListener('click', predictClassification);
  }

  const TAB_RENDERERS = {
    '2': renderDataFrame,
    '3': renderStats,
    '4': renderUniv,
    '5': renderBiv,
    '6': renderCorr,
    '7': renderRegression,
    '8': renderClassification,
    '9': renderClusters,
    '10': renderTimeSeries,
  };

  document.addEventListener('DOMContentLoaded', () => {
    initControls();
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('tab');
    const initial = requested && TAB_RENDERERS[requested] ? requested : '1';
    activateTab(initial);
    // Precarga discreta de los modelos en segundo plano para que las pestañas abran al instante
    setTimeout(() => {
      try {
        getClusters();
        getRegression();
        getClassification();
        getTimeSeries();
        rendered.delete('2');
        rendered.delete('3');
        rendered.delete('9');
      } catch (e) {
        console.error('Error al precalcular modelos:', e);
      }
    }, 250);
    if (params.get('sim') === 'reg') setTimeout(() => $('#reg-predict').click(), 600);
    if (params.get('sim') === 'clf') setTimeout(() => $('#clf-predict').click(), 600);
    document.documentElement.dataset.jsReady = '1';
  });

  // Diagnóstico de maquetación opcional: ?diag=1
  (function diagnostics() {
    if (!new URLSearchParams(window.location.search).has('diag')) return;
    setTimeout(() => {
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };
      const active = document.querySelector('.panel.is-active');
      const key = active ? Array.from(active.querySelectorAll('.card, .kpi, .objective, .section-head, .chart, .sim-grid')).map((el) => ({
        cls: el.className.split(' ').slice(0, 2).join('.'),
        ...rect(el),
      })) : [];
      const over = Array.from(document.querySelectorAll('body *')).filter((el) => {
        if (el.closest('.table-scroll') || el.closest('.tabs') || el.closest('.plotly')) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2);
      }).slice(0, 12).map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`);
      const data = {
        viewport: { w: window.innerWidth, h: window.innerHeight },
        doc: { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, scrollH: document.documentElement.scrollHeight },
        overflow: over,
        key,
      };
      const pre = document.createElement('pre');
      pre.id = 'diag';
      pre.style.display = 'none';
      pre.textContent = JSON.stringify(data);
      document.body.appendChild(pre);
    }, 900);
  })();


  window.addEventListener('error', (e) => {
    document.documentElement.dataset.jsError = `${e.message} @ ${e.filename}:${e.lineno}:${e.colno}`;
  });
  window.addEventListener('unhandledrejection', (e) => {
    document.documentElement.dataset.jsError = `Promise: ${e.reason}`;
  });
})();
