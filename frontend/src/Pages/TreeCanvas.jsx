import React, { useEffect, useRef } from 'react';

const TreeCanvas = ({ nestedArray }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Function to draw a tree on HTML canvas
const drawTree = (node, x, y, level, parentX) => {
    if (Array.isArray(node) && node.length > 0) {
      const numChildren = node.length;
  
      // Draw child nodes
      let childSpacing = numChildren * 100/(level * 1.5 + 1);
      const totalWidth = numChildren * childSpacing;
      
            
        // Adjust the starting position of child nodes to center them
        const startX = x - totalWidth / 2 + childSpacing;
  
      for (let i = 0; i < numChildren; i++) {
        const childX = startX + i * childSpacing;
        const childY = y + 50;
  
        drawTree(node[i], childX, childY, level + 1, x);
      }
      // Draw connecting lines for levels greater than 1
      if (level > 1) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(parentX, y - 50);
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
  
      // Draw node only for levels greater than 0
      if (level > 0) {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#242424';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(node[node.length - 1], x, y + 5);
      }
  
    }
  };
  

    // Draw the tree
    drawTree(nestedArray, canvas.width / 2, 50, 0);
  }, [nestedArray]);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

export default TreeCanvas;
