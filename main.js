// Give a interger x, return true if it is a palindrome, false otherwise
let numberBox = document.getElementById("numberBox");
let checkButton = document.getElementById("check");
let result = document.getElementById("result");

function isPalindrome(x) {
    if (x < 0) return false; // Negative numbers are not palindromes
    if (x !== 0 && x % 10 === 0) return false; // Numbers ending with 0 are not palindromes unless the number is 0

    let reversed = 0;
    let original = x;

    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }

    return original === reversed;
}

checkButton.addEventListener("click", () => {
    const number = parseInt(numberBox.value);
    if (isNaN(number)) {
        result.textContent = "Please enter a valid number.";
        return;
    }
    result.textContent = isPalindrome(number) ? "TRUE" : "FALSE";
});

// -----------------------------------------------------------------------------------------------------

// Give a string, return true if it is a palindrome, false otherwise
let stringBox = document.getElementById("stringBox");
let checkString = document.getElementById("checkString");
let resultString = document.getElementById("resultString");

function isPandromeString(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

checkString.addEventListener("click", () => {
    const str = stringBox.value;
    resultString.textContent = isPandromeString(str) ? "TRUE" : "FALSE";
});

// -----------------------------------------------------------------------------------------------------

// group by country and sort by population
// group by city and sort by population
// group by population and sort by country

const inputData = [
    { "city": "Mumbai", "country": "India", "population": 20400000 },
    { "city": "Delhi", "country": "India", "population": 32900000 },
    { "city": "Bengaluru", "country": "India", "population": 13700000 },
    { "city": "Pune", "country": "India", "population": 7490000 },

    { "city": "New York", "country": "USA", "population": 8800000 },
    { "city": "Los Angeles", "country": "USA", "population": 3890000 },
    { "city": "Chicago", "country": "USA", "population": 2740000 },

    { "city": "London", "country": "UK", "population": 9300000 },
    { "city": "Manchester", "country": "UK", "population": 553000 },
    { "city": "Birmingham", "country": "UK", "population": 1140000 }
];

const outputValueCountry = document.getElementById("outputValueCountry");
const outputValueCity = document.getElementById("outputValueCity");
const outputValuePopulation = document.getElementById("outputValuePopulation");

const groupData = (inputData, key) => {
    return inputData.reduce((result, item) => {
        const groupKey = item[key];
        const { [key]: removed, ...remainingData } = item; // Remove the key from the item

        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(remainingData);

        return result;
    }, {});
}
outputValueCountry.textContent = JSON.stringify(groupData(inputData, "country"), null, 2);
outputValueCity.textContent = JSON.stringify(groupData(inputData, "city"), null, 2);
outputValuePopulation.textContent = JSON.stringify(groupData(inputData, "population"), null, 2);

// -----------------------------------------------------------------------------------------------------

// TODO: 1. Fetch data from the API and display it in the DOM
const todoRender = document.getElementById("todoList");
const count = document.createElement("h2");
const button = document.createElement("button");
let todos = [];
let skipTodos = 0;
const limit = 20;
const maxTodos = 100;

count.textContent = "Loaded Todos: 0";
button.textContent = "Load More";

todoRender.appendChild(count);
todoRender.appendChild(button);

async function fetchData(skipValue) {
    try {
        const response = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skipValue}`);
        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const fragment = document.createDocumentFragment();

        data.todos.forEach((item) => {
            todos.push(item);
            const li = document.createElement("li");
            li.textContent = item.todo;
            fragment.appendChild(li);
        });

        todoRender.appendChild(fragment);
        count.textContent = `Loaded Todos: ${todos.length}`;
        skipTodos += data.todos.length;

        if (todos.length >= maxTodos) {
            button.style.display = "none";
        }
    } catch (error) {
        console.error(
            "Error fetching todos:",
            error
        );
    } finally {
        if (todos.length < maxTodos) {
            button.disabled = false;
        }
    }
};

button.addEventListener("click", () => {
    fetchData(skipTodos);
});

fetchData(skipTodos);

// -----------------------------------------------------------------------------------------------------

// Comments
const commentRender = document.getElementById("comments");

let commenting = [];
let skipComments = 0;

async function fetchComment(skipValue) {
    const response = await fetch(
        `https://dummyjson.com/comments?limit=5&skip=${skipValue}`
    );

    const data = await response.json();

    const newComments = data.comments.map(comm => ({
        ...comm, isNew: skipValue !== 0
    }));

    commenting = [...commenting, ...newComments];

    renderComments();

    if (skipValue !== 0) {
        setTimeout(() => {
            commenting = commenting.map(commenting => ({
                ...commenting, isNew: false
            }));

            renderComments();
        }, 5000)
    }
}

function renderComments() {
    commentRender.innerHTML = "";
    commenting.forEach(comment => {
        const div = document.createElement("div");
        div.textContent = comment.body;

        if (comment.isNew) {
            div.classList.add("newComments");
        }

        commentRender.appendChild(div);
    });
}

fetchComment(skipComments);

// setInterval(() => {
//     skipComments += 5;
//     fetchComment(skipComments);
// }, 5000);

// -----------------------------------------------------------------------------------------------------


const  url = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        users.forEach(user => {
            console.log("Name:", user.name);
            console.log("Username:", user.username);
            console.log("Company Name:", user.company.name);

        });
    } catch (error) {
        console.error(error.message);
    }
}

getUsers();