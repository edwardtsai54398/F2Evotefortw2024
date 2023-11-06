// src/data.js
export const candidates = {
  1: {
    id: "1",
    name: "宋楚魚",
    party_image: "/candidate/1_politics.png",
    party: "親民黨",
    partner: "余湘 (無黨籍)",
    background: "政治界：公職、國際關係研究員",
    education: [
      "E國立政治大學外交系畢業（1964）",
      "美國公教大學圖書管理學碩士（1971）",
      "美國喬治城大學政治學博士（1974）",
    ],
    experience: [
      "行政院簡任秘書（1974-1977）",
      "行政院新聞局副局長（1977-1979）",
      "總統府簡任秘書（1978-1981、1984-1989）",
      "行政院新聞局局長（1979-1984）",
      "中國國民黨文工會主任（1984-1987）",
      "中國國民黨副秘書長（1987-1989）",
      "中國國民黨秘書長（1989-1993）",
      "臺灣省主席（1993-1994）",
      "臺灣省省長（1994-1998）",
      "親民黨主席（2000-）",
      "臺北市政府首席顧問（2014-）",
      "亞太經合會中華臺北領袖代表（2016-2017）",
      "總統府資政（2016-2019）",
    ],
    opponents: [
      { name: "蔡英文", image: "/candidate/2_photo.png" },
      { name: "韓國魚", image: "/candidate/3_photo.png" },
    ],
    image: "/candidate/1_player.png",
    description: "Description for Candidate 1",
  },
  2: {
    id: "2",
    name: "菜英文",
    party_image: "/candidate/2_politics.png",
    party: "民主進步黨",
    partner: "賴青德 (民主進步黨)",
    background: "政治界：大學教授、國際談判代表",
    education: [
      "國立臺灣大學法律系畢業（1978）",
      "美國康乃爾大學法學碩士（1980）",
      // ...其他教育資訊行
    ],
    experience: [
      "國立政治大學、東吳大學教授",
      "經濟部國際組織首席顧問（1993-2000）",
      "經濟部貿易調查委員（1993-2000）",
      "行政院陸委會諮委（1994-1998）",
      "行政院公平會委員（1995-1998）",
      "國安會諮委（1999-2000）",
      "行政院陸委會主委（2000-2004）",
      "總統府國策顧問（2004-2005）",
      "立法委員（2004-2006）",
      "行政院消保會主委（2006-2007）",
      "行政院副院長（2006-2007）",
      "民主進步黨主席（2008-2012、2014-2018）",
      "中華民國總統（2016-）",
      // ...其他經驗資訊行
    ],
    opponents: [
      { name: "宋楚魚", image: "/candidate/1_photo.png" },
      { name: "韓國魚", image: "/candidate/3_photo.png" },
    ],
    image: "/candidate/2_player.png",
    description: "Description for Candidate 2",
  },
  3: {
    id: "3",
    name: "韓國魚",
    party_image: "/candidate/3_politics.png",
    party: "中國國民黨",
    partner: "張善政 (無黨籍)",
    background: "政治界：民意代表",
    education: [
      "東吳大學英國語文學系畢業（1985）",
      "國立政治大學東亞研究所法學碩士（1988）",
      // ...其他教育資訊行
    ],
    experience: [
      "世新專科講師",
      "維多利亞雙語中小學創辦人",
      "臺北縣議員（1990-1993）",
      "立法委員（1993-2002）",
      "臺北縣中和市副市長（2005-2006）",
      "臺北農產運銷公司總經理（2013-2017）",
      "中國國民黨高雄市黨部主委（2017-2019）",
      "高雄市市長（2018-2020）",
      // ...其他經驗資訊行
    ],
    opponents: [
      { name: "宋楚魚", image: "/candidate/1_photo.png" },
      { name: "蔡英文", image: "/candidate/2_photo.png" },
    ],
    image: "/candidate/3_player.png",
    description: "Description for Candidate 3",
  },
  // ...其他候選人數據
};
