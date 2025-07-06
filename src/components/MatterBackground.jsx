import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import 'matter-attractors';
import 'matter-wrap';
import '../styles/style.css';

const MatterBackground = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    // Create and style canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'matter-bg-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = 0;
    canvas.style.pointerEvents = 'none';
    wrapper.appendChild(canvas);

    // Set up dimensions
    const getDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    let dimensions = getDimensions();
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Matter.js aliases
    const Engine = Matter.Engine,
      Events = Matter.Events,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      Common = Matter.Common,
      Bodies = Matter.Bodies;

    // create engine
    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.1;

    // create renderer
    const render = Render.create({
      element: wrapper,
      engine: engine,
      canvas: canvas,
      options: {
        showVelocity: false,
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // create runner
    const runner = Runner.create();

    // create demo scene
    const world = engine.world;
    world.gravity.scale = 0;

    // --- Custom logic for leader and followers ---
    let leaderBall = null;
    const followerBodies = [];
    const followerVelocities = []; // Store velocity for each follower

    // Add floating particles of various shapes/colors
    for (let i = 0; i < 40; i += 1) {
      let x = Common.random(0, render.options.width);
      let y = Common.random(0, render.options.height);

      // Create polygon body
      let polygonNumber = Common.random(3, 6);
      let size = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      const body = Bodies.polygon(x, y, polygonNumber, size, {
        mass: size / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: '#222222',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });
      World.add(world, body);
      followerBodies.push(body);
      followerVelocities.push({ x: (Common.random() - 0.5) * 1.2, y: (Common.random() - 0.5) * 1.2 });
      // Create small circle
      let r = Common.random(0, 1);
      const smallCircle = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: r > 0.3 ? '#27292d' : '#444444',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });
      // Assign a random wander target for each small shape
      smallCircle.wanderTarget = {
        x: Common.random(0, render.options.width),
        y: Common.random(0, render.options.height),
      };
      World.add(world, smallCircle);
      followerBodies.push(smallCircle);
      followerVelocities.push({ x: (Common.random() - 0.5) * 1.2, y: (Common.random() - 0.5) * 1.2 });
      // Create medium circle
      const mediumCircle = Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: r > 0.3 ? '27292d' : '#111111',
          strokeStyle: '#111111',
          lineWidth: 4,
        },
      });
      World.add(world, mediumCircle);
      followerBodies.push(mediumCircle);
      followerVelocities.push({ x: (Common.random() - 0.5) * 1.2, y: (Common.random() - 0.5) * 1.2 });
      // Create large circle (make the first one the leader)
      const largeCircle = Bodies.circle(x, y, !leaderBall ? 15 : Common.random(20, 40), {
        mass: 2,
        friction: 0.6,
        frictionAir: 0.08,
        render: {
          fillStyle: !leaderBall ? 'radial-gradient(circle, #08D9F2 0%, #25BDCB 50%, #E1D019 100%)' : '#191919',
          strokeStyle: !leaderBall ? '#08D9F2' : '#111111',
          lineWidth: !leaderBall ? 2 : 3,
        },
      });
      if (!leaderBall) {
        leaderBall = largeCircle;
      } else {
        followerBodies.push(largeCircle);
        followerVelocities.push({ x: (Common.random() - 0.5) * 1.2, y: (Common.random() - 0.5) * 1.2 });
      }
      World.add(world, largeCircle);
    }

    // add mouse control
    const mouse = Mouse.create(render.canvas);

    // Track mouse position globally for best effect
    window.addEventListener('mousemove', (e) => {
      const rect = render.canvas.getBoundingClientRect();
      mouse.position.x = e.clientX - rect.left;
      mouse.position.y = e.clientY - rect.top;
    });

    // Move leader ball directly to mouse position
    Events.on(engine, 'afterUpdate', function () {
      if (!mouse.position.x || !leaderBall) return;
      // Store previous leader position for delta calculation
      if (!leaderBall.prevPos) {
        leaderBall.prevPos = { x: leaderBall.position.x, y: leaderBall.position.y };
      }
      const leaderDelta = {
        x: mouse.position.x - leaderBall.prevPos.x,
        y: mouse.position.y - leaderBall.prevPos.y,
      };
      Body.setPosition(leaderBall, {
        x: mouse.position.x,
        y: mouse.position.y,
      });
      // Update prevPos for next frame
      leaderBall.prevPos = { x: mouse.position.x, y: mouse.position.y };
      // const minGap = 24; // unused now
      for (let i = 0; i < followerBodies.length; i++) {
        const body = followerBodies[i];
        let vel = followerVelocities[i];
        const radius = body.circleRadius || (body.bounds.max.x - body.bounds.min.x) / 2;
        let leaderDeltaFactor = 0.18;
        let springBase = 0.09;
        let springScale = 0.001;
        let springMax = 0.22;
        let maxSpeed = 2.5;
        // Small shape wandering logic
        if (radius <= 10 && body.wanderTarget) {
          // Distance to leader
          const dxL = leaderBall.position.x - body.position.x;
          const dyL = leaderBall.position.y - body.position.y;
          const distL = Math.sqrt(dxL * dxL + dyL * dyL);
          if (distL > 120) {
            // Wander to random target
            const dxT = body.wanderTarget.x - body.position.x;
            const dyT = body.wanderTarget.y - body.position.y;
            const distT = Math.sqrt(dxT * dxT + dyT * dyT);
            // If reached wander target, pick a new one
            if (distT < 20) {
              body.wanderTarget = {
                x: Common.random(0, render.options.width),
                y: Common.random(0, render.options.height),
              };
            }
            // Move toward wander target
            vel.x = dxT * 0.03 + (Math.random() - 0.5) * 0.7;
            vel.y = dyT * 0.03 + (Math.random() - 0.5) * 0.7;
            // Damping
            vel.x *= 0.97;
            vel.y *= 0.97;
            // Limit speed
            const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
            if (speed > 4.5) {
              vel.x = (vel.x / speed) * 4.5;
              vel.y = (vel.y / speed) * 4.5;
            }
            let nextX = body.position.x + vel.x;
            let nextY = body.position.y + vel.y;
            Body.setPosition(body, { x: nextX, y: nextY });
            continue; // Skip rest, don't move toward leader yet
          } else {
            // Leader is close, move toward leader
            leaderDeltaFactor = 0.45;
            maxSpeed = 8.5;
          }
        }
        // All shapes follow the leader's movement (flocking effect)
        vel.x = leaderDelta.x * leaderDeltaFactor;
        vel.y = leaderDelta.y * leaderDeltaFactor;
        // Spring attraction to leader (gentle, same for all)
        const dx = leaderBall.position.x - body.position.x;
        const dy = leaderBall.position.y - body.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const springStrength = Math.min(springBase + dist * springScale, springMax);
        vel.x += dx * springStrength;
        vel.y += dy * springStrength;
        // Damping for extra smoothness
        vel.x *= 0.97;
        vel.y *= 0.97;
        // Limit max speed
        const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
        if (speed > maxSpeed) {
          vel.x = (vel.x / speed) * maxSpeed;
          vel.y = (vel.y / speed) * maxSpeed;
        }
        let nextX = body.position.x + vel.x;
        let nextY = body.position.y + vel.y;
        // No collision avoidance: allow tight flocking
        Body.setPosition(body, { x: nextX, y: nextY });
      }
    });

    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Resize handler
    const handleResize = () => {
      let dimensions = getDimensions();
      render.canvas.width = dimensions.width;
      render.canvas.height = dimensions.height;
      if (leaderBall) {
        Body.setPosition(leaderBall, {
          x: dimensions.width / 2,
          y: dimensions.height / 2,
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      window.removeEventListener('resize', handleResize);
      if (wrapper && canvas) {
        wrapper.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="matter-bg-wrapper"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default MatterBackground;

