
function redirectToPage(pageName) {
   
    document.getElementById('home').style.display = 'none';
    document.getElementById('cabins').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('galerie').style.display = 'none';
    document.getElementById('desprenoi').style.display = 'none';

  
    document.getElementById(pageName).style.display = 'block';

    
    loadContent(pageName, `${pageName}/${pageName}.html`);
}


function loadContent(containerId, pageUrl) {
 const container = document.getElementById(containerId);

    
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            
            container.innerHTML = data;
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function submitForm() {
    
    var lastName = document.forms["contactForm"]["lastName"].value;
    var firstName = document.forms["contactForm"]["firstName"].value;
    var email = document.forms["contactForm"]["email"].value;
    var phoneNumber = document.forms["contactForm"]["phoneNumber"].value;
    var acceptTerms = document.forms["contactForm"]["acceptTerms"].checked;

    if (lastName === "" || firstName === "" || email === "" || phoneNumber === "" || !acceptTerms) {
        alert("Toate câmpurile sunt obligatorii, inclusiv acceptarea termenilor și condițiilor.");
        return false;
    }

    
    alert("Formularul a fost trimis cu succes!");
    
    
    document.getElementById("contactForm").reset();
}


document.querySelector('nav a[href="#galerie"]').addEventListener('click', function () {
    redirectToPage('galerie');
});

document.querySelector('nav a[href="#desprenoi"]').addEventListener('click', function () {
    redirectToPage('desprenoi');
});

document.querySelector('nav a[href="#contact"]').addEventListener('click', function () {
    redirectToPage('contact');  
});

document.querySelector('nav a[href="#acasa"]').addEventListener('click', function () {
    redirectToPage('acasa');
});


function setupRezervaButton(cabinId) {
    const button = document.getElementById(cabinId).querySelector('.btn-primary');
    const remainingSpan = document.getElementById(`remaining-${cabinId}`);
    
    let isReserved = false;

    if (button) {
        button.addEventListener('click', function() {
            if (!isReserved) {
                rezerva(cabinId, remainingSpan);
                isReserved = true;
            }
        });
    }
}


function rezerva(cabinId, remainingSpan) {
    const button = document.getElementById(cabinId).querySelector('.btn-primary');

    if (button) {
        button.style.backgroundColor = '#ccc';
        button.style.cursor = 'not-allowed';
        button.innerHTML = 'Indisponibil';
        button.disabled = true;

        
        const remainingCount = parseInt(remainingSpan.innerText, 10);
        if (remainingCount > 0) {
            remainingSpan.innerText = (remainingCount - 1).toString();
        }
    }
}


setupRezervaButton('cabin1');
setupRezervaButton('cabin2');
setupRezervaButton('cabin3');
setupRezervaButton('cabin4');
setupRezervaButton('cabin5');
setupRezervaButton('cabin6');
