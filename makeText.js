/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");
// const { type } = require("os");

function textPath(path, num) {
  try {
    let mm = new MarkovMachine(path);
    const text = mm.makeText(num);
    console.log(text);
  } catch (e) {
    console.log(e);
  }
}

function filePath(path, num) {
  const story = fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
  textPath(story, num);
}

async function urlPath(path, num) {
  try {
    const { data: story } = await axios.get(path);
    let mm = new MarkovMachine(story);
    const text = mm.makeText(num);
    console.log(text);
  } catch (e) {
    console.log(e);
  }
}

function generateText(args) {
  let filetype = args[0];
  let path = args[1];
  let num;
  if (args[2]) {
    num = args[2];
  }
  if (filetype == "text") {
    textPath(path, num);
  } else if (filetype == "file") {
    filePath(path, num);
  } else if (filetype == "url") {
    urlPath(path, num);
  } else {
    throw new Error("Could not understand argument");
  }
}

function generateArguments(argArr) {
  let pathArgs = [];
  for (let i = 2; i < argArr.length; i++) {
    pathArgs.push(argArr[i]);
  }
  if (pathArgs.length > 3) {
    throw new Error("TOO MANY ARGUMENTS");
  } else if (pathArgs.length <= 1) {
    throw new Error("TOO FEW ARGUMENTS");
  }
  if (pathArgs[2]) {
    if (isNaN(parseInt(pathArgs[2]))) {
      pathArgs.pop();
    } else {
      pathArgs[2] = parseInt(pathArgs[2]);
    }
  }
  return pathArgs;
}

function showText() {
  let args = process.argv;
  let pathArgs = generateArguments(args);
  generateText(pathArgs);
}

showText();
