import React, { useState, useEffect } from 'react';
import { CheatSheet } from "@/components/Cheatsheet";

const reactCheatsheet = [
  {
    title: "Class Component",
    code: `class MyComponent extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`,
  },
  {
    title: "Functional Component",
    code: `function MyComponent(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  {
    title: "State Management (useState)",
    code: `const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  You clicked {count} times
</button>`,
  },
  {
    title: "Side Effects (useEffect)",
    code: `useEffect(() => {
  // Side effect code goes here
  document.title = \`You clicked \${count} times\`;

  // Optional cleanup function
  return () => {
    // Cleanup code goes here
  };
}, [count]); // Dependency array`,
  },
  {
    title: "Context (useContext)",
    code: `const MyContext = React.createContext();

function MyProvider({ children }) {
  return (
    <MyContext.Provider value="Hello from Context!">
      {children}
    </MyContext.Provider>
  );
}

function MyComponent() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}`,
  },
  {
    title: "Custom Hook",
    code: `function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width is: {width}</div>;
}`,
  },
  {
    title: "Conditional Rendering",
    code: `function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}`,
  },
  {
    title: "List and Keys",
    code: `const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);`,
  },
  {
    title: "Event Handling",
    code: `function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}`,
  },
];

const themes = {
  dark: {
    bgColor: '#1a202c',
    textColor: '#ffffff',
  },
  light: {
    bgColor: '#ffffff',
    textColor: '#000000',
  },
  blueprint: {
    bgColor: '#3c6e71',
    textColor: '#ffffff',
  },
  forest: {
    bgColor: '#283618',
    textColor: '#fefae0',
  },
};

const ReactCheatsheet = () => {
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('dark');
  const fullText = 'React Cheatsheet';

  const { bgColor, textColor } = themes[theme];

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        setTimeout(() => {
          setText('');
          i = 0;
        }, 2000);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  const getContrastingColor = (hexcolor) => {
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  };

  const cardBgColor = getContrastingColor(bgColor);
  const cardTextColor = getContrastingColor(cardBgColor);

  return (
    <div className="container mx-auto px-4 py-8 transition-colors duration-500" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="flex justify-end mb-4">
        {Object.keys(themes).map((themeName) => (
          <div key={themeName} className="flex items-center mr-4">
            <input
              type="radio"
              id={themeName}
              name="theme"
              value={themeName}
              checked={theme === themeName}
              onChange={() => setTheme(themeName)}
              className="mr-1"
            />
            <label htmlFor={themeName} className="capitalize">{themeName}</label>
          </div>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">
        {text}
        <span className="animate-ping">|</span>
      </h1>
      <CheatSheet title="" items={reactCheatsheet} cardBgColor={cardBgColor} cardTextColor={cardTextColor} />
    </div>
  );
};

export default ReactCheatsheet;
