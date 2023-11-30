document.addEventListener('DOMContentLoaded', function () {

    function submitForm() {
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const cellPhone = document.getElementById('cellPhone').value;
        const address = document.getElementById('address').value;
        const gender = document.getElementById('gender').value;


        const newClient = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            cell_phone: cellPhone,
            address: address,
            gender: gender
        };

      
        fetch('http://127.0.0.1:8000/clientes/clientes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClient),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
         
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.textContent = 'Cliente cadastrado com sucesso!';
            responseMessage.style.color = 'green';
            
            document.getElementById('clientForm').reset();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.textContent = 'Erro ao cadastrar cliente. Por favor, tente novamente mais tarde.';
            responseMessage.style.color = 'red';
        });
    }

    
    window.submitForm = submitForm;
});

