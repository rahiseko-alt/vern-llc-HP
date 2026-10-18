# Kant-inspired Typographic Website — Handoff Pack

最終更新: 2026-10-18

## 目的

テキスト主体の1ページサイトを作る。
静止状態では18世紀の印刷物・古書・学術資料のように見え、ユーザーが触れた瞬間だけ2026年のWebらしい高品質なモーションが立ち上がる。

**コンセプト:**
> Print first. Motion second.
> 静止画として成立する。触ると意味がもう一層現れる。

## 最重要方針

- 「レトロWeb」ではない。
- 「古い印刷物 + 最新の文字インタラクション」である。
- カントの肖像画は主役にしない。
- カントの「カテゴリー表」「自筆原稿」「1781年初版タイトルページ」を設計言語に変換する。
- テキストエフェクトは装飾ではなく、意味の切替・階層・発見に使う。
- サイト全体をWebGLにしない。本文はDOM、WebGLは限定使用。

## ファイル構成

- `01_DESIGN_PRINCIPLES.md` — 設計思想
- `02_VISUAL_SYSTEM.md` — 色・文字・グリッド・資料の扱い
- `03_INTERACTION_SPEC.md` — 必須インタラクション仕様
- `04_TECH_ARCHITECTURE.md` — 技術構成・性能・アクセシビリティ
- `05_DO_NOT_BUILD.md` — 絶対にやめる表現
- `06_REFERENCES.md` — 参考サイト・カント一次資料
- `07_PROMPT_FOR_CODING_AI.md` — コーディングAIへそのまま渡せる指示
- `08_ACCEPTANCE_CHECKLIST.md` — 完成判定
- `examples/` — 実装パターン例

## 推奨スタック

- React + TypeScript
- CSS / CSS Modules / plain CSS
- GSAP + SplitText（必要箇所のみ）
- Three.js（限定使用）
- Lenis（本当に必要な場合のみ）

重要: Three.jsは本文レンダリングの主役にしない。DOMテキストを保ち、WebGLは背景・歪み・奥行き補助に限定する。
