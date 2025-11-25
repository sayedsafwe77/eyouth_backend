// fs module
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
// function readLogFromFile() {
//   return readFileSync("./users.json", { encoding: "utf-8" });
// }
// function addNewText() {
//   appendFileSync("./log.txt", "add new line");
// }
// console.log("getting data from file...");

// (() => {
//   const data = readLogFromFile();

//   JSON.parse(data).map((user) => console.log(user.name));
// })();
// addNewText();
// console.log("data retrieval initiated...");

// check if file with current date exist

try {
  throw new Error(`HTTP error! status: 404`);
} catch (e) {
  handleExceptions(e);
}
function handleExceptions(exception) {
  const date = new Date();
  const folderName = `./logs/${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }

  const fileName = `${folderName}/${("0" + date.getHours()).slice(
    -2
  )}-exceptions.log`;

  if (!existsSync(fileName)) {
    console.log(fileName);

    writeFileSync(fileName, exception + "\n");
  } else {
    appendFileSync(fileName, exception + "\n");
  }
}
// if exist append new exception to this file
// if not create it and add exception to it
