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
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Nome: ${item.first_name} ${item.last_name}, Endereço: ${item.address}, Telefone: ${item.cell_phone}, Email: ${item.email}, Genênero: ${item.gender}`;
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
});


