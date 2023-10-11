// Denna fil ska innehålla din lösning till uppgiften (moment 6).

"use strict";

/*  Delar till ej obligatorisk funktionalitet, som kan ge poäng för högre betyg
*   Radera rader för funktioner du vill visa på webbsidan. */
document.getElementById("player").style.display = "none";      // Radera denna rad för att visa musikspelare
document.getElementById("shownumrows").style.display = "none"; // Radera denna rad för att visa antal träffar

/* Här under börjar du skriva din JavaScript-kod */

// Variabler
let mainnavEl = document.getElementById("mainnav");
let numrowsEl = document.getElementById("numrows");
let logoEl = document.getElementById("logo");


// Händelsehanterare
numrowsEl.addEventListener("change", changeNumrows, false);
logoEl.addEventListener("click", loadFront, false);
window.onload = init;

// Initierings-funktion
function init() {

    getChannels();

}

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let content = this.responseXML;
        let channels = content.querySelectorAll("channel");

        // Skapar en lista för att lagra kanalnamn
        let channelNames = [];

        // Loopar igenom kanalerna och hämta namnen
        channels.forEach((channel) => {
            let name = channel.getAttribute("name");
            channelNames.push(name);
        });
        // Uppdaterar webbsidan med kanalnamnen
        let output = channelNames.map(name => `<li>${name}</li>`).join("");
        document.getElementById("mainnavlist").innerHTML = output;
    }
};
xhttp.open("GET", "http://api.sr.se/v2/channels/", true);
xhttp.send();


function getChannels() {

}

function changeNumrows() {

}

function loadFront() {

}
