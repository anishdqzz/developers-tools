import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Play, Code2 } from "lucide-react";

const JsLearning = () => {
  const [output, setOutput] = useState("");
  const [selectedExample, setSelectedExample] = useState("variables");
  const [editableCode, setEditableCode] = useState("");
  const [workspaceCode, setWorkspaceCode] = useState("");
  const [workspaceOutput, setWorkspaceOutput] = useState("");

  const examples = {
    variables: { title: "Variables", description: "Learn how to declare and use variables in JavaScript", code: `let name = "John";\nconst age = 25;\nvar city = "New York";\n\nconsole.log("Name: " + name);\nconsole.log("Age: " + age);\nconsole.log("City: " + city);` },
    dataTypes: { title: "Data Types", description: "Understanding JavaScript data types", code: `// Primitive types\nconst str = "Hello";\nconst num = 42;\nconst bool = true;\nconst nothing = null;\nconst notDefined = undefined;\n\nconsole.log(typeof str);\nconsole.log(typeof num);\nconsole.log(typeof bool);` },
    operators: { title: "Operators", description: "Arithmetic and logical operators", code: `// Arithmetic\nconsole.log(10 + 5);\nconsole.log(10 - 5);\nconsole.log(10 * 5);\nconsole.log(10 / 5);\nconsole.log(10 % 3);\n\n// Comparison\nconsole.log(5 == "5");\nconsole.log(5 === "5");\nconsole.log(10 > 5);` },
    functions: { title: "Functions", description: "Learn how to create and call functions", code: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconst add = (a, b) => a + b;\n\nconsole.log(greet("Alice"));\nconsole.log("5 + 3 = " + add(5, 3));` },
    arrowFunctions: { title: "Arrow Functions", description: "Modern function syntax", code: `// Traditional function\nconst traditional = function(x) { return x * 2; };\n\n// Arrow function\nconst arrow = x => x * 2;\n\nconsole.log(traditional(5));\nconsole.log(arrow(5));` },
    arrays: { title: "Arrays", description: "Learn how to work with arrays", code: `const fruits = ["Apple", "Banana", "Orange"];\n\nconsole.log("Fruits: " + fruits.join(", "));\nfruits.push("Mango");\nconsole.log("After push: " + fruits.join(", "));\n\nfruits.forEach(fruit => {\n  console.log("- " + fruit);\n});` },
    arrayMethods: { title: "Array Methods", description: "Learn advanced array methods", code: `const numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Doubled: " + doubled.join(", "));\n\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log("Even: " + evens.join(", "));\n\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log("Sum: " + sum);` },
    arrayFind: { title: "Array Find", description: "Finding elements in arrays", code: `const users = [{id: 1, name: "John"}, {id: 2, name: "Jane"}];\n\nconst user = users.find(u => u.id === 2);\nconsole.log("Found:", user.name);\n\nconst index = users.findIndex(u => u.id === 2);\nconsole.log("Index:", index);` },
    arraySome: { title: "Array Some/Every", description: "Testing array elements", code: `const numbers = [1, 2, 3, 4, 5];\n\nconst hasEven = numbers.some(n => n % 2 === 0);\nconsole.log("Has even:", hasEven);\n\nconst allPositive = numbers.every(n => n > 0);\nconsole.log("All positive:", allPositive);` },
    objects: { title: "Objects", description: "Learn how to create and use objects", code: `const person = {\n  name: "John Doe",\n  age: 30,\n  city: "New York",\n  greet: function() {\n    return "Hello, I'm " + this.name;\n  }\n};\n\nconsole.log(person.name);\nconsole.log(person.age);\nconsole.log(person.greet());` },
    objectMethods: { title: "Object Methods", description: "Working with object methods", code: `const obj = {a: 1, b: 2, c: 3};\n\nconsole.log("Keys:", Object.keys(obj));\nconsole.log("Values:", Object.values(obj));\nconsole.log("Entries:", Object.entries(obj));\n\nconst merged = Object.assign({}, obj, {d: 4});\nconsole.log("Merged:", JSON.stringify(merged));` },
    loops: { title: "Loops", description: "Learn different types of loops", code: `console.log("For loop:");\nfor (let i = 1; i <= 5; i++) {\n  console.log("Count: " + i);\n}\n\nconsole.log("\\nWhile loop:");\nlet count = 1;\nwhile (count <= 3) {\n  console.log("Number: " + count);\n  count++;\n}` },
    forOf: { title: "For...of Loop", description: "Iterate over iterables", code: `const colors = ["red", "green", "blue"];\n\nfor (const color of colors) {\n  console.log(color);\n}\n\nconst text = "Hello";\nfor (const char of text) {\n  console.log(char);\n}` },
    forIn: { title: "For...in Loop", description: "Iterate over object properties", code: `const person = {name: "John", age: 30, city: "NYC"};\n\nfor (const key in person) {\n  console.log(key + ": " + person[key]);\n}` },
    conditionals: { title: "Conditionals", description: "Learn if-else statements", code: `const age = 18;\n\nif (age >= 18) {\n  console.log("You are an adult");\n} else {\n  console.log("You are a minor");\n}\n\nconst status = age >= 18 ? "adult" : "minor";\nconsole.log("Status: " + status);` },
    switchCase: { title: "Switch Statement", description: "Multiple condition handling", code: `const day = 3;\nlet dayName;\n\nswitch(day) {\n  case 1: dayName = "Monday"; break;\n  case 2: dayName = "Tuesday"; break;\n  case 3: dayName = "Wednesday"; break;\n  default: dayName = "Unknown";\n}\n\nconsole.log("Day:", dayName);` },
    strings: { title: "String Methods", description: "Learn string manipulation methods", code: `const text = "JavaScript";\n\nconsole.log("Length: " + text.length);\nconsole.log("Uppercase: " + text.toUpperCase());\nconsole.log("Lowercase: " + text.toLowerCase());\nconsole.log("Substring: " + text.substring(0, 4));\nconsole.log("Includes 'Script': " + text.includes("Script"));` },
    templateLiterals: { title: "Template Literals", description: "Modern string formatting", code: `const name = "Alice";\nconst age = 25;\n\nconst message = \`Hello, my name is \${name} and I'm \${age} years old.\`;\nconsole.log(message);\n\nconst multiline = \`Line 1\nLine 2\nLine 3\`;\nconsole.log(multiline);` },
    stringSearch: { title: "String Search", description: "Finding text in strings", code: `const text = "Hello World";\n\nconsole.log("indexOf:", text.indexOf("World"));\nconsole.log("lastIndexOf:", text.lastIndexOf("o"));\nconsole.log("startsWith:", text.startsWith("Hello"));\nconsole.log("endsWith:", text.endsWith("World"));` },
    mathObject: { title: "Math Object", description: "Mathematical operations", code: `console.log("PI:", Math.PI);\nconsole.log("Random:", Math.random());\nconsole.log("Round:", Math.round(4.7));\nconsole.log("Floor:", Math.floor(4.7));\nconsole.log("Ceil:", Math.ceil(4.3));\nconsole.log("Max:", Math.max(1, 5, 3));\nconsole.log("Min:", Math.min(1, 5, 3));` },
    dateObject: { title: "Date Object", description: "Working with dates", code: `const now = new Date();\n\nconsole.log("Full date:", now.toString());\nconsole.log("Year:", now.getFullYear());\nconsole.log("Month:", now.getMonth() + 1);\nconsole.log("Date:", now.getDate());\nconsole.log("Hours:", now.getHours());` },
    domManipulation: { title: "DOM Manipulation", description: "Learn how to interact with the DOM", code: `console.log("Creating element examples:");\nconsole.log("document.getElementById('myId')");\nconsole.log("document.querySelector('.myClass')");\nconsole.log("element.innerHTML = 'New content'");\nconsole.log("element.style.color = 'red'");\nconsole.log("element.addEventListener('click', fn)");` },
    promises: { title: "Promises", description: "Learn asynchronous JavaScript", code: `const promise = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve("Operation successful!");\n  } else {\n    reject("Operation failed!");\n  }\n});\n\npromise\n  .then(result => console.log(result))\n  .catch(error => console.log(error));\n\nconsole.log("Promise created");` },
    asyncAwait: { title: "Async/Await", description: "Modern async syntax", code: `async function fetchData() {\n  console.log("Fetching...");\n  const result = await Promise.resolve("Data loaded!");\n  console.log(result);\n  return result;\n}\n\nfetchData();\nconsole.log("Function called");` },
    classes: { title: "Classes", description: "Learn object-oriented programming", code: `class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  \n  introduce() {\n    return "Hi, I'm " + this.name + ", " + this.age + " years old";\n  }\n}\n\nconst person = new Person("Alice", 25);\nconsole.log(person.introduce());` },
    inheritance: { title: "Class Inheritance", description: "Extending classes", code: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    console.log(this.name + " makes a sound");\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    console.log(this.name + " barks");\n  }\n}\n\nconst dog = new Dog("Rex");\ndog.speak();` },
    destructuring: { title: "Destructuring", description: "Learn modern JavaScript syntax", code: `const [first, second] = [1, 2, 3];\nconsole.log("First: " + first);\nconsole.log("Second: " + second);\n\nconst user = { name: "John", age: 30 };\nconst { name, age } = user;\nconsole.log("Name: " + name);\nconsole.log("Age: " + age);` },
    spreadOperator: { title: "Spread Operator", description: "Learn the spread operator", code: `const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2];\nconsole.log("Combined: " + combined.join(", "));\n\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { ...obj1, c: 3 };\nconsole.log("Object: " + JSON.stringify(obj2));` },
    restOperator: { title: "Rest Operator", description: "Collecting remaining elements", code: `function sum(...numbers) {\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\n\nconsole.log("Sum:", sum(1, 2, 3, 4, 5));\n\nconst [first, ...rest] = [1, 2, 3, 4];\nconsole.log("First:", first);\nconsole.log("Rest:", rest);` },
    modules: { title: "Modules", description: "Code organization", code: `// Export example\nconsole.log("export const myFunc = () => {}");\nconsole.log("export default MyClass");\n\n// Import example\nconsole.log("import { myFunc } from './module'");\nconsole.log("import MyClass from './module'");` },
    errorHandling: { title: "Error Handling", description: "Try-catch blocks", code: `try {\n  const result = JSON.parse('{"valid": "json"}');\n  console.log("Parsed:", result);\n  \n  // This will throw an error\n  JSON.parse("invalid json");\n} catch (error) {\n  console.log("Error:", error.message);\n} finally {\n  console.log("Cleanup code");\n}` },
    throwError: { title: "Throwing Errors", description: "Creating custom errors", code: `function divide(a, b) {\n  if (b === 0) {\n    throw new Error("Cannot divide by zero");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 2));\n  console.log(divide(10, 0));\n} catch (error) {\n  console.log("Caught:", error.message);\n}` },
    setOperations: { title: "Set", description: "Working with unique values", code: `const set = new Set([1, 2, 3, 3, 4]);\n\nconsole.log("Size:", set.size);\nconsole.log("Has 3:", set.has(3));\n\nset.add(5);\nset.delete(2);\n\nset.forEach(val => console.log(val));` },
    mapOperations: { title: "Map", description: "Key-value pairs", code: `const map = new Map();\n\nmap.set("name", "John");\nmap.set("age", 30);\nmap.set(1, "number key");\n\nconsole.log("Name:", map.get("name"));\nconsole.log("Size:", map.size);\n\nmap.forEach((value, key) => {\n  console.log(key + ":", value);\n});` },
    weakMap: { title: "WeakMap", description: "Weak references", code: `const wm = new WeakMap();\nconst obj = {id: 1};\n\nwm.set(obj, "value");\nconsole.log("Has obj:", wm.has(obj));\nconsole.log("Get:", wm.get(obj));\n\nconsole.log("WeakMap created");` },
    symbols: { title: "Symbols", description: "Unique identifiers", code: `const sym1 = Symbol("id");\nconst sym2 = Symbol("id");\n\nconsole.log("Same?:", sym1 === sym2);\n\nconst obj = {};\nobj[sym1] = "value";\nconsole.log("Value:", obj[sym1]);` },
    generators: { title: "Generators", description: "Function* syntax", code: `function* numberGen() {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconst gen = numberGen();\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);\nconsole.log(gen.next().value);` },
    iterators: { title: "Iterators", description: "Custom iteration", code: `const range = {\n  from: 1,\n  to: 5,\n  [Symbol.iterator]() {\n    return {\n      current: this.from,\n      last: this.to,\n      next() {\n        if (this.current <= this.last) {\n          return { done: false, value: this.current++ };\n        } else {\n          return { done: true };\n        }\n      }\n    };\n  }\n};\n\nfor (let num of range) {\n  console.log(num);\n}` },
    closures: { title: "Closures", description: "Function scope", code: `function outer() {\n  const message = "Hello";\n  \n  function inner() {\n    console.log(message);\n  }\n  \n  return inner;\n}\n\nconst fn = outer();\nfn();` },
    callbacks: { title: "Callbacks", description: "Function as argument", code: `function processData(data, callback) {\n  console.log("Processing:", data);\n  callback(data.toUpperCase());\n}\n\nprocessData("hello", (result) => {\n  console.log("Result:", result);\n});` },
    higherOrder: { title: "Higher-Order Functions", description: "Functions returning functions", code: `function multiplier(factor) {\n  return function(number) {\n    return number * factor;\n  };\n}\n\nconst double = multiplier(2);\nconst triple = multiplier(3);\n\nconsole.log("Double 5:", double(5));\nconsole.log("Triple 5:", triple(5));` },
    recursion: { title: "Recursion", description: "Function calling itself", code: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\n\nconsole.log("5! =", factorial(5));\nconsole.log("3! =", factorial(3));` },
    iife: { title: "IIFE", description: "Immediately Invoked Function Expression", code: `(function() {\n  console.log("IIFE executed!");\n})();\n\nconst result = (function(x, y) {\n  return x + y;\n})(5, 3);\n\nconsole.log("Result:", result);` },
    currying: { title: "Currying", description: "Function transformation", code: `function curry(a) {\n  return function(b) {\n    return function(c) {\n      return a + b + c;\n    };\n  };\n}\n\nconst result = curry(1)(2)(3);\nconsole.log("Result:", result);` },
    memoization: { title: "Memoization", description: "Caching function results", code: `function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (key in cache) {\n      console.log("From cache");\n      return cache[key];\n    }\n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nconst slowSquare = memoize(x => {\n  console.log("Computing...");\n  return x * x;\n});\n\nconsole.log(slowSquare(5));\nconsole.log(slowSquare(5));` },
    thisKeyword: { title: "this Keyword", description: "Understanding context", code: `const obj = {\n  name: "Object",\n  regularFunc: function() {\n    console.log("Regular:", this.name);\n  },\n  arrowFunc: () => {\n    console.log("Arrow:", this.name);\n  }\n};\n\nobj.regularFunc();\nobj.arrowFunc();` },
    bindCallApply: { title: "bind/call/apply", description: "Changing function context", code: `function greet(greeting) {\n  return greeting + ", " + this.name;\n}\n\nconst person = { name: "John" };\n\nconsole.log(greet.call(person, "Hello"));\nconsole.log(greet.apply(person, ["Hi"]));\n\nconst boundGreet = greet.bind(person);\nconsole.log(boundGreet("Hey"));` },
    getterSetter: { title: "Getters & Setters", description: "Property accessors", code: `const person = {\n  firstName: "John",\n  lastName: "Doe",\n  get fullName() {\n    return this.firstName + " " + this.lastName;\n  },\n  set fullName(value) {\n    [this.firstName, this.lastName] = value.split(" ");\n  }\n};\n\nconsole.log(person.fullName);\nperson.fullName = "Jane Smith";\nconsole.log(person.fullName);` },
    jsonMethods: { title: "JSON Methods", description: "Working with JSON", code: `const obj = { name: "John", age: 30, city: "NYC" };\n\nconst jsonString = JSON.stringify(obj);\nconsole.log("String:", jsonString);\n\nconst parsed = JSON.parse(jsonString);\nconsole.log("Parsed:", parsed.name);` },
    localStorage: { title: "localStorage", description: "Browser storage (simulation)", code: `// LocalStorage simulation\nconsole.log("localStorage.setItem('key', 'value')");\nconsole.log("localStorage.getItem('key')");\nconsole.log("localStorage.removeItem('key')");\nconsole.log("localStorage.clear()");` },
    regularExpressions: { title: "Regular Expressions", description: "Pattern matching", code: `const text = "Hello World 123";\n\nconst hasNumbers = /\\d+/.test(text);\nconsole.log("Has numbers:", hasNumbers);\n\nconst numbers = text.match(/\\d+/);\nconsole.log("Found:", numbers[0]);\n\nconst replaced = text.replace(/\\d+/, "456");\nconsole.log("Replaced:", replaced);` },
    regexMethods: { title: "Regex Methods", description: "Advanced pattern matching", code: `const email = "test@example.com";\nconst emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\nconsole.log("Valid email:", emailRegex.test(email));\n\nconst text = "abc123def456";\nconst allNumbers = text.match(/\\d+/g);\nconsole.log("All numbers:", allNumbers);` },
    timing: { title: "setTimeout/setInterval", description: "Timing functions (demo)", code: `console.log("Start");\n\nsetTimeout(() => {\n  console.log("After 1 second");\n}, 1000);\n\nconsole.log("setTimeout scheduled");\n\n// Note: setInterval would run repeatedly\nconsole.log("Use setInterval for repeated execution");` },
    eventLoop: { title: "Event Loop", description: "Understanding async execution", code: `console.log("1. Synchronous");\n\nsetTimeout(() => {\n  console.log("4. Timeout");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("3. Promise");\n});\n\nconsole.log("2. Synchronous");` },
    shortCircuit: { title: "Short-Circuit Evaluation", description: "Logical operators", code: `const a = null;\nconst b = "default";\n\nconst result1 = a || b;\nconsole.log("OR:", result1);\n\nconst result2 = a && b;\nconsole.log("AND:", result2);\n\nconst result3 = a ?? b;\nconsole.log("Nullish:", result3);` },
    optionalChaining: { title: "Optional Chaining", description: "Safe property access", code: `const user = {\n  name: "John",\n  address: {\n    city: "NYC"\n  }\n};\n\nconsole.log(user?.name);\nconsole.log(user?.address?.city);\nconsole.log(user?.phone?.number);` },
    nullishCoalescing: { title: "Nullish Coalescing", description: "Default values", code: `const value1 = null ?? "default";\nconsole.log("null:", value1);\n\nconst value2 = undefined ?? "default";\nconsole.log("undefined:", value2);\n\nconst value3 = 0 ?? "default";\nconsole.log("0:", value3);\n\nconst value4 = "" ?? "default";\nconsole.log("empty:", value4);` },
    arrayFrom: { title: "Array.from()", description: "Creating arrays", code: `const str = "Hello";\nconst arr1 = Array.from(str);\nconsole.log("From string:", arr1);\n\nconst arr2 = Array.from([1, 2, 3], x => x * 2);\nconsole.log("With map:", arr2);\n\nconst arr3 = Array.from({length: 5}, (_, i) => i + 1);\nconsole.log("Range:", arr3);` },
    arrayOf: { title: "Array.of()", description: "Array creation", code: `const arr1 = Array.of(7);\nconsole.log("Array.of(7):", arr1);\n\nconst arr2 = Array(7);\nconsole.log("Array(7) length:", arr2.length);\n\nconst arr3 = Array.of(1, 2, 3);\nconsole.log("Multiple:", arr3);` },
    arrayFlat: { title: "Array.flat()", description: "Flattening arrays", code: `const nested = [1, [2, 3], [4, [5, 6]]];\n\nconst flat1 = nested.flat();\nconsole.log("Flat 1:", flat1);\n\nconst flat2 = nested.flat(2);\nconsole.log("Flat 2:", flat2);` },
    arrayFlatMap: { title: "Array.flatMap()", description: "Map and flatten", code: `const arr = [1, 2, 3];\n\nconst result1 = arr.flatMap(x => [x, x * 2]);\nconsole.log("FlatMap:", result1);\n\nconst result2 = arr.flatMap(x => [[x * 2]]);\nconsole.log("Nested:", result2);` },
    arrayIncludes: { title: "Array.includes()", description: "Checking array contents", code: `const fruits = ["apple", "banana", "orange"];\n\nconsole.log("Has banana:", fruits.includes("banana"));\nconsole.log("Has grape:", fruits.includes("grape"));\n\nconst numbers = [1, 2, 3, NaN];\nconsole.log("Has NaN:", numbers.includes(NaN));` },
    objectEntries: { title: "Object.entries()", description: "Object to array", code: `const person = { name: "John", age: 30, city: "NYC" };\n\nconst entries = Object.entries(person);\nconsole.log("Entries:", entries);\n\nentries.forEach(([key, value]) => {\n  console.log(\`\${key}: \${value}\`);\n});` },
    objectFreeze: { title: "Object.freeze()", description: "Immutable objects", code: `const obj = { name: "John", age: 30 };\n\nObject.freeze(obj);\n\ntry {\n  obj.age = 31;\n  console.log("Age:", obj.age);\n} catch (error) {\n  console.log("Error:", error.message);\n}\n\nconsole.log("Frozen:", Object.isFrozen(obj));` },
    objectSeal: { title: "Object.seal()", description: "Sealed objects", code: `const obj = { name: "John", age: 30 };\n\nObject.seal(obj);\n\nobj.age = 31;\nconsole.log("Modified age:", obj.age);\n\ntry {\n  obj.city = "NYC";\n  console.log("City:", obj.city);\n} catch (error) {\n  console.log("Cannot add property");\n}\n\nconsole.log("Sealed:", Object.isSealed(obj));` },
    proxyObject: { title: "Proxy", description: "Object interception", code: `const target = { value: 42 };\n\nconst proxy = new Proxy(target, {\n  get(obj, prop) {\n    console.log("Getting:", prop);\n    return obj[prop];\n  },\n  set(obj, prop, value) {\n    console.log("Setting:", prop, "to", value);\n    obj[prop] = value;\n    return true;\n  }\n});\n\nproxy.value;\nproxy.value = 100;` },
    reflectAPI: { title: "Reflect API", description: "Object operations", code: `const obj = { x: 1, y: 2 };\n\nconsole.log("Has x:", Reflect.has(obj, "x"));\nconsole.log("Get x:", Reflect.get(obj, "x"));\n\nReflect.set(obj, "z", 3);\nconsole.log("Keys:", Reflect.ownKeys(obj));` },
    promiseAll: { title: "Promise.all()", description: "Multiple promises", code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nPromise.all([p1, p2, p3]).then(values => {\n  console.log("All resolved:", values);\n});\n\nconsole.log("Promises created");` },
    promiseRace: { title: "Promise.race()", description: "First promise wins", code: `const slow = new Promise(resolve => {\n  setTimeout(() => resolve("slow"), 100);\n});\n\nconst fast = new Promise(resolve => {\n  setTimeout(() => resolve("fast"), 50);\n});\n\nPromise.race([slow, fast]).then(result => {\n  console.log("Winner:", result);\n});\n\nconsole.log("Race started");` },
    promiseAllSettled: { title: "Promise.allSettled()", description: "All promises complete", code: `const p1 = Promise.resolve(1);\nconst p2 = Promise.reject("error");\nconst p3 = Promise.resolve(3);\n\nPromise.allSettled([p1, p2, p3]).then(results => {\n  results.forEach(result => {\n    console.log(result.status + ":", result.value || result.reason);\n  });\n});` },
    promiseAny: { title: "Promise.any()", description: "First successful promise", code: `const p1 = Promise.reject("error1");\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nPromise.any([p1, p2, p3]).then(result => {\n  console.log("First success:", result);\n});\n\nconsole.log("Waiting for success");` },
    bitwiseOperators: { title: "Bitwise Operators", description: "Binary operations", code: `const a = 5;  // 101\nconst b = 3;  // 011\n\nconsole.log("AND:", a & b);  // 001 = 1\nconsole.log("OR:", a | b);   // 111 = 7\nconsole.log("XOR:", a ^ b);  // 110 = 6\nconsole.log("NOT:", ~a);     // -6\nconsole.log("Left shift:", a << 1);  // 1010 = 10` },
    typeofOperator: { title: "typeof Operator", description: "Type checking", code: `console.log(typeof "Hello");\nconsole.log(typeof 42);\nconsole.log(typeof true);\nconsole.log(typeof undefined);\nconsole.log(typeof null);\nconsole.log(typeof {});\nconsole.log(typeof []);\nconsole.log(typeof function(){});` },
    instanceofOperator: { title: "instanceof Operator", description: "Instance checking", code: `class Animal {}\nclass Dog extends Animal {}\n\nconst dog = new Dog();\n\nconsole.log(dog instanceof Dog);\nconsole.log(dog instanceof Animal);\nconsole.log(dog instanceof Object);\nconsole.log([] instanceof Array);` },
    inOperator: { title: "in Operator", description: "Property existence", code: `const car = { make: "Toyota", model: "Camry" };\n\nconsole.log("make" in car);\nconsole.log("year" in car);\nconsole.log("toString" in car);\n\nconst arr = [1, 2, 3];\nconsole.log(0 in arr);\nconsole.log(5 in arr);` },
    deleteOperator: { title: "delete Operator", description: "Removing properties", code: `const obj = { a: 1, b: 2, c: 3 };\n\nconsole.log("Before:", obj);\n\ndelete obj.b;\nconsole.log("After delete:", obj);\n\nconsole.log("Has b:", "b" in obj);` },
    voidOperator: { title: "void Operator", description: "Returns undefined", code: `const result1 = void 0;\nconsole.log("void 0:", result1);\n\nconst result2 = void (2 + 2);\nconsole.log("void (2+2):", result2);\n\nfunction test() { return 5; }\nconsole.log("void test():", void test());` },
    commaOperator: { title: "Comma Operator", description: "Multiple expressions", code: `let a, b, c;\n\nconst result = (a = 1, b = 2, c = 3, a + b + c);\nconsole.log("Result:", result);\n\nfor (let i = 0, j = 10; i < 3; i++, j--) {\n  console.log(\`i=\${i}, j=\${j}\`);\n}` },
    ternaryOperator: { title: "Ternary Operator", description: "Conditional expression", code: `const age = 20;\nconst status = age >= 18 ? "adult" : "minor";\nconsole.log("Status:", status);\n\nconst score = 85;\nconst grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";\nconsole.log("Grade:", grade);` },
    stringPadding: { title: "String Padding", description: "padStart and padEnd", code: `const num = "5";\n\nconsole.log("padStart:", num.padStart(3, "0"));\nconsole.log("padEnd:", num.padEnd(3, "0"));\n\nconst time = "9:5";\nconst [h, m] = time.split(":");\nconst formatted = \`\${h.padStart(2, "0")}:\${m.padStart(2, "0")}\`;\nconsole.log("Time:", formatted);` },
    stringRepeat: { title: "String repeat()", description: "Repeating strings", code: `console.log("*".repeat(10));\nconsole.log("Hello ".repeat(3));\n\nconst indent = " ".repeat(4);\nconsole.log(indent + "Indented text");` },
    stringTrim: { title: "String Trimming", description: "Removing whitespace", code: `const str = "  Hello World  ";\n\nconsole.log("Original: '" + str + "'");\nconsole.log("trim(): '" + str.trim() + "'");\nconsole.log("trimStart(): '" + str.trimStart() + "'");\nconsole.log("trimEnd(): '" + str.trimEnd() + "'");` },
    stringSplit: { title: "String split()", description: "String to array", code: `const csv = "apple,banana,orange";\nconst fruits = csv.split(",");\nconsole.log("Fruits:", fruits);\n\nconst sentence = "Hello world";\nconst words = sentence.split(" ");\nconsole.log("Words:", words);\n\nconst chars = "Hello".split("");\nconsole.log("Chars:", chars);` },
    numberMethods: { title: "Number Methods", description: "Working with numbers", code: `const num = 123.456;\n\nconsole.log("toFixed(2):", num.toFixed(2));\nconsole.log("toPrecision(4):", num.toPrecision(4));\nconsole.log("toExponential():", num.toExponential());\n\nconst parsed = Number.parseInt("42px");\nconsole.log("parseInt:", parsed);` },
    numberChecks: { title: "Number Checks", description: "Number validation", code: `console.log("isNaN(NaN):", isNaN(NaN));\nconsole.log("isNaN('hello'):", isNaN("hello"));\nconsole.log("Number.isNaN(NaN):", Number.isNaN(NaN));\nconsole.log("Number.isNaN('hello'):", Number.isNaN("hello"));\n\nconsole.log("isFinite(100):", isFinite(100));\nconsole.log("isFinite(Infinity):", isFinite(Infinity));\nconsole.log("Number.isInteger(5):", Number.isInteger(5));\nconsole.log("Number.isInteger(5.5):", Number.isInteger(5.5));` },
    bigInt: { title: "BigInt", description: "Large integers", code: `const big1 = 9007199254740991n;\nconst big2 = BigInt("9007199254740991");\n\nconsole.log("BigInt:", big1);\nconsole.log("Type:", typeof big1);\n\nconst result = big1 + big2;\nconsole.log("Sum:", result);\n\nconsole.log("Comparison:", 10n > 5n);` },
    intlNumber: { title: "Intl.NumberFormat", description: "Number formatting", code: `const num = 1234567.89;\n\nconst usd = new Intl.NumberFormat("en-US", {\n  style: "currency",\n  currency: "USD"\n}).format(num);\n\nconsole.log("USD:", usd);\n\nconst eur = new Intl.NumberFormat("de-DE", {\n  style: "currency",\n  currency: "EUR"\n}).format(num);\n\nconsole.log("EUR:", eur);` },
    intlDate: { title: "Intl.DateTimeFormat", description: "Date formatting", code: `const date = new Date();\n\nconst usDate = new Intl.DateTimeFormat("en-US").format(date);\nconsole.log("US:", usDate);\n\nconst ukDate = new Intl.DateTimeFormat("en-GB").format(date);\nconsole.log("UK:", ukDate);\n\nconst long = new Intl.DateTimeFormat("en-US", {\n  dateStyle: "full"\n}).format(date);\nconsole.log("Long:", long);` },
    performanceNow: { title: "performance.now()", description: "High-precision timing", code: `const start = performance.now();\n\n// Simulate work\nfor (let i = 0; i < 1000000; i++) {}\n\nconst end = performance.now();\nconst duration = end - start;\n\nconsole.log(\`Duration: \${duration.toFixed(2)}ms\`);` },
    consoleTable: { title: "console.table()", description: "Tabular console output", code: `const users = [\n  { name: "John", age: 30, city: "NYC" },\n  { name: "Jane", age: 25, city: "LA" },\n  { name: "Bob", age: 35, city: "Chicago" }\n];\n\nconsole.log("Array of objects:");\nconsole.table(users);\n\nconsole.log("\\nShown as regular log for demo");` },
    debugger: { title: "debugger Statement", description: "Breakpoint for debugging", code: `function calculate(a, b) {\n  console.log("Before calculation");\n  \n  // debugger; // Uncomment to pause execution\n  \n  const result = a + b;\n  console.log("Result:", result);\n  return result;\n}\n\ncalculate(5, 3);` },
    strictMode: { title: "Strict Mode", description: "Enforcing stricter parsing", code: `"use strict";\n\nconsole.log("Strict mode enabled");\n\ntry {\n  // This would throw error in strict mode\n  // undeclaredVar = 5;\n  console.log("Strict mode prevents silent errors");\n} catch (error) {\n  console.log("Error:", error.message);\n}` },
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

  useEffect(() => {
    setEditableCode("");
    setOutput("");
  }, [selectedExample]);

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
                    <Textarea
                      value={editableCode || currentExample.code}
                      onChange={(e) => setEditableCode(e.target.value)}
                      className="font-mono text-sm min-h-[300px] bg-muted"
                    />
                    <Button 
                      onClick={() => runCode(editableCode || currentExample.code)}
                      className="w-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="output">
                  <div className="bg-muted p-4 rounded-lg min-h-[300px]">
                    <h3 className="font-bold mb-2">Console Output:</h3>
                    <pre className="text-sm whitespace-pre-wrap">{output || "Click 'Run Code' to see output"}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-xl font-bold mb-4">💡 Try It Yourself</h3>
              <p className="text-muted-foreground mb-4">
                The code above is fully editable! Modify it and run to see different results:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Change variable values to see different outputs</li>
                <li>Add new lines of code to extend functionality</li>
                <li>Create your own functions and test them</li>
                <li>Experiment with different conditions and logic</li>
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
