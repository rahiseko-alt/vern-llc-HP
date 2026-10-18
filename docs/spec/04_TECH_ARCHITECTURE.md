# 04 — Technical Architecture

## Recommended stack

- React + TypeScript
- GSAP
- GSAP SplitText（文字単位の制御が必要な場所だけ）
- Three.js（限定）
- CSS transforms / masks / custom properties
- Lenis（必要時のみ）

## DOM vs WebGL

### DOMでやるもの
- 全本文
- ナビゲーション
- 見出し
- semantic word flip
- typewriter
- category table
- accessibility-sensitive text

### WebGLを使ってよいもの
- 背景原稿の微細なparallax / displacement
- heroのごく一部のdepth表現
- masked revealでCSSでは足りない場合
- texture transition

### WebGLにしないもの
- 全本文
- 全リンク
- 全UI
- 全見出し

理由:
- text renderingの鮮明さ
- SEO
- accessibility
- selection / copy
- responsive
- 実装保守性

## Performance budget

- target: 60fps desktop
- DPR cap: 1.5〜2.0
- pointermove内でlayout read/writeを乱発しない
- transforms + opacity中心
- requestAnimationFrameで集約
- `will-change`は常用しない
- offscreen animationを止める
- `document.visibilityState === 'hidden'` ならrAF / WebGLを休止
- resize処理はdebounce

## Pointer strategy

`pointermove`の座標は一度だけ取り、各effectは共通stateを読む。
各コンポーネントが別々にdocumentへpointermoveを登録しない。

## Reduced motion

必須:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

JS側でも `matchMedia('(prefers-reduced-motion: reduce)')` を見る。

## Touch / mobile

hover前提にしない。

- flip: tap / focus
- lift: mobileでは無効化可
- ink reveal: scrollで固定表示 or tapでtoggle
- typewriter: 同じ

## SplitText usage

- `document.fonts.ready` 後にsplit
- 必要なら `autoSplit: true`
- `aria`を壊さない
- 文字数が多い本文を全部chars分割しない

## Accessibility

- semantic HTML
- visible focus
- pointer interactionにはkeyboard equivalentを用意
- split textは元の読み上げ文を維持
- color contrastを確保
- hoverだけで重要情報を隠さない

## Smooth scroll

Lenisは「使えば高級になる」ものではない。
スクロール同期が必要な場合のみ。

- native scrollで問題なければ使わない
- scroll-jackingはしない
