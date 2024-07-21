import UserFactory from './modules/userFactory.js';
import { register, renderUsers } from './modules/localStorage.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('regForm');
  const searchForm = document.getElementById('searchForm');

  loadUsers();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const dateOfBirth = form.dateOfBirth.value;

    let user = UserFactory.createUser(name, phone, email, dateOfBirth);
    register(user);
    
    loadUsers();
    form.reset();
    console.log(user);
  });


  //pesquisa de usuários e criação da tabela com os resultados
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    //pesquisa o usuario pelo nome, telefone, email ou data de nascimento
    const searchTerm = searchForm.search.value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.phone.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.dateOfBirth.includes(searchTerm)
    );

    console.log(filteredUsers);

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    //cria a tabela com os resultados da pesquisa
    filteredUsers.forEach(user => {
        const tr = createTableRow(user);
        tbody.appendChild(tr);
      });
  });
});
