# 🦆 Duck in A Pond

A calming, interactive 3D web experience built with **Next.js** and **React Three Fiber**.

This project simulates a peaceful rubber duck floating in a digital pond. It features a custom water simulation where user interactions create realistic, high-fidelity ripples that physically push the duck around the scene.

## ✨ Key Features

* **Interactive Water Simulation:** A high-performance, custom-written shader system that uses an off-screen canvas displacement map to create smooth, non-repeating ripples.
* **Reactive Physics:** The duck isn't just an animation—it has mass and velocity. Ripples exert force on the model, pushing it naturally across the water.
* **Audio Feedback:** Interactive audio integration (quack on tap) with preloading for instant feedback.
* **Optimized Rendering:** Uses `glsl` shaders and texture mapping for 2K resolution water effects without compromising 60 FPS performance.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **3D Engine:** Three.js / React Three Fiber (@react-three/fiber)
* **Helpers:** React Three Drei (@react-three/drei)
* **Styling:** Tailwind CSS

*Tap anywhere to ripple. Tap the duck to quack.*
