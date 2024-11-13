# Campus Sync Frontend App

## Descripción

Esta aplicación web está diseñada para el registro de matrícula financiera de los estudiantes de un campus universitario. El frontend simula las transacciones que se realizarían en un sistema de gestión de matrícula, interactuando con un backend desarrollado en Spring Boot que está desplegado localmente. A través de esta aplicación, los usuarios pueden realizar solicitudes a los endpoints del backend para gestionar la información relacionada con la matrícula, incluyendo el registro de pagos, consultas y actualizaciones de datos. La interfaz es intuitiva y está optimizada para facilitar la experiencia del usuario en el proceso de matrícula financiera.

![logo](https://github.com/user-attachments/assets/c7a63ec5-ef81-4ae6-8b66-14286551c307)

## Empezando

![next](https://github.com/user-attachments/assets/8e048253-2eff-4c64-b85b-7a66ef0cccc7)

Primero, ejecute el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) con su navegador para ver el resultado.

## Requisitos de Instalación

Al ejecutar el comando `npm install`, puede que encuentres problemas relacionados con la instalación de ciertos paquetes debido a incompatibilidades de versiones de React. En particular, los siguientes paquetes son necesarios para el funcionamiento del proyecto, pero no se instalaron correctamente:

- `react-calendar`
- `recharts`

Para instalar estos paquetes, es necesario utilizar la opción `--legacy-peer-deps` para evitar conflictos de versiones. Puedes hacerlo ejecutando los siguientes comandos:

```bash
npm install react-calendar --legacy-peer-deps
npm install recharts --legacy-peer-deps
npm install @hookform/resolvers react-hook-form zod --legacy-peer-deps
npm install react-big-calendar --legacy-peer-deps
```
