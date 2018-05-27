// start with strings, numbers and booleans
/* let age = 100;
let age2 = age;
console.log(age, age2);
age = 200;
console.log(age, age2);

let name = "Wes";
let name2 = name;
console.log(name, name2);
name = "Wesley";
console.log(name, name2); */
// Let's say we have an array
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.
/* const team = players;
console.log(players, team);
team[3] = "Lux";
console.log(players, team); */

// You might think we can just do something like this:
// however what happens when we update that array?
// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!
// So, how do we fix this? We take a copy instead!
// The `slice()` method returns a shallow copy of a portion of an array into a new array object selected from begin to end(end not included).The original array will not be modified.
/* const team2 = players.slice();
console.log(team2, players);
team2[3] = "Lux";
console.log(team2, players);
// one way

// or create a new array and concat the old one in
const team3 = [].concat(players);
console.log(team3, players);

// or use the new ES6 Spread
const team4 = [...players];
team4[3] = "Spider";
console.log(team4, players);

const team5 = Array.from(players);
team5[3] = "Marvel";
console.log(team5, players); */

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
  name: "Wes Bos",
  age: 80
};

// and think we make a copy:
const capt = person;
capt.age = 85;
console.log(person, capt);

// how do we take a copy instead?
// The `Object.assign()` method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
// we create empty object, passing properties to it from person and changing one property that won't affect original object
const capt2 = Object.assign({}, person, { age: 99 });
console.log(person, capt2);

// We will hopefully soon see the object ...spread
const capt3 = { ...person };
console.log(person, capt3);

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
  name: "Wes",
  age: 100,
  social: {
    twitter: "@wesbos",
    facebook: "wesbos.developer"
  }
};

const dev = Object.assign({}, wes, { name: "Wesley" });

const dev2 = { ...wes, name: "Wesley" };
dev2.name = "Wesley";

console.log(wes, dev, dev2);
