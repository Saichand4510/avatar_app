# 3D Avatar Customizer

## 📌 Overview

This project is a web-based 3D avatar customization system built using Three.js.
It allows users to interact with a 3D avatar and dynamically modify its appearance in real time.

---

## 🚀 Features

* 🧑‍🎨 Select between **3 different hairstyles**
* 🎨 Change **hair color**
* 🎨 Change **skin tone**
* 🔄 Rotate and view avatar in 3D space
* ⚡ Real-time updates
* 📸 Export avatar as an image

---

## 🛠️ Tech Stack

* JavaScript (Vite)
* Three.js (3D rendering)
* GLTFLoader (model loading)

---

## 🧠 Architecture / Workflow

* A Three.js scene is created with camera, lighting, and renderer.
* Multiple `.glb` avatar models (each representing a different hairstyle) are loaded.
* Only one avatar is visible at a time, enabling hairstyle switching.
* Scene traversal is used to identify specific meshes (hair, body).
* Material properties are updated dynamically to change colors while preserving textures.
* Selected attributes (hair color, skin tone) are stored and reapplied when switching avatars.
* Continuous rendering is handled using `requestAnimationFrame`.

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/avatar_app
```

### 2. Navigate to project folder

```bash
cd avatar_app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the project

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

---

## 📂 Project Structure

```
avatar_app/
├── index.html
├── main.js
├── package.json
├── public/
│   ├── model_hair1.glb
│   ├── model_hair2.glb
│   ├── model_hair3.glb
```

---

## 📸 Output

Users can download a rendered image of the customized avatar using the built-in export feature.

---

## 📌 Notes

* All 3D models are stored inside the `public/` folder.
* The system uses multiple avatar models to simulate hairstyle selection.
* Material color updates are applied without replacing textures to preserve visual quality.

---

## 🎯 Conclusion

This project demonstrates real-time 3D rendering, model manipulation, and interactive customization using Three.js.
