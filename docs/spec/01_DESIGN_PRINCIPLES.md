# 01 — Design Principles

## 1. Print first, motion second

画面をスクリーンショットにしても成立すること。
モーションを全部止めても、美しい紙面・誌面・思想書として成立しなければ失敗。

## 2. Kant = portrait ではなく system

カントの顔を大きく出して「哲学者サイト」にしない。
使うのは以下の3つ。

1. **Tafel der Kategorien（カテゴリー表）**
   - Quantity / Quality / Relation / Modality
   - 4分類 × 3項目という構造をページグリッドへ変換する
2. **自筆原稿**
   - 思考の痕跡として、背景にごく薄く使う
3. **1781年『Critik der reinen Vernunft』初版**
   - 活版・余白・組版・タイトルページの静けさを参照する

## 3. Motion must have semantics

動く理由を必ず持たせる。

- `REASON` → hover → `VERNUNFT`
  - 英語 → ドイツ語へ「概念の裏面」を見せる
- `STRUCTURE` → hover → カテゴリー表の罫線が浮く
  - 構造という言葉と構造図を結ぶ
- ぼやけた文 → pointer proximity → 読める
  - 「認識する」という体験に変える

単なる「格好いいから回す」は禁止。

## 4. Stillness is a feature

常時動かさない。
初期画面は静かでよい。
ユーザーが触れたところだけ反応する。

**常時アニメーションは最大1〜2個。**

## 5. Retro is typographic, not nostalgic UI

レトロ感は以下から作る。

- 紙色
- 活版的な黒
- serif / grotesk の組み合わせ
- 余白
- 罫線
- 字間
- 小さな番号
- 注釈
- 原稿断片

以下から作らない。

- Windows 95 UI
- CRT
- ピクセルフォント
- VHS
- グリッチ
- ターミナル

## 6. Interaction density must be low

1画面に全ての仕掛けを置かない。

推奨:
- Hero: flip + typewriting
- Category section: proximity lift
- Manifesto: hover reveal
- Footer: manuscript / title-page response

各セクションに「主役の動き」を1つだけ置く。

## 7. Quality bar

モーションは「見せる」より「感じる」。
ユーザーがエフェクトを意識する一歩手前で止める。

- easingは自然
- over-shootは最小
- blurは少量
- 影は薄い
- 3D回転は90°〜110°程度
- hover解除時の戻りを雑にしない
