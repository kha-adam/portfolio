---
title: Langbook
slug: langbook
wing: web
year: 2026
status: in-progress
plaque: "FastAPI, PostgreSQL, Vite. A textbook, its ink, and a gloss on the same page."
problem: "Reading a textbook in a language you are still learning means leaving the page for every line you cannot parse."
decision: "Keep ink in the PDF's own coordinates and draw it on a canvas, so a mark stays put when the scale changes and a pointer move does not redraw the book."
result: "The page, the notes, and a Russian-to-English gloss now stay together. OCR is Tesseract. Translation is LibreTranslate."
stack:
  - FastAPI
  - PostgreSQL
  - Vite
  - Tesseract
  - LibreTranslate
links:
  repo: https://github.com/kha-adam/langbook
featured: true
---

The library is a React list. The viewer is not. Strokes are stored in PDF user space and multiplied by the current scale when they are drawn, so ink survives zoom. A gloss is a crop of the page you are stuck on: Tesseract reads the Russian, LibreTranslate returns English, and the answer stays beside the sentence.
