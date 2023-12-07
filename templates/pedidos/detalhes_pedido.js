document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os detalhes de um pedido da API
    function loadOrderDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('id');

        fetch(`http://127.0.0.1:8000/pedidos/pedidos/${orderId}/`)
            .then(response => response.json())
            .then(data => {
                displayOrderDetails(data);
            })
            .catch(error => console.error('Erro ao carregar detalhes do pedido:', error));
    }

    // Função para exibir os detalhes do pedido no HTML
    function displayOrderDetails(order) {
        const orderDetails = document.getElementById('orderDetails');
        orderDetails.innerHTML = '';

        const orderInfo = document.createElement('div');
        orderInfo.innerHTML = `
            <p><strong>Pedido #:</strong> ${order.id}</p>
            <p><strong>Total:</strong> R$ ${order.total_price.toFixed(2)}</p>
            <p><strong>Status:</strong> ${order.status}</p>
        `;
        orderDetails.appendChild(orderInfo);

        // Adicione aqui mais informações do pedido conforme necessário

        // Mostra as informações do cliente
        loadClientDetails(order.client);
    }

    // Função para carregar os detalhes do cliente da API
    function loadClientDetails(clientId) {
        fetch(`http://127.0.0.1:8000/clientes/clientes/${clientId}/`)
            .then(response => response.json())
            .then(data => {
                displayClientDetails(data);
            })
            .catch(error => console.error('Erro ao carregar detalhes do cliente:', error));
    }

    // Função para exibir os detalhes do cliente no HTML
    function displayClientDetails(client) {
        const orderDetails = document.getElementById('orderDetails');
    
        const clientInfo = document.createElement('div');
        clientInfo.innerHTML = `
            <h3>Dados do Cliente</h3>
            <p><strong>ID do Cliente:</strong> ${client.id}</p>
            <p><strong>Nome:</strong> ${client.first_name} ${client.last_name}</p>
            <p><strong>Email:</strong> ${client.email}</p>
            <p><strong>Endereço:</strong> ${client.address}</p>
            <p><strong>Telefone:</strong> ${client.cell_phone}</p>
            <!-- Adicione mais informações do cliente conforme necessário -->
        `;
        orderDetails.appendChild(clientInfo);
    }

    // Chama a função para carregar os detalhes do pedido
    loadOrderDetails();
});
