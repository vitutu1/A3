document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript está sendo executado!');

    const apiUrl = 'http://127.0.0.1:8000/clientes/clientes/';
    const resultsContainer = document.getElementById('results');

    function fetchData() {
        resultsContainer.innerHTML = '<p>Carregando...</p>';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Dados recebidos:', data);

                resultsContainer.innerHTML = '';

                const resultList = document.createElement('ul');
                resultList.classList.add('client-list');

                data.forEach(item => {
                    const listItem = document.createElement('li');

                    
                    const clientContainer = document.createElement('div');
                    clientContainer.classList.add('client-container');

                    const clientInfo = document.createElement('div');
                    clientInfo.classList.add('client-info');

                    
                    clientInfo.innerHTML = `
                        <p><strong>Nome:</strong> ${item.first_name} ${item.last_name}</p>
                        <p><strong>Email:</strong> ${item.email}</p>
                        <p><strong>Telefone:</strong> ${item.cell_phone}</p>
                        <p><strong>Endereço:</strong> ${item.address}</p>
                        <p><strong>Gênero:</strong> ${item.gender}</p>
                    `;

                    const copyButton = document.createElement('button');
                    copyButton.classList.add('copy-button');
                    copyButton.textContent = 'Copiar';
                    copyButton.addEventListener('click', function () {
                        copyToClipboard(clientInfo.textContent);
                    });

                    const editButton = document.createElement('button');
                    editButton.classList.add('edit-button');
                    editButton.textContent = 'Editar';
                    editButton.addEventListener('click', function () {
                        openEditModal(item);
                    });

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.addEventListener('click', function () {
                        
                        const shouldDelete = confirm('Tem certeza que deseja excluir este cliente?');
                        if (shouldDelete) {
                            deleteClient(item.id);
                        }
                    });

                    const actionsMenu = document.createElement('div');
                    actionsMenu.classList.add('actions-menu');
                    actionsMenu.appendChild(editButton);
                    actionsMenu.appendChild(deleteButton);

                    clientContainer.appendChild(clientInfo);
                    clientContainer.appendChild(copyButton);
                    clientContainer.appendChild(actionsMenu);

                    listItem.appendChild(clientContainer);
                    resultList.appendChild(listItem);
                });

                resultsContainer.appendChild(resultList);
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                resultsContainer.innerHTML = '<p>Erro ao buscar dados. Por favor, tente novamente mais tarde.</p>';
            });
    }

    fetchData();

    function copyToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        alert('Texto copiado para a área de transferência!');
    }

    function deleteClient(clientId) {
        const deleteUrl = `http://127.0.0.1:8000/clientes/clientes/${clientId}/`;

        fetch(deleteUrl, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            console.log('Cliente excluído com sucesso!');
            fetchData(); 
        })
        .catch(error => {
            console.error('Erro na requisição de exclusão:', error);
        });
    }

    function openEditModal(client) {
        
        const modal = document.createElement('div');
        modal.classList.add('edit-modal');
    
        const form = document.createElement('form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const updatedClient = {
                id: client.id,
                first_name: form.elements['first_name'].value.split(' ')[0],
                last_name: form.elements['first_name'].value.split(' ')[1],
                email: form.elements['email'].value,
                cell_phone: form.elements['phone'].value,
                address: form.elements['address'].value,
                gender: form.elements['gender'].value,
            };
    
            
            saveClientChanges(updatedClient);
            modal.remove(); 
        });
    
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Nome:';
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = `${client.first_name} ${client.last_name}`;
        nameInput.required = true;
        nameInput.name = 'first_name'; 
    
        const emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.value = client.email;
        emailInput.required = true;
        emailInput.name = 'email';
    
        const phoneLabel = document.createElement('label');
        phoneLabel.textContent = 'Telefone:';
        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.value = client.cell_phone;
        phoneInput.required = true;
        phoneInput.name = 'phone'; 
    
        const addressLabel = document.createElement('label');
        addressLabel.textContent = 'Endereço:';
        const addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.value = client.address;
        addressInput.required = true;
        addressInput.name = 'address';
    
        const genderLabel = document.createElement('label');
        genderLabel.textContent = 'Gênero:';
        const genderInput = document.createElement('select');
        const genderOptions = ['Masculino', 'Feminino', 'Outro'];
        genderOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.charAt(0); 
            optionElement.textContent = option;
            if (client.gender && client.gender.toUpperCase() === option.charAt(0)) {
                optionElement.selected = true;
            }
            genderInput.appendChild(optionElement);
        });
        genderInput.name = 'gender';
    
        const saveButton = document.createElement('button');
        saveButton.type = 'submit';
        saveButton.textContent = 'Salvar';
    
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancelar';
        cancelButton.addEventListener('click', function () {
            modal.remove(); 
        });
    
        form.appendChild(nameLabel);
        form.appendChild(nameInput);
        form.appendChild(emailLabel);
        form.appendChild(emailInput);
        form.appendChild(phoneLabel);
        form.appendChild(phoneInput);
        form.appendChild(addressLabel);
        form.appendChild(addressInput);
        form.appendChild(genderLabel);
        form.appendChild(genderInput);
        form.appendChild(saveButton);
        form.appendChild(cancelButton);
    
        modal.appendChild(form);
    
        document.body.appendChild(modal);
    }
    function saveClientChanges(updatedClient) {
        const updateUrl = `http://127.0.0.1:8000/clientes/clientes/${updatedClient.id}/`;

        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedClient),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            console.log('Cliente atualizado com sucesso!');
            fetchData(); 
        })
        .catch(error => {
            console.error('Erro na requisição de atualização:', error);
        });
    }
});
