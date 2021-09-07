class Model {
  static SCORE_LIST = [
    { name: "Darth Vader", score: 152, date: 1631024581647 },
    { name: "Harry Potter", score: 254, date: 1631004551647-604800000 },
    { name: "Geralt from Rivia", score: 14, date: 1631024551647 },
    { name: "Vernon Roshe", score: 154, date: 1331024551447 },
    { name: "Sub Zero", score: 114, date: 1631024511647 }
  ];

  static getScoreList() {
    return Model.SCORE_LIST;
  }

  static PLAYER_HIGHEST_SCORE = 0;
  static getPlayerHigheestScore() {
    return Model.PLAYER_HIGHEST_SCORE;
  }
}

export default Model;
