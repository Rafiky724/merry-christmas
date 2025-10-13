# 🎄 Merry Christmas

**Merry Christmas** es una plataforma web diseñada para que las familias organicen sus regalos de Navidad sin arruinar la sorpresa.  
Cada usuario puede crear o unirse a una familia, agregar sus deseos navideños (regalos que le gustaría recibir), y marcar los regalos de otros miembros como **"comprado"** o **"pendiente"** para evitar duplicaciones.  
El creador del deseo **no puede ver si su regalo ha sido comprado**, manteniendo así la magia navideña hasta el día especial. 🎁

---

## ✨ Características Principales

- 👨‍👩‍👧‍👦 **Creación y unión a familias:** Los usuarios pueden crear una familia o unirse a una existente mediante un código.
- 🎁 **Gestión de deseos:** Cada usuario puede agregar o eliminar sus deseos de Navidad.
- ✅ **Evita duplicados:** Los regalos pueden marcarse como comprados o pendientes, visibles solo para los miembros que no crearon el deseo.
- 🎅 **Sorpresa garantizada:** El autor del deseo no puede ver si su propio regalo ha sido comprado.
- 🌐 **Despliegue completo:**
  - Frontend en **Netlify**
  - Backend en **Railway**
- 🔒 **Usuarios de prueba disponibles:** El registro está desactivado temporalmente, pero hay cuentas preconfiguradas para explorar la app.

---

## 🧠 Tecnologías Utilizadas

### 🖥️ Frontend

- **React** con **Vite**
- **TypeScript**
- **Axios** para comunicación con el backend
- **TailwindCSS**

### ⚙️ Backend

- **FastAPI (Python)**
- **MySQL**
- **SQLAlchemy**
- **Uvicorn**
- **JWT** para autenticación

---

## 🌍 Despliegue

| Módulo       | Tecnología                | Despliegue                          |
| ------------ | ------------------------- | ----------------------------------- |
| **Frontend** | React + Vite + TypeScript | [Netlify](https://www.netlify.com/) |
| **Backend**  | FastAPI + MySQL           | [Railway](https://railway.app/)     |

---

## 👥 Usuarios de Prueba

Para explorar la aplicación, puedes usar cualquiera de las siguientes cuentas:

| Correo              | Contraseña          |
| ------------------- | ------------------- |
| `prueba@gmail.com`  | `prueba@gmail.com`  |
| `prueba2@gmail.com` | `prueba2@gmail.com` |
| `prueba3@gmail.com` | `prueba3@gmail.com` |
| `prueba4@gmail.com` | `prueba4@gmail.com` |

> 🔒 El registro de nuevos usuarios está deshabilitado temporalmente para evitar costos adicionales de infraestructura.

## 👥 Familia de Prueba

| Codigo             |
| ------------------ |
| `RUWFA1` | 

---

## ⚙️ Instalación y Ejecución Local

Sigue estos pasos para ejecutar la aplicación completa en tu entorno local.

---

### 🖥️ 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/merry-christmas.git
cd merry-christmas
```

---

### 🎨 2. Configurar el Frontend (React + Vite + TypeScript)

```bash
cd frontend
npm install
```

#### Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación se ejecutará en:  
👉 [http://localhost:5173](http://localhost:5173)

#### Build de producción

```bash
npm run build
npm run preview
```

---

### ⚙️ 3. Configurar el Backend (FastAPI + MySQL)

```bash
cd ../backend
```

#### Crear entorno virtual (opcional)

```bash
python -m venv venv
source venv/bin/activate  # Linux / Mac
venv\Scripts\activate     # Windows
```

#### Instalar dependencias

```bash
pip install -r requirements.txt
```

#### Crear archivo `.env`

Crea un archivo llamado `.env` en la carpeta `backend/` con el siguiente contenido:

```env
DATABASE_URL=mysql+pymysql://usuario:contraseña@localhost:3306/merry_christmas
SECRET_KEY=supersecreto
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 120
API_V1_STR = "/api/v1"
```

#### Ejecutar el servidor

```bash
uvicorn app.main:app --reload
```

El backend se ejecutará en:  
👉 [http://localhost:8000](http://localhost:8000)

---

## 🧭 Instrucciones de Uso

1. **Inicia sesión** con una cuenta de prueba.
2. **Crea una familia** o únete a una existente mediante un código de invitación de prueba.
3. **Agrega tus deseos** de regalos (puedes incluir nombre, descripción, precio y link).
4. **Explora los deseos de los demás miembros** de tu familia.
5. **Marca los regalos como “comprado” o “pendiente”** para organizar las compras sin duplicar regalos.
6. 🎅 El creador del deseo **no verá si su regalo fue comprado**, manteniendo la sorpresa.

---

## 👨‍💻 Desarrollador

Proyecto creado por **Jhon Angel Fuentes**.  
Desarrollado con amor, café ☕ y espíritu navideño 🎅✨

---

## 📜 Licencia

Este proyecto es de código abierto bajo la licencia **MIT**.  
Puedes usarlo, modificarlo y distribuirlo libremente, siempre que se mantenga la atribución al autor original.

---
