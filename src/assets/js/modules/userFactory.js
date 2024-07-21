// userFactory.js
export default class UserFactory {
    static createUser(name, phone, email, dateOfBirth) {

        return {
            name,
            phone,
            email,
            dateOfBirth,

            // metodo para registrar o usuário no localStorage
            register() {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // checar se o email já está cadastrado
                if (users.some(user => user.email === this.email)) {
                    alert('Usuário já cadastrado com esse email.');
                    return;
                } else{

                    users.push(this);
                    localStorage.setItem('users', JSON.stringify(users));
                }
            },

            // metodo para deletar o usuário do localStorage
            delete() {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users = users.filter(user => user.email !== this.email);
                localStorage.setItem('users', JSON.stringify(users));
            }
        };
    }

    // metodo para renderizar a tabela de usuários
    static renderUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        users.forEach(user => {
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

        //adicione o evento de deletar usuário
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const email = event.target.dataset.email;
                const userToDelete = users.find(user => user.email === email);
                if (userToDelete) {
                    const userInstance = UserFactory.createUser(userToDelete.name, userToDelete.phone, userToDelete.email, userToDelete.dateOfBirth);
                    userInstance.delete();
                    UserFactory.renderUsers();
                }
            });
        });
    }
}
