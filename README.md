# 🚀 SWAPI Explorer

Una aplicación web moderna, interactiva y agnóstica a los datos para explorar el universo de Star Wars utilizando la [Star Wars API (SWAPI)](https://swapi.dev/).

Construida con **React 19**, **Vite** y **Tailwind CSS v4**, esta aplicación destaca por su arquitectura **DRY (Don't Repeat Yourself)** y su capacidad de renderizado recursivo inteligente.

![SWAPI Explorer Preview](./public/screenshot.png)
*(Nota: ¡Asegúrate de agregar una captura de pantalla de tu app en la carpeta public o cambiar esta ruta!)*

---

## ✨ Características Principales

-   **Navegación Dinámica:** El menú principal se genera automáticamente consultando la raíz de la API, permitiendo escalar a nuevos recursos sin cambiar el código.
-   **Arquitectura Agnóstica:** No existen componentes específicos como `<Personaje />` o `<Planeta />`. El sistema utiliza vistas genéricas (`ResourceList` y `ResourceDetail`) capaces de renderizar cualquier tipo de entidad.
-   **Navegación Inteligente ("Smart Linking"):**
    -   Detecta automáticamente si un dato de la API es una URL a otro recurso de Star Wars.
    -   Transforma esas URLs en botones de navegación interna (SPA), permitiendo saltar de un Personaje a sus Naves o Películas sin recargar la página.
-   **Renderizado Recursivo:** Maneja estructuras de datos complejas, arrays y objetos anidados visualizándolos de forma limpia.
-   **UI Moderna y Responsiva:** Diseño "Grid" adaptativo, efectos de hover, y tema visual inspirado en Star Wars (Negro/Amarillo) utilizando Tailwind CSS v4.
-   **Paginación:** Navegación fluida entre grandes conjuntos de datos.

## 🛠️ Stack Tecnológico

-   **Core:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (vía `@tailwindcss/vite`)
-   **Enrutamiento:** [React Router DOM v6/v7](https://reactrouter.com/)
-   **Iconos:** [Lucide React](https://lucide.dev/)
-   **Linter:** ESLint

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/swapi-explorer.git](https://github.com/tu-usuario/swapi-explorer.git)
    cd swapi-explorer
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    La aplicación estará corriendo típicamente en `http://localhost:5173`.

## 📂 Estructura del Proyecto

La estructura está diseñada para ser modular y escalable:

```text
src/
├── components/
│   ├── SmartValue.jsx       # 🧠 El cerebro de la recursividad y detección de links
│   └── ui/
│       └── Common.jsx       # Componentes UI reutilizables (Loader, Error, Button)
├── hooks/
│   └── useFetch.jsx         # Hook personalizado para manejo de peticiones HTTP
├── pages/
│   ├── ResourceList.jsx     # Vista genérica para listar items (Personas, Planetas...)
│   └── ResourceDetail.jsx   # Vista de detalle recursiva
├── utils/
│   └── urlHelpers.jsx       # Utilidades para parsear URLs de SWAPI
├── App.jsx                  # Layout principal y configuración de rutas
└── index.css                # Configuración de Tailwind CSS
