const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");

describe("Markov Machine Object With Text", function () {
  let text;
  let mm;
  let chain;
  beforeEach(function () {
    text = "The cat in the hat";
    mm = new MarkovMachine(text);
    chain = mm.makeChains();
  });

  test("make object", function () {
    expect(typeof mm).toEqual("object");
    expect(Object.keys(mm)).toContain("words");
    expect(typeof mm["words"]).toEqual("object");
  });

  test("make text chain", function () {
    let firstKey = Object.keys(chain)[0];
    expect(typeof chain).toEqual("object");
    expect(typeof chain[firstKey]).toEqual("object");
    expect(text).toContain(Object.keys(chain)[0]);
    expect(chain["hat"]).toEqual([null]);
  });

  test("make randomly generated text", function () {
    let story = mm.makeText();
    let storyArr = story.split(" ");
    expect(story).toEqual(expect.any(String));
    expect(storyArr.length).toBeLessThanOrEqual(100);
    expect(Object.keys(chain)).toContain(storyArr[0]);
  });
});

describe("Markov Machine Object with File", function () {
  let mm;
  let chain;
  let text;

  beforeEach(function () {
    text = fs.readFileSync("./eggs.txt", { encoding: "utf8", flag: "r" });
    mm = new MarkovMachine(text);
    chain = mm.makeChains();
  });

  test("make object from file", function () {
    expect(typeof mm).toEqual("object");
    expect(Object.keys(mm)).toContain("words");
    expect(typeof mm["words"]).toEqual("object");
  });

  test("make text chain from file", function () {
    let firstKey = Object.keys(chain)[0];
    expect(typeof chain).toEqual("object");
    expect(typeof chain[firstKey]).toEqual("object");
    expect(text).toContain(Object.keys(chain)[0]);
    expect(chain["Sam-I-am"]).toContain(null);
  });

  test("make randomly generated text from file", function () {
    let story = mm.makeText();
    let storyArr = story.split(" ");
    expect(story).toEqual(expect.any(String));
    expect(storyArr.length).toBeLessThanOrEqual(100);
    expect(Object.keys(chain)).toContain(storyArr[0]);
  });
});

describe("Markov Machine Object with URL", function () {
  let mm;
  let chain;
  let text;

  beforeEach(async function () {
    const res = await axios.get("http://www.gutenberg.org/files/11/11-0.txt");
    text = res.data;
    mm = new MarkovMachine(text);
    chain = mm.makeChains();
  });

  test("make object from URL", function () {
    expect(typeof mm).toEqual("object");
    expect(Object.keys(mm)).toContain("words");
    expect(typeof mm["words"]).toEqual("object");
  });

  test("make text chain from URL", function () {
    let firstKey = Object.keys(chain)[0];
    expect(typeof chain).toEqual("object");
    expect(typeof chain[firstKey]).toEqual("object");
    expect(text).toContain(Object.keys(chain)[0]);
    expect(chain["***"]).toContain(null);
  });

  test("make randomly generated text from URL", function () {
    let story = mm.makeText();
    let storyArr = story.split(" ");
    expect(story).toEqual(expect.any(String));
    expect(storyArr.length).toBeLessThanOrEqual(100);
    expect(Object.keys(chain)).toContain(storyArr[0]);
  });
});
