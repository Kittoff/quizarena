export const questions = [
  {
    category: "GEOGRAPHY",
    difficulty: 1,
    question: {
      fr: "Quelle est la capitale du Japon ?",
      ja: "日本の首都はどこですか？",
      en: "What is the capital of Japan?",
    },
    answers: [
      { correct: true, text: { fr: "Tokyo", ja: "東京", en: "Tokyo" } },
      { correct: false, text: { fr: "Kyoto", ja: "京都", en: "Kyoto" } },
      { correct: false, text: { fr: "Osaka", ja: "大阪", en: "Osaka" } },
      { correct: false, text: { fr: "Nagoya", ja: "名古屋", en: "Nagoya" } },
    ],
  },
  {
    category: "GEOGRAPHY",
    difficulty: 1,
    question: {
      fr: "Quel est le plus grand pays du monde par superficie ?",
      ja: "面積が世界で最も大きい国はどこですか？",
      en: "What is the largest country in the world by area?",
    },
    answers: [
      { correct: false, text: { fr: "Canada", ja: "カナダ", en: "Canada" } },
      { correct: false, text: { fr: "Chine", ja: "中国", en: "China" } },
      { correct: true, text: { fr: "Russie", ja: "ロシア", en: "Russia" } },
      {
        correct: false,
        text: { fr: "États-Unis", ja: "アメリカ合衆国", en: "United States" },
      },
    ],
  },
  {
    category: "GEOGRAPHY",
    difficulty: 2,
    question: {
      fr: "Quel fleuve traverse Paris ?",
      ja: "パリを流れる川は何ですか？",
      en: "Which river flows through Paris?",
    },
    answers: [
      { correct: true, text: { fr: "La Seine", ja: "セーヌ川", en: "The Seine" } },
      { correct: false, text: { fr: "La Loire", ja: "ロワール川", en: "The Loire" } },
      { correct: false, text: { fr: "Le Rhône", ja: "ローヌ川", en: "The Rhône" } },
      { correct: false, text: { fr: "La Garonne", ja: "ガロンヌ川", en: "The Garonne" } },
    ],
  },
  {
    category: "HISTORY",
    difficulty: 1,
    question: {
      fr: "En quelle année a eu lieu la Révolution française ?",
      ja: "フランス革命は何年に起こりましたか？",
      en: "In which year did the French Revolution begin?",
    },
    answers: [
      { correct: false, text: { fr: "1776", ja: "1776年", en: "1776" } },
      { correct: true, text: { fr: "1789", ja: "1789年", en: "1789" } },
      { correct: false, text: { fr: "1804", ja: "1804年", en: "1804" } },
      { correct: false, text: { fr: "1815", ja: "1815年", en: "1815" } },
    ],
  },
  {
    category: "HISTORY",
    difficulty: 2,
    question: {
      fr: "Quel empereur a fait construire la Grande Muraille de Chine ?",
      ja: "万里の長城の建設を命じた皇帝は誰ですか？",
      en: "Which emperor ordered the construction of the Great Wall of China?",
    },
    answers: [
      { correct: true, text: { fr: "Qin Shi Huang", ja: "秦の始皇帝", en: "Qin Shi Huang" } },
      { correct: false, text: { fr: "Kangxi", ja: "康熙帝", en: "Kangxi" } },
      { correct: false, text: { fr: "Wu Zetian", ja: "武則天", en: "Wu Zetian" } },
      { correct: false, text: { fr: "Yongle", ja: "永楽帝", en: "Yongle" } },
    ],
  },
  {
    category: "SCIENCE",
    difficulty: 1,
    question: {
      fr: "Quelle est la planète la plus proche du Soleil ?",
      ja: "太陽に最も近い惑星はどれですか？",
      en: "Which planet is closest to the Sun?",
    },
    answers: [
      { correct: true, text: { fr: "Mercure", ja: "水星", en: "Mercury" } },
      { correct: false, text: { fr: "Vénus", ja: "金星", en: "Venus" } },
      { correct: false, text: { fr: "Mars", ja: "火星", en: "Mars" } },
      { correct: false, text: { fr: "Terre", ja: "地球", en: "Earth" } },
    ],
  },
  {
    category: "SCIENCE",
    difficulty: 2,
    question: {
      fr: "Quel est le symbole chimique de l'or ?",
      ja: "金の化学記号は何ですか？",
      en: "What is the chemical symbol for gold?",
    },
    answers: [
      { correct: false, text: { fr: "Ag", ja: "Ag", en: "Ag" } },
      { correct: false, text: { fr: "Fe", ja: "Fe", en: "Fe" } },
      { correct: true, text: { fr: "Au", ja: "Au", en: "Au" } },
      { correct: false, text: { fr: "Pb", ja: "Pb", en: "Pb" } },
    ],
  },
  {
    category: "SPORT",
    difficulty: 1,
    question: {
      fr: "Combien de joueurs compte une équipe de football sur le terrain ?",
      ja: "サッカーの1チームのフィールド上の選手数は？",
      en: "How many players are on a football (soccer) team on the field?",
    },
    answers: [
      { correct: false, text: { fr: "10", ja: "10人", en: "10" } },
      { correct: true, text: { fr: "11", ja: "11人", en: "11" } },
      { correct: false, text: { fr: "12", ja: "12人", en: "12" } },
      { correct: false, text: { fr: "9", ja: "9人", en: "9" } },
    ],
  },
  {
    category: "SPORT",
    difficulty: 2,
    question: {
      fr: "Tous les combien d'années ont lieu les Jeux olympiques d'été ?",
      ja: "夏季オリンピックは何年ごとに開催されますか？",
      en: "How often are the Summer Olympics held?",
    },
    answers: [
      { correct: false, text: { fr: "2 ans", ja: "2年ごと", en: "Every 2 years" } },
      { correct: true, text: { fr: "4 ans", ja: "4年ごと", en: "Every 4 years" } },
      { correct: false, text: { fr: "5 ans", ja: "5年ごと", en: "Every 5 years" } },
      { correct: false, text: { fr: "6 ans", ja: "6年ごと", en: "Every 6 years" } },
    ],
  },
  {
    category: "CULTURE",
    difficulty: 1,
    question: {
      fr: "Qui a peint la Joconde ?",
      ja: "モナリザを描いたのは誰ですか？",
      en: "Who painted the Mona Lisa?",
    },
    answers: [
      { correct: false, text: { fr: "Michel-Ange", ja: "ミケランジェロ", en: "Michelangelo" } },
      { correct: true, text: { fr: "Léonard de Vinci", ja: "レオナルド・ダ・ヴィンチ", en: "Leonardo da Vinci" } },
      { correct: false, text: { fr: "Raphaël", ja: "ラファエロ", en: "Raphael" } },
      { correct: false, text: { fr: "Botticelli", ja: "ボッティチェッリ", en: "Botticelli" } },
    ],
  },
  {
    category: "CULTURE",
    difficulty: 2,
    question: {
      fr: "Quel auteur a écrit '1984' ?",
      ja: "『1984年』を書いた作家は誰ですか？",
      en: "Which author wrote '1984'?",
    },
    answers: [
      { correct: false, text: { fr: "Aldous Huxley", ja: "オルダス・ハクスリー", en: "Aldous Huxley" } },
      { correct: true, text: { fr: "George Orwell", ja: "ジョージ・オーウェル", en: "George Orwell" } },
      { correct: false, text: { fr: "Ray Bradbury", ja: "レイ・ブラッドベリ", en: "Ray Bradbury" } },
      { correct: false, text: { fr: "Franz Kafka", ja: "フランツ・カフカ", en: "Franz Kafka" } },
    ],
  },
  {
    category: "SCIENCE",
    difficulty: 3,
    question: {
      fr: "Quelle est l'unité de mesure de la fréquence ?",
      ja: "周波数の単位は何ですか？",
      en: "What is the unit of measurement for frequency?",
    },
    answers: [
      { correct: false, text: { fr: "Watt", ja: "ワット", en: "Watt" } },
      { correct: false, text: { fr: "Volt", ja: "ボルト", en: "Volt" } },
      { correct: true, text: { fr: "Hertz", ja: "ヘルツ", en: "Hertz" } },
      { correct: false, text: { fr: "Joule", ja: "ジュール", en: "Joule" } },
    ],
  },
];
