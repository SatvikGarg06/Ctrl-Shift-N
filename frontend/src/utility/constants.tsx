export const URL='http://localhost:8000/api'
function url(){
    return 0
}


[
  {
    "name": "index.html",
    "type": "file",
    "content": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>To-Do App</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>"
  },
  {
    "name": "package.json",
    "type": "file",
    "content": "{\n  \"name\": \"todo-app\",\n  \"private\": true,\n  \"version\": \"0.1.0\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"tailwindcss\": \"^3.4.1\",\n    \"typescript\": \"^5.5.3\",\n    \"vite\": \"^5.4.2\"\n  }\n}"
  },
  {
    "name": "tailwind.config.js",
    "type": "file",
    "content": "export default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};"
  },
  {
    "name": "postcss.config.js",
    "type": "file",
    "content": "export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};"
  },
  {
    "name": "src",
    "type": "folder",
    "children": [
      {
        "name": "App.tsx",
        "type": "file",
        "content": "import React, { useState } from 'react';\n\nfunction App() {\n  const [tasks, setTasks] = useState<string[]>([]);\n  const [input, setInput] = useState('');\n\n  const addTask = () => {\n    if (input.trim() !== '') {\n      setTasks([...tasks, input]);\n      setInput('');\n    }\n  };\n\n  return (\n    <div className=\"min-h-screen bg-gray-100 flex items-center justify-center p-4\">\n      <div className=\"bg-white p-6 rounded-lg shadow-lg w-full max-w-md\">\n        <h1 className=\"text-xl font-bold mb-4\">To-Do List</h1>\n        <input\n          type=\"text\"\n          value={input}\n          onChange={(e) => setInput(e.target.value)}\n          className=\"border p-2 w-full mb-2\"\n          placeholder=\"Add a new task...\"\n        />\n        <button\n          onClick={addTask}\n          className=\"bg-blue-500 text-white px-4 py-2 rounded w-full\"\n        >\n          Add Task\n        </button>\n        <ul className=\"mt-4\">\n          {tasks.map((task, index) => (\n            <li key={index} className=\"border-b p-2\">{task}</li>\n          ))}\n        </ul>\n      </div>\n    </div>\n  );\n}\n\nexport default App;"
      },
      {
        "name": "main.tsx",
        "type": "file",
        "content": "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);"
      },
      {
        "name": "index.css",
        "type": "file",
        "content": "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
      }
    ]
  }
]


export const FAKEJSON = `{
  "id": "project-import",
  "title": "Project Files",
  "boltActions": [
    {
      "type": "file",
      "filePath": "src/App.tsx",
      "content": "import React, { useState } from 'react';\n\nfunction App() {\n  const [todos, setTodos] = useState<string[]>([]);\n  const [input, setInput] = useState('');\n\n  const addTodo = () => {\n    if (input.trim()) {\n      setTodos([...todos, input]);\n      setInput('');\n    }\n  };\n\n  return (\n    <div className=\"min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4\">\n      <h1 className=\"text-2xl font-bold mb-4\">Todo List</h1>\n      <div className=\"flex space-x-2 mb-4\">\n        <input\n          type=\"text\"\n          value={input}\n          onChange={(e) => setInput(e.target.value)}\n          className=\"border rounded-lg p-2\"\n          placeholder=\"Add a new task...\"\n        />\n        <button onClick={addTodo} className=\"bg-blue-500 text-white p-2 rounded-lg\">Add</button>\n      </div>\n      <ul className=\"w-64\">\n        {todos.map((todo, index) => (\n          <li key={index} className=\"bg-white p-2 rounded-lg shadow mb-2\">{todo}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nexport default App;"
    },
    {
      "type": "file",
      "filePath": "src/index.css",
      "content": "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
    },
    {
      "type": "file",
      "filePath": "src/main.tsx",
      "content": "import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);"
    },
    {
      "type": "file",
      "filePath": "tailwind.config.js",
      "content": "/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};"
    }
  ]
}
`

export const FAKEXML = `xml
<boltArtifact id="project-import" title="Project Files">
  <boltAction type="file" filePath="eslint.config.js">
    import js from \'@eslint/js\';
    import globals from \'globals\';
    import reactHooks from \'eslint-plugin-react-hooks\';
    import reactRefresh from \'eslint-plugin-react-refresh\';
    import tseslint from \'typescript-eslint\';

    export default tseslint.config(
      { ignores: [\'dist\'] },
      {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: [\'**/*.{ts,tsx}\'],
        languageOptions: {
          ecmaVersion: 2020,
          globals: globals.browser,
        },
        plugins: {
          \'react-hooks\': reactHooks,
          \'react-refresh\': reactRefresh,
        },
        rules: {
          ...reactHooks.configs.recommended.rules,
          \'react-refresh/only-export-components\': [
            \'warn\',
            { allowConstantExport: true },
          ],
        },
      }
    );
  </boltAction>
  <boltAction type="file" filePath="index.html">
    <![CDATA[
    <html lang=\'en\'>
      <head>
        <meta charset=\'UTF-8\' />
        <link rel=\'icon\' type=\'image/svg+xml\' href=\'/vite.svg\' />
        <meta name=\'viewport\' content=\'width=device-width, initial-scale=1.0\' />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id=\'root\'></div>
        <script type=\'module\' src=\'/src/main.tsx\'></script>
      </body>
    </html>
    ]]>
  </boltAction>
  <boltAction type="file" filePath="package.json">
    {
      \'name\': \'vite-react-typescript-starter\',
      \'private\': true,
      \'version\': \'0.0.0\',
      \'type\': \'module\',
      \'scripts\': {
        \'dev\': \'vite\',
        \'build\': \'vite build\',
        \'lint\': \'eslint .\',
        \'preview\': \'vite preview\'
      },
      \'dependencies\': {
        \'lucide-react\': \'^0.344.0\',
        \'react\': \'^18.3.1\',
        \'react-dom\': \'^18.3.1\'
      },
      \'devDependencies\': {
        \'@eslint/js\': \'^9.9.1\',
        \'@types/react\': \'^18.3.5\',
        \'@types/react-dom\': \'^18.3.0\',
        \'@vitejs/plugin-react\': \'^4.3.1\',
        \'autoprefixer\': \'^10.4.18\',
        \'eslint\': \'^9.9.1\',
        \'eslint-plugin-react-hooks\': \'^5.1.0-rc.0\',
        \'eslint-plugin-react-refresh\': \'^0.4.11\',
        \'globals\': \'^15.9.0\',
        \'postcss\': \'^8.4.35\',
        \'tailwindcss\': \'^3.4.1\',
        \'typescript\': \'^5.5.3\',
        \'typescript-eslint\': \'^8.3.0\',
        \'vite\': \'^5.4.2\'
      }
    }
  </boltAction>
  <boltAction type="file" filePath="postcss.config.js">
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
  </boltAction>
  <boltAction type="file" filePath="tailwind.config.js">
    /** @type {import(\'tailwindcss\').Config} */
    export default {
      content: [\'./index.html\', \'./src/**/*.{js,ts,jsx,tsx}\'],
      theme: {
        extend: {},
      },
      plugins: [],
    };
  </boltAction>
  <boltAction type="file" filePath="tsconfig.app.json">
    {
      \'compilerOptions\': {
        \'target\': \'ES2020\',
        \'useDefineForClassFields\': true,
        \'lib\': [\'ES2020\', \'DOM\', \'DOM.Iterable\'],
        \'module\': \'ESNext\',
        \'skipLibCheck\': true,

        /* Bundler mode */
        \'moduleResolution\': \'bundler\',
        \'allowImportingTsExtensions\': true,
        \'isolatedModules\': true,
        \'moduleDetection\': \'force\',
        \'noEmit\': true,
        \'jsx\': \'react-jsx\',

        /* Linting */
        \'strict\': true,
        \'noUnusedLocals\': true,
        \'noUnusedParameters\': true,
        \'noFallthroughCasesInSwitch\': true
      },
      \'include\': [\'src\']
    }
  </boltAction>
  <boltAction type="file" filePath="tsconfig.json">
    {
      \'files\': [],
      \'references\': [
        { \'path\': \'./tsconfig.app.json\' },
        { \'path\': \'./tsconfig.node.json\' }
      ]
    }
  </boltAction>
  <boltAction type="file" filePath="tsconfig.node.json">
    {
      \'compilerOptions\': {
        \'target\': \'ES2022\',
        \'lib\': [\'ES2023\'],
        \'module\': \'ESNext\',
        \'skipLibCheck\': true,

        /* Bundler mode */
        \'moduleResolution\': \'bundler\',
        \'allowImportingTsExtensions\': true,
        \'isolatedModules\': true,
        \'moduleDetection\': \'force\',
        \'noEmit\': true,

        /* Linting */
        \'strict\': true,
        \'noUnusedLocals\': true,
        \'noUnusedParameters\': true,
        \'noFallthroughCasesInSwitch\': true
      },
      \'include\': [\'vite.config.ts\']
    }
  </boltAction>
  <boltAction type="file" filePath="vite.config.ts">
    import { defineConfig } from \'vite\';
    import react from \'@vitejs/plugin-react\';

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      optimizeDeps: {
        exclude: [\'lucide-react\'],
      },
    });
  </boltAction>
  <boltAction type="file" filePath="src/App.tsx">
  
  
  import React from \'react\';
    import { BrowserRouter as Router, Route, Routes } from \'react-router-dom\';
    import Home from \'./pages/Home\';
    import Menu from \'./pages/Menu\';
    import About from \'./pages/About\';
    import Contact from \'./pages/Contact\';
    import Gallery from \'./pages/Gallery\';

    function App() {
      return (
      <![CDATA[
        <Router>
          <Routes>
            <Route path=\'/\' element={<Home />} />
            <Route path=\'/menu\' element={<Menu />} />
            <Route path=\'/about\' element={<About />} />
            <Route path=\'/contact\' element={<Contact />} />
            <Route path=\'/gallery\' element={<Gallery />} />
          </Routes>
        </Router>
        ]]>
      );
    }

    export default App;
  </boltAction>
  <boltAction type="file" filePath="src/index.css">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </boltAction>
  <boltAction type="file" filePath="src/main.tsx">
    import { StrictMode } from \'react\';
    import { createRoot } from \'react-dom/client\';
    import App from \'./App.tsx\';
    import \'./index.css\';

    createRoot(document.getElementById(\'root\')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  </boltAction>
  <boltAction type="file" filePath="src/vite-env.d.ts">
    /// <reference types=\'vite/client\' />
  </boltAction>
  <boltAction type="file" filePath="src/pages/Home.tsx">
    import React from \'react\';

    function Home() {
      return (
        <div className=\'min-h-screen bg-gray-100 flex items-center justify-center\'>
          <div className=\'text-center\'>
            <h1 className=\'text-4xl font-bold mb-4\'>Welcome to Our Restaurant</h1>
            <img
              src=\'https://source.unsplash.com/featured/?restaurant\'
              alt=\'Restaurant\'
              className=\'w-full h-64 object-cover mb-4\'
            />
            <p className=\'text-lg\'>Experience the best dining with us!</p>
          </div>
        </div>
      );
    }

    export default Home;
  </boltAction>
  <boltAction type="file" filePath="src/pages/Menu.tsx">
    import React from \'react\';

    function Menu() {
      return (
        <div className=\'min-h-screen bg-gray-100 p-8\'>
          <h1 className=\'text-4xl font-bold mb-8 text-center\'>Our Menu</h1>
          <div className=\'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\'>
            <div className=\'bg-white p-4 rounded shadow\'>
              <h2 className=\'text-2xl font-bold mb-2\'>Appetizers</h2>
              <ul>
                <li>Bruschetta</li>
                <li>Stuffed Mushrooms</li>
                <li>Garlic Bread</li>
              </ul>
            </div>
            <div className=\'bg-white p-4 rounded shadow\'>
              <h2 className=\'text-2xl font-bold mb-2\'>Main Courses</h2>
              <ul>
                <li>Grilled Salmon</li>
                <li>Steak Frites</li>
                <li>Chicken Alfredo</li>
              </ul>
            </div>
            <div className=\'bg-white p-4 rounded shadow\'>
              <h2 className=\'text-2xl font-bold mb-2\'>Desserts</h2>
              <ul>
                <li>Cheesecake</li>
                <li>Tiramisu</li>
                <li>Chocolate Lava Cake</li>
              </ul>
            </div>
            <div className=\'bg-white p-4 rounded shadow\'>
              <h2 className=\'text-2xl font-bold mb-2\'>Beverages</h2>
              <ul>
                <li>Red Wine</li>
                <li>White Wine</li>
                <li>Cocktails</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    export default Menu;
  </boltAction>
  <boltAction type="file" filePath="src/pages/About.tsx">
    import React from \'react\';

    function About() {
      return (
        <div className=\'min-h-screen bg-gray-100 p-8\'>
          <h1 className=\'text-4xl font-bold mb-8 text-center\'>About Us</h1>
          <div className=\'max-w-2xl mx-auto\'>
            <p className=\'mb-4\'>
              Our restaurant was founded with the mission to provide delicious food and a welcoming atmosphere. We value quality, sustainability, and community.
            </p>
            <h2 className=\'text-2xl font-bold mb-4\'>Our Team</h2>
            <div className=\'grid grid-cols-1 md:grid-cols-2 gap-4\'>
              <div className=\'text-center\'>
                <img
                  src=\'https://source.unsplash.com/featured/?chef\'
                  alt=\'Chef\'
                  className=\'w-full h-48 object-cover mb-2 rounded\'
                />
                <p>Head Chef</p>
              </div>
              <div className=\'text-center\'>
                <img
                  src=\'https://source.unsplash.com/featured/?restaurant-staff\'
                  alt=\'Staff\'
                  className=\'w-full h-48 object-cover mb-2 rounded\'
                />
                <p>Our Team</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default About;
  </boltAction>
  <boltAction type="file" filePath="src/pages/Contact.tsx">
    import React from \'react\';

    function Contact() {
      return (
        <div className=\'min-h-screen bg-gray-100 p-8\'>
          <h1 className=\'text-4xl font-bold mb-8 text-center\'>Contact Us</h1>
          <div className=\'max-w-lg mx-auto\'>
            <form className=\'bg-white p-6 rounded shadow mb-8\'>
              <div className=\'mb-4\'>
                <label className=\'block text-sm font-bold mb-2\'>Name</label>
                <input className=\'w-full p-2 border rounded\' type=\'text\' />
              </div>
              <div className=\'mb-4\'>
                <label className=\'block text-sm font-bold mb-2\'>Email</label>
                <input className=\'w-full p-2 border rounded\' type=\'email\' />
              </div>
              <div className=\'mb-4\'>
                <label className=\'block text-sm font-bold mb-2\'>Message</label>
                <textarea className=\'w-full p-2 border rounded\' rows={4}></textarea>
              </div>
              <button className=\'bg-blue-500 text-white p-2 rounded\'>Send</button>
            </form>
            <div className=\'bg-white p-6 rounded shadow\'>
              <h2 className=\'text-2xl font-bold mb-4\'>Our Location</h2>
              <iframe
                src=\'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373531531677!3d-37.81627977975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9c1f1e0e3!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611815470923!5m2!1sen!2sau\'
                width=\'100%\'
                height=\'300\'
                style={{ border: 0 }}
                allowFullScreen={false}
                loading=\'lazy\'
              ></iframe>
            </div>
          </div>
        </div>
      );
    }

    export default Contact;
  </boltAction>
  <boltAction type="file" filePath="src/pages/Gallery.tsx">
    import React from \'react\';

    function Gallery() {
      return (
        <div className=\'min-h-screen bg-gray-100 p-8\'>
          <h1 className=\'text-4xl font-bold mb-8 text-center\'>Gallery</h1>
          <div className=\'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\'>
            {[...Array(9)].map((_, index) => (
              <img
                key={index}
                src={\`https://source.unsplash.com/random/800x600?sig=\${index}\`}
                alt=\'Gallery\'
                className=\'w-full h-64 object-cover rounded shadow\'
              />
            ))}
          </div>
        </div>
      );
    }

    export default Gallery;
  </boltAction>
</boltArtifact>
`

export default url































