const fs = require('fs');

// Função principal para encontrar o padrão X-MAS no caça-palavras
function findXMASPattern(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    //A letra central do padrão 'X' é 'A' (de M-A-S)
    const centerCharInPattern = word[1]; // O 'A' de 'MAS'
    //As palavras que formam as linhas, em 'V' de 'X', são 'MAS' ou 'SAM'
    const wordOriginal = word; 
    const wordReversed = word.split('').reverse().join(''); // 'SAM'

    //Cada célula, o centro é 'A' do padrão X-MAS
    //O centro 'A' precisa ter células a uma posição de distância em todas as 4 diagonais
    //(r-1, c-1), (r-1, c+1), (r+1, c-1), (r+1, c+1)
    //Linhas e colunas devem ter pelo menos 1 de margem em cada lado.
    for (let r = 1; r < rows - 1; r++) { 
        for (let c = 1; c < cols - 1; c++) { 
            //R de 1 até rows-2 = 3 itens
            //C de 1 até cols-2 = 3 itens
            //Se a letra atual é 'A', ela pode ser o centro do padrão X-MAS
            if (grid[r][c] === centerCharInPattern) {

                //Duas diagonais se cruzam no 'A' central
                //Diagonal 1: (r-1, c-1) para A e A para (r+1, c+1)
                const diagonal1 = grid[r - 1][c - 1] + grid[r][c] + grid[r + 1][c + 1];

                //Diagonal 2: (r-1, c+1) para A e A para (r+1, c-1)
                const diagonal2 = grid[r - 1][c + 1] + grid[r][c] + grid[r + 1][c - 1];

                //Verifica se a Diagonal 1 forma 'MAS' ou 'SAM'
                const isDiagonal1Valid = (diagonal1 === wordOriginal || diagonal1 === wordReversed);

                //Verifica se a Diagonal 2 forma 'MAS' ou 'SAM'
                const isDiagonal2Valid = (diagonal2 === wordOriginal || diagonal2 === wordReversed);

                //Se as diagonais são válidas, encontra um padrão X-MAS
                if (isDiagonal1Valid && isDiagonal2Valid) {
                    count++;
                }
            }
        }
    }
    return count;
}

//Lê o conteúdo do arquivo
fs.readFile('InputEx4', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }

    //Remove espaços em branco e divide em linhas para criar a grade
    const grid = data.trim().split('\n').map(row => row.replace(/\s+/g, '').split(''));
    
    //A palavra base para as linhas do X (MAS)
    const word = 'MAS';
    const output = findXMASPattern(grid, word);

    console.log(`Um X-"${word}" aparece ${output} vezes.`);
});
