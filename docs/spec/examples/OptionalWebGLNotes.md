# Optional WebGL Notes

Three.jsは「文字を全部3D化するため」ではなく、DOMの後ろに1枚だけ置く補助レイヤーとして扱う。

## 良い用途

- 自筆原稿テクスチャの微細なdisplacement
- pointerに対する1〜3px相当のparallax
- very subtle paper-light response
- section transitionのtexture dissolve

## 推奨構成

- `<canvas>` を fixed / absolute 背景に置く
- DOM contentはcanvasより上
- `pointer-events: none`
- DPRを最大1.5〜2へ制限
- IntersectionObserverで対象section外ではrenderを止める
- `prefers-reduced-motion` なら静止画像にfallback

## 避ける

- TextGeometryで本文を全部生成
- heavy post-processing
- bloom
- glitch pass
- chromatic aberration
- 3D camera fly-through

WebGLがオフでもサイトの意味・情報が100%残る構造にする。
