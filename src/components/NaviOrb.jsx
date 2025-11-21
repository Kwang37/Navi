import React, { useEffect, useRef } from 'react';

const NaviOrb = ({ isListening, emotionState }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize audio stream (Web Audio API)
  useEffect(() => {
    if (isListening) {
      const initAudio = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;

          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256; // Precision
          analyserRef.current.smoothingTimeConstant = 0.8;

          sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
          sourceRef.current.connect(analyserRef.current);
          
          draw(); // Start drawing loop
        } catch (err) {
          console.error("Microphone access denied:", err);
          // Fallback: show visual feedback even without mic access
          drawFallback();
        }
      };
      initAudio();
    } else {
      // Stop listening, cleanup resources
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [isListening]);

  // Fallback drawing when mic access is denied
  const drawFallback = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const time = Date.now() * 0.001;
    const scale = 1 + Math.sin(time) * 0.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50 * scale;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    
    if (emotionState === 'anxious') {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
    } else {
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
    }
    
    ctx.fill();

    animationRef.current = requestAnimationFrame(drawFallback);
  };

  // Draw function: Transform audio data into breathing orb visualization
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) {
      drawFallback();
      return;
    }

    const ctx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume to determine orb size
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const average = sum / bufferLength;
    const scale = 1 + (average / 256) * 0.5; // Scale factor

    // Calculate dominant frequency for color variation
    let maxIndex = 0;
    let maxValue = 0;
    for (let i = 0; i < bufferLength; i++) {
      if (dataArray[i] > maxValue) {
        maxValue = dataArray[i];
        maxIndex = i;
      }
    }
    const frequencyRatio = maxIndex / bufferLength;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw core orb
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50 * scale;

    // Create gradient based on emotion and frequency
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    
    if (emotionState === 'anxious') {
      gradient.addColorStop(0, `rgba(239, 68, 68, 0.9)`);
      gradient.addColorStop(1, `rgba(239, 68, 68, 0.4)`);
    } else if (emotionState === 'sad') {
      gradient.addColorStop(0, `rgba(139, 92, 246, 0.9)`);
      gradient.addColorStop(1, `rgba(139, 92, 246, 0.4)`);
    } else if (emotionState === 'angry') {
      gradient.addColorStop(0, `rgba(249, 115, 22, 0.9)`);
      gradient.addColorStop(1, `rgba(249, 115, 22, 0.4)`);
    } else {
      // Calm/neutral - blue with frequency-based variation
      const blueHue = 200 + frequencyRatio * 60; // Vary between blue and cyan
      gradient.addColorStop(0, `rgba(59, 130, 246, 0.9)`);
      gradient.addColorStop(1, `rgba(59, 130, 246, 0.4)`);
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw audio wave glow (Outer glow based on frequency)
    const glowRadius = radius * (1.2 + average / 256 * 0.3);
    const glowGradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, glowRadius);
    
    if (emotionState === 'anxious') {
      glowGradient.addColorStop(0, `rgba(239, 68, 68, ${average / 256 * 0.6})`);
      glowGradient.addColorStop(1, `rgba(239, 68, 68, 0)`);
    } else {
      glowGradient.addColorStop(0, `rgba(59, 130, 246, ${average / 256 * 0.6})`);
      glowGradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, glowRadius, 0, 2 * Math.PI);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw frequency visualization rings (optional: shows frequency distribution)
    if (average > 50) {
      for (let i = 0; i < 3; i++) {
        const ringIndex = Math.floor((i + 1) * bufferLength / 4);
        const ringIntensity = dataArray[ringIndex] / 256;
        const ringRadius = radius * (1.3 + i * 0.2);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ringIntensity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    animationRef.current = requestAnimationFrame(draw);
  };

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300} 
      className="cursor-pointer transition-opacity duration-500 rounded-full"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};

export default NaviOrb;


