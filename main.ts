// TypeScript code
interface Person {
  name: string;
  age: number;
}

class Greeter {
  private greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet(person: Person) {
    console.log(`${this.greeting}, ${person.name}!`);
  }
}

const john: Person = {
  name: 'John Doe',
  age: 25,
};

const greeter = new Greeter('Hello');
greeter.greet(john);
