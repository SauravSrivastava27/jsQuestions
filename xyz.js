const urlNew = "https://jsonplaceholder.typicode.com/users";

async function getUsers() {
  try {
    const response = await fetch(urlNew);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const table = document.getElementById("userTable");

    const users = await response.json();

    users.forEach(user => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
      `;

      table.appendChild(row);
    });
    
  } catch (error) {
    console.error(error.message);
  }
}

getUsers();