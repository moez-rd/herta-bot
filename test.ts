const str = "!translate -s en -t es -m Hello WOrld";

const splitted = str.split("-");
splitted.shift();
const arr: string[] = [];

splitted.forEach((element) => {
  arr.push(element.split(" ")[1]);
});

console.log(arr);

