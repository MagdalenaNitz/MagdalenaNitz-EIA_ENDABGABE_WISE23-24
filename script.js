// Zufallsgenerierte Zahl zwischen 1 und 100
const zufallszahl = Math.floor(Math.random() * 100) + 1;

// Funktion zur Überprüfung der Eingabe und Rückmeldung
function checkGuess() {
    const inputField = document.querySelector('.inputForm_field');
    const eingabe = inputField.value;
    const zahl = parseInt(eingabe);

    if (isNaN(zahl) || zahl < 1 || zahl > 100) {
        document.getElementById('result').innerText = "Dies ist eine ungültige Antwort. Wähle bitte eine Zahl zwischen 1 und 100.";
        return;
    }

    let feedback = "";

    // Hier setzt du die Logik für das Überprüfen der Zahl
    // Ich verwende nur eine einfache Meldung für den Test
    if (zahl === zufallszahl) {
        feedback = "Juhu, du hast die Zahl geknackt.";
    } else if (zahl < zufallszahl) {
        feedback = "Die gesuchte Zahl ist größer als deine.";
    } else {
        feedback = "Die gesuchte Zahl ist kleiner als deine.";
    }

    // Zeige das Feedback an
    document.getElementById('result').innerText = feedback;

    // Setze einen Timer, um das Feedback nach 3 Sekunden zu löschen (3000 Millisekunden)
    setTimeout(function() {
        document.getElementById('result').innerText = "";
    }, 3000);

    // Leere das Eingabefeld
    inputField.value = "";
}

