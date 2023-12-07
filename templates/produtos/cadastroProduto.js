document.addEventListener('DOMContentLoaded', function () {
    function submitProductForm() {
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const fabricationDate = document.getElementById('fabricationDate').value;
        const productCategory = document.getElementById('productCategory').value;
        const isActive = document.getElementById('isActive').checked;

        const productData = {
            name: productName,
            description: productDescription,
            date_fabrication: fabricationDate,
            category: productCategory,
            is_active: isActive,
        };

        
        fetch('http://127.0.0.1:8000/produtos/produtos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('productResponseMessage').textContent = 'Produto cadastrado com sucesso!';
            
            clearProductForm();
        })
        .catch(error => {
            console.error('Erro ao cadastrar produto:', error);
            
            document.getElementById('productResponseMessage').textContent = 'Erro ao cadastrar produto. Por favor, tente novamente.';
        });
    }

    function clearProductForm() {
        document.getElementById('productName').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('fabricationDate').value = '';
        document.getElementById('productCategory').value = '';
        document.getElementById('isActive').checked = true;
    }

    window.submitProductForm = submitProductForm;
});
