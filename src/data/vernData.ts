/**
 * Vern LLC — site content.
 * Source: 事業・活動統合資料 (provided by the owner).
 * Rule: only statement + facts from the source. No invented numbers, names, dates or quotes.
 * Kant is used as structure only: the four headings and twelve category names of the
 * Tafel der Categorien (Critik der reinen Vernunft, Riga 1781, A 80 / B 106).
 */

export interface Faculty {
  note: string;
  german: string;
  ja: string;
  flipFront: string;
  flipBack: string;
  definition: string;
}

export interface PracticeMoment {
  num: string;
  kant: string;
  kantJa: string;
  title: string;
  detail?: string;
}

export interface PracticeDomain {
  id: string;
  numeral: string;
  kantHead: string;
  kantHeadJa: string;
  domain: string;
  status: "現在" | "展開予定";
  lead: string;
  moments: PracticeMoment[];
}

export interface RoadmapItem {
  label: string;
  title: string;
  text: string;
}

export const VERN = {
  company: {
    name: "Vern LLC",
    legal: "合同会社 Vern",
    status: "設立準備中（年明け予定）",
  },
  statement: {
    lead: "人間に、",
    mid: "と",
    tail: "を取り戻す。",
    body: "AIは、人間の知性や人間性を代替するものではない。人を機械的な処理から解放し、「何を見極め、何を成すか」という人間本来の力を取り戻すための道具である。",
    motto: "知性で今を捉え、意志で未来を創る。",
    origin: "社名の「Vern」は、カント哲学における二つの人間的能力に由来する。",
  },
  activity: "AI活動家として、教育・コミュニティ運営・開発・業務改善を横断して活動。",
  faculties: [
    {
      note: "i",
      german: "Verstand",
      ja: "知性",
      flipFront: "知性",
      flipBack: "VERSTAND",
      definition: "現実の構造を正しく捉え、理解する力。",
    },
    {
      note: "ii",
      german: "Vernunft",
      ja: "意志",
      flipFront: "意志",
      flipBack: "VERNUNFT",
      definition: "「どうあるべきか」を自ら問い、未来を決断する力。",
    },
  ] as Faculty[],
  domains: [
    {
      id: "foundation",
      numeral: "I",
      kantHead: "Der Quantität",
      kantHeadJa: "量",
      domain: "基盤「ゼロ番地」・資格",
      status: "現在",
      lead: "AI活用の前段階にある、アカウントとデータの土台をつくる。",
      moments: [
        {
          num: "01",
          kant: "Einheit",
          kantJa: "単一性",
          title: "業務用Googleアカウントの作成・固定",
        },
        {
          num: "02",
          kant: "Vielheit",
          kantJa: "数多性",
          title: "Chromeプロファイル分離",
          detail: "Googleドライブの整理と共有ルール化。",
        },
        {
          num: "03",
          kant: "Allheit",
          kantJa: "総体性",
          title: "Google 認定教育者 レベル1",
          detail: "Gemini 認定資格。",
        },
      ],
    },
    {
      id: "advisory",
      numeral: "II",
      kantHead: "Der Qualität",
      kantHeadJa: "質",
      domain: "現場AI顧問・業務改善",
      status: "現在",
      lead: "現場に入り込み、仕組みと業務を内側から変える。",
      moments: [
        {
          num: "01",
          kant: "Realität",
          kantJa: "実在性",
          title: "AIビジネス専門学校 講師（名古屋）",
          detail: "授業担当に加え、職場の仕組み・業務改善を内側から推進。",
        },
        {
          num: "02",
          kant: "Negation",
          kantJa: "否定性",
          title: "他社AI顧問の開発担当",
          detail: "裏方の開発・実装パートを担当。",
        },
        {
          num: "03",
          kant: "Limitation",
          kantJa: "制限性",
          title: "個人事業主・中小企業向けAI業務改善",
          detail: "トリマー向けアプリを1件開発・納品（検品待ち）。",
        },
      ],
    },
    {
      id: "community",
      numeral: "III",
      kantHead: "Der Relation",
      kantHeadJa: "関係",
      domain: "コミュニティ・チーム運営",
      status: "現在",
      lead: "遊びと実験から、小さな「1」を完成させて人を巻き込む。",
      moments: [
        {
          num: "01",
          kant: "Inhärenz und Subsistenz",
          kantJa: "内属と自存",
          title: "草AIチーム「AIueo」代表",
          detail: "0を集めず、1をつくる。",
        },
        {
          num: "02",
          kant: "Causalität und Dependenz",
          kantJa: "原因性と依存性",
          title: "「いつか一緒に」を、「これを一緒に」へ。",
          detail: "作品・アプリ・企画を完成させ、広報・実験基盤として並走。",
        },
        {
          num: "03",
          kant: "Gemeinschaft",
          kantJa: "相互性",
          title: "Shift AI 会員・岐阜エリア運営",
          detail: "フリノバAI大学（名古屋）出演。",
        },
      ],
    },
    {
      id: "education-ax",
      numeral: "IV",
      kantHead: "Der Modalität",
      kantHeadJa: "様相",
      domain: "教育機関AX レーベル「AIueo」",
      status: "展開予定",
      lead: "校務ゼロ化。草AIチームとは別軸のビジネスライン。",
      moments: [
        {
          num: "01",
          kant: "Möglichkeit",
          kantJa: "可能性",
          title: "教材・授業準備の自動化",
          detail: "ChatGPTのプロジェクト機能とNotebookLMを連携し、授業資料・スライド・クイズを生成。",
        },
        {
          num: "02",
          kant: "Daseyn",
          kantJa: "現実存在",
          title: "出題・採点の自動化",
          detail: "Google Classroomで課題・点数を管理し、Googleフォームでテスト作成と自動採点。",
        },
        {
          num: "03",
          kant: "Nothwendigkeit",
          kantJa: "必然性",
          title: "岐阜エリアの教育機関へ",
          detail: "専門学校、日本語学校、学習塾など。",
        },
      ],
    },
  ] as PracticeDomain[],
  roadmap: [
    {
      label: "01 · 法人",
      title: "Vern LLC 設立（年明け予定）",
      text: "すべての活動・プロジェクトを束ねるヘッドクォーターとして法人化。",
    },
    {
      label: "02 · 地域",
      title: "Shift AI 岐阜アンバサダー取得",
      text: "岐阜エリアでの認知・ネットワークを確立。",
    },
    {
      label: "03 · レーベル",
      title: "マルチレーベル展開",
      text: "Vern LLCの傘下に複数のレーベルを並走させる。主力は教育機関AXレーベル「AIueo」。",
    },
    {
      label: "04 · 顧問",
      title: "AI顧問＆パッケージ展開",
      text: "トリマー向けアプリの実績化・横展開。現場に入り込むスタイルでの業務改善支援。",
    },
  ] as RoadmapItem[],
  designSource: "Tafel der Categorien — Critik der reinen Vernunft, Riga 1781 (A 80 / B 106)",
};
