import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Play, Code2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const JsLearning = () => {
  const [output, setOutput] = useState("");
  const [selectedExample, setSelectedExample] = useState("variables");
  const [workspaceCode, setWorkspaceCode] = useState("");
  const [workspaceOutput, setWorkspaceOutput] = useState("");
  const [editableCode, setEditableCode] = useState("");

  const exampleGroups = {
    "Fundamentals": {
      variables: {
        title: "Variables",
        description: "Learn how to declare and use variables in JavaScript",
        code: `// Declare variables
let name = "John";
const age = 25;
var city = "New York";

console.log("Name: " + name);
console.log("Age: " + age);
console.log("City: " + city);`,
      },
      dataTypes: {
        title: "Data Types",
        description: "Learn about different data types in JavaScript.",
        code: `let length = 16; // Number
let lastName = "Johnson"; // String
let x = {firstName:"John", lastName:"Doe"}; // Object
let y = true; // Boolean
let z; // Undefined

console.log(typeof length);
console.log(typeof lastName);
console.log(typeof x);
console.log(typeof y);
console.log(typeof z);`,
      },
      operators: {
        title: "Operators",
        description: "Learn about operators in JavaScript.",
        code: `let x = 5;
let y = 2;

console.log("Addition:", x + y);
console.log("Subtraction:", x - y);
console.log("Multiplication:", x * y);
console.log("Division:", x / y);
console.log("Modulus:", x % y);
console.log("Exponentiation:", x ** y);`,
      },
      functions: {
        title: "Functions",
        description: "Learn how to create and call functions",
        code: `// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;

console.log(greet("Alice"));
console.log("5 + 3 = " + add(5, 3));`,
      },
      conditionals: {
        title: "Conditionals",
        description: "Learn if-else statements",
        code: `// If-else statement
const age = 18;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}

// Ternary operator
const status = age >= 18 ? "adult" : "minor";
console.log("Status: " + status);`,
      },
      loops: {
        title: "Loops",
        description: "Learn different types of loops",
        code: `// For loop
console.log("For loop:");
for (let i = 1; i <= 5; i++) {
  console.log("Count: " + i);
}

// While loop
console.log("\\nWhile loop:");
let count = 1;
while (count <= 3) {
  console.log("Number: " + count);
  count++;
}`,
      },
    },
    "Data Structures": {
      arrays: {
        title: "Arrays",
        description: "Learn how to work with arrays",
        code: `// Create an array
const fruits = ["Apple", "Banana", "Orange"];

// Array methods
console.log("Fruits: " + fruits.join(", "));
fruits.push("Mango");
console.log("After push: " + fruits.join(", "));

// Loop through array
fruits.forEach(fruit => {
  console.log("- " + fruit);
});`,
      },
      objects: {
        title: "Objects",
        description: "Learn how to create and use objects",
        code: `// Create an object
const person = {
  name: "John Doe",
  age: 30,
  city: "New York",
  greet: function() {
    return "Hello, I\\'m " + this.name;
  }
};

console.log(person.name);
console.log(person.age);
console.log(person.greet());`,
      },
      strings: {
        title: "String Methods",
        description: "Learn string manipulation methods",
        code: `// String methods
const text = "JavaScript";

console.log("Length: " + text.length);
console.log("Uppercase: " + text.toUpperCase());
console.log("Lowercase: " + text.toLowerCase());
console.log("Substring: " + text.substring(0, 4));
console.log("Includes \\'Script\\': " + text.includes("Script"));`,
      },
      arrayMethods: {
        title: "Array Methods",
        description: "Learn advanced array methods",
        code: `// Array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log("Doubled: " + doubled.join(", "));

const evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers: " + evens.join(", "));

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum: " + sum);`,
      },
      maps: {
        title: "Maps",
        description: "Learn how to use the Map object for key-value pairs.",
        code: `const map = new Map();
map.set("name", "John");
map.set("age", 30);

console.log("Name:", map.get("name"));
console.log("Map size:", map.size);

for (const [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}`,
      },
      sets: {
        title: "Sets",
        description: "Learn how to use the Set object for storing unique values.",
        code: `const set = new Set([1, 2, 2, 3, 4, 4, 5]);
set.add(6);

console.log("Set values:", ...set);
console.log("Has 3?", set.has(3));
console.log("Set size:", set.size);`,
      },
    },
    "Asynchronous JavaScript": {
      promises: {
        title: "Promises",
        description: "Learn asynchronous JavaScript",
        code: `// Promise example
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Operation failed!");
  }
});

promise
  .then(result => console.log(result))
  .catch(error => console.log(error));

console.log("Promise created and executed");`,
      },
      asyncAwait: {
        title: "Async/Await",
        description: "Learn modern asynchronous JavaScript",
        code: `// Async/Await example
const fetchData = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
  const result = await promise;
  console.log(result);
};

fetchData();
console.log("Fetching data...");`,
      },
      setTimeout: {
        title: "setTimeout",
        description: "Learn how to execute code after a specified delay.",
        code: `console.log("Wait for it...");
setTimeout(() => {
  console.log("...and we\\'re back!");
}, 1000);`,
      },
      setInterval: {
        title: "setInterval",
        description: "Learn how to execute code at specified intervals.",
        code: `let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(\`Interval count: \${count}\`);
  if (count >= 3) {
    clearInterval(intervalId);
    console.log("Interval stopped.");
  }
}, 500);`,
      },
      fetch: {
        title: "Fetch API",
        description: "Learn how to make network requests using the Fetch API.",
        code: `// Fetch is a browser/Node.js API. This is a conceptual example.
// fetch(\\'https://jsonplaceholder.typicode.com/todos/1\\')
//   .then(response => response.json())
//   .then(json => console.log(json))
//   .catch(error => console.error(\\'Error fetching data:\\', error));

console.log("The Fetch API is used to make HTTP requests.");`,
      },
    },
    "ES6+ Features": {
      classes: {
        title: "Classes",
        description: "Learn object-oriented programming",
        code: `// Class definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  introduce() {
    return "Hi, I\\'m " + this.name + ", " + this.age + " years old";
  }
}

const person = new Person("Alice", 25);
console.log(person.introduce());`,
      },
      destructuring: {
        title: "Destructuring",
        description: "Learn modern JavaScript syntax",
        code: `// Array destructuring
const [first, second] = [1, 2, 3];
console.log("First: " + first);
console.log("Second: " + second);

// Object destructuring
const user = { name: "John", age: 30 };
const { name, age } = user;
console.log("Name: " + name);
console.log("Age: " + age);`,
      },
      spreadOperator: {
        title: "Spread Operator",
        description: "Learn the spread operator",
        code: `// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Combined: " + combined.join(", "));

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log("Object: " + JSON.stringify(obj2));`,
      },
      arrowFunctions: {
        title: "Arrow Functions",
        description: "Learn the concise syntax of arrow functions.",
        code: `const add = (a, b) => a + b;
const square = x => x * x;
const sayHello = () => "Hello, World!";

console.log("Add 2+3:", add(2, 3));
console.log("Square of 4:", square(4));
console.log(sayHello());`,
      },
      letAndConst: {
        title: "let and const",
        description: "Understand block-scoped variables with let and const.",
        code: `let x = 10;
if (true) {
  let x = 20; // Different \\'x\\'
  console.log("Inside block:", x);
}
console.log("Outside block:", x);

const y = 30;
// y = 40; // This would cause an error
console.log("Constant y:", y);`,
      },
      templateLiterals: {
        title: "Template Literals",
        description: "Learn to use template literals for easier string formatting.",
        code: `const name = "World";
const greeting = \`Hello, \${name}!\`;
console.log(greeting);`,
      },
      defaultParameters: {
        title: "Default Parameters",
        description: "Learn how to set default values for function parameters.",
        code: `function greet(name = "Guest") {
    console.log(\`Hello, \${name}!\`);
  }
  
  greet("Alice");
  greet();`,
      },
      restParameters: {
        title: "Rest Parameters",
        description: "Learn how to handle a variable number of function arguments.",
        code: `function sum(...numbers) {
    return numbers.reduce((acc, current) => acc + current, 0);
  }
  
  console.log("Sum of 1, 2, 3:", sum(1, 2, 3));
  console.log("Sum of 10, 20, 30, 40:", sum(10, 20, 30, 40));`,
      },
      modules: {
        title: "Modules",
        description: "Learn how to use ES6 modules to organize your code.",
        code: `// This is a conceptual example. Modules don\\'t work in a single script eval.
// In a real project, you would have separate files.

// utils.js
// export const add = (a, b) => a + b;

// main.js
// import { add } from \\'./utils.js\\';
// console.log(add(2, 3));

console.log("Modules are used to split code into separate files.");`,
      },
    },
    "Advanced Topics": {
      errorHandling: {
        title: "Error Handling",
        description: "Learn how to handle errors using try...catch blocks.",
        code: `try {
    // Intentionally cause an error
    nonExistentFunction();
  } catch (error) {
    console.log("Caught an error: " + error.message);
  }`,
      },
      regex: {
        title: "Regular Expressions",
        description: "Learn how to work with regular expressions for pattern matching.",
        code: `const text = "The rain in Spain stays mainly in the plain.";
const regex = /ain/g;
const matches = text.match(regex);
console.log("Matches found:", matches);`,
      },
      closures: {
        title: "Closures",
        description: "Understand how closures work in JavaScript.",
        code: `function outer() {
    let count = 0;
    function inner() {
      count++;
      console.log(count);
    }
    return inner;
  }
  
  const counter = outer();
  counter(); // 1
  counter(); // 2`,
      },
      prototypes: {
        title: "Prototypes",
        description: "Learn about JavaScript\\'s prototypal inheritance.",
        code: `function Person(name) {
    this.name = name;
  }
  
  Person.prototype.greet = function() {
    console.log("Hello, " + this.name);
  };
  
  const john = new Person("John");
  john.greet();`,
      },
      generators: {
        title: "Generators",
        description: "Learn about generator functions.",
        code: `function* idGenerator(){
  let i = 0;
  while(true){
    yield i++;
  }
}

const gen = idGenerator();

console.log(gen.next().value);
console.log(gen.next().value);`,
      },
      iterators: {
        title: "Iterators",
        description: "Learn about iterators in JavaScript.",
        code: `const myNumbers = {};
myNumbers[Symbol.iterator] = function() {
  let n = 0;
  let done = false;
  return {
    next() {
      n += 10;
      if (n == 100) {done = true}
      return {value:n, done:done};
    }
  };
}

for (const num of myNumbers) {
  console.log(num);
}`,
      },
      symbols: {
        title: "Symbols",
        description: "Learn about symbols in JavaScript.",
        code: `const sym1 = Symbol();
const sym2 = Symbol("foo");
const sym3 = Symbol("foo");

console.log(sym2 === sym3);

const obj = {
  [sym1]: "value"
};

console.log(obj[sym1]);`,
      },
    },
    "Browser APIs": {
      domManipulation: {
        title: "DOM Manipulation",
        description: "Learn how to interact with the DOM",
        code: `// DOM manipulation examples
console.log("Creating element examples:");
console.log("document.getElementById(\\'myId\\')");
console.log("document.querySelector(\\'..myClass\\')");
console.log("element.innerHTML = \\'New content\\'");
console.log("element.style.color = \\'red\\'");
console.log("element.addEventListener(\\'click\\', fn)");`,
      },
      json: {
        title: "JSON",
        description: "Learn how to work with JSON data.",
        code: `const person = {
    name: "John",
    age: 30,
    isStudent: false,
    courses: ["Math", "Science"]
  };
  
  const jsonString = JSON.stringify(person);
  console.log("JSON string:", jsonString);
  
  const parsedObject = JSON.parse(jsonString);
  console.log("Parsed object name:", parsedObject.name);`,
      },
      localStorage: {
        title: "Local Storage",
        description: "Learn how to store data in the browser\\'s local storage.",
        code: `// These are browser-specific APIs and won\\'t work in this Node.js-like environment.
// localStorage.setItem("username", "JohnDoe");
// const username = localStorage.getItem("username");
// console.log("Username from local storage:", username);
// localStorage.removeItem("username");

console.log("localStorage is a browser feature for persistent data storage.");`,
      },
      sessionStorage: {
        title: "Session Storage",
        description: "Learn how to store data for a single browser session.",
        code: `// These are browser-specific APIs and won\\'t work in this Node.js-like environment.
// sessionStorage.setItem("sessionData", "This is temporary.");
// const data = sessionStorage.getItem("sessionData");
// console.log("Session data:", data);

console.log("sessionStorage is a browser feature for session-specific data storage.");`,
      },
    },
  };

  const allExamples = Object.values(exampleGroups).reduce((acc, group) => ({ ...acc, ...group }), {});

  useEffect(() => {
    const example = allExamples[selectedExample as keyof typeof allExamples];
    if (example) {
      setEditableCode(example.code);
    } else {
      setEditableCode("// Example not found");
    }
  }, [selectedExample]);

  const runCode = (code: string, setOutputFn = setOutput) => {
    setOutputFn("");
    const logs: string[] = [];
    const originalLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(" "));
    };

    try {
      eval(code);
      setOutputFn(logs.join("\\n"));
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      setOutputFn("Error: " + message);
    } finally {
      console.log = originalLog;
    }
  };

  const currentExample = allExamples[selectedExample as keyof typeof allExamples] || { title: "Not Found", description: "The selected example could not be found. Please choose another one.", code: "" };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            JavaScript Learning
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn JavaScript with interactive examples
          </p>
        </div>

        <Tabs defaultValue="learn" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="learn">Learn JavaScript</TabsTrigger>
            <TabsTrigger value="workspace">Code Workspace</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <Card className="p-6 lg:col-span-1 h-fit">
                <h2 className="text-xl font-bold mb-4">Topics</h2>
                <Accordion type="single" collapsible defaultValue="Fundamentals" className="w-full">
                  {Object.entries(exampleGroups).map(([groupName, examples]) => (
                    <AccordionItem value={groupName} key={groupName}>
                      <AccordionTrigger>{groupName}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {Object.entries(examples).map(([key, example]) => (
                            <Button
                              key={key}
                              variant={selectedExample === key ? "default" : "outline"}
                              onClick={() => setSelectedExample(key)}
                              className="w-full justify-start"
                            >
                              {example.title}
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-2">{currentExample.title}</h2>
              <p className="text-muted-foreground mb-6">{currentExample.description}</p>

              <Tabs defaultValue="code">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>

                <TabsContent value="code">
                  <div className="space-y-4">
                    <Textarea
                      value={editableCode}
                      onChange={(e) => setEditableCode(e.target.value)}
                      className="font-mono text-sm min-h-[200px] bg-muted"
                    />
                    <Button 
                      onClick={() => runCode(editableCode)}
                      className="w-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="output">
                  <div className="bg-muted p-4 rounded-lg min-h-[200px]">
                    <h3 className="font-bold mb-2">Console Output:</h3>
                    <pre className="text-sm whitespace-pre-wrap">{output || "Click \\'Run Code\\' to see output"}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Try It Yourself</h3>
              <p className="text-muted-foreground mb-4">
                Modify the code and run it to see different results. Experiment with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Changing variable values</li>
                <li>Adding new lines of code</li>
                <li>Creating your own functions</li>
                <li>Testing different conditions</li>
              </ul>
            </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workspace">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="h-6 w-6" />
                JavaScript Workspace
              </h2>
              <p className="text-muted-foreground mb-6">
                Write your own JavaScript code and see the output
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold">Your Code:</h3>
                  <Textarea
                    value={workspaceCode}
                    onChange={(e) => setWorkspaceCode(e.target.value)}
                    placeholder="// Write your JavaScript code here...
console.log(\\'Hello, World!\\');"
                    className="font-mono text-sm min-h-[400px] bg-muted"
                  />
                  <Button 
                    onClick={() => runCode(workspaceCode, setWorkspaceOutput)}
                    className="w-full"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold">Console Output:</h3>
                  <div className="bg-muted p-4 rounded-lg min-h-[400px]">
                    <pre className="text-sm whitespace-pre-wrap">{workspaceOutput || "Click \\'Run Code\\' to see output"}</pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default JsLearning;
