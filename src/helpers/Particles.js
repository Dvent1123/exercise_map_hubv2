import React, { useRef, useEffect, useState, memo } from "react";
import ReactDOM from "react-dom";
import { borderRadius, styled } from "@mui/system";
import SvgIcon from "@mui/material/SvgIcon";

const AllParticles = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  pointerEvents: "none",
});

const Circular = styled("div")({
  backgroundColor: "blue",
  width: 5,
  height: 7,
  borderRadius: 20,
  transform: "translate(35, 50)",
});

// const Squiggle = styled('svg'){
//   stroke: var(--color);
//         stroke-width: 15px;
//         stroke-linecap: round;
//         overflow: visible;
//         width: var(--size);
//         height: var(--size);
//         transform:
//           translate(var(--x), var(--y))
//           rotateY(var(--rotate));
//       }
// }

const COLORS = ["#2ecc71", "#3498db", "#e67e22", "#e67e22", "#e74c3c"];
const TOP_OFFSET = window.innerHeight;
const LEFT_OFFSET = 150;

const randomNumber = (min, max) =>
  min + Math.floor(Math.random() * (max - min));

const randomColor = () => COLORS[randomNumber(0, COLORS.length)];

const Particle = ({ children, size }) => {
  const ref = useRef();
  const child = React.Children.only(children);
  const top = randomNumber(-200, -size[1]);

  useEffect(() => {
    ref.current.style.setProperty(
      "--x",
      `${randomNumber(-LEFT_OFFSET, LEFT_OFFSET)}px`
    );
    ref.current.style.setProperty(
      "--y",
      `${window.innerHeight - top + randomNumber(0, 300)}px`
    );
    ref.current.style.setProperty("--rotate", `${randomNumber(200, 3000)}deg`);
  }, []);

  return React.cloneElement(child, {
    ref,
    style: {
      "--color": randomColor(),
      "--size": `${randomNumber(...size)}px`,
      "--rotate": "0deg",
      "--x": "0px",
      "--y": "0px",
      top: top,
      left: randomNumber(0, window.innerWidth),
    },
  });
};

const CircularParticle = () => (
  <Particle size={[5, 10]}>
    <Circular />
  </Particle>
);

// const RectangularParticle = () => (
//   <Particle size={[5, 10]}>
//     <div className='particle rectangular'/>
//   </Particle>
// );

// const SquiggleParticle = () => (
//   <Particle size={[15, 45]}>
//     <SvgIcon viewBox="0 0 30 200">
//     <path d="M15 0 Q 30 25 15 50 Q 0 75 15 100 Q 30 125 15 150 Q 0 175 15 200"/>

//     </SvgIcon>
//   </Particle>
// );

const Particles = memo(({ count: n }) => {
  const particles = [];
  // const types = [CircularParticle]
  // // const types = [SquiggleParticle, RectangularParticle, CircularParticle];

  while(n--) {
    // const Particle = types[randomNumber(0)];
    particles.push(
      <Circular />
      );
  }

  return (
    <AllParticles>
      {/* <Particle size={[5, 10]}>
        <Circular />
      </Particle> */}
      {particles.map(particle => {
        <div>
          {particle}
        </div>
      })}
    </AllParticles>
  );
});

// let id = 1;
// const App = () => {
//   const [particles, setParticles] = useState([]);
//   const {innerWidth} = window;

//   const handleOnClick = () => {
//     const _id = id;
//     id++;

//     setParticles(particles => [...particles, _id]);
//     setTimeout(() => {
//       // Cleanup
//       setParticles(particles => particles.filter(id => id !== _id));
//     }, 5000);
//   }

//   return (
//     <div className='app'>
//       {particles.map(id => (
//         <Particles key={id} count={Math.floor(innerWidth / 10)}/>
//       ))}
//       <div className='button' onClick={handleOnClick}>
//         <div className='popper'/>
//         CLICK ME!</div>
//     </div>
//   );
// };

export default Particles;
