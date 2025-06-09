const fs = require('fs');

//Lê o conteúdo do arquivo
fs.readFile('InputEx3', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }
  data = data.replace(/\s+/g, '');

  //Expressão regular para capturar apenas mul(n1,n2)
  const regex = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;
  let sum = 0;
  let doMul = true;

  let match;
  //Percorrer a string, encontrando cada trecho em ordem
  while ((match = regex.exec(data)) !== null) {
    //String completa
    const entrada = match[0]; 

    //Verifica se é do ou don't para habilitar ou desabilitar a multiplicação
    if (entrada.startsWith('do(')) {
      doMul = true;
    } else if (entrada.startsWith("don't(")) {
      doMul = false;
    } else if (entrada.startsWith('mul(')) {
      //Se for uma instrução mul, verifica se está habilitada
      if (doMul) {
        //Regex para extrair os números de dentro do mul(X,Y)
        const numbersMatch = entrada.match(/\d{1,3}/g);
        if (numbersMatch && numbersMatch.length === 2) {
          //Converte os números para inteiros e calcula o produto
          const num1 = Number(numbersMatch[0], 10);
          const num2 = Number(numbersMatch[1], 10);
          sum += num1 * num2;
        }
      }
    }
  }

  console.log('Soma dos produtos:', sum);
});
