// --- 1. LOGIN & NAVIGATION LOGIC ---
document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login-view').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('login-view').style.display = 'none';
        document.getElementById('main-app-view').style.display = 'flex';
        initCharts(); // Initialize charts ONLY after the view is visible
    }, 500);
});

document.getElementById('logout-btn').addEventListener('click', () => { 
    location.reload(); 
});

const navItems = document.querySelectorAll('.nav-links .nav-item');
const sections = document.querySelectorAll('.app-section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Handle Active Class
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Hide all sections, show the target
        const targetId = item.getAttribute('data-target');
        sections.forEach(sec => sec.style.display = 'none');
        document.getElementById(targetId).style.display = 'block';
        
        // Update Title
        document.getElementById('page-title').innerText = item.innerText.trim();
    });
});

// --- 2. CHART.JS CONFIGURATION ---
const initCharts = () => {
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.color = "#636e72";

    // 1. Radar Chart (Deep Analytics)
    new Chart(document.getElementById('radarChart').getContext('2d'), {
        type: 'radar',
        data: {
            labels: ['pH Balance', 'Mineral (TDS)', 'Turbidity', 'Oxygen (DO)', 'Temperature'],
            datasets: [{ 
                label: 'Current Reading', 
                data: [85, 70, 95, 80, 75], 
                backgroundColor: 'rgba(116, 185, 255, 0.4)', 
                borderColor: '#74b9ff',
                pointBackgroundColor: '#74b9ff'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 2. Mixed Chart (Deep Analytics)
    new Chart(document.getElementById('mixedChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                { type: 'line', label: 'Avg Temp (°C)', data: [28, 32, 36, 33], borderColor: '#fab1a0', borderWidth: 3, tension: 0.4, yAxisID: 'y1' },
                { type: 'bar', label: 'Water Usage (L)', data: [13500, 15200, 19500, 16000], backgroundColor: 'rgba(162, 155, 254, 0.7)', borderRadius: 6, yAxisID: 'y' }
            ]
        },
        options: { 
            responsive: true, maintainAspectRatio: false,
            scales: { y: { position: 'left' }, y1: { position: 'right', grid: { drawOnChartArea: false } } } 
        }
    });

    // 3. Trend Line Chart (Deep Analytics)
    new Chart(document.getElementById('trendChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                { label: 'pH Variance', data: [7.1, 7.2, 7.0, 7.3, 7.2, 7.1, 7.2], borderColor: '#00b894', backgroundColor: 'rgba(0, 184, 148, 0.1)', fill: true, tension: 0.4 },
                { label: 'TDS Trend', data: [145, 148, 142, 155, 148, 150, 152], borderColor: '#0984e3', backgroundColor: 'rgba(9, 132, 227, 0.1)', fill: true, tension: 0.4 }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 4. Doughnut Chart (Dashboard Page)
    new Chart(document.getElementById('doughnutChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Shed A (Lactating)', 'Shed B (Calves)', 'Cleaning & Maintenance'],
            datasets: [{ 
                data: [60, 25, 15], 
                backgroundColor: ['#74b9ff', '#55efc4', '#a29bfe'], 
                borderWidth: 2, borderColor: '#ffffff'
            }]
        },
        options: { 
            responsive: true, maintainAspectRatio: false, 
            plugins: { legend: { position: 'right' } },
            cutout: '70%'
        }
    });
};

// --- 3. LIVE DATA SIMULATOR ---
let currentLevel = 75;
setInterval(() => {
    // Simulate tank filling/draining
    currentLevel += (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2);
    if (currentLevel > 100) currentLevel = 100; 
    if (currentLevel < 0) currentLevel = 0;

    // Update UI Elements
    document.getElementById('water-level-fill').style.width = `${currentLevel}%`;
    document.getElementById('water-level-text').innerText = `${Math.floor(currentLevel)}%`;
    
    // Simulate slight sensor fluctuations
    document.getElementById('ph-val').innerText = (7.0 + Math.random() * 0.4).toFixed(1);
    document.getElementById('tds-val').innerText = Math.floor(140 + Math.random() * 20);
}, 2500);