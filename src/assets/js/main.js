import UserFactory from './modules/userFactory.js';
import { registerUser, loadUsers, createTable } from './modules/localStorage.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('regForm');
    const searchForm = document.getElementById('searchForm');

    if (window.location.pathname.endsWith('index.html')) {
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const name = form.name.value;
                const phone = form.phone.value;
                const email = form.email.value;
                const dateOfBirth = form.dateOfBirth.value;

                let user = UserFactory.createUser(name, phone, email, dateOfBirth);
                registerUser(user);

                form.reset();
                console.log(user);
            });
        }
    }

    if (window.location.pathname.endsWith('searchUsers.html')) {
        loadUsers();

       

        if (searchForm) {
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

                filteredUsers.forEach(user => {
                    const tr = createTable(user);
                    tbody.appendChild(tr);
                });

                const cleanSearch = document.getElementById('cleanSearch');
                cleanSearch.addEventListener('click', () => {
                    searchForm.reset();
                    loadUsers();
                });
                
            });
            
        }

        
    }
});
