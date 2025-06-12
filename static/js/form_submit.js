document.getElementById('formularioPedido').addEventListener('submit', function (e) {
    e.preventDefault();

    const pedido = {
        nome: document.getElementById('nome').value,
        pino1: [
            document.getElementById('p1_peca1').value,
            document.getElementById('p1_peca2').value,
            document.getElementById('p1_peca3').value
        ],
        pino2: [
            document.getElementById('p2_peca1').value,
            document.getElementById('p2_peca2').value,
            document.getElementById('p2_peca3').value
        ],
        pino3: [
            document.getElementById('p3_peca1').value,
            document.getElementById('p3_peca2').value,
            document.getElementById('p3_peca3').value
        ]
    };

    fetch('http://localhost:1880/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
