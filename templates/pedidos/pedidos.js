document.addEventListener('DOMContentLoaded', function () {
    
    let products = [];
    let orderItems = [];

    function fillSelectOptions(selectId, data, valueField, textField) {
        const select = document.getElementById(selectId);
        select.innerHTML = '';

        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            select.appendChild(option);
        });
    }

   
    function loadClients() {
        fetch('http://127.0.0.1:8000/clientes/clientes/')
            .then(response => response.json())
            .then(data => {
                clients = data.map(client => {
                    client.fullName = `${client.first_name} ${client.last_name}`;
                    return client;
                });
    
                clients.reverse();
    
                fillSelectOptions('clientSelect', clients, 'id', 'fullName');
            })
            .catch(error => console.error('Erro ao carregar clientes:', error));
    }
    
    
    loadClients();

    
    function searchClients() {
        const searchInput = document.getElementById('clientSearch').value.toLowerCase();
    
        const filteredClients = clients.filter(client =>
            client.fullName.toLowerCase().includes(searchInput)
        );
    
        fillSelectOptions('clientSelect', filteredClients, 'id', 'fullName');
    }
    
    document.getElementById('clientSearch').addEventListener('input', searchClients);

   
    function loadProducts() {
        fetch('http://127.0.0.1:8000/produtos/produtos/')
            .then(response => response.json())
            .then(data => {
                products = data;
                fillSelectOptions('productSelect', products, 'id', 'name');
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }


    window.addOrderItem = function () {
        const productId = document.getElementById('productSelect').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const unitaryPrice = parseFloat(document.getElementById('unitaryPrice').value);

        const orderItem = {
            product: productId,
            quantity: quantity,
            unitary_price: unitaryPrice
        };

        
        orderItems.push(orderItem);

        
        updateOrderItemList();

        
        document.getElementById('productSelect').value = '';
        document.getElementById('quantity').value = 1;
        document.getElementById('unitaryPrice').value = 0;
    };

    
    function updateOrderItemList() {
        const orderItemList = document.getElementById('orderItemList');
        orderItemList.innerHTML = '';

        orderItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.quantity}x ${item.product.name} - R$ ${item.unitary_price.toFixed(2)}`;
            orderItemList.appendChild(listItem);
        });

        
        updateTotalPrice();
    }

    
    function updateTotalPrice() {
        const totalPriceElement = document.getElementById('totalPrice');
        const totalPrice = orderItems.reduce((total, item) => total + item.quantity * item.unitary_price, 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    window.submitOrder = function () {
        
        const clientId = document.getElementById('clientSelect').value;
        const totalPrice = parseFloat(document.getElementById('totalPrice').textContent);

        
        if (orderItems.length === 0) {
            alert('Adicione itens ao pedido antes de finalizar.');
            return;
        }

        
        const orderData = {
            client: clientId,
            total_price: totalPrice,
            status: 'Finalizado',  
            order_item: orderItems.map(item => ({
                quantity: item.quantity,
                unitary_price: item.unitary_price,
                product: item.product,
            })),
        };

        
        fetch('http://127.0.0.1:8000/pedidos/pedidos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => response.json())
        .then(data => {
            
            document.getElementById('orderResponseMessage').textContent = 'Pedido finalizado com sucesso!';
            
            orderItems = [];
            updateOrderItemList();
        })
        .catch(error => {
            console.error('Erro ao finalizar pedido:', error);
            
            document.getElementById('orderResponseMessage').textContent = 'Erro ao finalizar pedido. Por favor, tente novamente.';
        });
    }

    
    loadClients();
    loadProducts();
});
