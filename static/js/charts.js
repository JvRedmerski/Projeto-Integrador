async function carregarGraficos() {
  const resposta = await fetch("/api/dados_dashboard");
  const dados = await resposta.json();

  // Gráfico de peças
  const dadosPecas = {
    labels: dados.pecas.labels,
    datasets: [{
      data: dados.pecas.quantidades,
      backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6384']
    }]
  };

  const configPecas = {
    type: 'doughnut',
    data: dadosPecas,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  };

  // Gráfico de pedidos por cliente
  const dadosClientes = {
    labels: dados.clientes.labels,
    datasets: [{
      label: 'Pedidos',
      data: dados.clientes.quantidades,
      backgroundColor: '#00c2c2'
    }]
  };

  const configClientes = {
    type: 'bar',
    data: dadosClientes,
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };

  new Chart(document.getElementById('pecasChart'), configPecas);
  new Chart(document.getElementById('clientesChart'), configClientes);
}

carregarGraficos();
