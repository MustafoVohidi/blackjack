let cards = {
    card: {
        cardItem: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1],
        cardColor: [1, 2, 3, 4]
    }
}

let board = document.getElementById('board');
let deckOfcards = document.getElementById('deckOfcards');
let dilerInGame = document.getElementById('diler')
let players = document.getElementById('players')
let canvas = document.getElementById('canvas');
// Количество колок карты от 1-8
let koloda = {
    quantity: 1
}


// Количество игроков
let quantityPLayers = {
    quantity: 2,
    diler: 1,
    playerItems: [
        {
            id: 1,
            koloda: [],
            name: 'Diler',
            distribiteActive: false,
            distributeOnDemond: false,
        },
        {
            id: 2,
            koloda: [],
            name: 'Player 1',
            distribiteActive: false,
            distributeOnDemond: false,
        },
        {
            id: 3,
            koloda: [],
            name: 'Player 2',
            distribiteActive: false,
            distributeOnDemond: false,
        },

    ]
}
// Если колода одна в игре- колода перемешивается после каждой партии



// Функция которая создаст колода карты
function createCards() {
    let allCards = new Array;
    for (let j = 0; j < cards.card.cardColor.length; j++) {
        for (let i = 0; i < cards.card.cardItem.length; i++) {
            let cardi = new Array;
            cardi[0] = cards.card.cardItem[i];
            cardi[1] = cards.card.cardColor[j];
            if (cards.card.cardItem[i] > 10) {
                cardi[2] = 10;
            } else {
                cardi[2] = cards.card.cardItem[i];
            }
            switch (cards.card.cardItem[i]) {
                case 1:
                    cardi[3] = "T"
                    break
                case 2:
                    cardi[3] = "2"
                    break
                case 3:
                    cardi[3] = "3"
                    break
                case 4:
                    cardi[3] = "4"
                    break
                case 5:
                    cardi[3] = "5"
                    break
                case 6:
                    cardi[3] = "6"
                    break
                case 7:
                    cardi[3] = "7"
                    break
                case 8:
                    cardi[3] = "8"
                    break
                case 9:
                    cardi[3] = "9"
                    break
                case 10:
                    cardi[3] = "10"
                    break
                case 11:
                    cardi[3] = "J"
                    break

                case 12:
                    cardi[3] = "Q"
                    break
                case 13:
                    cardi[3] = "K"
                    break

                default:
                    break
            }
            allCards.push(cardi);
        }
    }
    return allCards
}
// console.log(createCards());

// В зависимости от количество колоды карты функция возврашает количество карт

function quantityKoloda() {
    let allKolods = new Array;
    for (let x = 0; x < koloda.quantity; x++) {
        let carty = createCards()
        for (let a = 0; a < carty.length; a++) {
            allKolods.push(carty[a])
        }

    }
    return allKolods;
}
// console.log(quantityKoloda())
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


// функция которая раздает всем игрокам карты в начале игры и возврашает остатки карты
function distributionCard() {
    let cards = shuffle(quantityKoloda());
    for (let x = 0; x < quantityPLayers.playerItems.length; x++) {
        for (let y = 0; y < 2; y++) {
            let b = cards.shift();
            // console.log(b, x)
            quantityPLayers.playerItems[x].koloda.push(b)
        }
    }
    return cards

}
// distributionCard()
console.log(distributionCard())

console.log(quantityPLayers.playerItems)

// Функция которая активирует для игрока кнопки раздачи карты если у него суммарный балл меньше 21;
function activeDistribution(player) {
    let summ = 0;
    for (let s = 0; s < player.koloda.length; s++) {
        summ += player.koloda[s][2]
    }
    if (summ < 21) {
        player.distribiteActive = true;
        return player.distribiteActive
    } else {
        player.distribiteActive = false;
        return player.distribiteActive
    }
}
for (let d = 0; d < quantityPLayers.playerItems.length; d++) {
    activeDistribution(quantityPLayers.playerItems[d]);
    console.log(quantityPLayers.playerItems[d].distribiteActive, d)
}

// функция которая раздает карты игрокам по их требованию 
function distributionCardOnDemand(player) {
    if (player.distribiteActive) {
        let xxx = distributionCard().shift();
        player.koloda.push(xxx)
        activeDistribution(player);
    }
}
//Если суммарный балл превышает 21 то игрок проиграет

// Выыгришняя ситуация
function winPlayer() {
    let arr = [];
    let arrId = []
    for (let d = 0; d < quantityPLayers.playerItems.length; d++) {
        let s = 0;
        console.log(quantityPLayers.playerItems[d].koloda)
        for (let q = 0; q < quantityPLayers.playerItems[d].koloda.length; q++) {
            s += quantityPLayers.playerItems[d].koloda[q][2]
        }
        arr.push(s)
        arrId.push(quantityPLayers.playerItems[d].id)
    }
    // Из всех игроков чей балл превышает 21 тот проиграет - обнулим их значение
    for (let a = 0; a < arr.length; a++) {
        if (arr[a] > 21) {
            arr[a] = 0;
        }
    }

    let win = Math.max.apply(Math, arr);
    let winPlayer = [];
    winPlayer[0] = win;
    for (let w = 0; w < arr.length; w++) {
        if (win == arr[w]) {
            winPlayer[1] = arrId[w]
        }
    }

    return winPlayer; //Возврашает количество балла и id игрока
}
console.log(winPlayer())


// Функция которая создает игроков
function createPlayer() {

}
//Если суммарный балл игрока и суммарный балл дилера равны то называется push
function pushStateGame(diler, player) {
    if (diler.points == player.points) {
        console.log("push");
    } else {
        console.log("выиграл")
    }
}
player = {
    points: 10
}
diler = {
    points: 10
}


// нарисуем на канвасе карты
function createIncanvasCard(quantity) {
    for (let d = 0; d < quantity.length; d++) {
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'black';
            ctx.strokeRect(90 * d, 0 * d, 80, 100);
            context = canvas.getContext("2d");
            context.font = "20px Verdana";
            if (quantity[d][3] == 1) {
                context.strokeStyle = "red";
            }else{
                context.strokeStyle = "black";
            }

            context.strokeText(quantity[d][3], 90 * d + 10, 20);
            context1 = canvas.getContext("2d");
            context1.font = "20px Verdana";
            context1.strokeStyle = "red";
            context1.strokeText(quantity[d][3], 90 * d + 50, 90);
        }
    }
    console.log(quantity)
}
createIncanvasCard(quantityKoloda())