document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar a lista de pedidos da API
    function loadOrders() {
        fetch('http://127.0.0.1:8000/pedidos/pedidos/')
            .then(response => response.json())
            .then(data => {
                displayOrders(data);
            })
            .catch(error => console.error('Erro ao carregar pedidos:', error));
    }

    // Função para exibir a lista de pedidos no HTML
    function displayOrders(orders) {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';

        orders.forEach(order => {
            const listItem = document.createElement('li');
            listItem.textContent = `Pedido #${order.id} - Total: R$ ${order.total_price.toFixed(2)}`;
            listItem.style.cursor = 'pointer';
            listItem.addEventListener('click', () => showOrderDetails(order.id));
            orderList.appendChild(listItem);
        });
    }

    // Função para redirecionar para a página de detalhes do pedido
    function showOrderDetails(orderId) {
        window.location.href = `detalhes_pedido.html?id=${orderId}`;
    }

    // Chama a função para carregar os pedidos
    loadOrders();
});
