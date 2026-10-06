# Rosebay menu study

A static, reading-only menu page for **Rosebay Home Cooking & Café**, designed by
[O2 Design Studio](https://o2-designstudio.com/) as an independent design study.

**It is not the restaurant's ordering system.** Nothing on the page can be ordered, there is no
cart, and no order is ever sent anywhere. The page is `noindex, nofollow`.

## What it is built from

The dishes, drinks and options were transcribed from the restaurant's publicly posted menu
photographs (2021–2025), from articles and reviews, and from its own social posts. Every
item records where it came from. Prices are **historical** values read off those photographed
menus; the restaurant has not confirmed them, and an item for which the studio has no confirmed price
says so. Five items give a figure the restaurant has printed and the studio has not yet taken into
its records: the longan drink on a printed drinks page, and four matcha drinks on the printed
posters on the café wall. Each entry gives the figure, says where it was seen and says it is
unconfirmed. The page gives no other figure for an item with no confirmed price, though the
studio's records hold a few more (see [NOTICE.md](NOTICE.md)).

## Photographs — three kinds, and the rights differ

Read this before reusing anything here. The page shows 59 photographs: one for each of its 58 items,
and the shopfront.

- **27 photographs are Rosebay's own**: 15 the restaurant published itself on its Instagram or
  Facebook, 11 are its own printed-menu photography, photographed from the printed menu book by
  Wongnai members, and 1 is its own menu card from its Google listing. **The restaurant's written
  permission is still outstanding.**
- **13 photographs belong to other people.** They show Rosebay's food and drink, were found on
  Wongnai, Lemon8, Pantip and review blogs, and are published here for this demonstration without
  their owners' permission. Each one carries a caption naming the kind of source and saying that the
  restaurant did not post it and that its owner's permission has not been obtained.
  For two of the 13, uploaded to Wongnai by one member, it is not established whether they are the
  restaurant's own; they are recorded as other people's, and their captions say that instead.
- **19 photographs are sample images** from free-licence photo libraries. Sample images do not show
  Rosebay's food or drink; each stands in where the studio has no photograph of the item at Rosebay
  that it can show. For 15 of the 19 the studio found no photograph of the item at Rosebay; for
  three it found something it could not use (a picture too small to show, or photographs that more
  likely show a different drink); and for one, the Thai iced tea, a photograph was found and is held
  back, because the drink cannot be shown without cropping out the mark its creator put on the
  picture.
  Every one is labelled "ภาพตัวอย่าง · ไม่ใช่ภาพจากร้าน" / "Sample image — not from the restaurant"
  on its menu card and in its caption, is tagged "Sample" on its thumbnail, and has a file name
  beginning `sample-`. Each was cropped, resized and re-encoded for the web, with its file metadata
  removed; nothing in the picture was retouched. Each is used under its own licence; the list, with
  source pages, licences and credits, is in [NOTICE.md](NOTICE.md).
- **No private person is named in the text** of these files: the captions say "a Wongnai member",
  "a Lemon8 creator", "a Pantip member" or "a review blog" and no more. The one exception is the
  creator of a sample whose licence requires attribution, who is named with the licence because the
  licence asks for it. The pictures themselves are a separate matter: two of other people's
  photographs show the Lemon8 handle their creator burnt into the picture, and one shows an
  uploader's monogram. Those are marks, and they are kept whole (see [NOTICE.md](NOTICE.md)).
- Inside the part of each photograph that is shown, no logo, watermark or other mark has been
  removed, cut through or retouched. In three photographs the crop leaves out something that sits
  elsewhere in the original frame (a caption its photographer typed into the picture; a small
  watermark on a sample whose licence asks for no credit; the logo band of the restaurant's own menu
  card), and each of those says so in its details. That sample apart, a handle, watermark or
  signature that a photograph's creator or uploader put on it is never left out by a crop: a
  photograph that cannot be shown with it whole is not used. Most of the photographs
  are cropped to the food or drink. In the eleven printed-menu photographs the crop leaves out the
  page headings and the names and prices printed beside the photographs, and in three of them it
  also leaves out a dish name or a price printed inside the photograph.

The restaurant's name and marks are its own. If you are Rosebay, or one of these photographs is
yours — a sample image included — and you want it taken down, write to O2 Design Studio and it comes
down.

## Running it

It is plain HTML, CSS and one script with a JSON payload — serve the folder with any static file
server. Opened from disk in Chromium the menu does not load, because the script fetches `menu.json`
and Chromium does not fetch `file://` URLs.

```
index.html · style.css · app.js · menu.json · img/
```

The page carries a Content-Security-Policy that allows only its own files: one stylesheet, one
script, its images and `menu.json`. It loads nothing from any other site.

Built from O2 Design Studio's private research catalogue.

> **Rights:** none of the photographs is O2's. Rosebay's own and other people's are shown without permission; the sample images are used under their licences. Read [NOTICE.md](NOTICE.md) before reusing anything here.
