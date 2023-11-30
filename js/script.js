// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata (click su un pulsante... cosa dovrà essere chiamata? Quindi cosa dobbiamo definire prima?).
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.


// SUPER BONUS
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// creo una funzione che mi permette di creare una cella
function createCell(x){
    const cell = document.createElement('div');

    // aggiungo la classe 'cell' alla cella creata
    cell.classList.add('cell')

    // aggiungo il numero (x) all'interno della cella
    cell.innerText = x;

    return cell
}

// creo la funzione che mi genera la griglia in base al livello selezionato
function createGrid(){
    // svuoto l'elemento grid per evitare di generare più griglie 
    grid.innerHTML = "";

    // recupero l'elemento select che mi definirà la difficoltà scelta dall'utente
    const difficulty = document.getElementById('difficulty');
    level = difficulty.value
    
    // dichiaro due variabili che mi indicheranno il numero di celle e il numero di righe della griglia
    let numRows = 0;
    let numCells = 0;
    
    // tramite uno switch, stabilisco da quante righe e celle dev'essere formata la griglia
    switch (level) {
        case '1':
            numRows = 10;
            numCells = 100;
            break;
        case '2':
            numRows = 9;
            numCells = 81;
            break;
        case '3':
            numRows = 7;
            numCells = 49;
            break;
        default: 
            break;
    }
                
    // tramite un ciclo for, vado a crearmi le righe della griglia
    for (let i = 0; i < numRows; i++){
                    
        const row = document.createElement('div');
                    
            // tramite un ciclo for, vado a crearmi le celle in ogni riga;
            for (let x = 0; x < (numCells / numRows); x++){

                const cellNumber = ((x * numRows) + i + 1);

                let numberedCell = createCell(cellNumber);
                
                
                // creo un event listener per ogni cella creata che mi permette di colorarla di azzurro quando viene cliccata
                numberedCell.addEventListener('click', function(){
                    this.classList.toggle('clicked');
                    console.log("Hai cliccato la cella numero: " + numberedCell.textContent);
                })
                    
                // appendo la cella appena creata in row
                row.appendChild(numberedCell)
            }
                    
            // appendo la row alla griglia
            grid.appendChild(row);
                    
    }
}
// dichiaro una variabile che mi servirà per stabilire il livello di difficoltà
let level = '';

// recupero il bottone che genererà la griglia
const playButton = document.getElementById('play')

// recupero l'elemento che conterrà la griglia
const grid = document.getElementById('grid');

// associo al bottone recueperato un eventListener che mi permetterà di formare la griglia
playButton.addEventListener('click', function(){
    createGrid();
})
            
            
/* // CORREZIONE FABRIZIO 

// DEFINIZIONE DELLA FUNZIONE CHE CREA GRAFICAMENTE LA SINGOLA CASELLA
function createCell(num){
    const cell = document.createElement('div');

    cell.classList.add('cell');
    cell.style.width = `calc(100% / ${cells_in_row})`;
    cell.style.height = cell.style.width;
    cell.innerText = num;

    return cell;
}

function createGrid(cells_number, cells_in_row){
    for (let i=1; i<=cellsNumber; i++){
        // CREAZIONE DELLA SINGOLA CASELLA
        let cell = createCell(i, cells_in_row);
    
        // creo un event listener per ogni cella creata che mi permette di colorarla di azzurro quando viene cliccata
                numberedCell.addEventListener('click', function(){
                    this.classList.toggle('clicked');
                    console.log("Hai cliccato la cella numero: " + numberedCell.textContent);
                })
    
        grid.appendChild(cell);
    }
    
}

// DEFINIZIONE DELLA FUNZIONE CHE GENERA LA GRIGLIA DI GIOCO
function createNewGame(){
    const grid = document.getElementById('grid')

    const difficulty = document.getElementById('difficulty');
    let level = parseInt(difficulty.value);

    let cellsNumber;
    let cellsPerRow;

    switch(level){
        case 1:
            cellsNumber = 100;
            break;
        case 2:
            cellsNumber = 81;
            break;
        case 3:
            cellsNumber = 49;
            break;
        default:
            alert('Seleziona un livello di difficoltà prima di premere il pulsante')
            break;
    }

    cellsPerRow = Math.sqrt(cellsNumber);  -> radice quadrata di cellsNumber;


    grid.innerHTML = '';
    createGrid(cellsNumber, cellsPerRow);
    
}

// RECUPERO IL PULSANTE PLAY E GLI AGGIUNGO L'EVENT LISTENER
const play_btn = document.getElementById('play');
play_btn.addEventListener('click', function(){
    createNewGame();
})
*/

            
            
            
