export const transformName = (city) => {
  switch (city) {
    case "台北市":
      return "taipei";
      break;
    case "新北市":
      return "new-taipei";
      break;
    case "桃園市":
      return "taoyuan";
      break;
    case "台中市":
      return "taichung";
      break;
    case "台南市":
      return "tainan";
      break;
    case "高雄市":
      return "kaohsiung";
      break;
    case "基隆市":
      return "keelung";
      break;
    case "新竹市":
      return "hsinchu-city";
      break;
    case "新竹縣":
      return "hsinchu-county";
      break;
    case "苗栗縣":
      return "miaoli";
      break;
    case "彰化縣":
      return "changhua";
      break;
    case "南投縣":
      return "nantou";
      break;
    case "雲林縣":
      return "yunlin";
      break;
    case "嘉義市":
      return "chiayi-city";
      break;
    case "嘉義縣":
      return "chiayi-county";
      break;
    case "屏東縣":
      return "pingtung";
      break;
    case "台東縣":
      return "taitung";
      break;
    case "花蓮縣":
      return "hualien";
      break;
    case "宜蘭縣":
      return "yilan";
      break;
    case "金門縣":
      return "kinmen";
      break;
    case "連江縣":
      return "lienchiang";
      break;
    case "澎湖縣":
      return "penghu";
      break;
  }
}

export const findCountyIndex = (data, start, end) => {
  const startIndex = data.findIndex((el) => {
    return el["行政區別"] === start;
  });
  const endIndex = data.findIndex((el) => {
    return el["行政區別"] === end;
  });
  return [startIndex, endIndex];
}