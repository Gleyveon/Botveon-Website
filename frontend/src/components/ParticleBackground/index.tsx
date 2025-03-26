import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Slim version for smaller bundle size
import './styles.scss'

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load the slim version of tsparticles
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container); // Log the container when particles are loaded
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#080f1e", // Background color
        },
      },
      fpsLimit: 120, // Limit frames per second
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push", // Add particles on click
          },
          onHover: {
            enable: false,
            mode: "repulse", // Repulse particles on hover
          },
        },
        modes: {
          push: {
            quantity: 4, // Number of particles added on click
          },
          repulse: {
            distance: 200, // Distance for repulsion
            duration: 0.4, // Duration of repulsion effect
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Particle color
        },
        links: {
          color: "#ffffff", // Link color
          distance: 150, // Distance between linked particles
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out, // Particles move out of bounds
          },
          random: false,
          speed: 0.5, // Speed of particle movement
          straight: false,
        },
        number: {
          density: {
            enable: true, // Enable density-based particle count
          },
          value: 50, // Number of particles
        },
        opacity: {
          value: 0.5, // Opacity of particles
        },
        shape: {
          type: "circle", // Shape of particles
        },
        size: {
          value: { min: 1, max: 3 }, // Size range of particles
        },
      },
      detectRetina: true, // Enable retina display support
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticleBackground;