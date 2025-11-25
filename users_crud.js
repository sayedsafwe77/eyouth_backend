import { existsSync, readFileSync, writeFileSync } from "fs";
const users_file_path = "./users.json";
let users = [];
function readUsersFromFile() {
  if (!existsSync(users_file_path)) {
    throw new Error("File not found");
  }
  if (users.length !== 0) return users;
  const data = readFileSync(users_file_path, { encoding: "utf-8" });
  users = JSON.parse(data);
  return users;
}
function writeUsersToFile(users) {
  if (!existsSync(users_file_path)) {
    throw new Error("File not found");
  }
  writeFileSync(users_file_path, JSON.stringify(users));
}

function getAllUsers() {
  readUsersFromFile();
  return users;
}
function getUserById(id) {
  readUsersFromFile();
  return users.find((user) => user.id === id);
}

function createNewUser(userData) {
  readUsersFromFile();
  users.push({ ...userData, id: users[users.length - 1].id + 1 });
  writeUsersToFile(users);
}

function editUser(newUserData, id) {
  readUsersFromFile();
  users.map((user, index) => {
    if (user.id === id) {
      users[index] = { ...user, ...newUserData };
    }
  });
  writeUsersToFile(users);
}
function deleteUser() {}

console.log(editUser({ name: "sayedsayed" }, 3));
