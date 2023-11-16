document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript está sendo executado!');

    const apiUrl = 'http://127.0.0.1:8000/produtos/produtos/';
    const resultsContainer = document.getElementById('results');

    function renderizarProdutos(data) {
        const resultList = document.createElement('div');
        resultList.classList.add('product-container');

        data.forEach(item => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const img = document.createElement('img');
            img.src = `imgs/${encodeURIComponent(item.name)}.png`;

            img.alt = item.name;

            const description = document.createElement('p');
            description.textContent = item.description;

            const link = document.createElement('a');
            link.href = '#'; // Substitua pelo link ou caminho real
            link.textContent = item.name;

            productItem.appendChild(img);
            productItem.appendChild(description);
            productItem.appendChild(link);

            resultList.appendChild(productItem);
        });

        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultList);
    }

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

                renderizarProdutos(data);
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                resultsContainer.innerHTML = '<p>Erro ao buscar dados. Por favor, tente novamente mais tarde.</p>';
            });
    }

    fetchData();
});
