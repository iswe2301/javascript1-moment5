// Denna fil ska innehålla din lösning till uppgiften (moment 6).

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
// document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
// document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

// Variabler (lagrar DOM-element)
let mainnavlistEl = document.getElementById("mainnavlist");
let infoEl = document.getElementById("info");

// Händelsehanterare för när sidan laddad
window.onload = init;

// Initierings-funktion
function init() {

    // Anropar funktion som hämtar kanaler när sidan laddas
    getChannels();

}

// Funktion för att hämta kanaler från webbtjänst
function getChannels() {
    const url = "https://api.sr.se/v2/channels/?format=json&size=52"

    // Anropar webbtjänsten genom fetch-API. Hämtar url, ger tillbaka svaret i json.
    fetch(url)
        .then(response => response.json())
        // Anropar funktion med kanaler från data som argument
        .then(data => displayChannelNames(data.channels))
        // Hämtar eventuella fel
        .catch(error => console.log(error));
}

// Funktion för att hämta kanalernas namn och skriva ut till DOM
function displayChannelNames(channels) {
    // Loopar igenom och skapar listobjekt för varje kanal
    channels.forEach(channel => {
        // Skapar ett nytt listobjekt (li)
        let newListEl = document.createElement("li");
        // Skapar en ny textod med namn på kanalen
        let newListText = document.createTextNode(channel.name);
        // Lägger till kanalnamnet till listelementet
        newListEl.appendChild(newListText);
        // Lägger till listelementet till mainnavlist-element (ul)
        mainnavlistEl.appendChild(newListEl);

        // Lägger till en händelsehanterare för listobjekt vid hover, anonym arrow-funktion
        newListEl.addEventListener("mouseover", () => {
            newListEl.title = channel.tagline; // Ändrar listobjektens titel genom att hämta tagline från kanalen
        });

        // Lägg till en klickhändelsehanterare för listobjekt vid klick, anonym arrow-funktion
        newListEl.addEventListener("click", () => {
            // Deklarerar variabel för kanalernas tablåer i JSON-format
            let scheduleJson = `${channel.scheduleurl}&format=json&size=10000`;
            // Anropar funktionen getcheduele med kanalernas tablåschema (URL) som argument
            getSchedule(scheduleJson);
        });
    });
}

// Funktion för att hämta tablån för en specifik kanal
function getSchedule(scheduleUrl) {
    // Nollställer innehållet i elementet innan en ny tablå hämtas
    infoEl.innerHTML = '';

    // Gör en ny fetch för att hämta tablån från url:en
    fetch(scheduleUrl)
        // Ger tillbaka svaret i json
        .then(response => response.json())
        // Anropar funktion med tablå från data som argument
        .then(data => displaySchedule(data.schedule))
        // Hämtar eventuella fel
        .catch(error => console.log(error));
}

// Funktion för att visa tablån för specifik kanal
function displaySchedule(schedule) {
    schedule.forEach(schedule => {
        // Skapar nya element för artikel, rubriker samt paragraf
        let newArticleEl = document.createElement("article");
        let newH3El = document.createElement("h3");
        let newH5El = document.createElement("h5");
        let newPEl = document.createElement("p");

        // Skapar nya textoder för h3, h5 och p-element, hämtar objekt från tablå
        let newH3Text = document.createTextNode(schedule.title);
        let newH5Text = document.createTextNode(convertDate(schedule.starttimeutc, schedule.endtimeutc));
        let newPText = document.createTextNode(schedule.description);

        // Lägger till h3-element till artikel
        newArticleEl.appendChild(newH3El);
        // Kontrollerar om underrubrik finns
        if (schedule.subtitle) {
            // Skapar nytt element för h4 om underrubrik finns
            let newH4El = document.createElement("h4");
            // Skapar ny textnod för H4-elementet om underrubrik finns, hämtas från tablå
            let newH4Text = document.createTextNode(schedule.subtitle);
            // Lägger till h4-elementet till artikeln om underrubrik finns
            newArticleEl.appendChild(newH4El);
            // Lägger till h4-texten till h4 om underrubrik finns
            newH4El.appendChild(newH4Text);
        }

        // Lägger till h5 samt p-element till artikel
        newArticleEl.appendChild(newH5El);
        newArticleEl.appendChild(newPEl);

        // Lägger till h3, h5 samt ptext till elementen
        newH3El.appendChild(newH3Text);
        newH5El.appendChild(newH5Text);
        newPEl.appendChild(newPText);

        // Lägger till artikel till infoEl - elementet
        infoEl.appendChild(newArticleEl);
    })
}

// Funktion för att ta emot och konvertera datum
function convertDate(dateStr1, dateStr2) {
    let tempDate1 = new Date(parseInt(dateStr1.substr(7)));
    let tempDate2 = new Date(parseInt(dateStr2.substr(7)));
    let hours1 = tempDate1.getHours();
    let minutes1 = tempDate1.getMinutes();
    let hours2 = tempDate2.getHours();
    let minutes2 = tempDate2.getMinutes();

    if (hours1 < 10) {
        hours1 = "0" + hours1;
    }

    if (minutes1 < 10) {
        minutes1 = "0" + minutes1;
    }

    if (hours2 < 10) {
        hours2 = "0" + hours2;
    }

    if (minutes2 < 10) {
        minutes2 = "0" + minutes2;
    }

    let formattedTime1 = hours1 + ":" + minutes1;
    let formattedTime2 = hours2 + ":" + minutes2;

    // Returnerar som formaterad textsträng
    return `${formattedTime1} - ${formattedTime2}`;
}
