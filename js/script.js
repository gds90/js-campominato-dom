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