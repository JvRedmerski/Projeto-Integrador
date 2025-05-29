// Dados fictícios — substitua com os dados reais do seu banco
    const dadosPecas = {
      labels: ['Camiseta', 'Calça', 'Jaqueta', 'Vestido', 'Saia'],
      datasets: [{
        data: [10, 15, 5, 8, 12],
        backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF6384']
      }]
    };

    const configPecas = {
      type: 'doughnut',
      data: dadosPecas,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: false
          }
        }
      }
    };

    const dadosClientes = {
      labels: ['10 Motives', 'West Wing', 'Joãozinho', 'Maria Moda', 'Loja XP'],
      datasets: [{
        label: 'Pedidos',
        data: [5, 3, 8, 2, 4],
        backgroundColor: '#00c2c2'
      }]
    };

    const configClientes = {
      type: 'bar',
      data: dadosClientes,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    };

    new Chart(document.getElementById('pecasChart'), configPecas);
    new Chart(document.getElementById('clientesChart'), configClientes);