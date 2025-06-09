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

  linhas.forEach(linha => {
    
    const vetor = linha.trim().split(' ').map(Number);
    let direcao = null; 
    let seguro = true;

    for (let i = 1; i < vetor.length; i++) {
      
      const atual = vetor[i];
      const anterior = vetor[i - 1];
      const diferença = atual - anterior;

      //Verifica se o numero se repete
      if (diferença === 0) {
        seguro = false;
        break;
      }

      //Verifica se a diferença está entre 1 e 3
      if (Math.abs(diferença) < 1 || Math.abs(diferença) > 3) {
        seguro = false;
        break;
      }

      //Primeira instância de direção
      if (direcao === null) {
        //se a diferença for positiva, o numero é crescente
        direcao = diferença > 0 ? 'aumenta' : 'diminui';
      //se houver mudança de direção, não é seguro
      } else if ((direcao === 'aumenta' && diferença < 0) || (direcao === 'diminui' && diferença > 0)) {
        seguro = false;
        break;
      }

    }
    
    if (seguro) {
      matriz.push("Seguro");
      relatoriosSeguros++;
    } else {
      matriz.push("Inseguro");
    }

  });

  console.log('Relatórios Seguros:');
  console.log(relatoriosSeguros);
});
