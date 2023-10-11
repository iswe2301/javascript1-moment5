// Denna fil ska innehålla din lösning till uppgiften (moment 6).

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
// document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
// document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

// Variabler
let mainnavEl = document.getElementById("mainnav");

// Händelsehanterare
window.onload = init;

// Initierings-funktion
function init() {

    getChannels();

}

// Funktion för att hämta data från webbtjänst
function getChannels() {
    const url = "https://api.sr.se/v2/channels/?format=json&size=52"

    // Anropar webbtjänsten genom fetch-API. Hämtar url, ger tillbaka svaret i json.
    fetch(url)
        .then(response => response.json())
        .then(data => displayChannelNames(data.channels))
        .catch(error => console.log(error));
}

// Funktion för att ta emot och skriva ut kanalernas namn
function displayChannelNames(channels) {
    // Loopar igenom och skriver ut till DOM
    channels.forEach(channel => {
        // Utskriftsformat
        let newListEl = document.createElement("li");
        let newListText = document.createTextNode(channel.name);
        newListText.addEventListener("click", displayPrograms(), false);

        newListEl.appendChild(newListText);
        mainnavEl.appendChild(newListEl);
    });
}

function displayPrograms() {

}
