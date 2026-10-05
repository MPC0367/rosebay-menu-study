/* Rosebay menu design study — reading only. No cart, no order, no network except menu.json.
   Behaviour follows the app's ux-spec: group switch, category navigation with active tracking,
   search across Thai and English names, and a read-only item dialog.
   The photographs are published by the studio owner's decision of 2026-10-05. Most are the
   restaurant's own, while its written permission is still pending; some were taken by other
   people and are shown for this design demonstration. Each caption says which: a post by the
   restaurant, its printed-menu photography captured from the menu by a Wongnai member, or a
   photograph by someone else — named by platform only, never by person. Framing follows the
   app's shared/image-frame.ts, so no crop ever hides a mark. */
'use strict';

const T = {
  th: {
    details: 'รายละเอียด', detailsFor: (n) => `ดูรายละเอียดของ ${n}`,
    from: (p) => `เริ่มต้น ${p}`,
    historical: 'ราคาย้อนหลัง · ร้านยังไม่ได้ยืนยัน',
    disagree: 'แหล่งข้อมูลระบุราคาไม่ตรงกัน · ยังไม่ได้ยืนยัน',
    disagreeOption: 'แหล่งข้อมูลระบุตัวเลือกไม่ตรงกัน · ยังไม่ได้ยืนยัน',
    pending: 'ราคารอยืนยัน', pendingNote: 'ไม่พบราคาบนเมนูที่ร้านพิมพ์',
    pendingLong: 'ไม่พบราคาของรายการนี้บนเมนูที่ร้านพิมพ์ที่อ่านได้ ต้องยืนยันกับร้าน',
    choices: 'มีตัวเลือก',
    results: (q, n) => `ผลการค้นหา “${q}” · ${n} รายการ`,
    none: (q) => `ไม่พบเมนูที่ตรงกับ “${q}”`,
    noneHelp: 'ลองพิมพ์ชื่อสั้นลง หรือใช้อีกภาษาหนึ่ง',
    clearAction: 'ล้างการค้นหา',
    counts: (n, own, other) => `${n} รายการ · ภาพถ่ายของร้าน ${own} รูป${other ? ` · ภาพที่คนอื่นถ่าย ${other} รูป` : ''}`,
    failed: 'โหลดข้อมูลเมนูไม่สำเร็จ',
    priceH: 'ราคา', printed: 'เมนูที่ร้านพิมพ์', graphic: 'ภาพเมนูของร้าน', receipt: 'ใบเสร็จของร้าน',
    undated: 'ไม่ระบุวันที่',
    includedChoice: (g) => `${g} (รวมในราคาแล้ว)`,
    struck: 'ตัวเลือกที่แหล่งข้อมูลขีดฆ่าด้วยมือ ยังไม่ได้ยืนยัน',
    statesH: 'สิ่งที่ชื่อบนเมนูระบุ',
    statesNote: 'บันทึกจากต้นฉบับ (ภาษาอังกฤษ) ไม่ใช่คำบรรยายของร้าน',
    sourceH: 'แหล่งข้อมูล', printedName: 'ชื่อที่พิมพ์บนเมนู', alsoPrinted: 'สะกดอย่างอื่นที่พบบนเมนู',
    captionName: 'ชื่อจากคำบรรยายโพสต์ของร้าน (ไม่ใช่ชื่อที่พิมพ์บนเมนู)',
    availability: {
      'listed-2023-24': 'อยู่ในเมนูที่ถ่ายไว้ปี 2023–2024',
      'special-verify': 'อยู่ในหน้าเมนูพิเศษ ต้องยืนยันกับร้าน',
      'reported-only': 'พบชื่อนี้เฉพาะในรีวิว บทความ หรือโพสต์',
      unknown: 'ไม่ทราบสถานะในเมนูปัจจุบัน',
    },
    lastSeen: (d) => `พบในแหล่งข้อมูลครั้งล่าสุด ${d}`,
    lastSeenUndated: 'พบในแหล่งข้อมูลที่ไม่ระบุวันที่',
    photoCap: (ch, credit) => `${credit ? credit + ' · ' : ''}ภาพที่ร้านเผยแพร่เองบน${ch === 'instagram' ? ' Instagram' : ' Facebook'} ของร้าน · ขออนุญาตเป็นลายลักษณ์อักษรอยู่ระหว่างดำเนินการ`,
    printedMenuCap: (member) => `ภาพถ่ายจากเมนูที่ร้านพิมพ์เอง ถ่ายหน้าเมนูไว้โดยสมาชิก Wongnai${member ? ' (' + member + ')' : ''} · ร้านไม่ได้เป็นผู้โพสต์ภาพนี้เอง · ขออนุญาตเป็นลายลักษณ์อักษรอยู่ระหว่างดำเนินการ`,
    /* ภาพที่คนอื่นถ่าย: ระบุเพียงแหล่งที่มา ไม่ระบุชื่อผู้ใด */
    thirdPartyCap: (sourceKind) => `${sourceKind === 'wongnai-member' ? 'ภาพจากสมาชิก Wongnai' : sourceKind === 'lemon8-creator' ? 'ภาพจากครีเอเตอร์ Lemon8' : 'ภาพจากบล็อกรีวิว'} · ร้านไม่ได้โพสต์ภาพนี้เอง`,
    markNote: 'ตราหรือข้อความที่ร้านพิมพ์ไว้ในภาพถูกเก็บไว้ทั้งหมด ไม่มีการครอบตัดออก',
    markNoteOther: 'ตราและข้อความทุกอย่างที่อยู่ในภาพถูกเก็บไว้ทั้งหมด ไม่มีการครอบตัดหรือแก้ไข',
    studioIdNote: 'ภาพนี้จับคู่กับรายการนี้จากลักษณะอาหารในภาพ โดย O2 Design Studio คำบรรยายของร้านไม่ได้ระบุชื่อรายการ',
    studioIdNoteOther: 'ภาพนี้จับคู่กับรายการนี้จากลักษณะอาหารในภาพ โดย O2 Design Studio แหล่งที่มาของภาพไม่ได้ระบุชื่อรายการนี้',
    venueCap: (credit) => `ด้านหน้าร้าน · ภาพที่ร้านเผยแพร่เอง${credit ? ' · ' + credit : ''} · ขออนุญาตอยู่ระหว่างดำเนินการ`,
    allCats: 'หมวดหมู่ทั้งหมด',
  },
  en: {
    details: 'Details', detailsFor: (n) => `See details for ${n}`,
    from: (p) => `From ${p}`,
    historical: 'Historical price · not verified by the restaurant',
    disagree: 'Sources give different prices · not verified',
    disagreeOption: 'Sources disagree on the options · not verified',
    pending: 'Price to be confirmed', pendingNote: 'No price on any menu the restaurant printed',
    pendingLong: 'No printed menu we could read gives a price for this item. It has to be confirmed with the restaurant.',
    choices: 'Choices available',
    results: (q, n) => `Results for “${q}” · ${n}`,
    none: (q) => `Nothing on the menu matches “${q}”`,
    noneHelp: 'Try a shorter name or the other language.',
    clearAction: 'Clear search',
    counts: (n, own, other) => `${n} items · ${own} of the restaurant’s own photographs${other ? ` · ${other} photographs taken by other people` : ''}`,
    failed: 'The menu data could not be loaded.',
    priceH: 'Price', printed: 'printed menu', graphic: 'menu graphic', receipt: 'restaurant receipt',
    undated: 'undated',
    includedChoice: (g) => `${g} (included in the price)`,
    struck: 'Struck out by hand on a printed source — unconfirmed',
    statesH: 'What the menu name states',
    statesNote: 'A source note in English, not a description written by the restaurant.',
    sourceH: 'Source', printedName: 'As printed on the menu', alsoPrinted: 'Other spellings printed on a menu',
    captionName: 'Name from the restaurant’s own post caption, not from a printed menu',
    availability: {
      'listed-2023-24': 'On a menu sheet photographed in 2023–2024',
      'special-verify': 'On a SPECIAL page — needs confirming with the restaurant',
      'reported-only': 'Named only in reviews, articles or posts',
      unknown: 'Current status unknown',
    },
    lastSeen: (d) => `Last seen in a source dated ${d}`,
    lastSeenUndated: 'Last seen in a source that carries no date',
    photoCap: (ch, credit) => `${credit ? credit + ' · ' : ''}published by the restaurant on its own ${ch === 'instagram' ? 'Instagram' : 'Facebook'} · written permission pending`,
    printedMenuCap: (member) => `The restaurant’s own printed-menu photograph, captured from the printed menu by a Wongnai member${member ? ' (' + member + ')' : ''} · the restaurant did not post this image itself · written permission pending`,
    /* A photograph someone else took. The source platform only — no member name, no handle. */
    thirdPartyCap: (sourceKind) => `${sourceKind === 'wongnai-member' ? 'Photograph by a Wongnai member' : sourceKind === 'lemon8-creator' ? 'Photograph by a Lemon8 creator' : 'Photograph from a review blog'} · not posted by the restaurant`,
    markNote: 'Every logo and printed word the restaurant put in frame is kept whole — nothing is cropped out.',
    markNoteOther: 'Every mark in this frame is kept whole — nothing is cropped out or retouched.',
    studioIdNote: 'O2 Design Studio matched this photograph to the item by what the dish looks like; the restaurant’s own caption does not name the dish.',
    studioIdNoteOther: 'O2 Design Studio matched this photograph to the item by what the dish looks like; its own source does not name this item.',
    venueCap: (credit) => `The shopfront, published by the restaurant${credit ? ' · ' + credit : ''} · permission pending`,
    allCats: 'All categories',
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, txt) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (txt !== undefined && txt !== null) node.textContent = txt;
  return node;
};
const baht = (thb) => `฿${thb.toLocaleString('en-US')}`;
/* The catalogue's dates are ISO day or month strings; anything else is prose, not a date. */
const isDate = (value) => typeof value === 'string' && /^\d{4}(-\d{2}){0,2}$/.test(value.trim());

let data = null;
let lang = 'th';
let groupId = 'food';
let searching = false;
const scrollMemory = Object.create(null);
let lastOpener = null;

const t = () => T[lang];
const nameOf = (item) => {
  const primary = lang === 'th' ? (item.nameTh || item.nameEn) : (item.nameEn || item.nameTh);
  const primaryLang = lang === 'th' ? (item.nameTh ? 'th' : 'en') : (item.nameEn ? 'en' : 'th');
  let second = lang === 'th' ? item.nameEn : item.nameTh;
  let secondLang = lang === 'th' ? 'en' : 'th';
  if (!second || second === primary) { second = null; secondLang = null; }
  return { primary, primaryLang, second, secondLang };
};

/* ── search (the app's own normalise and match rules, shared/text.ts §13.7) ── */

const FOLDS = [['กระเพรา', 'กะเพรา'], ['ไอศครีม', 'ไอศกรีม']];
function normalizeSearch(input) {
  let value = input.normalize('NFKC').replace(/[​﻿]/gu, '').toLocaleLowerCase('en');
  for (const [variant, canonical] of FOLDS) value = value.split(variant).join(canonical);
  return value.replace(/\s+/gu, ' ').trim();
}
function matches(query, terms) {
  const q = normalizeSearch(query);
  if (q === '') return false;
  const compact = q.replace(/ /g, '');
  return terms.some((term) => term.includes(q) || term.replace(/ /g, '').includes(compact));
}

/* ── pieces ─────────────────────────────────────────────────────────────────── */

function priceNode(item) {
  const p = item.price;
  const wrap = el('p', 'price');
  if (p.kind === 'pending') {
    wrap.appendChild(el('span', 'pill', t().pending));
    wrap.appendChild(el('span', 'price__note', t().pendingNote));
    return wrap;
  }
  let amount;
  if (p.kind === 'conflicting' && p.conflictScope === 'amount') amount = p.values.map(baht).join(' / ');
  else amount = p.from ? t().from(baht(p.displayTHB)) : baht(p.displayTHB);
  wrap.appendChild(el('span', null, amount));
  const note = p.kind === 'conflicting'
    ? (p.conflictScope === 'amount' ? t().disagree : t().disagreeOption)
    : t().historical;
  wrap.appendChild(el('span', 'price__note', note));
  return wrap;
}

/* RB-10 — the thumbnail honours the framing menu.json carries from shared/image-frame.ts
   (frameImage() against the square card box), so a printed mark is never framed away: an
   asset whose mark cannot survive a square crop falls back to contain on the second ground,
   exactly as the app does. */
function thumbNode(image, alt) {
  const box = el('div', 'card__thumb');
  const img = el('img');
  img.src = image.src;
  img.srcset = image.srcset;
  img.sizes = '(min-width: 1024px) 128px, (min-width: 400px) 112px, 96px';
  img.width = image.width;
  img.height = image.height;
  img.alt = alt || '';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.style.objectFit = image.thumbFit || 'cover';
  img.style.objectPosition = image.thumbPos || '50% 50%';
  if (image.thumbFit === 'contain') box.classList.add('card__thumb--contain');
  if (image.thumbBackground) box.style.background = image.thumbBackground;
  box.appendChild(img);
  return box;
}

function cardNode(item, withCategoryLine) {
  const card = el('article', 'card');
  card.dataset.itemId = item.id;
  const names = nameOf(item);
  const altLang = lang === 'th' ? item.image?.altTh : item.image?.altEn;
  if (item.image) card.appendChild(thumbNode(item.image, altLang || names.primary));
  else card.classList.add('card--text');

  const body = el('div', 'card__body');
  if (withCategoryLine) {
    const cat = data.categories.find((c) => c.id === item.categoryId);
    const group = data.groups.find((g) => g.id === item.groupId);
    const line = lang === 'th' ? `${group.nameTh} · ${cat.nameTh}` : `${group.nameEn} · ${cat.nameEn}`;
    body.appendChild(el('p', 'card__cat', line));
  }
  const h3 = el('h3', 'card__name');
  const open = el('button', null, names.primary);
  open.type = 'button';
  open.lang = names.primaryLang;
  open.setAttribute('aria-label', t().detailsFor(names.primary));
  open.addEventListener('click', () => openSheet(item, open));
  h3.appendChild(open);
  body.appendChild(h3);
  if (names.second) {
    const second = el('p', 'card__second', names.second);
    second.lang = names.secondLang;
    body.appendChild(second);
  }
  if (item.choice || item.variants.length > 1) body.appendChild(el('p', 'card__meta', t().choices));
  card.appendChild(body);

  const action = el('div', 'card__action');
  action.appendChild(priceNode(item));
  const more = el('button', 'textbtn', t().details);
  more.type = 'button';
  more.setAttribute('aria-label', t().detailsFor(names.primary));
  more.addEventListener('click', () => openSheet(item, more));
  action.appendChild(more);
  card.appendChild(action);
  return card;
}

/* ── item dialog (read-only) ─────────────────────────────────────────────────── */

const basisLabel = (basis) => (basis === 'menu-graphic' ? t().graphic : basis === 'pos-receipt' ? t().receipt : t().printed);

function block(title) {
  const b = el('section', 'block');
  const h = el('h3', null, title);
  h.lang = lang;
  b.appendChild(h);
  return b;
}

let openItem = null;

function openSheet(item, opener) {
  const sheet = $('[data-sheet]');
  const body = $('[data-sheet-body]');
  const names = nameOf(item);
  if (opener !== undefined) lastOpener = opener || null;
  openItem = item;

  const head = $('[data-sheet-head]');
  const previous = $('#sheet-name');
  if (previous) previous.remove();
  const heading = el('h2', 'sheet__name', names.primary);
  heading.id = 'sheet-name';
  heading.lang = names.primaryLang;
  head.prepend(heading);
  body.textContent = '';

  if (item.image) {
    const fig = el('figure', 'sheet__figure');
    const img = el('img');
    img.src = item.image.src;
    img.srcset = item.image.srcset;
    img.sizes = '(min-width: 560px) 512px, 92vw';
    img.width = item.image.width;
    img.height = item.image.height;
    img.alt = (lang === 'th' ? item.image.altTh : item.image.altEn) || names.primary;
    fig.appendChild(img);
    /* The caption says where the photograph came from. A printed-menu capture is never
       described as something the restaurant posted, and a photograph someone else took is never
       described as the restaurant's: it names its platform and nothing about a person. */
    const other = item.image.provenanceKind === 'third-party';
    const cap = el('figcaption', null, other
      ? t().thirdPartyCap(item.image.sourceKind)
      : item.image.provenanceKind === 'printed-menu'
        ? t().printedMenuCap(item.image.captureMember)
        : t().photoCap(item.image.posted, item.image.credit));
    if (item.image.identifiedByStudio) cap.appendChild(el('span', 'cap__note', other ? t().studioIdNoteOther : t().studioIdNote));
    if (item.image.hasMark) cap.appendChild(el('span', 'cap__mark', other ? t().markNoteOther : t().markNote));
    fig.appendChild(cap);
    body.appendChild(fig);
  }

  if (names.second) {
    const sub = el('p', 'sheet__sub', names.second);
    sub.lang = names.secondLang;
    body.appendChild(sub);
  }

  const price = block(t().priceH);
  price.appendChild(priceNode(item));
  if (item.variants.length > 0) {
    const rows = el('div', 'rows');
    for (const v of item.variants) {
      const row = el('div', 'row');
      const label = lang === 'th' ? (v.labelTh || v.labelEn) : (v.labelEn || v.labelTh);
      row.appendChild(el('span', null, v.thb === null ? t().pending : baht(v.thb)));
      row.appendChild(el('span', null, label || ''));
      rows.appendChild(row);
    }
    price.appendChild(rows);
  }
  if (item.choice) {
    const gname = lang === 'th' ? item.choice.nameTh : item.choice.nameEn;
    const options = item.choice.options.map((o) => (lang === 'th' ? (o.nameTh || o.nameEn) : (o.nameEn || o.nameTh))).join(' / ');
    price.appendChild(el('p', null, `${t().includedChoice(gname || '')} — ${options}`));
  }
  if (item.crossedOut.length > 0) {
    const labels = item.crossedOut.map((v) => (lang === 'th' ? (v.labelTh || v.labelEn) : (v.labelEn || v.labelTh))).join(', ');
    price.appendChild(el('p', null, `${t().struck}: ${labels}`));
  }
  if (item.price.kind === 'pending') price.appendChild(el('p', null, t().pendingLong));
  if (item.price.evidence.length > 0) {
    const rows = el('div', 'rows');
    for (const e of item.price.evidence) {
      const row = el('div', 'row');
      row.appendChild(el('span', null, baht(e.thb)));
      const where = `${basisLabel(e.basis)} · ${e.date === 'undated' ? t().undated : e.date}`;
      row.appendChild(el('span', null, e.variant ? `${where} (${e.variant})` : where));
      rows.appendChild(row);
    }
    price.appendChild(rows);
  }
  body.appendChild(price);

  if (item.includes.length > 0) {
    const states = block(t().statesH);
    const ul = el('ul');
    for (const line of item.includes) {
      const li = el('li', null, line);
      li.lang = 'en';
      ul.appendChild(li);
    }
    states.appendChild(ul);
    states.appendChild(el('p', null, t().statesNote));
    body.appendChild(states);
  }

  const source = block(t().sourceH);
  source.appendChild(el('p', null, t().availability[item.availability] || t().availability.unknown));
  /* A sighting whose "date" is a sentence rather than a date (evidence.json carries
     "post date not accessible" for one record) must not be printed as if it were one. */
  const seen = item.latestSighting && item.latestSighting.date;
  if (seen) {
    source.appendChild(el('p', null, isDate(seen) ? t().lastSeen(seen) : t().lastSeenUndated));
  }
  /* The name line says where the name came from: only a record with printed-menu evidence
     may claim the printed menu. */
  const sourceName = lang === 'th' ? (item.sourceLabelTh || item.sourceLabelEn) : (item.sourceLabelEn || item.sourceLabelTh);
  if (sourceName) {
    const label = item.sourceLabelBasis === 'post-caption' ? t().captionName : t().printedName;
    source.appendChild(el('p', null, `${label}: ${sourceName}`));
  }
  if (item.aliases.length > 0) source.appendChild(el('p', null, `${t().alsoPrinted}: ${item.aliases.join(' · ')}`));
  for (const note of item.notes || []) {
    const p = el('p', null, lang === 'th' ? note.th : note.en);
    p.lang = lang;
    source.appendChild(p);
  }
  body.appendChild(source);

  if (!sheet.open) {
    sheet.showModal();
    body.scrollTop = 0;
  }
}

/* ── rendering ──────────────────────────────────────────────────────────────── */

function renderTabs() {
  const host = $('[data-groups]');
  host.textContent = '';
  for (const g of data.groups) {
    const tab = el('button', 'tab', lang === 'th' ? g.nameTh : g.nameEn);
    tab.type = 'button';
    tab.lang = lang;
    tab.setAttribute('aria-pressed', String(g.id === groupId && !searching));
    tab.addEventListener('click', () => selectGroup(g.id));
    host.appendChild(tab);
  }
}

function renderChips() {
  const host = $('[data-chips]');
  host.textContent = '';
  const group = data.groups.find((g) => g.id === groupId);
  for (const id of group.categoryIds) {
    const cat = data.categories.find((c) => c.id === id);
    const chip = el('a', 'chip', lang === 'th' ? cat.nameTh : cat.nameEn);
    chip.href = `#cat-${cat.id}`;
    host.appendChild(chip);
  }
}

function renderAside() {
  const host = $('[data-aside]');
  host.textContent = '';
  const nav = el('nav');
  nav.setAttribute('aria-label', t().allCats);
  for (const g of data.groups) {
    const h2 = el('h2', null, lang === 'th' ? g.nameTh : g.nameEn);
    h2.lang = lang;
    nav.appendChild(h2);
    const ul = el('ul');
    for (const id of g.categoryIds) {
      const cat = data.categories.find((c) => c.id === id);
      const li = el('li');
      const a = el('a', null, lang === 'th' ? cat.nameTh : cat.nameEn);
      a.href = `#cat-${cat.id}`;
      a.dataset.cat = cat.id;
      a.addEventListener('click', (ev) => {
        if (g.id !== groupId || searching) {
          ev.preventDefault();
          selectGroup(g.id, cat.id);
        }
      });
      li.appendChild(a);
      ul.appendChild(li);
    }
    nav.appendChild(ul);
  }
  host.appendChild(nav);
}

function renderMenu() {
  const host = $('#menu');
  host.textContent = '';
  const group = data.groups.find((g) => g.id === groupId);
  for (const id of group.categoryIds) {
    const cat = data.categories.find((c) => c.id === id);
    const section = el('section', 'cat');
    section.id = `cat-${cat.id}`;
    section.dataset.cat = cat.id;
    const h2 = el('h2', 'cat__h', lang === 'th' ? cat.nameTh : cat.nameEn);
    h2.lang = lang;
    const sub = el('small', null, lang === 'th' ? cat.nameEn : cat.nameTh);
    sub.lang = lang === 'th' ? 'en' : 'th';
    h2.appendChild(sub);
    section.appendChild(h2);
    const list = el('div', 'list');
    for (const itemId of cat.itemIds) {
      const item = data.items.find((i) => i.id === itemId);
      list.appendChild(cardNode(item, false));
    }
    section.appendChild(list);
    host.appendChild(section);
  }
  markActiveCategory();
}

function renderResults(q) {
  const host = $('#menu');
  host.textContent = '';
  const found = data.items.filter((i) => matches(q, i.searchTerms));
  const h2 = el('h2', 'cat__h', found.length > 0 ? t().results(q, found.length) : t().none(q));
  h2.lang = lang;
  h2.setAttribute('aria-live', 'polite');
  host.appendChild(h2);
  if (found.length === 0) {
    host.appendChild(el('p', 'state', t().noneHelp));
    const clear = el('button', 'textbtn', t().clearAction);
    clear.type = 'button';
    clear.addEventListener('click', () => closeSearch());
    host.appendChild(clear);
    return;
  }
  const list = el('div', 'list');
  for (const item of found) list.appendChild(cardNode(item, true));
  host.appendChild(list);
}

/* ── navigation state ───────────────────────────────────────────────────────── */

function selectGroup(next, scrollToCat) {
  if (searching) closeSearch(true);
  if (next !== groupId) {
    scrollMemory[groupId] = window.scrollY;
    groupId = next;
  }
  renderTabs();
  renderChips();
  renderMenu();
  if (scrollToCat) {
    const target = document.getElementById(`cat-${scrollToCat}`);
    if (target) target.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: scrollMemory[groupId] || 0, behavior: 'auto' });
  }
}

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function markActiveCategory() {
  if (searching) return;
  const sections = [...document.querySelectorAll('#menu .cat')];
  if (sections.length === 0) return;
  const line = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-top')) + 12;
  let active = sections[0].dataset.cat;
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= line) active = s.dataset.cat;
  }
  for (const chip of document.querySelectorAll('[data-chips] .chip')) {
    const on = chip.getAttribute('href') === `#cat-${active}`;
    if (on) chip.setAttribute('aria-current', 'true'); else chip.removeAttribute('aria-current');
  }
  for (const link of document.querySelectorAll('[data-aside] a')) {
    const on = link.dataset.cat === active;
    if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
  }
}

function openSearch() {
  searching = true;
  $('[data-searchbar]').hidden = false;
  $('.groups').hidden = true;
  $('[data-chips]').hidden = true;
  const input = $('[data-search-input]');
  input.focus();
  const q = input.value.trim();
  if (q !== '') { renderResults(q); return; }
  $('#menu').textContent = '';
  const hint = el('p', 'state', lang === 'th'
    ? 'พิมพ์ชื่ออาหารหรือเครื่องดื่ม ภาษาไทยหรืออังกฤษ'
    : 'Type a dish or drink name in Thai or English');
  hint.lang = lang;
  $('#menu').appendChild(hint);
}

function closeSearch(keepGroup) {
  searching = false;
  $('[data-searchbar]').hidden = true;
  $('.groups').hidden = false;
  $('[data-chips]').hidden = false;
  $('[data-search-input]').value = '';
  $('[data-search-clear]').hidden = true;
  if (!keepGroup) {
    renderTabs();
    renderMenu();
    markActiveCategory();
  }
}

/* ── language ───────────────────────────────────────────────────────────────── */

function setLang(next) {
  lang = next;
  document.documentElement.lang = next;
  document.documentElement.dataset.lang = next;
  for (const node of document.querySelectorAll('[data-th][data-en]')) node.textContent = node.dataset[next];
  for (const node of document.querySelectorAll('[data-th-label][data-en-label]')) node.setAttribute('aria-label', node.dataset[next + 'Label']);
  for (const node of document.querySelectorAll('[data-th-placeholder][data-en-placeholder]')) node.placeholder = node.dataset[next + 'Placeholder'];
  for (const btn of document.querySelectorAll('[data-set-lang]')) btn.setAttribute('aria-pressed', String(btn.dataset.setLang === next));
  if (!data) return;
  renderTabs();
  renderChips();
  renderAside();
  renderCounts();
  renderVenue();
  if (searching) renderResults($('[data-search-input]').value.trim());
  else renderMenu();
  if ($('[data-sheet]').open && openItem) openSheet(openItem);
}

function renderCounts() {
  /* Counted apart, because the two are not the same thing: the restaurant's own photographs and
     the ones other people took. The shopfront is the restaurant's own. */
  const shown = data.items.filter((i) => i.image);
  const other = shown.filter((i) => i.image.provenanceKind === 'third-party').length;
  const own = shown.length - other + (data.venue ? 1 : 0);
  $('[data-count-line]').textContent = t().counts(data.items.length, own, other);
}

function renderVenue() {
  const fig = $('[data-venue]');
  fig.textContent = '';
  if (!data.venue) { fig.hidden = true; return; }
  const img = el('img');
  img.src = data.venue.src;
  img.srcset = data.venue.srcset;
  img.sizes = '(min-width: 1024px) 340px, 92vw';
  img.width = data.venue.width;
  img.height = data.venue.height;
  img.alt = (lang === 'th' ? data.venue.altTh : data.venue.altEn) || '';
  img.loading = 'lazy';
  img.decoding = 'async';
  fig.appendChild(img);
  const cap = el('figcaption', null, t().venueCap(data.venue.credit));
  if (data.venue.hasMark) cap.appendChild(el('span', 'cap__mark', t().markNote));
  fig.appendChild(cap);
  fig.hidden = false;
}

/* ── wiring ─────────────────────────────────────────────────────────────────── */

function measureSticky() {
  const stack = $('[data-sticky-stack]');
  const set = () => document.documentElement.style.setProperty('--sticky-top', `${Math.round(stack.getBoundingClientRect().height)}px`);
  set();
  if ('ResizeObserver' in window) new ResizeObserver(set).observe(stack);
  else window.addEventListener('resize', set);
}

function wire() {
  for (const btn of document.querySelectorAll('[data-set-lang]')) {
    btn.addEventListener('click', () => setLang(btn.dataset.setLang));
  }
  $('[data-search-open]').addEventListener('click', openSearch);
  $('[data-search-cancel]').addEventListener('click', () => closeSearch());
  const input = $('[data-search-input]');
  input.addEventListener('input', () => {
    const q = input.value.trim();
    $('[data-search-clear]').hidden = q === '';
    if (q === '') { openSearch(); return; }
    renderResults(q);
  });
  input.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeSearch(); });
  $('[data-search-clear]').addEventListener('click', () => { input.value = ''; $('[data-search-clear]').hidden = true; openSearch(); });

  const sheet = $('[data-sheet]');
  $('[data-sheet-close]').addEventListener('click', () => sheet.close());
  sheet.addEventListener('click', (ev) => { if (ev.target === sheet) sheet.close(); });
  sheet.addEventListener('close', () => { if (lastOpener && document.contains(lastOpener)) lastOpener.focus(); });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const stack = $('[data-sticky-stack]');
      if (window.scrollY > 4) stack.setAttribute('data-scrolled', ''); else stack.removeAttribute('data-scrolled');
      markActiveCategory();
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  measureSticky();
}

async function start() {
  wire();
  try {
    const res = await fetch('menu.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    const state = $('[data-state]');
    if (state) { state.textContent = t().failed; state.lang = lang; }
    return;
  }
  renderTabs();
  renderChips();
  renderAside();
  renderMenu();
  renderCounts();
  renderVenue();
}

start();
