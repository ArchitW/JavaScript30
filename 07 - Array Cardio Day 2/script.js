// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 }
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 }
];

// Some and Every Checks
// `Array.prototype.some()` // is at least one person 19 or older?
// The `some()` method tests whether at least one element in the array passes the test implemented by the provided function.
const isAdult = people.some(
  person => new Date().getFullYear() - person.year >= 19
);
console.log(isAdult);

// `Array.prototype.every()` // is everyone 19 or older?
// The `every()` method tests whether all elements in the array pass the test implemented by the provided function.
const allAdults = people.every(
  person => new Date().getFullYear() - person.year >= 19
);
console.log(allAdults);

// `Array.prototype.find()`
// Find is like filter, but instead returns just the one you are looking for
// The `find()` method returns the value of the first element in the array that satisfies the provided testing function. Otherwise `undefined` is returned.
// find the comment with the ID of 823423
const comment = comments.find(comment => comment.id === 823423);
console.log(comment);

// `Array.prototype.findIndex()`
// The `findIndex()` method returns the index of the first element in the array that satisfies the provided testing function. Otherwise -1 is returned.
// Find the comment with this ID
const index = comments.findIndex(comment => comment.id === 2039842);
console.log(index);
// delete the comment with the ID of 823423
// The `splice()` method changes the contents of an array by removing existing elements and/or adding new elements.
/* comments.splice(index, 1); */
console.log(comments);

// The `slice()` method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
const newComments = [...comments.slice(0, index), ...comments.slice(index + 1)];
console.log(newComments);
