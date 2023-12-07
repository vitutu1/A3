document.addEventListener('DOMContentLoaded', function () {

    function submitProductForm() {
        
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const fabricationDate = document.getElementById('fabricationDate').value;
        const productCategory = document.getElementById('productCategory').value;
        const isActive = document.getElementById('isActive').checked;

        const newProduct = {
            name: productName,
            description: productDescription,
            date_fabrication: fabricationDate,
            category: productCategory,
            is_active: isActive
        };

        fetch('http://127.0.0.1:8000/produtos/produtos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productResponseMessage = document.getElementById('productResponseMessage');
            productResponseMessage.textContent = 'Produto cadastrado com sucesso!';
            productResponseMessage.style.color = 'green';
            
            document.getElementById('productForm').reset();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            const productResponseMessage = document.getElementById('productResponseMessage');
            productResponseMessage.textContent = 'Erro ao cadastrar produto. Por favor, tente novamente mais tarde.';
            productResponseMessage.style.color = 'red';
        });
    }

    window.submitProductForm = submitProductForm;
});
