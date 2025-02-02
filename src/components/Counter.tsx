import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button, Box } from '@mui/material';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [bgHeight, setBgHeight] = useState(0);

  const backgroundAnimation = useSpring({
    height: `${bgHeight}%`,
    config: { tension: 120, friction: 14, precision: 0.1 }
  });

  useEffect(() => {
    setBgHeight(Math.min(100, count * 10));
  }, [count]);

  return (
    <Box position="relative" height="100vh">
      <animated.div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#2196f3',
          ...backgroundAnimation,
        }}
      />
      
      <Box position="relative" zIndex={1} p={3}>
        <h1>{count}</h1>
        <Button variant="contained" onClick={() => setCount(c => c + 1)}>
          Increment
        </Button>
        <Button variant="contained" onClick={() => setCount(c => c - 1)}>
          Decrement
        </Button>
        <Button variant="contained" onClick={() => setCount(0)}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}