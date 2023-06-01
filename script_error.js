
const fetchPromise = fetch('errorcode.json');

fetchPromise
    .then(response => {
        if (!response.ok) { // hvis der ikke kommer svar fra serveren, giver den en fejlmeddelelse
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json(); // hvis alt er ok, så fortsætter scriptet 
    })
    .then(json => {
        const result = json.errorcodes; // API'et returnerer JSON data og vi lægger det i result
        console.log(result); // result er et array
        for(const el of result){ // for...of loop af arrayet
            console.log(el); // her kan man se alle elementer i arrayet
        }

        // Add text content to h2: 
        const errorStatus = document.querySelector('.errorcode__status');
        errorStatus.textContent = `Status: ${result[2].status}`;
        const section = document.querySelector('.errorcode');
        if (result[2].severity === 'Good') {
            section.classList.add('good');
        }
            
    })
    .catch(error => {
        console.error(`Could not get products: ${error}`);
    });