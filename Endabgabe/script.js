document.addEventListener('DOMContentLoaded', function() {
    const numberContainer = document.getElementById('numberContainer');
    const question = document.getElementById('question');
    const jaButton = document.getElementById('jaButton');
    const neinButton = document.getElementById('neinButton');
    // Spiel starten
    startNewRound();

    // Funktion zum Starten einer neuen Runde
    function startNewRound() {
        const randomNumber = generateRandomNumber();

        fillNumberContainer(randomNumber);
        addNumberClickListeners(randomNumber);
    }

    // Funktion zur Generierung einer Zufallszahl zwischen 1 und 100
    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Funktion zum Befüllen des Number Containers mit Zahlen von 1 bis 100
    function fillNumberContainer(randomNumber) {
        for (let i = 1; i <= 100; i++) {
            const numberElement = createNumberElement(i);
            numberContainer.appendChild(numberElement);
        }
    }

    // Funktion zum Hinzufügen von Click-Event-Listenern für Zahlen
    function addNumberClickListeners(randomNumber) {
        const numberElements = numberContainer.querySelectorAll('.number');
        numberElements.forEach(function(numElement) {
            numElement.addEventListener('click', function() {
                handleNumberClick(parseInt(numElement.innerText), numElement, randomNumber);
            });
        });
    }

    // Funktion zum Verarbeiten von Klicks auf Zahlen
    function handleNumberClick(selectedNumber, element, randomNumber) {
        const outputElement = document.getElementById('output');

        if (selectedNumber === randomNumber) {
            outputElement.innerText = `Herzlichen Glückwunsch! Du hast die Zahl ${selectedNumber} gefunden und den Zauberer besiegt.`;
            element.style.backgroundColor = '#13de1a';

            //Deaktiviere Klicks nach Auswahl
             deactivateNumberClickListeners();
                    
             // Nach 3 Sekunden wird die Frage gestellt, ob man erneut spielen möchte
             setTimeout(showQuestion, 3000);
        } 
        
        else if (selectedNumber < randomNumber) {
            outputElement.innerText = `Die gesuchte Zahl ist größer als ${selectedNumber}.`;
            element.style.backgroundColor = '#9500ff';
        } 
        
        else {
            outputElement.innerText = `Die gesuchte Zahl ist kleiner als ${selectedNumber}.`;
            element.style.backgroundColor = '#FF0000';
        }

        // Deaktivierung der Klicks nach Auswahl
        element.removeEventListener('click', handleNumberClick);
    }

    // Funktion zum Anzeigen der Frage, ob nochmal spielen
    function showQuestion() {
        question.style.display = 'block';

        jaButton.addEventListener('click', function() {
            question.style.display = 'none';
            resetGame();
        });

        neinButton.addEventListener('click', function() {
            question.style.display = 'none';
            const outputElement = document.getElementById('output');
                outputElement.innerText = 'Bis zum nächsten Mal! Wenn du dich doch umentschieden hast, dann lade die Seite neu.';
        });
    }

    // Funktion zum Zurücksetzen des Spiels
    function resetGame() {
        const outputElement = document.getElementById('output');
        outputElement.innerText = 'Schön, dass du den Zauberer nochmal herausfordern möchtet. Wähle eine Zahl.';
        numberContainer.innerHTML = '';
        startNewRound();
    }

    // Funktion zum Deaktivieren der Klick-Event-Listener für Zahlen
    function deactivateNumberClickListeners() {
        const numberElements = numberContainer.querySelectorAll('.number');
        numberElements.forEach(function(numElement) {
            numElement.style.pointerEvents = 'none';
        });
    }

    // Funktion zur Erstellung eines Number-Elements
    function createNumberElement(number) {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.innerText = number;
            return numberElement;
    }
});
