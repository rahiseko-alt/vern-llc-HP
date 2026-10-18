# 06 — References

確認日: 2026-10-18

## A. Web / interaction references

### 1. Editorial New — Pangram Pangram + Locomotive
https://www.editorialnew.com/

**最重要。**
70〜90年代広告・editorial感と現代Web interactionの接合。
参考にするもの:
- retro-contemporary typography
- variable type
- 余白
- micro interaction
- 「フォント自体をコンテンツにする」考え方

コピーしないもの:
- サイト固有の派手なshowcase演出

---

### 2. WIM & CO — PLAYGROUND
https://wimco.se/playground/

参考にするもの:
- hover acceleration
- draggable type
- gravity return
- pointer ripple
- 文字を“物理オブジェクト”のように扱う滑らかさ

本案件では見た目を真似せず、**motion mechanicsだけ**参照。

---

### 3. Marga Navarro
https://www.itsmarga.me/
https://www.itsmarga.me/craft-whims

参考にするもの:
- small interactionの精度
- interactionがデザイン思想と一致していること
- minimal surface + unexpected response
- cursor / word morph / reveal系

---

### 4. HIGASHIYUKI — Text Hover Lift
https://higashiyuki.com/interaction/text-hover-lift/

技術参考。
文字中心との距離を使い、ガウス関数で周辺文字まで滑らかに持ち上げる実装例。
GSAP + SplitText。

---

### 5. HOVERSTAT.ES
https://www.hoverstat.es/
https://www.hoverstat.es/about/

alternative / experimental web design archive。
検索・閲覧キーワード:
- typography
- transitions
- 3D
- publishing
- monochrome
- interaction

特に参考になる方向:
- Ballet National de Marseille: circular / looping 3D title
- Kunstverein Siegen: variable-type stretch/squash transitions
- c0da.org: printed-file / email-chain feeling

---

## B. Technical references

### GSAP SplitText
https://gsap.com/docs/v3/Plugins/SplitText/

注目:
- chars / words / lines splitting
- accessibility
- autoSplit
- mask reveal
- responsive re-splitting

### Three.js examples
https://threejs.org/examples/
https://threejs.org/examples/?q=shader

WebGL / shader / post-processingの参考。

### Three.js — Creating Text
https://threejs.org/manual/pages/creating-text.html

重要:
Three.js公式でも、説明用テキストはDOM/HTMLが最も簡単で高速な方法として案内されている。
本案件でも本文をWebGL化しない根拠。

### Lenis
https://github.com/darkroomengineering/lenis

WebGL同期等で必要な場合のみ。

---

## C. Kant primary / archival references

### 1. 1781『Critik der reinen Vernunft』カテゴリー表
Wikisource scan page:
https://de.wikisource.org/wiki/Seite:Kant_Critik_der_reinen_Vernunft_080.png

ここに実際の `Tafel der Categorien` がある。
Quantity / Quality / Relation / Modality の元資料。

### 2. BBAW Kant Edition — three Critiques
https://kant.bbaw.de/de/abt-i/die-drei-kritiken

1781年初版・1787年第2版のデジタル画像への案内。

### 3. Opus postumum — BBAW
https://kant.bbaw.de/de/abt-iii/opus-postumum
https://telota.bbaw.de/kant_op/edition.html

カント自筆原稿のファクシミリと転写。
背景テクスチャ / manuscript motifの一次資料。

## Usage note

一次資料画像を本番サイトにそのまま掲載する場合は、各所蔵機関・画像提供元の利用条件を個別確認すること。
デザインモチーフとして構造・組版を参照することと、画像そのものの再配布は別問題。
