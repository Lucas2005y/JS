const fs = require('fs');

const matriz = [];
let relatoriosSeguros = 0;

//Lê o conteúdo do arquivo
fs.readFile('InputEx2', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  const linhas = data.trim().split('\n');

  linhas.forEach((linha, idx) => {
    const vetorOriginal = linha.trim().split(' ').map(Number);

    // Função que verifica se um vetor é seguro
    const ehSeguro = (vetor) => {
      let direcao = null;

      for (let i = 1; i < vetor.length; i++) {
        const diff = vetor[i] - vetor[i - 1];

        if (diff === 0 || Math.abs(diff) > 3) {
          return false;
        }

        if (direcao === null) {
          direcao = diff > 0 ? 'aumenta' : 'diminui';
        } else if ((direcao === 'aumenta' && diff < 0) || (direcao === 'diminui' && diff > 0)) {
          return false;
        }
      }

      return true;
    };

    //Verifica se o vetor original já é seguro
    if (ehSeguro(vetorOriginal)) {
      matriz.push("Seguro");
      relatoriosSeguros++;
    } else {
      //Tenta remover um único nível e verificar se fica seguro
      let ficouSeguro = false;

      for (let i = 0; i < vetorOriginal.length; i++) {
        const copia = [...vetorOriginal];
        copia.splice(i, 1); //remove o elemento na posição i

        // Verifica se a cópia do vetor é segura
        if (ehSeguro(copia)) {
          ficouSeguro = true;
          break;
        }
      }

      if (ficouSeguro) {
        matriz.push("Seguro");
        relatoriosSeguros++;
      } else {
        matriz.push("Inseguro");
      }
    }
  });

  console.log('Relatórios Seguros:');
  console.log(relatoriosSeguros);
});
