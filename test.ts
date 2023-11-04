const str = "!translate -s en -t es -m Hello WOrld";

type Cs = { s: string; t: string; m: string };

const splitted: string[] = str.split("-");
splitted.shift();
const arr: Cs = {
  s: "",
  t: "",
  m: "",
};

splitted.forEach((element) => {
  const sp: string[] = element.split(" ");
  arr[sp[0] as keyof Cs] = sp[1];
});

console.log(arr);
