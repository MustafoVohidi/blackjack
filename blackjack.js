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

//Отрисуем поля игроков
function paintFieldPLayer() {
    for (let i = 0; i < quantityPLayers.playerItems.length; i++) {
        let f = document.createElement('div');
        f.setAttribute('id', `player` + quantityPLayers.playerItems[i].id)
        f.classList.add("player_board");
        f.setAttribute('data-name', quantityPLayers.playerItems[i].name)
        players.append(f)
    }
}
paintFieldPLayer()

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
// console.log(distributionCard())

// console.log(quantityPLayers.playerItems)

// Функция которая активирует для игрока кнопки раздачи карты если у него суммарный балл меньше 21;
function activeDistribution(player) {
    let summ = 0;
    for (let s = 0; s < player.koloda.length; s++) {
        summ += player.koloda[s][2]
    }
    if (summ < 17) {
        player.distribiteActive = true;
        return player.distribiteActive
    } else {
        player.distribiteActive = false;
        return player.distribiteActive
    }
}
// Функция которая добавляет disabled на кнопку если суммарное число превышает 17
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
        console.log(activeDistribution(player))
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

// Функция которая создает карты 
console.log(quantityKoloda(), "quantityKoloda")
function createCard(quantityKoloda, deckOfcards) {
    // quantityKoloda()
    for (let q = 0; q < quantityKoloda.length; q++) {
        let cardItem = document.createElement('div');
        cardItem.classList.add('card_item');
        cardItem.setAttribute("data-card", quantityKoloda[q][0]);
        cardItem.setAttribute("data-deck", quantityKoloda[q][1]);
        cardItem.setAttribute("data-point", quantityKoloda[q][2]);
        let back = document.createElement("div");
        back.classList.add("back_img");
        let card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute("data-attr", quantityKoloda[q][3]);
        card.style.backgroundImage = `url("./image/` + (quantityKoloda[q][1] - 1) + `_` + quantityKoloda[q][0] + `.svg")`;
        card.append(back)
        cardItem.append(card)
        if (quantityKoloda[q][1] == 1 || quantityKoloda[q][1] == 3) {
            card.style.color = "black"
        } else if (quantityKoloda[q][1] == 2 || quantityKoloda[q][1] == 4) {
            card.style.color = "red"
        }
        deckOfcards.append(cardItem)
    }
}
createCard(quantityKoloda(), deckOfcards)
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

function hit() {



}
// Функция анимации перехода
function animateDistribute() {

}
document.getElementById('start').addEventListener('click', () => {
    // e.preventDefault()
    console.log("start", distributionCard())
    console.log(quantityPLayers.playerItems)
    for (let p = 0; p < quantityPLayers.playerItems.length; p++) {
        let deckOfcards = document.getElementById(`player` + quantityPLayers.playerItems[p].id);
        let hit = document.createElement('button');
        hit.setAttribute('type', 'button');
        hit.classList.add("hit_in_player");
        hit.textContent = "hit"
        deckOfcards.append(hit)
        createCard(quantityPLayers.playerItems[p].koloda, deckOfcards)
    }
    createCard(distributionCard(), deckOfcards)
    document.querySelectorAll('.hit_in_player').forEach(element => {
        element.addEventListener('click', () => {
            distributionCardOnDemand(quantityPLayers.playerItems[1])
            element.classList.add('active');
            // for (let qq = 0; qq < quantityPLayers.playerItems.length; qq++) {
            //     if (quantityPLayers.playerItems[qq].name == element.parentNode.getAttribute('data-name')) {
            //         distributionCardOnDemand(quantityPLayers.playerItems[qq])
            //     }
            //     console.log("this.getAttribute()", element.parentNode.getAttribute('data-name'))
            // }

            // let playerName = element.parentNode.getAttribute('data-name')
            console.log("this.getAttribute()", element.parentNode.getAttribute('data-name'))
        }, false)
    });


    document.getElementById('start').setAttribute('disabled', '')
}, false);
// document.getElementById('hit').addEventListener('click', () => {
//     distributionCardOnDemand()
// }, false)
player = {
    points: 10
}
diler = {
    points: 10
}