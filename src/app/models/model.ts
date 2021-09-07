class Model {
  static SCORE_LIST = [
    { name: "Darth Vader", score: 152 },
    { name: "Harry Potter", score: 254 },
    { name: "Geralt from Rivia", score: 14 },
    { name: "Vernon Roshe", score: 154 },
    { name: "Sub Zero", score: 114 },
  ];

  static getScoreList() {
    return Model.SCORE_LIST;
  }
}

export default Model;