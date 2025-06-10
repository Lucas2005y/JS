const fs = require('fs');

//Função principal para encontrar a palavra no caça-palavras
function findWord(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    let count = 0;

    //Todas as 8 direções possíveis (horizontal, vertical, diagonais, e suas inversões)
    const directions = [
        [0, 1],   //Horizontal para direita
        [0, -1],  //Horizontal para esquerda
        [1, 0],   //Vertical para baixo
        [-1, 0],  //Vertical para cima
        [1, 1],   //Diagonal para baixo e direita
        [1, -1],  //Diagonal para baixo e esquerda
        [-1, 1],  //Diagonal para cima e direita
        [-1, -1]  //Diagonal \para cima e esquerda
    ];

    //Itera por cada célula da grade
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            //Se a letra atual for o início da palavra (X), verifica em todas as direções
            //r = linha atual, c = coluna atual
            if (grid[r][c] === word[0]) {
                //Para verificar todas direções da lista Directions
                //move o código para todas direções possíveis
                for (const [dr, dc] of directions) {
                    let k;
                    let currentWord = '';
                    //Tenta construir a palavra em uma direção por vez
                    //wordLength é o tamanho da palavra XMAS, porém tem que ser decrescido de 1
                    for (k = 0; k < wordLength; k++) {
                        //Novas direções construídas
                        const newR = r + k * dr;
                        const newC = c + k * dc;

                        //Verifica se está dentro dos limites da grade
                        //Se newR e newC estiverem fora, significa que a palavra...
                        //...não pode ser formada completamente nessa direção a partir desse ponto
                        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
                          //Se a célula estiver dentro dos limites, a letra é adicionada à currentWord
                            currentWord += grid[newR][newC];
                        } else {
                            //Sai do loop se estiver fora dos limites
                            break;
                        }
                    }

                    //Se a palavra construída for igual à palavra procurada
                    if (currentWord === word) {
                        count++;
                    }
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

    const wordInput = 'XMAS';
    const output = findWord(grid, wordInput);

    console.log(`A palavra "${wordInput}" ocorre ${output} vezes.`);
});