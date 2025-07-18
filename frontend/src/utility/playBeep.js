function playBeep(context, startTime, duration) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
  
    oscillator.type = 'sine'; //
    oscillator.frequency.setValueAtTime(750, startTime); // Hz
  
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
  
    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
  }

  export default playBeep;