// RainParticles.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const RainParticles = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#36A2EB", // Color azul para simular gotas de lluvia
          },
          shape: {
            type: "line", // Forma de línea para simular gotas
            stroke: {
              width: 1,
              color: "#36A2EB",
            },
          },
          opacity: {
            value: 0.7,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 5, max: 10 }, // Tamaño de las gotas
            random: true,
          },
          move: {
            enable: true,
            speed: 10, // Velocidad de caída
            direction: "bottom", // Dirección hacia abajo
            straight: true, // Movimiento recto
            out_mode: "out", // Desaparecer al salir del canvas
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: false, // Desactiva la interacción con el mouse
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
};

export default RainParticles;
