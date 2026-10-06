/* Rosebay menu design study — reading only. No cart, no order, no network except menu.json.
   Behaviour: group switch, category navigation with active tracking, search across Thai and
   English names, and a read-only item dialog.
   Every item shows a photograph (the studio owner's decisions of 2026-10-05 and 2026-10-06),
   and each caption says which of three kinds it is. The restaurant's own: a post by the
   restaurant, its printed-menu photography captured from the menu by a Wongnai member, or its
   menu card from its Google listing; the restaurant has not given written permission. A
   photograph someone else owns, shown for this design demonstration without its owner's
   permission; its caption names the platform only. Or a SAMPLE from a free-licence library,
   which does not show the restaurant's food or drink: it is tagged on its thumbnail and
   labelled on its card and in its details, with the licence it is used under.
   No caption names a private person, with one exception: the creator of a sample whose
   licence asks for attribution is named, with a link to the photograph's own page.
   The card thumbnail is framed so that no logo, watermark or branding print recorded for a
   photograph is cut. */
'use strict';

const T = {
  th: {
    details: 'รายละเอียด', detailsFor: (n) => `ดูรายละเอียดของ ${n}`,
    from: (p) => `เริ่มต้น ${p}`,
    historical: 'ราคาย้อนหลัง · ร้านยังไม่ได้ยืนยัน',
    disagree: 'แหล่งข้อมูลระบุราคาไม่ตรงกัน · ยังไม่ได้ยืนยัน',
    disagreeOption: 'แหล่งข้อมูลระบุตัวเลือกไม่ตรงกัน · ยังไม่ได้ยืนยัน',
    /* รายการที่ยังไม่มีราคา: บอกเฉพาะสิ่งที่จริงเสมอ คือ O2 ยังไม่มีราคาที่ยืนยันแล้ว ไม่บอกว่าไม่มีราคาพิมพ์ไว้ที่ใด
       เพราะบางรายการมีราคาอยู่บนหน้าเมนูหรือโปสเตอร์ที่ร้านพิมพ์เอง ซึ่งรายการนั้นจะระบุไว้เอง (menu.json: pendingNote, pendingLong) */
    pending: 'ราคารอยืนยัน', pendingNote: 'O2 ยังไม่มีราคาที่ยืนยันแล้วของรายการนี้',
    pendingLong: 'O2 Design Studio ยังไม่มีราคาที่ยืนยันแล้วของรายการนี้ ต้องยืนยันกับร้าน',
    choices: 'มีตัวเลือก',
    results: (q, n) => `ผลการค้นหา “${q}” · ${n} รายการ`,
    none: (q) => `ไม่พบเมนูที่ตรงกับ “${q}”`,
    noneHelp: 'ลองพิมพ์ชื่อสั้นลง หรือใช้อีกภาษาหนึ่ง',
    clearAction: 'ล้างการค้นหา',
    /* นับตามกรรมสิทธิ์ ไม่ใช่ตามว่าใครกดชัตเตอร์: ภาพเมนูที่ร้านพิมพ์เองเป็นของร้าน แม้สมาชิก Wongnai จะเป็นคนถ่ายหน้าเมนูไว้
       ภาพตัวอย่างนับแยกเป็นกลุ่มที่สาม เพราะไม่ใช่ภาพอาหารหรือเครื่องดื่มของร้าน */
    counts: (n, own, other, samples) => `${n} รายการ · ภาพที่ร้านเป็นเจ้าของ ${own} รูป${other ? ` · ภาพที่คนอื่นเป็นเจ้าของ ${other} รูป` : ''}${samples ? ` · ภาพตัวอย่าง ${samples} รูป ไม่ใช่ภาพจากร้าน` : ''}`,
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
      'design-study-only': 'พบเฉพาะในงานศึกษาชิ้นก่อนของ O2',
      unknown: 'ไม่ทราบสถานะในเมนูปัจจุบัน',
    },
    lastSeen: (d) => `พบในแหล่งข้อมูลครั้งล่าสุด ${d}`,
    lastSeenUndated: 'พบในแหล่งข้อมูลที่ไม่ระบุวันที่',
    photoCap: (ch, credit) => `${credit ? credit + ' · ' : ''}ภาพที่ร้านเผยแพร่เองบน${ch === 'instagram' ? ' Instagram' : ' Facebook'} ของร้าน · ร้านยังไม่ได้ให้อนุญาตเป็นลายลักษณ์อักษร`,
    /* ไม่ระบุชื่อบัญชีของสมาชิกที่ถ่ายหน้าเมนูไว้ ระบุเพียงว่าเป็นสมาชิก Wongnai */
    printedMenuCap: () => 'ภาพถ่ายจากเมนูที่ร้านพิมพ์เอง ถ่ายหน้าเมนูไว้โดยสมาชิก Wongnai · ร้านไม่ได้เป็นผู้โพสต์ภาพนี้เอง · ร้านยังไม่ได้ให้อนุญาตเป็นลายลักษณ์อักษร',
    /* การ์ดเมนูเป็นของร้าน แต่ไม่มีบันทึกว่าใครอัปโหลดขึ้น Google จึงไม่เรียกว่าเป็นโพสต์ของร้าน */
    menuCardCap: () => 'ภาพจากการ์ดเมนูของร้านเอง ซึ่งอยู่ในหน้าข้อมูลร้านบน Google · ไม่มีบันทึกว่าใครเป็นผู้อัปโหลดขึ้น Google · ร้านยังไม่ได้ให้อนุญาตเป็นลายลักษณ์อักษร',
    /* ภาพที่คนอื่นเป็นเจ้าของ: ระบุเพียงแหล่งที่มา ไม่ระบุชื่อผู้ใด
       'wongnai-upload' คือภาพที่สมาชิก Wongnai อัปโหลดไว้ โดยยังไม่ได้ยืนยันว่าสมาชิกรายนั้นคือร้านเองหรือช่างภาพของร้านหรือไม่
       จึงไม่กล่าวว่าร้านไม่ได้โพสต์ภาพนี้ บอกเพียงสิ่งที่ทราบ */
    thirdPartyCap: (sourceKind) => `${({ 'wongnai-member': 'ภาพถ่ายโดยสมาชิก Wongnai', 'wongnai-upload': 'ภาพที่สมาชิก Wongnai อัปโหลดไว้', 'lemon8-creator': 'ภาพถ่ายโดยครีเอเตอร์ Lemon8', 'pantip-member': 'ภาพถ่ายโดยสมาชิก Pantip', blog: 'ภาพจากบล็อกรีวิว' })[sourceKind] || 'ภาพที่คนอื่นเป็นเจ้าของ'} · ${sourceKind === 'wongnai-upload' ? 'ยังไม่ได้ยืนยันว่าร้านหรือผู้อื่นเป็นเจ้าของภาพ' : 'ร้านไม่ได้โพสต์ภาพนี้เอง'} · ยังไม่ได้ขออนุญาตจากเจ้าของภาพ`,
    /* ภาพตัวอย่าง: ข้อความกำกับเป็นข้อความตายตัว ภาพตัวอย่างต้องไม่ปรากฏโดยไม่มีข้อความนี้
       ชื่อผู้สร้างสรรค์ภาพจะแสดงเฉพาะเมื่อสัญญาอนุญาตกำหนดให้ต้องระบุที่มา และถ้าต้นทางตั้งชื่อภาพไว้
       ชื่อภาพจะพิมพ์ให้เห็นอยู่หน้าชื่อผู้สร้างสรรค์ */
    sampleTag: 'ภาพตัวอย่าง',
    sampleLabel: 'ภาพตัวอย่าง · ไม่ใช่ภาพจากร้าน',
    sampleLicence: (licence) => `ใช้ตามสัญญาอนุญาต ${licence}`,
    sampleTitle: (title) => `“${title}” `,
    sampleBy: (creator) => `ภาพโดย ${creator}`,
    sampleCropped: 'ครอบตัดและย่อขนาดจากภาพต้นฉบับ',
    sampleSameLicence: 'ภาพที่ครอบตัดแล้วนี้เผยแพร่ภายใต้สัญญาอนุญาตเดียวกัน',
    sampleCap(s) { return [this.sampleLabel, this.sampleLicence(s.licence), s.creator ? (s.title ? this.sampleTitle(s.title) : '') + this.sampleBy(s.creator) : null, s.creator ? this.sampleCropped : null, s.shareAlike ? this.sampleSameLicence : null].filter(Boolean).join(' · '); },
    markNote: 'ตราและลายพิมพ์ของร้านที่เห็นในภาพนี้ ไม่ได้ถูกลบ ตัดผ่าน หรือตกแต่งแก้ไข',
    markNoteOther: 'เครื่องหมายทุกอย่างที่เห็นในภาพนี้ ไม่ได้ถูกลบ ตัดผ่าน หรือตกแต่งแก้ไข',
    /* ข้อความเดียวใช้ได้ทั้งกับภาพที่ร้านโพสต์เองและภาพของคนอื่น */
    studioIdNote: 'O2 Design Studio จับคู่ภาพนี้กับรายการนี้จากสิ่งที่เห็นในภาพ ผู้ที่เผยแพร่ภาพไม่ได้ระบุชื่อรายการไว้',
    venueCap: (credit) => `ด้านหน้าร้าน · ภาพที่ร้านเผยแพร่เอง${credit ? ' · ' + credit : ''} · ร้านยังไม่ได้ให้อนุญาต`,
    allCats: 'หมวดหมู่ทั้งหมด',
  },
  en: {
    details: 'Details', detailsFor: (n) => `See details for ${n}`,
    from: (p) => `From ${p}`,
    historical: 'Historical price · not verified by the restaurant',
    disagree: 'Sources give different prices · not verified',
    disagreeOption: 'Sources disagree on the options · not verified',
    /* An item with no price says only what is always true of it: O2 has no confirmed price. It does not say
       that no printed price exists, because for some items the restaurant's own printed page or poster shows
       one; those items say so in their own words (menu.json: pendingNote, pendingLong). */
    pending: 'Price to be confirmed', pendingNote: 'O2 has no confirmed price for this item',
    pendingLong: 'O2 Design Studio has no confirmed price for this item. It has to be confirmed with the restaurant.',
    choices: 'Choices available',
    results: (q, n) => `Results for “${q}” · ${n}`,
    none: (q) => `Nothing on the menu matches “${q}”`,
    noneHelp: 'Try a shorter name or the other language.',
    clearAction: 'Clear search',
    /* Counted by who OWNS the photograph, not by who pressed the shutter: the printed-menu frames
       are the restaurant's own menu pages, captured by a Wongnai member. Samples are a third
       group, counted apart: they are not photographs of the restaurant's food or drink. */
    counts: (n, own, other, samples) => `${n} items · ${own} photographs the restaurant owns${other ? ` · ${other} owned by other people` : ''}${samples ? ` · ${samples} sample images, not from the restaurant` : ''}`,
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
      'design-study-only': 'Recorded only in O2’s earlier design study',
      unknown: 'Current status unknown',
    },
    lastSeen: (d) => `Last seen in a source dated ${d}`,
    lastSeenUndated: 'Last seen in a source that carries no date',
    photoCap: (ch, credit) => `${credit ? credit + ' · ' : ''}published by the restaurant on its own ${ch === 'instagram' ? 'Instagram' : 'Facebook'} · the restaurant has not given written permission`,
    /* The member who photographed the menu page is not named: a Wongnai member, and no more. */
    printedMenuCap: () => 'The restaurant’s own printed-menu photograph, captured from the printed menu by a Wongnai member · the restaurant did not post this image itself · the restaurant has not given written permission',
    /* The card is the restaurant's; who put it on Google was not recorded, so it is not called a post by the restaurant. */
    menuCardCap: () => 'The restaurant’s own menu card, as found on its Google listing · who uploaded it to Google was not recorded · the restaurant has not given written permission',
    /* A photograph someone else owns. The source platform only — no member name, no handle.
       'wongnai-upload' is a photograph a Wongnai member uploaded where it is not established whether that
       member is the restaurant or its photographer. Its line does not say the restaurant did not post it:
       that is not known. It says what is known. */
    thirdPartyCap: (sourceKind) => `${({ 'wongnai-member': 'Photograph by a Wongnai member', 'wongnai-upload': 'Photograph uploaded to Wongnai by a member', 'lemon8-creator': 'Photograph by a Lemon8 creator', 'pantip-member': 'Photograph by a Pantip member', blog: 'Photograph from a review blog' })[sourceKind] || 'Photograph owned by someone else'} · ${sourceKind === 'wongnai-upload' ? 'whether the restaurant or someone else owns it has not been established · its owner’s' : 'not posted by the restaurant · the photographer’s'} permission has not been obtained`,
    /* A sample. The label is a fixed string, and a sample is never shown without it. The creator is
       printed only where the licence asks for attribution, and where the source gives the work a title,
       the title is printed, as words, in front of the creator. */
    sampleTag: 'Sample',
    sampleLabel: 'Sample image — not from the restaurant',
    sampleLicence: (licence) => `used under the ${licence} licence`,
    sampleTitle: (title) => `“${title}”, `,
    sampleBy: (creator) => `photo by ${creator}`,
    sampleCropped: 'cropped and resized from the original',
    sampleSameLicence: 'this cropped copy is offered under the same licence',
    sampleCap(s) { return [this.sampleLabel, this.sampleLicence(s.licence), s.creator ? (s.title ? this.sampleTitle(s.title) : '') + this.sampleBy(s.creator) : null, s.creator ? this.sampleCropped : null, s.shareAlike ? this.sampleSameLicence : null].filter(Boolean).join(' · '); },
    markNote: 'No logo or branding print in this photograph has been removed, cut through or retouched.',
    markNoteOther: 'No mark in this photograph has been removed, cut through or retouched.',
    /* One wording, true of a post by the restaurant and of someone else's photograph alike. */
    studioIdNote: 'O2 Design Studio matched this photograph to the item by what it looks like; whoever published the photograph did not name the item.',
    venueCap: (credit) => `The shopfront, published by the restaurant${credit ? ' · ' + credit : ''} · the restaurant has not given permission`,
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

/* ── search (the same normalise and match rules as the studio's ordering demo) ── */

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
    /* The usual line says only that O2 has no confirmed price. Where menu.json records that the restaurant's
       own printed page or poster shows a figure which the catalogue has not taken in, the item says that
       instead: what the print reads, where it was seen, and that the restaurant has not confirmed it. */
    wrap.appendChild(el('span', 'price__note', (lang === 'th' ? p.pendingNoteTh : p.pendingNoteEn) || t().pendingNote));
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

/* The thumbnail honours the framing menu.json carries for the square card box, so a mark
   recorded for a photograph (a logo, a watermark, the restaurant's own print) is never framed
   away: a photograph whose mark cannot survive a square crop falls back to contain on the
   second ground, exactly as the studio's ordering demo does. */
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
  if (image.provenanceKind === 'sample') {
    /* A sample is never shown bare: the thumbnail itself says so, in words. Hidden from assistive
       technology, because the alt text opens with the same words and the card line repeats them. */
    const tag = el('span', 'card__thumb-tag', t().sampleTag);
    tag.setAttribute('aria-hidden', 'true');
    box.appendChild(tag);
  }
  return box;
}

/* Alt text comes from the catalogue. Were one ever missing, a photograph of the item falls back to
   the item's name. A sample never does — it is not a picture of that item — and says what it is. */
const altOf = (image, itemName) => (lang === 'th' ? image.altTh : image.altEn)
  || (image.provenanceKind === 'sample' ? t().sampleLabel : itemName);

/* The only links this page builds from menu.json: a sample's licence and, where the licence asks
   for attribution, the photograph's own page. https only, always in a new tab, with no opener and
   no referrer. Anything that is not an https address is printed as plain text. */
function linkNode(text, url) {
  if (typeof url !== 'string' || !/^https:\/\/[^\s]+$/.test(url)) return document.createTextNode(text);
  const a = el('a', null, text);
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

/* The provenance line of a photograph, chosen in one place by the kind menu.json records for it.
   A printed-menu capture or the menu card is never described as something the restaurant posted,
   a photograph someone else owns is never described as the restaurant's, and a sample is never
   described as a photograph of the restaurant's food. None of these names a private person. */
function provLine(image) {
  const kind = image.provenanceKind;
  if (kind === 'sample') return t().sampleCap(image.sample);
  if (kind === 'third-party') return t().thirdPartyCap(image.sourceKind);
  if (kind === 'printed-menu') return t().printedMenuCap();
  if (kind === 'menu-card') return t().menuCardCap();
  return t().photoCap(image.posted, image.credit);
}

/* A sample's caption says the same words as provLine(), built piece by piece so that the licence
   and — only where the licence asks for attribution — the creator can be links. The label comes
   first, always. Where the source gives the work a title, the title is printed as words in front of
   the creator: a title kept only as a link's tooltip is never seen on a phone. */
function sampleCapNode(sample) {
  const cap = el('figcaption', 'cap--sample');
  cap.appendChild(el('strong', 'cap__label', t().sampleLabel));
  cap.append(' · ', linkNode(t().sampleLicence(sample.licence), sample.licenceUrl));
  if (sample.creator) {
    cap.append(' · ');
    if (sample.title) cap.append(t().sampleTitle(sample.title));
    cap.append(linkNode(t().sampleBy(sample.creator), sample.sourceUrl));
    cap.append(' · ', t().sampleCropped);
  }
  if (sample.shareAlike) cap.append(' · ', t().sampleSameLicence);
  return cap;
}

/* Every photograph on this page carries a provenance line, and the browse view is where most
   visitors meet it — so a photograph the restaurant does not own says so ON THE CARD, in the same
   words the dialog uses, not only behind a tap: a sample carries its label, and a photograph
   someone else owns carries its platform line. An identification the record calls unconfirmed
   says that here too, because the thumbnail is what implies "this is the dish" — and it says so
   on a photograph the restaurant owns as well, which otherwise carries no line on its card. */
function cardProvNode(image) {
  if (image.provenanceKind === 'sample') return el('p', 'card__prov card__prov--sample', t().sampleLabel);
  const short = lang === 'th' ? image.idCaveatShortTh : image.idCaveatShortEn;
  if (image.provenanceKind !== 'third-party') return short ? el('p', 'card__prov', short.charAt(0).toUpperCase() + short.slice(1)) : null;
  const line = t().thirdPartyCap(image.sourceKind) + (short ? ` · ${short}` : '');
  return el('p', 'card__prov', line);
}

function cardNode(item, withCategoryLine) {
  const card = el('article', 'card');
  card.dataset.itemId = item.id;
  const names = nameOf(item);
  if (item.image) card.appendChild(thumbNode(item.image, altOf(item.image, names.primary)));
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
  if (item.image) {
    const prov = cardProvNode(item.image);
    if (prov) body.appendChild(prov);
  }
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
    img.alt = altOf(item.image, names.primary);
    fig.appendChild(img);
    /* The caption says where the photograph came from: provLine() for a photograph of the item,
       and for a sample the same words with its label first and its licence linked. */
    const kind = item.image.provenanceKind;
    const cap = kind === 'sample' ? sampleCapNode(item.image.sample) : el('figcaption', null, provLine(item.image));
    /* Matched to the item by what it looks like: said of a post by the restaurant and of someone
       else's photograph in the same words. */
    if (item.image.identifiedByStudio) cap.appendChild(el('span', 'cap__note', t().studioIdNote));
    /* An identification the catalogue itself calls unconfirmed gets the record's own words, not the
       milder "matched on appearance" note: the appearance is what contradicts this one. */
    const caveat = lang === 'th' ? item.image.idCaveatTh : item.image.idCaveatEn;
    if (caveat) cap.appendChild(el('span', 'cap__note', caveat));
    for (const note of item.image.notes || []) cap.appendChild(el('span', 'cap__note', lang === 'th' ? note.th : note.en));
    /* Where the crop leaves out a mark or a caption that sits elsewhere in the original frame, the
       caption says exactly that, in place of the "no mark was removed" note, which would not be
       true of it. The restaurant's own wording is kept for the restaurant's own photographs. */
    const ownFrame = kind === 'restaurant-post' || kind === 'printed-menu' || kind === 'menu-card';
    const cropNote = lang === 'th' ? item.image.cropNoteTh : item.image.cropNoteEn;
    if (cropNote) cap.appendChild(el('span', 'cap__mark', cropNote));
    else if (item.image.hasMark) cap.appendChild(el('span', 'cap__mark', ownFrame ? t().markNote : t().markNoteOther));
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
  if (item.price.kind === 'pending') price.appendChild(el('p', null, (lang === 'th' ? item.price.pendingLongTh : item.price.pendingLongEn) || t().pendingLong));
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
  /* A sighting whose "date" is a sentence rather than a date (the catalogue carries
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
  /* Counted apart, because they are not the same thing: the photographs the restaurant owns (the
     shopfront among them), the ones other people own, and the sample images, which are not
     photographs of the restaurant's food or drink at all. */
  const kinds = data.items.filter((i) => i.image).map((i) => i.image.provenanceKind);
  const other = kinds.filter((k) => k === 'third-party').length;
  const samples = kinds.filter((k) => k === 'sample').length;
  const own = kinds.length - other - samples + (data.venue ? 1 : 0);
  $('[data-count-line]').textContent = t().counts(data.items.length, own, other, samples);
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

/* The most of the window the header stack may hold while it stays pinned. */
const STICKY_SHARE = 0.4;

function measureSticky() {
  const stack = $('[data-sticky-stack]');
  const notice = $('.notice');
  const set = () => {
    const root = document.documentElement.style;
    const height = Math.round(stack.getBoundingClientRect().height);
    /* With text enlarged on a phone the group buttons wrap and the stack grows past half the window, leaving
       the reader less than half the screen for the menu. Past its share the stack is released: it scrolls
       away with the page like any other header (style.css), and nothing is then pinned above the menu. Its
       height is the same pinned or released, so this cannot flip back and forth. */
    const released = height > window.innerHeight * STICKY_SHARE;
    stack.toggleAttribute('data-released', released);
    root.setProperty('--sticky-top', `${released ? 0 : height}px`);
    /* On wide screens the notice panel stays beside the menu. Its height lets the stylesheet hold a
       panel that is taller than the window by its foot, so its last lines — the sample images, the
       date and the counts — can always be scrolled into view. */
    root.setProperty('--notice-h', `${Math.ceil(notice.getBoundingClientRect().height)}px`);
  };
  set();
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(set);
    observer.observe(stack);
    observer.observe(notice);
  }
  /* The window's height is half of the share above, and a change in it alone resizes neither box. */
  window.addEventListener('resize', set);
}

function wire() {
  for (const btn of document.querySelectorAll('[data-set-lang]')) {
    btn.addEventListener('click', () => setLang(btn.dataset.setLang));
  }
  $('[data-search-open]').addEventListener('click', openSearch);
  /* The search field filters as you type; Enter must not submit the form. A listener, not an
     inline handler: the page's Content-Security-Policy allows no inline script. */
  $('[data-searchbar]').addEventListener('submit', (ev) => ev.preventDefault());
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
