document.addEventListener('DOMContentLoaded', function() {
    const numberContainer = document.getElementById('numberContainer');

    // Starte die erste Runde
    starteNeueRunde();
    
    function starteNeueRunde() {
        // Zufallsgenerierte Zahl zwischen 1 und 100
        const zufallszahl = Math.floor(Math.random() * 100) + 1;

        for (let i = 1; i <= 100; i++) {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.innerText = i;
            numberElement.addEventListener('click', function() {
                handleNumberClick(i, numberElement, zufallszahl);
            });
            numberContainer.appendChild(numberElement);
        }
    }

    function handleNumberClick(selectedNumber, element, zufallszahl) {
        const outputElement = document.getElementById('output');
        
        if (selectedNumber === zufallszahl) {
            outputElement.innerText = `Herzlichen Glückwunsch! Du hast die Zahl ${selectedNumber} gefunden.`;
            element.style.backgroundColor = '#FFC0CB'; // Pink für gesuchte Zahl
            
            // Deaktiviere Klicks nach Auswahl
            element.removeEventListener('click', function() {
                handleNumberClick(selectedNumber, element, zufallszahl);
            });

            // Starte eine neue Runde nach einer kurzen Verzögerung
            setTimeout(function() {
                outputElement.innerText = 'Geben Sie eine Zahl zwischen 1 und 100 ein.';
                element.style.backgroundColor = '#4CAF50'; // Zurücksetzen der Hintergrundfarbe
                numberContainer.innerHTML = ''; // Lösche vorhandene Zahlen
                starteNeueRunde(); // Starte eine neue Runde
            }, 2000); // 2000 Millisekunden (2 Sekunden) Verzögerung
        } else if (selectedNumber < zufallszahl) {
            outputElement.innerText = `Die gesuchte Zahl ist größer als ${selectedNumber}.`;
            element.style.backgroundColor = '#0000FF'; // Blau für größer
        } else {
            outputElement.innerText = `Die gesuchte Zahl ist kleiner als ${selectedNumber}.`;
            element.style.backgroundColor = '#FF0000'; // Rot für kleiner
        }

        // Deaktiviere Klicks nach Auswahl
        element.removeEventListener('click', function() {
            handleNumberClick(selectedNumber, element, zufallszahl);
        });
    }
});
