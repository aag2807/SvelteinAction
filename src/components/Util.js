import { v4 as uuidv4 } from "uuid";

export function getGuid() {
  return uuidv4();
}

export function blurOnKey(e) {
  const { code } = e;
  if (code === "Enter" || code === "Escape" || code === "Tab") {
    e.target.blur();
  }
}

export function sortOnName(arr) {
  arr.sort((e1, e2) => {
    e1.name.toLowerCase().localeCompare(e2.name.toLowerCase());
  });
  return arr;
}
