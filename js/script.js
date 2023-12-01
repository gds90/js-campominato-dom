// definisco una funzione che genera un numero random; effettuo controllo, se il numero generato è già presente nell'array dei "numeri bomba", allora ne genero un altro finché sia diverso da quelli già presenti;

function generateRandomNumber(array_bombs, total_cells){

    // dichiaro una variabile flag che mi segnalerà se il numero è già presente nell'array o meno;
    let check_number = false;

    let randomNumber;

    while (check_number == false) {
        // genero il numero random in base alla difficoltà scelta
        randomNumber = Math.floor(Math.random() * total_cells + 1)

        // verifico che il numero appena generato non sia già nell'array
        if (array_bombs.includes(randomNumber) == false){

            //cambio il valore di flag per uscire dal ciclo
            check_number = true;
        }
    }

    // una volta uscito fuori dal ciclo while, ritorno il numero randomico generato
    return randomNumber;
}

// definisco una funzione che mi genera le 16 bombe
function generateBombNumbers(bomb_numbers, total_cells) {

    // dichiaro un'array vuoto
    let bombs = [];

    // genero le 16 bombe tramite un ciclo for
    for (let i = 0; i<bomb_numbers; i++){

        // push del numero random generato tramite la funzione precedentemente creata
        bombs.push(generateRandomNumber(bombs, total_cells));
    }

    // ritorno l'array con i 16 numeri bomba
    return bombs;
}


// creo una funzione che mi permette di creare una cella
function createCell(num, cellsPerRow){
    const cell = document.createElement('div');

    // aggiungo la classe 'cell' alla cella creata
    cell.classList.add('cell')

    cell.style.width = `calc(100% / ${cellsPerRow})`;
    cell.style.height = cell.style.width;

    // aggiungo il numero (x) all'interno della cella
    cell.innerText = num;

    return cell
}

// creo la funzione che mi genera la griglia in base al livello selezionato
function createGrid(){

    // recupero l'elemento che conterrà la griglia
    const grid = document.getElementById('grid');
    // svuoto l'elemento grid per evitare di generare più griglie 
    grid.innerHTML = "";

    document.getElementById('score').innerText = "";

    // BONUS
    // recupero l'elemento select che mi definirà la difficoltà scelta dall'utente
    const difficulty = document.getElementById('difficulty');
    const level = difficulty.value;

    // dichiaro una costante che mi rappresenta il numero fisso di bombe da generare
    const NUMBERS_OF_BOMBS = 16;

    // dichiaro una variabile che mi servirà in seguito per calcolarmi il punteggio del giocatore
    let points = 0;
    
    // dichiaro due variabili che mi indicheranno il numero di celle e il numero di righe della griglia
    let numCells;
    let cellsPerRow;
    
    // tramite uno switch, stabilisco da quante righe e celle dev'essere formata la griglia
    switch (level) {
        case '1':
            numCells = 100;
            break;
        case '2':
            numCells = 81;
            break;
        case '3':
            numCells = 49;
            break;
        default:
            alert('Scegli un livello di difficoltà prima di iniziare la partita');
            return;
    }
    // mi calcolo quante celle per riga tramite radice quadrata del numero totale di celle della griglia
    cellsPerRow = Math.sqrt(numCells);

    const bombs = generateBombNumbers(NUMBERS_OF_BOMBS, numCells)
    
    // a gioco iniziato, imposto la variabile flag gameInProgress su true
    gameInProgress = true;

    for (let i = 1; i <= numCells; i++){
        // richiamo della funzione che crea la cella
        let numberedCell = createCell(i, cellsPerRow);
                
        // creo un event listener per ogni cella creata che mi permette di colorarla di azzurro quando viene cliccata
        numberedCell.addEventListener('click', function(){
            if (gameInProgress){
                if (!bombs.includes(i)){
                    
                    this.classList.add('clicked');
        
                    points++;
                    
                    document.getElementById('score').innerText = `Il tuo punteggio totale è di ${points} punti`;
                }
                else {
                    // dichiaro una costante che mi contiene tutte le celle della griglia
                    const cells = document.querySelectorAll('.cell')

                    // ciclo le caselle della griglia e controllo se sia presente nell'array delle bombe
                    for (let i = 0; i < cells.length; i++){

                        // verifico se l'elemento ciclato è presente nell'array delle bombe
                        if (bombs.includes(parseInt(cells[i].innerText))){
                            cells[i].classList.add('clicked-bomb');
                        }
                    }

                    this.classList.add('clicked-bomb');
                    alert('Boom, hai perso!')
                    gameInProgress = false;
                }
            }
        })
            
        // appendo la cella appena creata in row
        grid.appendChild(numberedCell);
    }
    // controllo il valore della variabile flag gameInProgress
    if (!gameInProgress) {
        // impedisco all'utente di cliccare sulle altre celle se la partita è terminata
        grid.removeEventListener('click', handleClick);
        

    }

}

// recupero il bottone che genererà la griglia
const playButton = document.getElementById('play');

// associo al bottone recueperato un eventListener che mi permetterà di formare la griglia
playButton.addEventListener('click', function(){
    createGrid();
})

// dichiaro una variabile flag che mi servirà per permettere al gioco di interrompersi in caso di click su un numero bomba
let gameInProgress = false;
