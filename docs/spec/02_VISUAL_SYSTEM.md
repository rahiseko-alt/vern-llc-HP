# 02 — Visual System

## Palette

推奨初期値:

```css
--paper: #F1EEE5;
--paper-2: #E8E3D8;
--ink: #181816;
--ink-soft: #4E4A43;
--rule: rgba(24, 24, 22, 0.20);
--ghost: rgba(24, 24, 22, 0.08);
--accent: #7A1F1A; /* 必要な場合のみ。深い赤。 */
```

基本は **紙 / 黒 / 灰**。
アクセント色は1色まで。

## Typography

### Heading
- narrow serif または editorial serif
- 高コントラスト過ぎない
- uppercaseを使いすぎない

### UI / metadata
- neutral grotesk / sans
- 10〜13px
- letter-spacing: 0.06em〜0.14em

### Body
- serifでもsansでもよいが、長文は読みやすさ優先
- 16〜20px
- line-height 1.55〜1.75

## Layout

カントのカテゴリー表をレイアウトの骨格へ転用する。

Desktop:
- 12 columns
- 4 super-columns × 3 columns
- gutterは細め
- outer marginは広い

Mobile:
- 4 columns
- 4カテゴリーを縦方向に読む

## Rules / lines

線はUIボックスの枠ではなく「印刷物の罫線」として使う。

- 1px以下
- alpha 0.12〜0.25
- hover時だけ濃くなるのは可

## Manuscript texture

背景の自筆原稿は「読ませない」。

- opacity 0.03〜0.10
- mix-blend-modeは慎重に
- blur 0〜1px
- cropして使う
- 画面全面に敷かない

## 1781 title-page motif

そのまま画像カードにしない。
以下を抽出して再構成する。

- タイトルの階層
- 中央揃え
- 大きい余白
- 小さな出版情報
- 細い罫線
- 書誌情報の静けさ

## Micro typography

以下は積極的に使う。

- `01`, `02`, `03`
- `A / B / C`
- Roman numeral `I II III IV`
- small caps
- marginalia風の注釈
- `1724 — 1804`

ただし、偽ラテン語や意味のないダミーテキストは禁止。
