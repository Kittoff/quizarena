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
  {
    category: "GEOGRAPHY",
    difficulty: 2,
    question: {
      fr: "Quelle est la plus longue rivière du monde ?",
      ja: "世界で最も長い川は何ですか？",
      en: "What is the longest river in the world?",
    },
    answers: [
      { correct: true, text: { fr: "Le Nil", ja: "ナイル川", en: "The Nile" } },
      { correct: false, text: { fr: "L'Amazone", ja: "アマゾン川", en: "The Amazon" } },
      { correct: false, text: { fr: "Le Mississippi", ja: "ミシシッピ川", en: "The Mississippi" } },
      { correct: false, text: { fr: "Le Yangtsé", ja: "長江", en: "The Yangtze" } },
    ],
  },
  {
    category: "GEOGRAPHY",
    difficulty: 3,
    question: {
      fr: "Quel est le pays le plus peuplé du monde ?",
      ja: "世界で人口が最も多い国はどこですか？",
      en: "What is the most populous country in the world?",
    },
    answers: [
      { correct: true, text: { fr: "Inde", ja: "インド", en: "India" } },
      { correct: false, text: { fr: "Chine", ja: "中国", en: "China" } },
      { correct: false, text: { fr: "États-Unis", ja: "アメリカ合衆国", en: "United States" } },
      { correct: false, text: { fr: "Indonésie", ja: "インドネシア", en: "Indonesia" } },
    ],
  },
  {
    category: "GEOGRAPHY",
    difficulty: 1,
    question: {
      fr: "Dans quelle ville se trouve la tour Eiffel ?",
      ja: "エッフェル塔があるのはどの都市ですか？",
      en: "In which city is the Eiffel Tower located?",
    },
    answers: [
      { correct: true, text: { fr: "Paris", ja: "パリ", en: "Paris" } },
      { correct: false, text: { fr: "Lyon", ja: "リヨン", en: "Lyon" } },
      { correct: false, text: { fr: "Marseille", ja: "マルセイユ", en: "Marseille" } },
      { correct: false, text: { fr: "Nice", ja: "ニース", en: "Nice" } },
    ],
  },
  {
    category: "HISTORY",
    difficulty: 3,
    question: {
      fr: "En quelle année a eu lieu la chute du mur de Berlin ?",
      ja: "ベルリンの壁が崩壊したのは何年ですか？",
      en: "In which year did the Berlin Wall fall?",
    },
    answers: [
      { correct: false, text: { fr: "1985", ja: "1985年", en: "1985" } },
      { correct: true, text: { fr: "1989", ja: "1989年", en: "1989" } },
      { correct: false, text: { fr: "1991", ja: "1991年", en: "1991" } },
      { correct: false, text: { fr: "1993", ja: "1993年", en: "1993" } },
    ],
  },
  {
    category: "HISTORY",
    difficulty: 1,
    question: {
      fr: "Qui a été le premier président des États-Unis ?",
      ja: "アメリカ合衆国の初代大統領は誰ですか？",
      en: "Who was the first President of the United States?",
    },
    answers: [
      { correct: true, text: { fr: "George Washington", ja: "ジョージ・ワシントン", en: "George Washington" } },
      { correct: false, text: { fr: "Thomas Jefferson", ja: "トーマス・ジェファーソン", en: "Thomas Jefferson" } },
      { correct: false, text: { fr: "Abraham Lincoln", ja: "エイブラハム・リンカーン", en: "Abraham Lincoln" } },
      { correct: false, text: { fr: "John Adams", ja: "ジョン・アダムズ", en: "John Adams" } },
    ],
  },
  {
    category: "SCIENCE",
    difficulty: 1,
    question: {
      fr: "Combien y a-t-il d'os dans le corps humain adulte ?",
      ja: "成人の人体には何本の骨がありますか？",
      en: "How many bones are in the adult human body?",
    },
    answers: [
      { correct: false, text: { fr: "186", ja: "186本", en: "186" } },
      { correct: true, text: { fr: "206", ja: "206本", en: "206" } },
      { correct: false, text: { fr: "226", ja: "226本", en: "226" } },
      { correct: false, text: { fr: "246", ja: "246本", en: "246" } },
    ],
  },
  {
    category: "SCIENCE",
    difficulty: 1,
    question: {
      fr: "Combien de côtés a un hexagone ?",
      ja: "六角形は何本の辺を持ちますか？",
      en: "How many sides does a hexagon have?",
    },
    answers: [
      { correct: false, text: { fr: "5", ja: "5本", en: "5" } },
      { correct: true, text: { fr: "6", ja: "6本", en: "6" } },
      { correct: false, text: { fr: "7", ja: "7本", en: "7" } },
      { correct: false, text: { fr: "8", ja: "8本", en: "8" } },
    ],
  },
  {
    category: "SPORT",
    difficulty: 3,
    question: {
      fr: "Quel pays a remporté la première Coupe du monde de football en 1930 ?",
      ja: "1930年の第1回サッカーワールドカップで優勝した国はどこですか？",
      en: "Which country won the first football World Cup in 1930?",
    },
    answers: [
      { correct: true, text: { fr: "Uruguay", ja: "ウルグアイ", en: "Uruguay" } },
      { correct: false, text: { fr: "Brésil", ja: "ブラジル", en: "Brazil" } },
      { correct: false, text: { fr: "Argentine", ja: "アルゼンチン", en: "Argentina" } },
      { correct: false, text: { fr: "Italie", ja: "イタリア", en: "Italy" } },
    ],
  },
  {
    category: "CINEMA",
    difficulty: 1,
    question: {
      fr: "Qui a réalisé le film 'Jurassic Park' ?",
      ja: "『ジュラシック・パーク』を監督したのは誰ですか？",
      en: "Who directed 'Jurassic Park'?",
    },
    answers: [
      { correct: true, text: { fr: "Steven Spielberg", ja: "スティーヴン・スピルバーグ", en: "Steven Spielberg" } },
      { correct: false, text: { fr: "James Cameron", ja: "ジェームズ・キャメロン", en: "James Cameron" } },
      { correct: false, text: { fr: "George Lucas", ja: "ジョージ・ルーカス", en: "George Lucas" } },
      { correct: false, text: { fr: "Ridley Scott", ja: "リドリー・スコット", en: "Ridley Scott" } },
    ],
  },
  {
    category: "CINEMA",
    difficulty: 2,
    question: {
      fr: "Quel studio a produit le film 'Le Voyage de Chihiro' ?",
      ja: "『千と千尋の神隠し』を制作したスタジオはどこですか？",
      en: "Which studio produced 'Spirited Away'?",
    },
    answers: [
      { correct: true, text: { fr: "Studio Ghibli", ja: "スタジオジブリ", en: "Studio Ghibli" } },
      { correct: false, text: { fr: "Toei Animation", ja: "東映アニメーション", en: "Toei Animation" } },
      { correct: false, text: { fr: "Madhouse", ja: "マッドハウス", en: "Madhouse" } },
      { correct: false, text: { fr: "Production I.G", ja: "プロダクションI.G", en: "Production I.G" } },
    ],
  },
  {
    category: "MUSIC",
    difficulty: 1,
    question: {
      fr: "Quel instrument compte 88 touches ?",
      ja: "88の鍵盤を持つ楽器は何ですか？",
      en: "Which instrument has 88 keys?",
    },
    answers: [
      { correct: true, text: { fr: "Le piano", ja: "ピアノ", en: "The piano" } },
      { correct: false, text: { fr: "Le violon", ja: "バイオリン", en: "The violin" } },
      { correct: false, text: { fr: "La guitare", ja: "ギター", en: "The guitar" } },
      { correct: false, text: { fr: "La flûte", ja: "フルート", en: "The flute" } },
    ],
  },
  {
    category: "MUSIC",
    difficulty: 2,
    question: {
      fr: "Quel groupe britannique a sorti l'album 'Abbey Road' ?",
      ja: "アルバム『アビイ・ロード』をリリースしたイギリスのバンドはどこですか？",
      en: "Which British band released the album 'Abbey Road'?",
    },
    answers: [
      { correct: true, text: { fr: "The Beatles", ja: "ザ・ビートルズ", en: "The Beatles" } },
      { correct: false, text: { fr: "The Rolling Stones", ja: "ザ・ローリング・ストーンズ", en: "The Rolling Stones" } },
      { correct: false, text: { fr: "Queen", ja: "クイーン", en: "Queen" } },
      { correct: false, text: { fr: "Pink Floyd", ja: "ピンク・フロイド", en: "Pink Floyd" } },
    ],
  },
  {
    category: "TECHNOLOGY",
    difficulty: 1,
    question: {
      fr: "Quelle entreprise a créé le système d'exploitation Windows ?",
      ja: "Windowsオペレーティングシステムを開発した企業はどこですか？",
      en: "Which company created the Windows operating system?",
    },
    answers: [
      { correct: true, text: { fr: "Microsoft", ja: "マイクロソフト", en: "Microsoft" } },
      { correct: false, text: { fr: "Apple", ja: "アップル", en: "Apple" } },
      { correct: false, text: { fr: "Google", ja: "グーグル", en: "Google" } },
      { correct: false, text: { fr: "IBM", ja: "IBM", en: "IBM" } },
    ],
  },
  {
    category: "TECHNOLOGY",
    difficulty: 2,
    question: {
      fr: "Que signifie le sigle 'HTML' ?",
      ja: "『HTML』は何の略ですか？",
      en: "What does the acronym 'HTML' stand for?",
    },
    answers: [
      { correct: true, text: { fr: "HyperText Markup Language", ja: "HyperText Markup Language", en: "HyperText Markup Language" } },
      { correct: false, text: { fr: "High Tech Modern Language", ja: "High Tech Modern Language", en: "High Tech Modern Language" } },
      { correct: false, text: { fr: "Hyperlink Text Manager Language", ja: "Hyperlink Text Manager Language", en: "Hyperlink Text Manager Language" } },
      { correct: false, text: { fr: "Home Tool Markup Language", ja: "Home Tool Markup Language", en: "Home Tool Markup Language" } },
    ],
  },
  {
    category: "TECHNOLOGY",
    difficulty: 3,
    question: {
      fr: "Qui a cofondé Apple avec Steve Jobs ?",
      ja: "スティーブ・ジョブズと共にAppleを共同設立したのは誰ですか？",
      en: "Who co-founded Apple with Steve Jobs?",
    },
    answers: [
      { correct: true, text: { fr: "Steve Wozniak", ja: "スティーブ・ウォズニアック", en: "Steve Wozniak" } },
      { correct: false, text: { fr: "Bill Gates", ja: "ビル・ゲイツ", en: "Bill Gates" } },
      { correct: false, text: { fr: "Tim Cook", ja: "ティム・クック", en: "Tim Cook" } },
      { correct: false, text: { fr: "Larry Page", ja: "ラリー・ペイジ", en: "Larry Page" } },
    ],
  },
  {
    category: "NATURE",
    difficulty: 1,
    question: {
      fr: "Quel est le plus grand animal terrestre ?",
      ja: "陸上で最も大きな動物は何ですか？",
      en: "What is the largest land animal?",
    },
    answers: [
      { correct: true, text: { fr: "L'éléphant d'Afrique", ja: "アフリカゾウ", en: "The African elephant" } },
      { correct: false, text: { fr: "Le rhinocéros", ja: "サイ", en: "The rhinoceros" } },
      { correct: false, text: { fr: "La girafe", ja: "キリン", en: "The giraffe" } },
      { correct: false, text: { fr: "L'hippopotame", ja: "カバ", en: "The hippopotamus" } },
    ],
  },
  {
    category: "NATURE",
    difficulty: 2,
    question: {
      fr: "Combien de pattes a une araignée ?",
      ja: "クモの脚は何本ですか？",
      en: "How many legs does a spider have?",
    },
    answers: [
      { correct: false, text: { fr: "6", ja: "6本", en: "6" } },
      { correct: true, text: { fr: "8", ja: "8本", en: "8" } },
      { correct: false, text: { fr: "10", ja: "10本", en: "10" } },
      { correct: false, text: { fr: "4", ja: "4本", en: "4" } },
    ],
  },
  {
    category: "NATURE",
    difficulty: 3,
    question: {
      fr: "Quel est le plus grand océan du monde ?",
      ja: "世界最大の海洋は何ですか？",
      en: "What is the largest ocean in the world?",
    },
    answers: [
      { correct: true, text: { fr: "L'océan Pacifique", ja: "太平洋", en: "The Pacific Ocean" } },
      { correct: false, text: { fr: "L'océan Atlantique", ja: "大西洋", en: "The Atlantic Ocean" } },
      { correct: false, text: { fr: "L'océan Indien", ja: "インド洋", en: "The Indian Ocean" } },
      { correct: false, text: { fr: "L'océan Arctique", ja: "北極海", en: "The Arctic Ocean" } },
    ],
  },
  {
    category: "GASTRONOMY",
    difficulty: 1,
    question: {
      fr: "De quel pays est originaire la pizza ?",
      ja: "ピザの発祥国はどこですか？",
      en: "Which country does pizza originate from?",
    },
    answers: [
      { correct: true, text: { fr: "Italie", ja: "イタリア", en: "Italy" } },
      { correct: false, text: { fr: "France", ja: "フランス", en: "France" } },
      { correct: false, text: { fr: "Grèce", ja: "ギリシャ", en: "Greece" } },
      { correct: false, text: { fr: "Espagne", ja: "スペイン", en: "Spain" } },
    ],
  },
  {
    category: "GASTRONOMY",
    difficulty: 2,
    question: {
      fr: "Quel ingrédient principal compose le guacamole ?",
      ja: "ワカモレの主な材料は何ですか？",
      en: "What is the main ingredient in guacamole?",
    },
    answers: [
      { correct: true, text: { fr: "L'avocat", ja: "アボカド", en: "Avocado" } },
      { correct: false, text: { fr: "La tomate", ja: "トマト", en: "Tomato" } },
      { correct: false, text: { fr: "Le poivron", ja: "ピーマン", en: "Bell pepper" } },
      { correct: false, text: { fr: "L'oignon", ja: "タマネギ", en: "Onion" } },
    ],
  },
];
