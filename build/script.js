let data = [];

// Load JSON data
fetch('build/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data); // Debugging output
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

const exampleMetabolites = ["Ifosfamide", "Hydrocodone","Oxcarbazepine","Levetiracetam"];

function fillExample() {
    const randomIndex = Math.floor(Math.random() * exampleMetabolites.length);
    document.getElementById('drug').value = exampleMetabolites[randomIndex];
}

function queryDisease() {
    const drug = document.getElementById('drug').value.trim().toLowerCase();
    const modalResultsDiv = document.getElementById('modal-results');
    const modal = document.getElementById('myModal');

    modalResultsDiv.innerHTML = ''; // Clear previous results

    if (!drug) {
        modalResultsDiv.innerHTML = 'Please enter a drug.';
        modal.style.display = "block";
        return;
    }

    // Find associated diseases
    const results = data.filter(item => item.drug && item.drug.toLowerCase() === drug);

    if (results.length > 0) {
        const output = results.map(item => `${item.disease} (Score: ${item.score})`).join('<br>');
        modalResultsDiv.innerHTML = 'Diseases:<br>' + output;
    } else {
        modalResultsDiv.innerHTML = 'No diseases found for this drug.';
    }
    modal.style.display = "block"; // Show modal
}

function clearInput() {
    document.getElementById('drug').value = '';
    closeModal();
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// Close modal on click
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}
