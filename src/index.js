const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};

const player3 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
};

const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};

const player5 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

const player6 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
};

let selectedPlayer1 = 0;
let selectedPlayer2 = 0;

async function getRandomPlayers() {
    let playerNumber1 = Math.floor(Math.random() * 6) + 1;
    let playerNumber2 = Math.floor(Math.random() * 6) + 1;

    switch(playerNumber1) {
        case 1:
            selectedPlayer1 = player1
            break;
        case 2:
            selectedPlayer1 = player2
            break;
        case 3:
            selectedPlayer1 = player3
            break;
        case 4:
            selectedPlayer1 = player4
            break;
        case 5:
            selectedPlayer1 = player5
        break;
        case 6:
            selectedPlayer1 = player6
        break;
        default:
            selectedPlayer1 = 0
    }

    switch(playerNumber2) {
        case 1:
            selectedPlayer2 = player1
            break;
        case 2:
            selectedPlayer2 = player2
            break;
        case 3:
            selectedPlayer2 = player3
            break;
        case 4:
            selectedPlayer2 = player4
            break;
        case 5:
            selectedPlayer2 = player5
        break;
        case 6:
            selectedPlayer2 = player6
        break;
        default:
            selectedPlayer2 = 0
    }
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO" 
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sorteio de bloco
        let block = await getRandomBlock();
        console.log(`Bloco ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice(); 
        let diceResult2 = await rollDice(); 

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character1.VELOCIDADE);
        }

        if(block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character1.MANOBRABILIDADE);
        }

        if(block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character1.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME} 🥊.`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character1.PODER);

            if(powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
            }

            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido." : "");
        }

        if(totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou 1 ponto.`);
            character1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou 1 ponto.`);
            character2.PONTOS++;
        }

        console.log("-----------------------------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`);

    if(character1.PONTOS > character2.PONTOS) 
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns 🏆`);
    else if(character2.PONTOS > character1.PONTOS) 
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns 🏆`);
    else console.log("A corrida terminou em empate.");        
}

(async function main() {

    await getRandomPlayers();

    console.log(
        `🏁🚦 Corrida entre ${selectedPlayer1.NOME} e ${selectedPlayer2.NOME} ...\n`
    );

    await playRaceEngine(selectedPlayer1, selectedPlayer2);

    await declareWinner(selectedPlayer1, selectedPlayer2);
})();