"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  /* Transpilar com watch: npx babel script.js --watch --out-file script-compiled.js */
  /* http://babeljs.io/docs/usage/cli/ */

  "use strict";

  var number = 1;

  console.log(number);

  var myself = {
    firstName: "Pedro",
    lastName: "Souza",
    age: 21
  };

  var yourSelf = {
    age: 21
  };

  function showFullName() {
    console.log('Olá ' + this.firstName + " " + this.lastName);
  }

  function veificaIdades() {
    for (var i = 0; i < arguments.length; i++) {
      if (this.age < arguments[i]) {
        console.log(arguments[i]);
      }
    }
  }

  //Essas funções servem para reutilizar codigos passando através da função o contexto que ele quer usar
  showFullName.call(myself);
  showFullName.apply(myself);

  veificaIdades.call(myself, 30, 40, 15);

  function verificaParametro() {
    console.log(yourSelf.age);
    if (this.age == yourSelf.age) {
      console.log('É igual');
    } else {
      console.log('É diferente');
    }
  }

  verificaParametro.call(myself);

  //Clousures

  //A função de dentro (hello) tem acesso ao escopo externo dela (init). Porém, ao sairmos de init, perdemos a visibilidade da função hello.
  //A capacidade de esconder informações também conhecida como: data privacy
  function init() {
    var nome = 'Pedro Souza';

    function hello() {
      console.log('Olá ' + nome);
    }

    hello();
  }

  init();

  //No escopo global (em um browser) o this se refere ao objeto window, tanto dentro quanto fora de uma função:
  document.write(this); //[object Window]

  function func() {
    return this;
  }

  document.write(func()); //[object Window]

  //Quando usado dentro de um método de um objeto, o this se refere ao próprio objeto:

  var object = {
    func: function func() {
      return this;
    }
  };

  console.log(object.func()); //[object Object]

  //E no caso de objetos aninhados, o this vai se referir ao objeto pai mais próximo:

  var father = {
    name: "father",
    child: {
      name: "child",
      func: function func() {
        return this.name;
      }
    }
  };

  document.write(father.child.func());

  var objetoErro = {
    name: 'Matheus',
    friends: ['João', 'Ana'],
    loop: function loop() {
      this.friends.forEach(function (friend) {
        console.log(this.name + ' knows ' + friend);
      });
    }
  };

  //objetoErro.loop();
  // TypeError: Cannot read property 'name' of undefined


  //O bind é muito semelhante ao call e apply: serve para passarmos um contexto para uma função, que não é dela, e podermos executá-la.
  //A diferença é que call e apply invocam a função imediatamente:
  var person = {
    name: "Matheus",
    hello: function hello(thing) {
      console.log(this.name + " disse Olá " + thing);
    }
  };

  person.hello.call(person, "Mundo"); // Matheus disse Olá Mundo

  //Enquanto bind retorna uma nova função que quando for executada terá o contexto que passamos.
  var person2 = {
    name: "Matheus",
    hello: function hello(thing) {
      console.log(this.name + " disse Olá " + thing);
    }
  };

  var hello = person.hello.bind(person2);
  hello("Mundo"); // Matheus disse Olá Mundo


  /*5) Map, Filter e Reduce
  Você provavelmente já passou por alguma situação em que era necessário por exemplo iterar sobre um array,
  ou então verificar se existe alguma propriedade nele ou mesmo simplesmente gerar um novo array com base no
  primeiro. Os métodos map, filter e reduce nos ajudam nessas situações além de começarmos a pensar mais em
  termos de programação funcional.*/
  /*Map:
  Dado um array qualquer, como podemos fazer para transformá-lo, ou mapeá-lo, em um outro array?
  Existe a forma difícil (sem map):*/

  var pessoas = [{
    id: 1,
    nome: 'Pedro Souza',
    idade: 21
  }, {
    id: 2,
    nome: 'Rafaela Villela',
    idade: 20
  }, {
    id: 3,
    nome: 'Pedro',
    idade: 25
  }];

  //let newPessoas = pessoas.map(function(pessoa){
  //return pessoa;
  //});
  //MAP retorna um novo array e forEach somente percorre um array
  var newPessoas = pessoas.map(function (pessoa) {
    return pessoa;
  });

  console.log(newPessoas);

  //Filter

  var months = [{ shortName: 'JAN', fullName: 'Janeiro', number: 1 }, { shortName: 'FEV', fullName: 'Fevereiro', number: 2 }, { shortName: 'MAR', fullName: 'Março', number: 3 }, { shortName: 'ABR', fullName: 'Abril', number: 4 }, { shortName: 'MAI', fullName: 'Maio', number: 5 }, { shortName: 'JUN', fullName: 'Junho', number: 6 }, { shortName: 'JULH', fullName: 'Julho', number: 7 }, { shortName: 'AGO', fullName: 'Agosto', number: 8 }, { shortName: 'SET', fullName: 'Setembro', number: 9 }, { shortName: 'OUT', fullName: 'Outubro', number: 10 }, { shortName: 'NOV', fullName: 'Novembro', number: 11 }, { shortName: 'DEZ', fullName: 'Dezembro', number: 12 }];

  var firstSixMonths = months.filter(function (month) {
    return month.number <= 6;
  });

  console.log(firstSixMonths);

  var monthsAcc = firstSixMonths.reduce(function (acc, month) {
    return acc + '/' + month.shortName;
  }, '');

  console.log(monthsAcc);

  //ES6 se consegue introduzir logo na função um valor padrão para que não seja undefined
  var multiply = function multiply(x) {
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return x * y;
  };

  console.log(multiply(3, 2));

  /*Na versão atual do JavaScript podemos utilizar o objeto arguments para pegar todos os parâmetros de uma função:*/
  /*O arguments porém, apresenta alguns problemas:
  O objeto parece com um array, mas não é exatamente um
  Todos os parâmetros da função são automaticamente atribuídos ao arguments. Não temos uma forma clara de diferenciar os parâmetros.
  Com esses problemas em mente, os Rest Parameters foram adicionados no ES6. O mesmo exemplo da soma poderia ser reescrito dessa forma:*/
  function sum() {
    var result = 0;

    for (var _len = arguments.length, numbers = Array(_len), _key = 0; _key < _len; _key++) {
      numbers[_key] = arguments[_key];
    }

    numbers.forEach(function (number) {
      result += number;
    });

    return result;
  }

  console.log(sum(1, 2, 3, 4, 5));

  //OU

  var somar = function somar() {
    for (var _len2 = arguments.length, numbers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      numbers[_key2] = arguments[_key2];
    }

    return numbers.reduce(function (acc, current) {
      return acc + current;
    }, 0);
  };

  console.log(somar(1, 2, 3, 4, 5));

  //destructuring - Uma nova forma de declarar variáveis extraindo valores de objetos e arrays é através do destructuring. Ela funciona dessa forma:
  var a = 1,
      b = 2,
      c = 3,
      rest = [4, 5];

  console.log(a);
  console.log(b);
  console.log(c);
  console.log(rest);

  //OU

  var values = [1, 2, 3, 4, 5];

  console.log(values);

  //Com objetos ela funciona desse jeito:
  var pessoa = { nome: 'Pedro Souza', idade: 21 };
  var nome = pessoa.nome,
      idade = pessoa.idade;


  console.log(nome);
  console.log(idade);

  var _ref = [],
      valores = _ref.slice(0);

  for (var i = 0; i < 6; i++) {
    valores.push(i);
  }

  console.log(valores);

  //Orientação a objetos

  var Animal = function () {
    function Animal(name) {
      _classCallCheck(this, Animal);

      this._name = name;
    }

    _createClass(Animal, [{
      key: "speak",
      value: function speak() {
        console.log(this._name + " make a noise");
      }
    }, {
      key: "name",
      get: function get() {
        return this._name;
      },
      set: function set(name) {
        this._name = name;
      }
    }]);

    return Animal;
  }();

  var Dog = function (_Animal) {
    _inherits(Dog, _Animal);

    function Dog() {
      _classCallCheck(this, Dog);

      return _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).apply(this, arguments));
    }

    _createClass(Dog, [{
      key: "speak",
      value: function speak() {
        console.log(this._name + " barks");
      }
    }]);

    return Dog;
  }(Animal);

  var Cat = function (_Animal2) {
    _inherits(Cat, _Animal2);

    function Cat() {
      _classCallCheck(this, Cat);

      return _possibleConstructorReturn(this, (Cat.__proto__ || Object.getPrototypeOf(Cat)).apply(this, arguments));
    }

    _createClass(Cat, [{
      key: "speak",
      value: function speak() {
        console.log(this._name + " meows");
      }
    }]);

    return Cat;
  }(Animal);

  var animal = new Animal('dog');
  var dog = new Dog('Napoleão');
  var cat = new Cat('Rex');
  console.log(animal.name);
  animal.name = 'cat';
  console.log(animal.name);
  dog.speak();
  cat.speak();

  //export let soma = (x, y) => x * y;


  /********************************************************** YOU DONT KNOW JS************************************************************************************************/
  //Arrays e funções são objetos, ou seja são sub-tipos de objetos
  var aNovo = 2;

  foo(); // funciona porque a declaração `foo()`
  // é "hoisted"

  function foo() {
    a = 3;

    console.log(a); // 3

    var a; // a declaração é "hoisted"
    // para o topo de `foo()`
  }

  console.log(aNovo); // 2

  /* Uma outra forma de condicional em JavaScript é o "operador condicional," chamado também de "operador ternário." Ele é uma forma concisa/simplificada de uma instrução if..else, como em: */
  var aYou = 42;

  var bYou = a > 41 ? "Hello" : "World";

  console.log(bYou);
})();

//IIEF - Expressões de Função Invocadas Imediatamente (IIFEs)
var xNovo = function IIFE() {
  return 42;
}();

console.log(xNovo); // 42


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
var plusOne = makeAdder(1);

// `plusTen` pega a referência para a função interna `add(..)`
// função com clausura sobre o parâmetro `x` da
// função externa `makeAdder(..
var plusTen = makeAdder(10);

console.log(plusOne(3)); // 4  <-- 1 + 3
console.log(plusOne(41)); // 42 <-- 1 + 41

console.log(plusTen(13)); // 23 <-- 10 + 13

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

      console.log(a, b, c); // 1 2 3
    }

    baz();
    console.log(a, b); // 1 2
  }

  bar();
  console.log(a); // 1
}

foo();

//Função como valor
var fooo = function fooo() {
  return 10;
};

var xFoo = function bar() {
  return 50;
};

console.log(fooo());
console.log(xFoo());

//Módulos

function User() {
  var username = void 0,
      password = void 0;

  function doLogin(user, pw) {
    username = user;
    password = pw;

    // faça o resto do trabalho do login
  }

  var publicAPI = {
    login: doLogin
  };

  return publicAPI;
}

// cria uma instãncia do módulo`User`
var fred = User();

console.log(fred);
fred.login("fred", "12Battery34!");

/*
A função User() serve como um escopo externo que mantém as variáveis username e password protegidas,
assim como a função interna doLogin(); esses itens são todos detalhes internos desse módulo User que não podem ser acessados de fora.
*/

function fooTest() {
  console.log(this.bart);
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
console.log(obj1.foo()); // "obj1"
console.log(fooTest.call(obj2)); // "obj2"
console.log(new fooTest()); // undefined


//Protoripagem

var test = {
  a: 42
};

// cria `bar` e faz o link para `test`
var bare = Object.create(test);

bare.b = "hello world";

console.log(bare.b); // "hello world"
console.log(bare.a); // 42 <-- delegado para `foo`
