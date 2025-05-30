// === IMPORTACIONES ===
// Importa la configuración recomendada base de ESLint para JavaScript
import js from "@eslint/js"
// Importa variables globales predefinidas (browser, node, etc.)
import globals from "globals"
// Importa configuraciones y reglas específicas para TypeScript
import typescript from "typescript-eslint"
// Importa plugin para manejar archivos .astro
import astroPlugin from "eslint-plugin-astro"
// Importa plugin para reglas específicas de React
import reactPlugin from "eslint-plugin-react"
// Importa plugin para reglas de React Hooks
import reactHooksPlugin from "eslint-plugin-react-hooks"
// Importa plugin para reglas de estilo de código
import stylistic from "@stylistic/eslint-plugin"

export default [
  // === CONFIGURACIONES BASE ===
  // Aplica las reglas recomendadas de JavaScript
  js.configs.recommended,

  // Aplicar reglas para typescript
  ...typescript.configs.recommended,

  // Aplica las reglas recomendadas de astro
  ...astroPlugin.configs.recommended,

  // === CONFIGURACIÓN ESPECÍFICA PARA REACT/JSX ===
  // Esta configuración solo se aplica a archivos .jsx y .tsx
  {
    // Define qué archivos serán afectados por esta configuración
    files: ["**/*.{jsx,tsx}"],

    // Registra los plugins necesarios para React
    plugins: {
      react: reactPlugin, // Plugin principal de React
      "react-hooks": reactHooksPlugin // Plugin para reglas de Hooks
    },

    // Configuración del lenguaje y parser
    languageOptions: {
      // Define variables globales disponibles (window, document, etc.)
      globals: {
        ...globals.browser // Variables del navegador
      },

      // Opciones específicas del parser
      parserOptions: {
        // Habilita características específicas
        ecmaFeatures: {
          jsx: true // Permite sintaxis JSX
        },
        ecmaVersion: "latest", // Usa la versión más reciente de ECMAScript
        sourceType: "module" // Permite import/export
      }
    },

    // Configuraciones específicas de React
    settings: {
      react: {
        version: "detect" // Detecta automáticamente la versión de React
      }
    },

    // Reglas específicas para archivos React
    rules: {
      // Aplica todas las reglas recomendadas de React
      ...reactPlugin.configs.recommended.rules,
      // Aplica todas las reglas recomendadas de React Hooks
      ...reactHooksPlugin.configs.recommended.rules,
      // Desactiva la regla que requiere importar React (React 17+)
      "react/react-in-jsx-scope": "off"
    }
  },

  // === CONFIGURACIÓN GENERAL PARA TODOS LOS ARCHIVOS ===
  // Esta configuración se aplica a JavaScript, TypeScript, JSX y Astro
  {
    // Define todos los tipos de archivos que serán verificados
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx,astro}"],

    // Configuración del lenguaje y parser
    languageOptions: {
      // Define variables globales disponibles (window, document, etc.)
      globals: {
        ...globals.browser // Variables del navegador
      }
    },

    // Registra el plugin de estilo
    plugins: {
      "@stylistic": stylistic // Plugin para reglas de formato de código
    },

    // === REGLAS DE LINTING ===
    rules: {
      // === REGLAS DE ERRORES POSIBLES ===

      // Permite console.log pero muestra advertencia para recordar quitarlos
      "no-console": "warn",

      // Prohíbe debugger en producción (debe removerse)
      "no-debugger": "error",

      // Detecta argumentos duplicados en funciones
      "no-dupe-args": "error",

      // Detecta claves duplicadas en objetos literales
      "no-dupe-keys": "error",

      // Detecta cases duplicados en declaraciones switch
      "no-duplicate-case": "error",

      // Prohíbe bloques de código vacíos
      "no-empty": "error",

      // Elimina puntos y comas innecesarios
      "no-extra-semi": "error",

      // Detecta código que nunca se ejecutará (después de return, etc.)
      "no-unreachable": "error",

      // Fuerza el uso de isNaN() en lugar de comparación directa con NaN
      "use-isnan": "error",

      // Valida que las comparaciones con typeof sean con strings válidos
      "valid-typeof": "error",

      // === MEJORES PRÁCTICAS ===

      // Obliga a usar llaves {} en todas las estructuras de control
      "curly": "error",

      // Prefiere object.property sobre object['property']
      "dot-notation": "error",

      // Obliga a usar === y !== en lugar de == y !=
      "eqeqeq": ["error", "always"],

      // Advierte sobre el uso de alert() (no recomendado)
      "no-alert": "warn",

      // Prohíbe eval() por razones de seguridad
      "no-eval": "error",

      // Prohíbe eval() implícito (setTimeout con strings)
      "no-implied-eval": "error",

      // Elimina espacios múltiples consecutivos innecesarios
      "no-multi-spaces": "error",

      // Prohíbe usar 'new' sin asignar el resultado a una variable
      "no-new": "error",

      // Prohíbe el uso de 'with' (deprecated y problemático)
      "no-with": "error",

      // === MANEJO DE VARIABLES ===

      // Detecta variables declaradas pero nunca usadas
      "no-unused-vars": ["error", {
        "argsIgnorePattern": "^_", // Ignora argumentos que empiecen con _
        "varsIgnorePattern": "^_" // Ignora variables que empiecen con _
      }],

      // Prohíbe usar variables antes de declararlas
      "no-use-before-define": "error",

      // Prefiere const sobre let cuando la variable no se reasigna
      "prefer-const": "error",

      // Prohíbe el uso de var (usa let/const)
      "no-var": "error",

      // === REGLAS DE IMPORTACIONES ===

      // Evita importar el mismo módulo múltiples veces
      "no-duplicate-imports": "error",

      // === REGLAS DE ESTILO Y FORMATO ===

      // Controla espacios dentro de corchetes: [1, 2] no [ 1, 2 ]
      "@stylistic/array-bracket-spacing": ["error", "never"],

      // Estilo de llaves: 1TBS (One True Brace Style)
      "@stylistic/brace-style": ["error", "1tbs"],

      // Espacios alrededor de comas: después sí, antes no
      "@stylistic/comma-spacing": ["error", {
        "before": false, // Sin espacio antes de la coma
        "after": true // Con espacio después de la coma
      }],

      // Prohíbe comas finales (trailing commas)
      "@stylistic/comma-dangle": ["error", "never"],

      // Indentación consistente de 2 espacios
      "@stylistic/indent": ["error", 2],

      // Espacios en objetos: después de : pero no antes
      "@stylistic/key-spacing": ["error", {
        "beforeColon": false, // Sin espacio antes de :
        "afterColon": true // Con espacio después de :
      }],

      // Espacios alrededor de palabras clave (if, for, while, etc.)
      "@stylistic/keyword-spacing": "error",

      // Limita líneas vacías consecutivas
      "@stylistic/no-multiple-empty-lines": ["error", {
        "max": 2, // Máximo 2 líneas vacías consecutivas
        "maxEOF": 1 // Máximo 1 línea vacía al final del archivo
      }],

      // Elimina espacios en blanco al final de las líneas
      "@stylistic/no-trailing-spaces": "error",

      // Espacios dentro de llaves de objetos: { key: value }
      "@stylistic/object-curly-spacing": ["error", "always"],

      // Usa comillas dobles consistentemente
      "@stylistic/quotes": ["error", "double"],

      // Elimina punto y coma al final de las declaraciones
      "@stylistic/semi": ["error", "never"],

      // Requiere espacio antes de bloques de código
      "@stylistic/space-before-blocks": "error",

      // Espacios alrededor de operadores (+, -, *, /, etc.)
      "@stylistic/space-infix-ops": "error"
    }
  }

]
