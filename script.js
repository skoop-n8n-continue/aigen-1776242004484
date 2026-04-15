function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

function generateCalendar() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = now.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    document.getElementById('month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';

    // Day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const div = document.createElement('div');
        div.className = 'day-header';
        div.textContent = day;
        calendarGrid.appendChild(div);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    // Fill in previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const div = document.createElement('div');
        div.className = 'day other-month';
        div.textContent = prevMonthDays - i;
        calendarGrid.appendChild(div);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.className = 'day';
        if (i === today) div.classList.add('today');
        div.textContent = i;
        calendarGrid.appendChild(div);
    }

    // Next month days to fill grid (7x6 usually)
    const totalCells = 42;
    const remainingCells = totalCells - calendarGrid.children.length + 7; // +7 because headers aren't in cell count logic usually but I added them
    // Let's rethink cell count. Headers are 7. Days are firstDay + daysInMonth.
    const currentCells = (calendarGrid.children.length - 7);
    const cellsToFill = 42 - currentCells;

    for (let i = 1; i <= cellsToFill; i++) {
        const div = document.createElement('div');
        div.className = 'day other-month';
        div.textContent = i;
        calendarGrid.appendChild(div);
    }
}

const mockEvents = [
    { time: "09:00", title: "Morning Briefing", desc: "Main Conference Room" },
    { time: "11:30", title: "Product Sync", desc: "Design Studio" },
    { time: "14:00", title: "Client Presentation", desc: "Boardroom A" },
    { time: "16:30", title: "Team Wrap-up", desc: "Lounge Area" }
];

function populateEvents() {
    const container = document.getElementById('events-list');
    container.innerHTML = '';

    mockEvents.forEach(event => {
        const div = document.createElement('div');
        div.className = 'event-item';
        div.innerHTML = `
            <div class="event-time">${event.time}</div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p>${event.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

// Initial calls
updateClock();
generateCalendar();
populateEvents();

// Intervals
setInterval(updateClock, 1000);
// Refresh calendar every hour just in case day changes
setInterval(generateCalendar, 3600000);
