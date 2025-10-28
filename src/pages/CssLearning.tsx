import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const cssProperties = [
  {
    tagName: "color",
    description: "Sets the color of the text. You can use color names, hexadecimal values, RGB values, etc.",
    example: "p { color: red; }\np { color: #ff0000; }\np { color: rgb(255, 0, 0); }",
    html: "<p>This text is red.</p>"
  },
  {
    tagName: "background-color",
    description: "Sets the background color of an element. This can be a solid color or a gradient.",
    example: "div { background-color: #f0f0f0; }\ndiv { background: linear-gradient(to right, red, yellow); }",
    html: "<div style='padding:1rem; border: 1px solid black;'>This div has a background.</div>"
  },
  {
    tagName: "font-size",
    description: "Sets the size of the font. You can use pixels, ems, rems, or percentages.",
    example: "p { font-size: 24px; }",
    html: "<p>This text is larger.</p>"
  },
  {
    tagName: "font-family",
    description: "Specifies the font for an element. You can list multiple fonts as a fallback.",
    example: "p { font-family: 'Courier New', monospace; }",
    html: "<p>This text is in Courier New.</p>"
  },
  {
    tagName: "font-weight",
    description: "Sets how thick or thin characters in text should be displayed.",
    example: "p { font-weight: bold; }",
    html: "<p>This text is bold.</p>"
  },
  {
    tagName: "font-style",
    description: "Sets the style of the font.",
    example: "p { font-style: italic; }",
    html: "<p>This text is italic.</p>"
  },
  {
    tagName: "text-decoration",
    description: "Adds decoration to text.",
    example: "p { text-decoration: underline; }",
    html: "<p>This text is underlined.</p>"
  },
  {
    tagName: "text-align",
    description: "Aligns the text in an element.",
    example: "p { text-align: center; }",
    html: "<p>This text is centered.</p>"
  },
    {
    tagName: "margin",
    description: "Sets the margin space on all four sides of an element.",
    example: "div { margin: 20px; background: lightblue; }",
    html: "<div style='border: 1px solid black;'><div style='height: 20px;'>The outer div has a margin.</div></div>"
  },
  {
    tagName: "padding",
    description: "Sets the padding space on all four sides of an element.",
    example: "div { padding: 20px; background: lightgreen; }",
    html: "<div style='border: 1px solid black;'><div style='height: 20px;'>This div has padding.</div></div>"
  },
  {
    tagName: "border",
    description: "A shorthand property for setting all the properties for the four borders of an element.",
    example: "div { border: 2px solid blue; }",
    html: "<div style='padding: 10px;'>This div has a blue border.</div>"
  },
  {
    tagName: "border-radius",
    description: "Rounds the corners of an element's outer border edge.",
    example: "div { border-radius: 8px; border: 1px solid black; }",
    html: "<div style='padding: 10px;'>This div has rounded corners.</div>"
  },
  {
    tagName: "width",
    description: "Sets the width of an element.",
    example: "div { width: 50%; background: lightgray; }",
    html: "<div style='border: 1px solid black;'><div style='height: 20px;'></div></div>"
  },
  {
    tagName: "height",
    description: "Sets the height of an element.",
    example: "div { height: 100px; background: lightgray; }",
    html: "<div style='border: 1px solid black;'></div>"
  },
  {
    tagName: "box-shadow",
    description: "Attaches one or more shadows to an element.",
    example: "div { box-shadow: 10px 5px 5px #888888; }",
    html: "<div style='padding: 10px; border: 1px solid #ccc;'>This div has a shadow.</div>"
  },
  {
    tagName: "text-shadow",
    description: "Adds shadow to text.",
    example: "h1 { text-shadow: 2px 2px #ff0000; }",
    html: "<h1>This heading has a shadow.</h1>"
  },
  {
    tagName: "display",
    description: "Specifies the display behavior of an element.",
    example: "span { display: block; }",
    html: "<span>This is a span.</span><span>It is now a block-level element.</span>"
  },
  {
    tagName: "position",
    description: "Specifies the type of positioning method used for an element.",
    example: ".relative { position: relative; top: 10px; left: 10px; background: lightblue; }",
    html: "<div class='relative'>This div is positioned relative.</div>"
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

const CssLearning = () => {
  const [text, setText] = useState('');
  const [theme, setTheme] = useState('dark');
  const [runningExample, setRunningExample] = useState(null);
  const fullText = 'Learn CSS Properties';

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
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Here you can find a comprehensive list of CSS properties to learn from.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cssProperties.map((tag, index) => (
          <div key={index} className="rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:-translate-y-1" style={{ backgroundColor: cardBgColor, color: cardTextColor, borderColor: cardTextColor }}>
            <h2 className="text-2xl font-bold mb-2">{tag.tagName}</h2>
            <p className="flex-grow">{tag.description}</p>
            <pre className="p-4 rounded-lg text-sm overflow-x-auto mt-4" style={{ backgroundColor: getContrastingColor(cardBgColor), color: getContrastingColor(getContrastingColor(cardBgColor)) }}>
              <code>{tag.example}</code>
            </pre>
            <Button onClick={() => setRunningExample(runningExample === index ? null : index)} className="mt-4 w-full">
              {runningExample === index ? 'Close' : 'Run'}
            </Button>
            {runningExample === index && (
                <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Output</h4>
                    <div id={`css-output-${index}`} className="p-4 rounded" style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc' }}>
                        <style>
                            {tag.example.split('\n').map(rule => {
                                const separatorIndex = rule.indexOf('{');
                                if (separatorIndex !== -1) {
                                    const selectors = rule.substring(0, separatorIndex).trim();
                                    const style = rule.substring(separatorIndex);
                                    const newSelectors = selectors.split(',').map(s => `#css-output-${index} ${s.trim()}`).join(', ');
                                    return `${newSelectors} ${style}`;
                                }
                                return rule;
                            }).join('\n')}
                        </style>
                        <div dangerouslySetInnerHTML={{ __html: tag.html }} />
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CssLearning;
