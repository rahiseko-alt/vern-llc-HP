# 03 — Interaction Specification

## Interaction A — Semantic 3D Word Flip

### 目的
一つの概念に裏面があることを示す。

### 例
- REASON → VERNUNFT
- FORM → FORMALISM ではなく、意味の関係がある組を使う

### 動作
- pointer enter: 0° → 90° → 裏面へ
- pointer leave: reverse
- 3D perspectiveは浅すぎず深すぎず
- 0.45〜0.7秒
- ease: power3.inOut 相当

### 禁止
- slot machine風
- 360°回転
- bounce
- neon glow

---

## Interaction B — Typewriter, but not terminal

### 目的
「入力UI」ではなく、活字が一文字ずつ組まれる感覚。

### 動作
- 文字出現間隔: 25〜55ms
- cursorは `|` ではなく細い縦罫または活字ブロック風でもよい
- 1回だけ再生
- 完了後にカーソル点滅を延々続けない

### 禁止
- terminal green
- monospace固定
- console風

---

## Interaction C — Pointer Proximity Lift

### 目的
カーソル周辺だけ文字が紙面からわずかに持ち上がる。

### 推奨モデル
距離 `d` に対してガウス関数で影響を計算する。

`influence = exp(-(dx²/sx² + dy²/sy²))`

### 目安
- max translateY: -0.24em〜-0.34em
- rotateZ: ±4°〜7°
- shadow: 非常に薄い
- duration follow: 0.3〜0.5s

文字1個だけが飛び出すのではなく、周囲が丘のように続く。

---

## Interaction D — Ink Reveal

### 目的
マウスが通った場所だけ、薄い文章が読めるようになる。

### 方式
- DOM text + CSS mask / radial gradient
- または WebGL mask

### 見え方
初期: opacity 0.08〜0.18 / blur 1〜3px
pointer近傍: opacity 0.75〜1 / blur 0

### 禁止
スポットライトのように明るく光らせない。

---

## Interaction E — Categories Awake

### 目的
カテゴリー表を静的な図表ではなくインタラクティブな構造として見せる。

### 動作
4列:
- Quantity
- Quality
- Relation
- Modality

hoverした列のみ:
- 罫線が少し濃くなる
- 3項目が数px浮く
- micro textが現れる

他列は消さない。
比較できる状態を維持する。

---

## Interaction F — Manuscript Depth (optional WebGL)

### 目的
背景の自筆稿にわずかな奥行きを与える。

pointerに応じて:
- 1〜4px parallax
- 0.2〜0.8°程度のtilt
- 非常に弱い displacement

**主役にしない。**
「動いていると気づく」より「なぜか紙面に奥行きがある」と感じる程度。

---

## Motion hierarchy

優先順位:
1. semantic word flip
2. proximity lift
3. ink reveal
4. typewriter
5. background depth

全部同時に走らせない。
