export function register(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === user.email)) {
      alert('Usuário já cadastrado com esse email.');
      return;
    }
  
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}
  
export function deleteUser(email) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
}
  
export function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
  
    users.forEach(user => {
        const tr = createTableRow(user);
        tbody.appendChild(tr);
      });
  
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const email = event.target.dataset.email;
        deleteUser(email);
        renderUsers();
      });
    });
}

export function createTable(user) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>${user.dateOfBirth.split("-").reverse().join("/")}</td>
      <td><button class="delete-btn" data-email="${user.email}">Delete</button></td>
    `;
    return tr;
  }
  