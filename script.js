document.getElementById('createStrip').addEventListener('click', createFlightStrip);
document.getElementById('deleteMode').addEventListener('click', toggleDeleteMode);

let isDeleteMode = false;

function createFlightStrip() {
    // Generate a random squawk code
    const squawk = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    // Create the flight strip
    const strip = document.createElement('div');
    strip.className = 'flight-strip';
    strip.draggable = true;
    strip.id = `strip-${Date.now()}`;
    strip.innerHTML = `
        <button class="minimize-btn">▼</button>
        <div class="row callsign-row">
            <input type="text" class="callsign-input" placeholder="CALLSIGN" style="width: 48%;">
            <input type="text" class="type-input" placeholder="TYPE" style="width: 48%;">
        </div>
        <div class="row">
            <label for="squawk"><strong>Squawk:</strong></label>
            <input type="text" id="squawk" value="${squawk}" maxlength="4" style="width: 60px;">
        </div>
        <div class="row">
            <input type="text" placeholder="DEP" style="width: 30%;">
            <input type="text" placeholder="ARR" style="width: 30%;">
            <input type="text" placeholder="FLT" style="width: 30%;">
        </div>
        <input type="text" placeholder="FLTPLN">
        <input type="text" placeholder="Notes">
        <div class="clearance-status">
            <label for="clearance">Clearance Status:</label>
            <select id="clearance">
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="pending">Pending</option>
                <option value="arriving">Arriving</option>
            </select>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners
    strip.querySelector('.delete-btn').addEventListener('click', () => deleteStrip(strip.id));
    strip.addEventListener('dragstart', dragStart);
    strip.addEventListener('dragend', dragEnd);

    // Add minimize/expand functionality
    const minimizeBtn = strip.querySelector('.minimize-btn');
    minimizeBtn.addEventListener('click', () => {
        strip.classList.toggle('minimized');
        minimizeBtn.textContent = strip.classList.contains('minimized') ? '►' : '▼';
    });

    // Append the strip to the departure column
    document.getElementById('departure').appendChild(strip);
}

function toggleDeleteMode() {
    isDeleteMode = !isDeleteMode;
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => button.classList.toggle('visible', isDeleteMode));
}

function deleteStrip(stripId) {
    const strip = document.getElementById(stripId);
    if (strip) {
        strip.remove();
    }
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('dragging');
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggable = document.getElementById(id);
    const targetColumn = event.target.closest('.column');

    if (targetColumn) {
        // Remove any existing column-specific classes
        draggable.classList.remove(
            'departure-strip',
            'approach-strip',
            'ground-strip',
            'tower-strip'
        );

        // Add a class based on the target column
        if (targetColumn.id === 'departure') {
            draggable.classList.add('departure-strip');
        } else if (targetColumn.id === 'approach') {
            draggable.classList.add('approach-strip');
        } else if (targetColumn.id === 'ground') {
            draggable.classList.add('ground-strip');
        } else if (targetColumn.id === 'tower') {
            draggable.classList.add('tower-strip');
        }

        // Append the strip to the target column
        targetColumn.appendChild(draggable);
    }
}

// Airport frequency data with custom center names
const airportFrequencies = {
    "IBAR": {
        tower: "118.080",
        ground: "N/A",
        centers: [
            { name: "N/A", frequency: "N/A" },
            { name: "N/A", frequency: "N/A" },
            { name: "N/A", frequency: "N/A" }
        ]
    },
    "IHEN": {
        tower: "122.800",
        ground: "N/A",
        centers: [
            { name: "N/A", frequency: "N/A" },
            { name: "N/A", frequency: "N/A" },
            { name: "N/A", frequency: "N/A" }
        ]
    },
    "ILAR": {
        tower: "121.200",
        ground: "199.400",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "IZOLIRANI CENTER", frequency: "124.640" }
        ]
    },
    "IIAB": {
        tower: "127.250",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "IZOLIRANI CENTER", frequency: "124.640" }
        ]
    },
    "IPAP": {
        tower: "119.900",
        ground: "120.800",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "IZOLIRANI CENTER", frequency: "124.640" }
        ]
    },
    "IGRV": {
        tower: "118.300",
        ground: "121.900",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "TOKYO CENTER", frequency: "132.300" }
        ]
    },
    "IJAF": {
        tower: "119.100",
        ground: "121.700",
        centers: [
            { name: "LARNACA CENTER", frequency: "126.300" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "PERTH CENTER", frequency: "135.250" }
        ]
    },
    "IZOL": {
        tower: "118.700",
        ground: "121.900",
        centers: [
            { name: "LARNACA CENTER", frequency: "126.300" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "PERTH CENTER", frequency: "135.250" }
        ]
    },
    "ISCM": {
        tower: "118.220",
        ground: "N/A",
        centers: [
            { name: "LARNACA CENTER", frequency: "126.300" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "PERTH CENTER", frequency: "135.250" }
        ]
    },
    "IDSC": {
        tower: "122.500",
        ground: "N/A",
        centers: [
            { name: "PERTH CENTER", frequency: "135.250" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "GRINDAVIK CENTER", frequency: "126.750" }
        ]
    },
    "ITKO": {
        tower: "118.800",
        ground: "118.225",
        centers: [
            { name: "PERTH CENTER", frequency: "135.250" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "GRINDAVIK CENTER", frequency: "126.750" }
        ]
    },
    "ILKL": {
        tower: "120.150",
        ground: "N/A",
        centers: [
            { name: "IZOLIRANI CENTER", frequency: "124.640" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "TOKYO CENTER", frequency: "132.300" }
        ]
    },
    "IPPH": {
        tower: "127.400",
        ground: "121.700",
        centers: [
            { name: "IZOLIRANI CENTER", frequency: "124.640" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "TOKYO CENTER", frequency: "132.300" }
        ]
    },
    "IGAR": {
        tower: "118.800",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "LARNACA CENTER", frequency: "126.300" }
        ]
    },
    "IBLT": {
        tower: "118.430",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "LARNACA CENTER", frequency: "126.300" }
        ]
    },
    "IRFD": {
        tower: "124.850",
        ground: "120.400",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "LARNACA CENTER", frequency: "126.300" }
        ]
    },
    "ITRC": {
        tower: "118.500",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "LARNACA CENTER", frequency: "126.300" }
        ]
    },
    "IBTH": {
        tower: "128.600",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "TOKYO CENTER", frequency: "132.300" },
            { name: "IZOLIRANI CENTER", frequency: "124.640" }
        ]
    },
    "ISAU": {
        tower: "118.205",
        ground: "130.880",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "GRINDAVIK CENTER", frequency: "126.750" },
            { name: "IZOLIRANI CENTER", frequency: "124.640" }
        ]
    },
    "ISKP": {
        tower: "118.400",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "IZOLIRANI CENTER", frequency: "124.640" }
        ]
    },
    "IMLR": {
        tower: "133.850",
        ground: "N/A",
        centers: [
            { name: "ROCKFORD CENTER", frequency: "124.850" },
            { name: "SOTAF CENTER", frequency: "128.600" },
            { name: "LARNACA CENTER", frequency: "126.300" }
        ]
    }
    // Add more airports as needed
};

// Get references to the dropdown and frequency display elements
const airportDropdown = document.getElementById('airport');
const towerFreq = document.getElementById('tower-freq');
const groundFreq = document.getElementById('ground-freq');
const center1Name = document.getElementById('center1-name');
const center1Freq = document.getElementById('center1-freq');
const center2Name = document.getElementById('center2-name');
const center2Freq = document.getElementById('center2-freq');
const center3Name = document.getElementById('center3-name');
const center3Freq = document.getElementById('center3-freq');

// Add event listener to the dropdown
airportDropdown.addEventListener('change', (event) => {
    const selectedAirport = event.target.value;

    if (selectedAirport && airportFrequencies[selectedAirport]) {
        const frequencies = airportFrequencies[selectedAirport];
        towerFreq.textContent = frequencies.tower;
        groundFreq.textContent = frequencies.ground;
        center1Name.textContent = frequencies.centers[0].name;
        center1Freq.textContent = frequencies.centers[0].frequency;
        center2Name.textContent = frequencies.centers[1].name;
        center2Freq.textContent = frequencies.centers[1].frequency;
        center3Name.textContent = frequencies.centers[2].name;
        center3Freq.textContent = frequencies.centers[2].frequency;
    } else {
        // Reset frequencies if no airport is selected
        towerFreq.textContent = "-";
        groundFreq.textContent = "-";
        center1Name.textContent = "-";
        center1Freq.textContent = "-";
        center2Name.textContent = "-";
        center2Freq.textContent = "-";
        center3Name.textContent = "-";
        center3Freq.textContent = "-";
    }
})

// Ground chart data (replace with actual image paths)
const groundCharts = {
    "IBAR": "path/to/ibar-ground-chart.jpg",
    "IHEN": "path/to/ihen-ground-chart.jpg",
    "ILAR": "path/to/ilar-ground-chart.jpg",
    "IIAB": "path/to/iiab-ground-chart.jpg",
    "IPAP": "path/to/ipap-ground-chart.jpg",
    "IGRV": "path/to/igrv-ground-chart.jpg",
    "IJAF": "path/to/ijaf-ground-chart.jpg",
    "IZOL": "path/to/izol-ground-chart.jpg",
    "ISCM": "path/to/iscm-ground-chart.jpg",
    "IDCS": "path/to/idcs-ground-chart.jpg",
    "ITKO": "path/to/itko-ground-chart.jpg",
    "ILKL": "path/to/ilkl-ground-chart.jpg",
    "IPPH": "path/to/ipph-ground-chart.jpg",
    "IGAR": "path/to/igar-ground-chart.jpg",
    "IBLT": "path/to/iblt-ground-chart.jpg",
    "IRFD": "path/to/irfd-ground-chart.jpg",
    "IMLR": "path/to/imlr-ground-chart.jpg",
    "ITRC": "path/to/itrc-ground-chart.jpg",
    "IBTH": "path/to/ibth-ground-chart.jpg",
    "ISAU": "path/to/isau-ground-chart.jpg",
    "ISKP": "path/to/iskp-ground-chart.jpg"
    // Add more airports and their ground chart paths as needed
};

// Get references to the ground chart button and popup
const viewGroundChartBtn = document.getElementById('view-ground-chart');
const groundChartPopup = document.getElementById('ground-chart-popup');
const groundChartImage = document.getElementById('ground-chart-image');
const closePopupBtn = document.getElementById('close-popup');

// Add event listener to the dropdown
airportDropdown.addEventListener('change', (event) => {
    const selectedAirport = event.target.value;

    if (selectedAirport && airportFrequencies[selectedAirport]) {
        const frequencies = airportFrequencies[selectedAirport];
        towerFreq.textContent = frequencies.tower;
        groundFreq.textContent = frequencies.ground;
        center1Name.textContent = frequencies.centers[0].name;
        center1Freq.textContent = frequencies.centers[0].frequency;
        center2Name.textContent = frequencies.centers[1].name;
        center2Freq.textContent = frequencies.centers[1].frequency;
        center3Name.textContent = frequencies.centers[2].name;
        center3Freq.textContent = frequencies.centers[2].frequency;

        // Show the "View Ground Chart" button if the airport has a ground chart
        if (groundCharts[selectedAirport]) {
            viewGroundChartBtn.classList.remove('hidden');
        } else {
            viewGroundChartBtn.classList.add('hidden');
        }
    } else {
        // Reset frequencies and hide the ground chart button
        towerFreq.textContent = "-";
        groundFreq.textContent = "-";
        center1Name.textContent = "-";
        center1Freq.textContent = "-";
        center2Name.textContent = "-";
        center2Freq.textContent = "-";
        center3Name.textContent = "-";
        center3Freq.textContent = "-";
        viewGroundChartBtn.classList.add('hidden');
    }
});

// Add event listener to the "View Ground Chart" button
viewGroundChartBtn.addEventListener('click', () => {
    const selectedAirport = airportDropdown.value;
    if (selectedAirport && groundCharts[selectedAirport]) {
        groundChartImage.src = groundCharts[selectedAirport];
        groundChartPopup.classList.remove('hidden');
    }
});

// Add event listener to the close button
closePopupBtn.addEventListener('click', () => {
    groundChartPopup.classList.add('hidden');
});

// Close the popup if the user clicks outside the content
groundChartPopup.addEventListener('click', (event) => {
    if (event.target === groundChartPopup) {
        groundChartPopup.classList.add('hidden');
    }
});