# ✈️ SkyConnect

Una prueba tecnica, con integración de mapas interactivos, búsqueda avanzada y diseño responsivo.

## 📸 Vista previa

<div align="center">

### Pantallas del proyecto

<img width="500" alt="Vista previa 1" src="https://github.com/user-attachments/assets/d027f971-d75a-4900-b069-1b77aefed24b" />

<br/>

<img width="500" alt="Vista previa 2" src="https://github.com/user-attachments/assets/3a340ddf-dbaf-4146-976e-e4312dd088cb" />

</div>

## ✨ Características Principales

### 🔍 Búsqueda y Exploración

- **Búsqueda en tiempo real** con debounce para una experiencia fluida
- **Búsqueda por nombre** del aeropuerto
- **Búsqueda por código IATA/ICAO** para acceso rápido
- **Paginación personalizable** (10, 25, 50, 100 resultados por página)
- **Tabla interactiva** con información resumida de aeropuertos

### 🗺️ Mapas Interactivos

- **Integración con Leaflet y OpenStreetMap** para visualización de ubicaciones
- **Mapas interactivos** en la página de detalles de cada aeropuerto
- **Marcadores personalizados** con información del aeropuerto
- **Zoom y navegación** fluidos en los mapas

### 📱 Interfaz de Usuario

- **Diseño responsivo** adaptado a todos los dispositivos
- **Modo oscuro/claro** con transiciones suaves
- **Shaders y efectos visuales** con `@paper-design/shaders-react`
- **Tipografía personalizada** con fuentes Geist y Silk Serif

### 🏗️ Arquitectura

- **Gestión de estado global** con Zustand
- **Separación de concerns** (servicios, componentes, store, tipos)
- **TypeScript** para mayor seguridad de tipos
- **Server-side rendering** con Next.js App Router
- **Carga dinámica** de componentes para optimización

## 🛠️ Tecnologías Utilizadas

### Core

- **Next.js 16** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático

### Estado y Datos

- **Zustand** - Gestión de estado global ligera
- **Aviationstack API** - API externa para datos de aeropuertos

### UI y Estilos

- **Tailwind CSS 4** - Framework de utilidades CSS
- **Lucide React** - Iconos modernos
- **@paper-design/shaders-react** - Efectos visuales y shaders
- **class-variance-authority** - Gestión de variantes de componentes

### Mapas

- **Leaflet** - Biblioteca de mapas open-source
- **React-Leaflet** - Componentes React para Leaflet
- **OpenStreetMap** - Tiles de mapas gratuitos

### Testing

- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **@testing-library/user-event** - Simulación de interacciones de usuario

## 📁 Estructura del Proyecto

```
SkyConnect/
├── app/                    # Next.js App Router
│   ├── airports/          # Páginas de aeropuertos
│   │   ├── [iata]/        # Página de detalles dinámica
│   │   └── page.tsx       # Listado de aeropuertos
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── AirportMap.tsx     # Componente de mapa
│   ├── AirportSearch.tsx  # Componente de búsqueda
│   ├── AirportTable.tsx   # Tabla de aeropuertos
│   ├── Pagination.tsx     # Componente de paginación
│   ├── SearchScreen.tsx   # Pantalla de búsqueda inicial
│   ├── ThemeProvider.tsx  # Proveedor de tema
│   └── ThemeToggle.tsx    # Toggle de tema oscuro/claro
├── services/              # Servicios y APIs
│   ├── aviationApi.ts     # Cliente de API de Aviationstack
│   └── useTheme.ts        # Hook de tema
├── store/                 # Store de Zustand
│   ├── airportStore.ts    # Store de aeropuertos
│   └── useThemeStore.ts   # Store de tema
├── types/                 # Definiciones TypeScript
│   ├── airport.ts         # Tipos de aeropuertos
│   └── themes.ts          # Tipos de temas
├── __tests__/             # Tests
│   └── integration/       # Tests de integración
└── public/                # Archivos estáticos
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18.x o superior
- npm o yarn
- Cuenta en [Aviationstack](https://aviationstack.com/) para obtener una API key

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd SkyConnect
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

   Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_AVIATIONSTACK_API_KEY=tu_api_key_aqui
```

Para obtener tu API key:

- Visita [Aviationstack](https://aviationstack.com/)
- Crea una cuenta gratuita
- Obtén tu API key desde el dashboard

4. **Ejecutar el servidor de desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

   Navega a [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm start            # Inicia el servidor de producción

# Testing
npm test             # Ejecuta los tests
npm run test:watch   # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con cobertura


## 🗺️ Rutas de la Aplicación

- `/` - Página de inicio con pantalla de búsqueda animada
- `/airports` - Listado completo de aeropuertos con búsqueda y paginación
- `/airports/[iata]` - Página de detalles de un aeropuerto específico con mapa interactivo

## 🎨 Funcionalidades Destacadas

### Búsqueda Inteligente

La búsqueda utiliza debounce para optimizar las consultas a la API y mejorar el rendimiento. Los usuarios pueden buscar por:

- Nombre del aeropuerto
- Código IATA (ej: "JFK", "LAX")
- Código ICAO (ej: "KJFK", "KLAX")

### Gestión de Estado

El proyecto utiliza Zustand para gestionar:

- Lista de aeropuertos
- Estado de carga y errores
- Información de paginación
- Aeropuerto seleccionado
- Consulta de búsqueda actual

### Optimizaciones

- **Carga dinámica** de componentes pesados (mapas) para reducir el bundle inicial
- **Server-side rendering** para mejor SEO y rendimiento
- **Caching** de datos del aeropuerto seleccionado en el store

## 🧪 Testing

El proyecto incluye tests de integración y unitarios. Para ejecutar los tests:

```bash
npm test
```

Los tests están ubicados en:

- `__tests__/integration/` - Tests de integración de la API
- `components/__tests__/` - Tests de componentes

## 📦 Build 

### Build de Producción

```bash
npm run build
```
