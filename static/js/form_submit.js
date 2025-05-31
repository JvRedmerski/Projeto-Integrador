document.getElementById('formularioPedido').addEventListener('submit', function (e) {
    e.preventDefault();

    const pedido = {
        peca1: document.getElementById('peca1').value,
        peca2: document.getElementById('peca2').value,
        peca3: document.getElementById('peca3').value
    };

    fetch('http://localhost:1880/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
        .then(response => response.text())
        .then(data => {
            alert("Pedido enviado com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao enviar pedido:', error);
            alert("Erro ao enviar pedido.");
        });
});