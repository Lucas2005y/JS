const fs = require('fs');

 function checkOrder(precedences, list) {
    let listcopy = [...list]; //Cria uma cópia da lista original para evitar modificações diretas
    let errorFound = false;
     //Itera por cada número na lista
     for (let i = 0; i < listcopy.length; i++) {
         const currentNumber = listcopy[i]; //Numero atual = anterior da regra
         //Itera por todos os números que vêm depois de 'currentNumber' na lista
         for (let j = i + 1; j < listcopy.length; j++) {
             const subsequentNumber = listcopy[j]; //Numero subsequente

             //Verificar se existe a regra de precedência.
             //Se 'subsequentNumber' existe como chave no Map,
             //E se o conjunto de números que 'subsequentNumber' vem anterior, contém 'currentNumber',
             //então a ordem na lista está invertida e, portanto, incorreta.
             if (precedences.has(subsequentNumber) && precedences.get(subsequentNumber).has(currentNumber)) {
                //console.log(`Ordem incorreta: ${currentNumber} deve vir antes de ${subsequentNumber}`);
                listcopy = moveElement(listcopy, j, i); //Move o elemento subsequente para a posição correta
                i--;
                errorFound = true;
                break;
             }
         }
     }
     //[0] = lista corrigida, [1] = ocorrência de erro
     return [listcopy, errorFound]; //A lista respeita todas as ordens de precedência
 }

function moveElement(array, from, to) {
  //Remove o elemento da posição inicial
  const element = array.splice(from, 1)[0]; 
  //Insere o elemento na nova posição
  array.splice(to, 0, element); 
  return array;
}

 //Lê o conteúdo do arquivo
 fs.readFile('InputEx5', 'utf8', (err, data) => {
     if (err) {
         console.error('Erro ao ler o arquivo:', err);
         return;
     }

     //Divide o conteúdo do arquivo em seções separadas por linhas em branco
     const sections = data.trim().split(/\n\s*\n/);

     //Extrai as regras de precedência da primeira seção
     const precedenceRulesList = sections[0].split('\n').map(line => line.trim());

     const precedences = new Map();
     //Organizadas em um Map, onde a chave é o número que deve vir antes,
     //e o valor é um Set de números que devem vir depois dele.
     //Map { 47 => Set { 53, 13,...}...}
     precedenceRulesList.forEach(rule => {
         const [before, after] = rule.split('|').map(Number);
         if (!precedences.has(before)) {
             precedences.set(before, new Set());
         }
         precedences.get(before).add(after);
     });

     //Listas de números da segunda seção
     const printListsNumbers = sections[1].split('\n').map(line => line.trim());
     const printLists = printListsNumbers.map(listStr => listStr.split(',').map(Number));

     let correctCount = 0;
     let sumMidOfLists = 0;

     //Verifica cada lista de números
     console.log(`---LISTAS CORRIGIDAS---`);
     printLists.forEach((list, index) => {
         //Chama a função checkOrder para verificar se a lista está correta passando o Map
         const isCorrect = checkOrder(precedences, list);
         const listValidated = isCorrect[0]; //Lista corrigida
         if (isCorrect[1]) {
             const midOfList = Math.floor(listValidated.length / 2);
             sumMidOfLists += listValidated[midOfList]; //Soma o elemento do meio da lista
             correctCount++;
             console.log(`Lista ${listValidated}`);
         }
     });

     console.log(`Total de listas verificadas: ${printLists.length}`);
     console.log(`Total de listas incorretas: ${correctCount}`);
     console.log(`Soma do meio das listas corretas: ${sumMidOfLists}`);
 });