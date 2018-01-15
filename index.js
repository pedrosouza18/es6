(function(){
  /* Transpilar com watch: npx babel script.js --watch --out-file script-compiled.js */
  /* http://babeljs.io/docs/usage/cli/ */

  "use strict";

  let number = 1;

  console.log(number);

  let myself = {
    firstName: "Pedro",
    lastName: "Souza",
    age: 21
  };

  let yourSelf = {
    age: 21
  }

  function showFullName() {
    console.log('Olá ' + this.firstName + " " + this.lastName);
  }

  function veificaIdades(){
    for(let i = 0; i < arguments.length; i++){
      if(this.age < arguments[i]){
        console.log(arguments[i]);
      }
    }
  }

  //Essas funções servem para reutilizar codigos passando através da função o contexto que ele quer usar
  showFullName.call(myself);
  showFullName.apply(myself);

  veificaIdades.call(myself , 30, 40, 15);

  function verificaParametro(){
    console.log(yourSelf.age);
    if(this.age == yourSelf.age){
      console.log('É igual');
    } else {
      console.log('É diferente');
    }
  }

  verificaParametro.call(myself);

  //Clousures

  //A função de dentro (hello) tem acesso ao escopo externo dela (init). Porém, ao sairmos de init, perdemos a visibilidade da função hello.
  //A capacidade de esconder informações também conhecida como: data privacy
  function init(){
    let nome = 'Pedro Souza';

    function hello(){
      console.log('Olá ' + nome);
    }

    hello();
  }

  init();

  //No escopo global (em um browser) o this se refere ao objeto window, tanto dentro quanto fora de uma função:
  document.write(this);   //[object Window]

  function func(){
    return this;
  }

  document.write(func());  //[object Window]

  //Quando usado dentro de um método de um objeto, o this se refere ao próprio objeto:

  let object = {
    func: function(){
      return this;
    }
  }

  console.log(object.func());  //[object Object]

  //E no caso de objetos aninhados, o this vai se referir ao objeto pai mais próximo:

  let father = {
      name: "father",
      child: {
          name: "child",
          func: function() {
              return this.name;
          }
      }
  }

  document.write(father.child.func());

  let objetoErro = {
      name: 'Matheus',
      friends: ['João', 'Ana' ],
      loop: function() {
          this.friends.forEach(function(friend) {
              console.log(this.name + ' knows ' + friend);
          });
      }
  };

  //objetoErro.loop();
  // TypeError: Cannot read property 'name' of undefined



  //O bind é muito semelhante ao call e apply: serve para passarmos um contexto para uma função, que não é dela, e podermos executá-la.
  //A diferença é que call e apply invocam a função imediatamente:
  let person = {
    name: "Matheus",
    hello: function(thing) {
      console.log(this.name + " disse Olá " + thing);
    }
  }

  person.hello.call(person, "Mundo"); // Matheus disse Olá Mundo

  //Enquanto bind retorna uma nova função que quando for executada terá o contexto que passamos.
  let person2 = {
    name: "Matheus",
    hello: function(thing) {
      console.log(this.name + " disse Olá " + thing);
    }
  }

  let hello = person.hello.bind(person2);
  hello("Mundo"); // Matheus disse Olá Mundo


  /*5) Map, Filter e Reduce
  Você provavelmente já passou por alguma situação em que era necessário por exemplo iterar sobre um array,
  ou então verificar se existe alguma propriedade nele ou mesmo simplesmente gerar um novo array com base no
  primeiro. Os métodos map, filter e reduce nos ajudam nessas situações além de começarmos a pensar mais em
  termos de programação funcional.*/
  /*Map:
  Dado um array qualquer, como podemos fazer para transformá-lo, ou mapeá-lo, em um outro array?
  Existe a forma difícil (sem map):*/

  let pessoas = [
    {
      id: 1,
      nome: 'Pedro Souza',
      idade: 21
    },
    {
      id: 2,
      nome: 'Rafaela Villela',
      idade: 20
    },
    {
      id: 3,
      nome: 'Pedro',
      idade: 25
    }
  ];

  //let newPessoas = pessoas.map(function(pessoa){
    //return pessoa;
  //});
  //MAP retorna um novo array e forEach somente percorre um array
  let newPessoas = pessoas.map(pessoa => pessoa);

  console.log(newPessoas);

  //Filter

  let months = [
      {shortName: 'JAN', fullName: 'Janeiro',  number: 1},
      {shortName: 'FEV', fullName: 'Fevereiro', number: 2},
      {shortName: 'MAR', fullName: 'Março', number: 3},
      {shortName: 'ABR', fullName: 'Abril', number: 4},
      {shortName: 'MAI', fullName: 'Maio', number: 5},
      {shortName: 'JUN', fullName: 'Junho', number: 6},
      {shortName: 'JULH', fullName: 'Julho', number: 7},
      {shortName: 'AGO', fullName: 'Agosto', number: 8},
      {shortName: 'SET', fullName: 'Setembro', number: 9},
      {shortName: 'OUT', fullName: 'Outubro', number: 10},
      {shortName: 'NOV', fullName: 'Novembro', number: 11},
      {shortName: 'DEZ', fullName: 'Dezembro', number: 12}
  ];

  let firstSixMonths = months.filter(month => month.number <= 6);

  console.log(firstSixMonths);

  let monthsAcc = firstSixMonths.reduce((acc , month) => acc + '/' + month.shortName , '');

  console.log(monthsAcc);


  //ES6 se consegue introduzir logo na função um valor padrão para que não seja undefined
  const multiply = (x, y = 1) => x * y;

  console.log(multiply(3, 2));

  /*Na versão atual do JavaScript podemos utilizar o objeto arguments para pegar todos os parâmetros de uma função:*/
  /*O arguments porém, apresenta alguns problemas:
  O objeto parece com um array, mas não é exatamente um
  Todos os parâmetros da função são automaticamente atribuídos ao arguments. Não temos uma forma clara de diferenciar os parâmetros.
  Com esses problemas em mente, os Rest Parameters foram adicionados no ES6. O mesmo exemplo da soma poderia ser reescrito dessa forma:*/
  function sum(...numbers){
    let result = 0;
    numbers.forEach((number) => {
      result += number;
    })

    return result;
  }

  console.log(sum(1,2,3,4,5));

  //OU

  const somar = (...numbers) => numbers.reduce((acc, current) => acc + current , 0);

  console.log(somar(1,2,3,4,5));


  //destructuring - Uma nova forma de declarar variáveis extraindo valores de objetos e arrays é através do destructuring. Ela funciona dessa forma:
  const [a, b, c, ...rest] = [1, 2, 3, 4, 5];
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(rest);

  //OU

  const [...values] = [1, 2, 3, 4, 5];
  console.log(values);

  //Com objetos ela funciona desse jeito:
  const pessoa = {nome: 'Pedro Souza', idade: 21};
  const {nome, idade} = pessoa;

  console.log(nome);
  console.log(idade);

  const [...valores] = [];

  for(let i = 0; i < 6; i++){
    valores.push(i);
  }

  console.log(valores);


  //Orientação a objetos

  class Animal {

    constructor(name){
      this._name = name;
    }

    speak(){
      console.log(`${this._name} make a noise`);
    }

    get name (){
      return this._name;
    }

    set name(name) {
      this._name = name;
    }
  }

  class Dog extends Animal {
    speak(){
      console.log(`${this._name} barks`);
    }
  }

  class Cat extends Animal {
    speak(){
      console.log(`${this._name} meows`);
    }
  }

  const animal = new Animal('dog');
  const dog = new Dog('Napoleão');
  const cat = new Cat('Rex');
  console.log(animal.name);
  animal.name = 'cat'
  console.log(animal.name);
  dog.speak();
  cat.speak();

  //export let soma = (x, y) => x * y;


  /********************************************************** YOU DONT KNOW JS************************************************************************************************/
  //Arrays e funções são objetos, ou seja são sub-tipos de objetos
  var aNovo = 2;

  foo();                  // funciona porque a declaração `foo()`
                          // é "hoisted"

  function foo() {
      a = 3;

      console.log( a );   // 3

      var a;              // a declaração é "hoisted"
                          // para o topo de `foo()`
  }

  console.log( aNovo );   // 2

  /* Uma outra forma de condicional em JavaScript é o "operador condicional," chamado também de "operador ternário." Ele é uma forma concisa/simplificada de uma instrução if..else, como em: */
  let aYou = 42;

  let bYou = (a > 41) ? "Hello" : "World";

  console.log(bYou);

})();

//IIEF - Expressões de Função Invocadas Imediatamente (IIFEs)
var xNovo = (function IIFE(){
    return 42;
})();

console.log(xNovo);  // 42


function makeAdder(x) {
    // parâmetro `x` é uma variável interna

    // função interna `add()` usa `x`, então
    // ele tem uma "clausura" que o envolve
    function add(y) {
        return y + x;
    };

    return add;
}

// `plusOne` pega a referência para a função interna add(..)`
// função com clausura sobre o parâmetro `x` da
// função externa `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` pega a referência para a função interna `add(..)`
// função com clausura sobre o parâmetro `x` da
// função externa `makeAdder(..
var plusTen = makeAdder( 10 );

console.log(plusOne( 3 ));       // 4  <-- 1 + 3
console.log(plusOne( 41 ));      // 42 <-- 1 + 41

console.log(plusTen( 13 ));      // 23 <-- 10 + 13

/*
Mais sobre como esse código funciona:

Quando chamamos makeAdder(1), temos de volta a referência para a função add(..) que se lembra de x como 1. Chamamos a referência dessa função de plusOne(..).
Quando chamamos makeAdder(10), temos de volta outra referência para a função interna add(..) que se lembra de x como 10. Nós chamamos a referência dessa função de plusTen(..).
Quando chamamos plusOne(3), ele adiciona 3 (seu y interno) ao 1 (lembrado por x), e temos 4 como resultado.
Quando nós chamamos plusTen(13), ele adiciona 13 (seu y interno) ao 10 (lembrado por x), e nós conseguimos 23 como resultado.

*/

//Escopos aninhados
function foo() {
    var a = 1;

    function bar() {
        var b = 2;

        function baz() {
            var c = 3;

            console.log( a, b, c ); // 1 2 3
        }

        baz();
        console.log( a, b );        // 1 2
    }

    bar();
    console.log( a );               // 1
}

foo();


//Função como valor
var fooo = function() {
    return 10;
};

var xFoo = function bar(){
    return 50;
};

console.log(fooo());
console.log(xFoo());

//Módulos

function User(){
    let username, password;

    function doLogin(user,pw) {
        username = user;
        password = pw;

        // faça o resto do trabalho do login
    }

    let publicAPI = {
        login: doLogin
    };

    return publicAPI;
}

// cria uma instãncia do módulo`User`
var fred = User();

console.log(fred);
fred.login( "fred", "12Battery34!" );

/*
A função User() serve como um escopo externo que mantém as variáveis username e password protegidas,
assim como a função interna doLogin(); esses itens são todos detalhes internos desse módulo User que não podem ser acessados de fora.
*/

function fooTest() {
    console.log( this.bart );
}

var bart = "global";

var obj1 = {
    bart: "obj1",
    foo: fooTest
};

var obj2 = {
    bart: "obj2"
};

// --------

//Da erro por estar no strict mode
//fooTest();              // "global"
console.log(obj1.foo());         // "obj1"
console.log(fooTest.call( obj2 ));   // "obj2"
console.log(new fooTest());          // undefined


//Protoripagem

var test = {
    a: 42
};

// cria `bar` e faz o link para `test`
var bare = Object.create( test );

bare.b = "hello world";

console.log(bare.b);      // "hello world"
console.log(bare.a);      // 42 <-- delegado para `foo`
