// main.js
import UserFactory from './modules/userFactory.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('regForm');
    const searchForm = document.getElementById('searchForm');


    UserFactory.renderUsers();

    //registrar o usuario no localStorage e renderizar a tabela
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const dateOfBirth = form.dateOfBirth.value;

        let user = UserFactory.createUser(name, phone, email, dateOfBirth);
        user.register();
        
        UserFactory.renderUsers();
        form.reset(); 
        console.log(user);
    });

    //filtrar os usuarios 
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
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

        //renderizar a tabela com os usuarios filtrados
        filteredUsers.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.dateOfBirth.split("-").reverse().join("/")}</td>
                <td><button class="delete-btn" data-email="${user.email}">Delete</button></td>
            `;
            tbody.appendChild(tr);
        });

        
    });
});
