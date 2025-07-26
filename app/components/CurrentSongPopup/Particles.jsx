import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function AmbientParticles() {
  const init = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      init={init}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 30 },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
          },
          opacity: { value: 0.3 },
          size: { value: 20 },
        },
        background: { color: "#000" },
      }}
    />
  );
}