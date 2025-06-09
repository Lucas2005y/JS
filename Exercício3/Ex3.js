const fs = require('fs');

//Lê o conteúdo do arquivo
fs.readFile('InputEx3', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }
  data = data.replace(/\s+/g, '');

  //Expressão regular para capturar apenas chamadas válidas de mul(n1,n2)
  const regex = /mul\((\d+),(\d+)\)/g;
  let sum;
  const resultados = [];
  //Aplica o regex ao conteúdo do vetor e atribui na constante
  const matches = [...data.matchAll(regex)];

  matches.forEach(match => {
    //Extrai os números e calcula a multiplicação
    const n1 = Number(match[1]);
    const n2 = Number(match[2]);
    const mul = n1 * n2;
    //Acumula o resultado
    sum = (sum || 0) + mul; 
    resultados.push([n1, n2]);
  });

  console.log(resultados); 
  console.log('Soma dos produtos:', sum);
});
