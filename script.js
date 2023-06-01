// Get all the buttons with the class name "btn"
const buttons = document.querySelectorAll('.btn');

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Reduce the saturation of the pressed button
    button.style.filter = 'saturate(50%)';
    
    // Reset the saturation after 500 milliseconds (0.5 seconds)
    setTimeout(() => {
      button.style.filter = 'none';
    }, 500);
  });
});


// Refresh Button til at hente nyt data
const refreshBtn = document.querySelector('.pumpFacilityRefreshBtn');
refreshBtn.addEventListener('click', () => {
//Husker side positionen
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

//genindlæser siden
    location.reload();

//scroller til den huskede position
    window.addEventListener('load', () => {
        window.scrollTo(0, scrollPosition);
    });
});

//Json indhold som skal bruges til at ændre alerts
const fetchPromise = fetch('errorcode.json');

fetchPromise
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        const result = json.errorcodes;
        console.log(result);

        // Random Resultat (mange tak GPT)
        const driftIndex = Math.floor(Math.random() * result.length);
        const doseringIndex = Math.floor(Math.random() * result.length);

        // viser det tilfældig valgte anlægs data 
        const driftData = result[driftIndex];
        const facilityStatus = document.querySelector('.facilityStatus');
        const facilityErrorStatus = facilityStatus.querySelector('.errorcode');
        facilityErrorStatus.textContent = `Status: ${driftData.status}`;

        // viser det tilfældig valgte pumpe data 
        const doseringData = result[doseringIndex];
        const pumpStatus = document.querySelector('.pumpStatus');
        const pumpErrorStatus = pumpStatus.querySelector('.errorcode');
        pumpErrorStatus.textContent = `Status: ${doseringData.status}`;

        // tilføjer baggrunds farve til anlæg
        facilityStatus.classList.add(driftData.severity.toLowerCase());

        // tilføjer baggrunds farve til pump 
        pumpStatus.classList.add(doseringData.severity.toLowerCase());

        // tilføjer icon til anlæg
        const facilityIcon = facilityStatus.querySelector('ion-icon');
        if (driftData.status === 'Ok') {
            facilityIcon.setAttribute('name', 'checkmark-outline');
        } else if (driftData.status === 'Fejl') {
            facilityIcon.setAttribute('name', 'alert-outline');
        } else if (driftData.status === 'Problem') {
            facilityIcon.setAttribute('name', 'close-outline');
        }

        // vælger icon und fra status 
        const pumpIcon = pumpStatus.querySelector('ion-icon');
        if (doseringData.status === 'Ok') {
            pumpIcon.setAttribute('name', 'checkmark-outline');
        } else if (doseringData.status === 'Fejl') {
            pumpIcon.setAttribute('name', 'alert-outline');
        } else if (doseringData.status === 'Problem') {
            pumpIcon.setAttribute('name', 'close-outline');
        }
    })
    .catch(error => {
        console.error(`Could not get error codes: ${error}`);
    });