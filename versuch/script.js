document.addEventListener('DOMContentLoaded', function() {
    const numberContainer = document.getElementById('numberContainer');
    const question = document.getElementById('question');
    const jaButton = document.getElementById('jaButton');
    const neinButton = document.getElementById('neinButton');
    const playAgain = document.getElementById('playAgain');

    starteNeueRunde();

    function starteNeueRunde() {
        const zufallszahl = generiereZufallszahl();

        bevölkereNumberContainer(zufallszahl);
        addNumberClickListeners (zufallszahl);
    }

    function generiereZufallszahl() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function bevölkereNumberContainer(zufallszahl) {
        for (let i = 1; i <= 100; i++) {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.innerText = i;
            numberContainer.appendChild(numberElement);
            };
        }

    function addNumberClickListeners (zufallszahl) {
        numberContainer.querySelectorAll ('.number') .forEach(function(numElement){
            numElement.addEventListener('click', function(){
                handleNumberClick (parseInt (numElement.innerText), numElement, zufallszahl);
            });
        });
    }
    function handleNumberClick(selectedNumber, element, zufallszahl) {
        const outputElement = document.getElementById('output');
        
        if (selectedNumber == zufallszahl) {
            outputElement.innerText = `Herzlichen Glückwunsch! Du hast die Zahl ${selectedNumber} gefunden und den Zauberer besiegt.`;
            element.style.backgroundColor = '#13de1a'; // Grün für gesuchte Zahl

            // Deaktiviere Klicks nach Auswahl
            numberContainer.querySelectorAll('.number').forEach(function(numElement) {
                numElement.removeEventListener('click', handleNumberClick);
            });

            // Warte 3 Sekunden und zeige dann die Frage, ob erneut gespielt werden soll
            setTimeout(function() {
                showQuestion();
            }, 3000);
        } 
        
        else if (selectedNumber < zufallszahl) {
            outputElement.innerText = `Die gesuchte Zahl ist größer als ${selectedNumber}.`;
            element.style.backgroundColor = '#9500ff'; // Lila für größer
        } 
        
        else {
            outputElement.innerText = `Die gesuchte Zahl ist kleiner als ${selectedNumber}.`;
            element.style.backgroundColor = '#FF0000'; // Rot für kleiner
        }

        // Deaktivierung der Klicks nach Auswahl
        element.removeEventListener('click', handleNumberClick);
    }

    function showQuestion() {
        question.style.display = 'block';

        jaButton.addEventListener('click', function() {
            question.style.display = 'none';
            zurücksetztenSpiel(); //Zurücksetzten Spiel
        });

        neinButton.addEventListener('click', function() {
            question.style.display = 'none';
            const outputElement = document.getElementById('output');
            outputElement.innerText = 'Bis zum nächsten Mal! Wenn du dich doch umentschieden hast, dann lade die Seite neu.';
        });
    }

    function zurücksetztenSpiel () {
        const outputElement = document.getElementById ('output');
        outputElement.innerText = 'Schaffst du es nochmal? Wähle eine Zahl zwischen 1 und 100.';
        numberContainer.innerHTML = ''; //Lösche vorhandene Zahlen
        starteNeueRunde ();
    }
});
