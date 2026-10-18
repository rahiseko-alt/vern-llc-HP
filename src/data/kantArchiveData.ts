export interface CategoryMoment {
  id: string;
  num: string;
  german: string;
  english: string;
  subtext: string;
  schemaNote: string;
}

export interface CategoryClass {
  id: string;
  numeral: string;
  germanTitle: string;
  englishTitle: string;
  type: "mathematical" | "dynamical";
  typeLabel: string;
  judgementForm: string;
  moments: CategoryMoment[];
}

export interface KantArchive {
  work: {
    title: string;
    subTitle: string;
    author: string;
    authorTitle: string;
    lifespan: string;
    edition: string;
    imprint: string;
    colophon: string;
    citationRange: string;
  };
  principles: {
    heroLead: string;
    heroFlipPair: {
      front: string;
      back: string;
      note: string;
    };
    transcendentalQuote: {
      source: string;
      german: string;
      english: string;
    };
    manifestoQuote: {
      source: string;
      german: string;
      english: string;
      elaboration: string;
    };
    synthesisQuote: {
      source: string;
      german: string;
      english: string;
    };
    opusPostumum: {
      source: string;
      convolut: string;
      german: string;
      english: string;
      marginalia: string;
    };
  };
  categories: CategoryClass[];
}

export const KANT_ARCHIVE_DATA: KantArchive = {
  work: {
    title: "Critik der reinen Vernunft",
    subTitle: "Tafel der Categorien & Transscendentale Analytik",
    author: "Immanuel Kant",
    authorTitle: "Professor der Logik und Metaphysik in Königsberg",
    lifespan: "1724 — 1804",
    edition: "Erste Auflage (Riga, 1781)",
    imprint: "Riga, verlegt von Johann Friedrich Hartknoch, 1781.",
    colophon: "Gedruckt mit beweglichen Lettern auf Büttenpapier. Authentischer Nachdruck der Systematik von 1781.",
    citationRange: "Akademie-Text: A 76–83 / B 102–109",
  },
  principles: {
    heroLead: "The Architecture of Pure Thought",
    heroFlipPair: {
      front: "REASON",
      back: "VERNUNFT",
      note: "Critik I · Elementarlehre",
    },
    transcendentalQuote: {
      source: "A 11 / B 25",
      german: "Ich nenne alle Erkenntniß transscendental, die sich nicht so wohl mit Gegenständen, sondern mit unserer Erkenntnißart von Gegenständen, so fern diese a priori möglich seyn soll, überhaupt beschäftigt.",
      english: "I entitle transcendental all knowledge which is occupied not so much with objects as with the mode of our knowledge of objects, in so far as this mode of knowledge is to be possible a priori.",
    },
    manifestoQuote: {
      source: "A 51 / B 75",
      german: "Gedanken ohne Inhalt sind leer, Anschauungen ohne Begriffe sind blind. Daher ist es eben so nothwendig, seine Begriffe sinnlich zu machen (d. i. ihnen den Gegenstand in der Anschauung beyzufügen), als seine Anschauungen sich verständlich zu machen (d. i. sie unter Begriffe zu bringen).",
      english: "Thoughts without content are empty, intuitions without concepts are blind. It is, therefore, just as necessary to make our concepts sensible, that is, to add the object to them in intuition, as to make our intuitions intelligible, that is, to bring them under concepts.",
      elaboration: "Beide Vermögen, oder Fähigkeiten, können auch ihre Functionen nicht verwechseln. Der Verstand vermag nichts anzuschauen, und die Sinne können nichts denken. Nur daraus, daß sie sich vereinigen, kann Erkenntniß entspringen.",
    },
    synthesisQuote: {
      source: "A 79 / B 105",
      german: "Dieselbe Function, welche den verschiedenen Vorstellungen in einem Urtheile Einheit giebt, die giebt auch der bloßen Synthesis verschiedener Vorstellungen in einer Anschauung Einheit, welche, allgemein ausgedrückt, der reine Verstandesbegriff heißt.",
      english: "The same function which gives unity to the various representations in a judgment also gives unity to the mere synthesis of various representations in an intuition; and this unity, in its most general expression, we entitle the pure concept of the understanding.",
    },
    opusPostumum: {
      source: "Opus postumum (BBAW AA XXI: 116)",
      convolut: "Convolut VII & X/XI · Übergang von den metaphysischen Anfangsgründen der Naturwissenschaft zur Physik",
      german: "Transscendentalphilosophie ist das System der synthetischen Erkenntniß a priori aus Begriffen, das Vermögen sich selbst als Object zu setzen.",
      english: "Transcendental philosophy is the system of synthetic knowledge a priori from concepts, the capacity to posit oneself as object.",
      marginalia: "Faksimile-Fragment der Handschrift Kants mit Korrekturen und Streichungen (1796–1803).",
    },
  },
  categories: [
    {
      id: "quantity",
      numeral: "I",
      germanTitle: "Der Quantität",
      englishTitle: "Of Quantity",
      type: "mathematical",
      typeLabel: "Mathematische Kategorie (B 110)",
      judgementForm: "Allgemeine · Besondere · Einzelne Urtheile",
      moments: [
        {
          id: "unity",
          num: "01",
          german: "Einheit",
          english: "Unity",
          subtext: "Das Maß (Measure)",
          schemaNote: "Schema: Die Zahl (Number) als successive Addition des Einen zum Anderen (A 142).",
        },
        {
          id: "plurality",
          num: "02",
          german: "Vielheit",
          english: "Plurality",
          subtext: "Die Größe (Magnitude)",
          schemaNote: "Schema: Die Erzeugung der Zeit selbst in der successiven Apprehension.",
        },
        {
          id: "totality",
          num: "03",
          german: "Allheit",
          english: "Totality",
          subtext: "Das Ganze (The Whole)",
          schemaNote: "Schema: Die Vielheit, betrachtet als Einheit der Zusammenfassung aller Teile.",
        },
      ],
    },
    {
      id: "quality",
      numeral: "II",
      germanTitle: "Der Qualität",
      englishTitle: "Of Quality",
      type: "mathematical",
      typeLabel: "Mathematische Kategorie (B 110)",
      judgementForm: "Bejahende · Verneinende · Unendliche Urtheile",
      moments: [
        {
          id: "reality",
          num: "01",
          german: "Realität",
          english: "Reality",
          subtext: "Sachheit (Being in time)",
          schemaNote: "Schema: Sein in der Zeit; dasjenige, dessen Begriff ein Sein in der Zeit anzeigt (A 143).",
        },
        {
          id: "negation",
          num: "02",
          german: "Negation",
          english: "Negation",
          subtext: "Beraubung (Non-being)",
          schemaNote: "Schema: Das Nichtsein in der Zeit; Übergang von der Realität zur Negation als kontinuierliche Abnahme.",
        },
        {
          id: "limitation",
          num: "03",
          german: "Limitation",
          english: "Limitation",
          subtext: "Einschränkung (Degree)",
          schemaNote: "Schema: Die Erzeugung der Realität als ein Quantum der Empfindung (Gradus, A 143).",
        },
      ],
    },
    {
      id: "relation",
      numeral: "III",
      germanTitle: "Der Relation",
      englishTitle: "Of Relation",
      type: "dynamical",
      typeLabel: "Dynamische Kategorie (B 110)",
      judgementForm: "Kategorische · Hypothetische · Disjunktive Urtheile",
      moments: [
        {
          id: "inherence",
          num: "01",
          german: "Inhärenz und Subsistenz",
          english: "Inherence & Subsistence",
          subtext: "substantia et accidens",
          schemaNote: "Schema: Die Beharrlichkeit des Realen in der Zeit als Substratum des Wechsels (A 143).",
        },
        {
          id: "causality",
          num: "02",
          german: "Causalität und Dependenz",
          english: "Causality & Dependence",
          subtext: "Ursache und Wirkung (Cause & Effect)",
          schemaNote: "Schema: Die Succession des Mannigfaltigen, sofern sie einer Regel unterworfen ist (A 144).",
        },
        {
          id: "community",
          num: "03",
          german: "Gemeinschaft",
          english: "Community / Reciprocity",
          subtext: "Wechselwirkung (Reciprocal Action)",
          schemaNote: "Schema: Das Zugleichsein der Bestimmungen des einen mit denen des anderen nach allgemeiner Regel.",
        },
      ],
    },
    {
      id: "modality",
      numeral: "IV",
      germanTitle: "Der Modalität",
      englishTitle: "Of Modality",
      type: "dynamical",
      typeLabel: "Dynamische Kategorie (B 110)",
      judgementForm: "Problematische · Assertorische · Apodiktische Urtheile",
      moments: [
        {
          id: "possibility",
          num: "01",
          german: "Möglichkeit — Unmöglichkeit",
          english: "Possibility — Impossibility",
          subtext: "Zusammenstimmung mit Zeitbedingungen",
          schemaNote: "Schema: Die Bestimmung der Vorstellung eines Dinges zu irgend einer Zeit (A 144).",
        },
        {
          id: "existence",
          num: "02",
          german: "Daseyn — Nichtseyn",
          english: "Existence — Non-existence",
          subtext: "Wirklichkeit zu einer bestimmten Zeit",
          schemaNote: "Schema: Das Dasein in einer bestimmten Zeit; die Existenz in der Wahrnehmung (A 145).",
        },
        {
          id: "necessity",
          num: "03",
          german: "Nothwendigkeit — Zufälligkeit",
          english: "Necessity — Contingency",
          subtext: "Dasein zu aller Zeit",
          schemaNote: "Schema: Das Dasein eines Gegenstandes zu aller Zeit; verbindliche Existenz.",
        },
      ],
    },
  ],
};
