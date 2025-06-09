const fs = require('fs');


const pontoA = [];
const pontoB = [];
//const distancia = [];
let distancia = 0;

//Lê o conteúdo do arquivo
fs.readFile('InputEx1', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  //Divide o conteúdo em linhas
  const linhas = data.split('\n');

  //Processa cada linha
  linhas.forEach(linha => {
    //Divide o conteúdo da linha em partes
    const partes = linha.trim().split('   ');
    if (partes.length >= 2) {
    //Insere os pontos nos vetores
      pontoA.push(partes[0]);
      pontoB.push(partes[1]);
    }
  });



  pontoA.sort(); // ordena em ordem alfabética
  pontoB.sort(); // ordena em ordem alfabética ou numérica como string
  
  pontoA.forEach((valor, idx) => {
    distancia = distancia + Math.abs(pontoB[idx] - valor); //Ponto B - Ponto A = distância
    //console.log(Math.abs(pontoB[idx] - valor));
    
  });

  //console.log('Ponto A:', pontoA);
  //console.log('Ponto B:', pontoB);
  console.log('distancia: ', distancia);

});
