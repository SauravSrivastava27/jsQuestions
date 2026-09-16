// Implement your own bind() function.

function multiply(a, b) {
    return a * b;
}

const double = multiply.bind();

// console.log(double(59, 2));

// -----------------------------------------------------------------------------------------------------
const dabba = document.getElementById("practiceAsync");
const limitDusrawala = 5;
let skip = 0;
let answer = [];

async function fetchData(skipValue) {
    const response = await fetch(`https://dummyjson.com/comments?limit=${limitDusrawala}&skip=${skipValue}`);
    const data = await response.json();

    const storePrevious = data.comments.map(comm => ({
        ...comm, isNew: skipValue !== 0 ? true : false
    }));

    answer = [...storePrevious, ...answer];
    // console.log(answer);
    renderNewData();
}

function renderNewData() {
    const htmlString = answer.map((comment, index) => {
        const newClass = comment.isNew ? "new" : "";
        return (
            `<div class=${newClass}>${comment.body}</div>`
        )
    });
    dabba.innerHTML = htmlString.join("");

    if (skip !== 0) {
        setInterval(() => {
            answer = answer.map(comm => ({
                ...comm, isNew: false
            }));
        }, 5000);
    }

}

fetchData(skip);
// setInterval(() => {
//     skip += 5;
//     fetchData(skip);
// }, 5000);
