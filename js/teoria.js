const ctx = document.getElementById('kineticLineChart').getContext('2d');
const kineticLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Antes del Choque', 'Después del Choque'],
        datasets: [
            {
                label: 'Energía Cinética Objeto 1',
                data: [50, 20], // Energía cinética en Joules
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            },
            {
                label: 'Energía Cinética Objeto 2',
                data: [30, 60], // Energía cinética en Joules
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});