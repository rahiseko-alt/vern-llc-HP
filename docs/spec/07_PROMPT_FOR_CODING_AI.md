# 07 — Prompt for Coding AI

以下をそのままコーディングAIへ渡す。

---

あなたは高品質なインタラクティブWebサイトを実装するシニア・クリエイティブデベロッパーです。

## Goal

テキスト主体の1ページサイトを実装してください。
静止時は18世紀の思想書・古い学術印刷物・editorial designのように見え、ユーザーが触れた瞬間だけ非常に滑らかな現代的モーションが現れます。

このサイトは「レトロWeb」ではありません。
**古い印刷物 + 2026年水準のタイポグラフィインタラクション**です。

## Visual foundation

カントの以下3資料をデザイン言語として使う。

1. 1781年『Critik der reinen Vernunft』の Tafel der Categorien
2. Opus postumum の自筆原稿
3. 1781年初版タイトルページの組版・余白

カントの肖像は主役にしない。
カテゴリー表の4分類（Quantity / Quality / Relation / Modality）をグリッド構造へ変換する。

## Required interactions

### A. Semantic word flip
`REASON` にhover/focusすると、文字面が3Dで回転して `VERNUNFT` になる。
戻すと自然にREASONへ戻る。
派手な360°回転は禁止。

### B. Typewriter
terminal表現ではなく、活字が一字ずつ組まれるようなタイプ表示。
一度だけ再生。

### C. Pointer proximity lift
見出しを文字単位に分割し、カーソルに近い文字ほど滑らかに持ち上がる。
周囲の文字も距離に応じてなだらかに追従。
1文字だけが飛び出す雑なhoverは禁止。

### D. Ink reveal
薄く見えている文章へカーソルを近づけると、周辺だけインクが定着するように鮮明になる。
光るspotlightにはしない。

### E. Category interaction
Quantity / Quality / Relation / Modality の4列。
hover/focusした列の罫線と3項目だけが静かに立ち上がる。

### F. Optional WebGL
背景の自筆稿にごく弱い奥行き・parallax・displacementを与えてよい。
WebGLを使うために使わない。

## Tech

- React + TypeScript
- GSAP / SplitText 使用可
- CSS 3D transforms 使用可
- Three.js / WebGL 使用可
- Lenis 使用可。ただし必要な場合のみ

**本文と主要テキストはDOMのままにする。**
サイト全体をcanvasにしない。

## Motion quality

- target 60fps
- transform / opacity中心
- easingを丁寧に
- pointermoveはrAFへ集約
- touchではhover依存を解除
- prefers-reduced-motion対応
- keyboard focusでも同じ意味が得られる

## Visual rules

- off-white paper
- black / charcoal ink
- thin rules
- wide margins
- editorial serif + neutral sans
- tiny metadata / roman numerals / marginal notes
- low saturation
- no generic UI cards

## ABSOLUTE STOP LIST

以下を1つでも主要表現として入れたらやり直し。

- neon
- cyberpunk
- glitch
- VHS
- CRT
- terminal green
- Windows 95
- pixel art
- GeoCities
- blue-purple AI gradients
- rounded SaaS cards
- giant gradient blobs
- brutalist-for-the-sake-of-it huge sans
- heavy sepia / torn paper / antique cosplay
- Kant portrait hero
- excessive custom cursor
- scroll-jacking
- endless marquees
- every element moving
- fake Kant quotes
- meaningless German text

## Core principle

**Print first. Motion second.**

静止画にしたとき、美しく編集された思想書・研究誌として成立すること。
動きは意味を追加するためだけに使う。

まず1ページ完成させ、モーションを止めた状態でも成立することを確認してからエフェクトを追加してください。
