import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Play, Code2 } from "lucide-react";

const JsLearning = () => {
  const [output, setOutput] = useState("");
  const [selectedExample, setSelectedExample] = useState("variables");
  const [workspaceCode, setWorkspaceCode] = useState("");
  const [workspaceOutput, setWorkspaceOutput] = useState("");

  const examples = {
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
    return "Hello, I'm " + this.name;
  }
};

console.log(person.name);
console.log(person.age);
console.log(person.greet());`,
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
    strings: {
      title: "String Methods",
      description: "Learn string manipulation methods",
      code: `// String methods
const text = "JavaScript";

console.log("Length: " + text.length);
console.log("Uppercase: " + text.toUpperCase());
console.log("Lowercase: " + text.toLowerCase());
console.log("Substring: " + text.substring(0, 4));
console.log("Includes 'Script': " + text.includes("Script"));`,
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
    domManipulation: {
      title: "DOM Manipulation",
      description: "Learn how to interact with the DOM",
      code: `// DOM manipulation examples
console.log("Creating element examples:");
console.log("document.getElementById('myId')");
console.log("document.querySelector('.myClass')");
console.log("element.innerHTML = 'New content'");
console.log("element.style.color = 'red'");
console.log("element.addEventListener('click', fn)");`,
    },
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
    return "Hi, I'm " + this.name + ", " + this.age + " years old";
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
  };

  const runCode = (code: string, setOutputFn = setOutput) => {
    setOutputFn("");
    const logs: string[] = [];
    const originalLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.join(" "));
    };

    try {
      eval(code);
      setOutputFn(logs.join("\n"));
    } catch (error) {
      setOutputFn("Error: " + (error as Error).message);
    } finally {
      console.log = originalLog;
    }
  };

  const currentExample = examples[selectedExample as keyof typeof examples];

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
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{currentExample.code}</code>
                    </pre>
                    <Button 
                      onClick={() => runCode(currentExample.code)}
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
                    <pre className="text-sm whitespace-pre-wrap">{output || "Click 'Run Code' to see output"}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Try It Yourself</h3>
              <p className="text-muted-foreground mb-4">
                Modify the code above and run it to see different results. Experiment with:
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
console.log('Hello, World!');"
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
                    <pre className="text-sm whitespace-pre-wrap">{workspaceOutput || "Click 'Run Code' to see output"}</pre>
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
