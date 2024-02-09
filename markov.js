/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chain = {};
    let lowerArr = this.words;

    for (let word of lowerArr) {
      if (!chain.hasOwnProperty(word)) {
        let arr = [];
        for (let i = 0; i < lowerArr.length; i++) {
          if (lowerArr[i] == word) {
            if (!arr.includes(lowerArr[i + 1])) {
              if (lowerArr[i + 1] == undefined) {
                arr.push(null);
              } else {
                arr.push(lowerArr[i + 1]);
              }
            }
          }
        }
        chain[word] = arr;
      }
    }

    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let storyArr = [];
    let num = 0;
    let obj = this.makeChains();
    let wordArr = Object.keys(obj);
    let randWordIdx = Math.floor(Math.random() * wordArr.length);
    let headWord = wordArr[randWordIdx];

    while (headWord !== null && num < numWords) {
      num++;
      storyArr.push(headWord);
      wordArr = obj[headWord];
      let randWordIdx = Math.floor(Math.random() * wordArr.length);
      headWord = wordArr[randWordIdx];
    }

    let story = storyArr.join(" ");
    return story;
  }
}

module.exports = { MarkovMachine };
