import React, { useRef, useState, useEffect, MouseEvent } from 'react';

interface CanvasProps {
  brushColor: string;
  brushWidth: number;
  brushOpacity: number;
  shape: string;
}

interface Shape {
  type: string;
  color: string;
  width: number;
  opacity: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const Canvas: React.FC<CanvasProps> = ({
  brushColor,
  brushWidth,
  brushOpacity,
  shape,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushWidth;
        ctx.globalAlpha = brushOpacity;
        ctx.lineCap = 'round';
        setContext(ctx);
      }
    }
  }, [brushColor, brushWidth, brushOpacity]);

  const startDrawing = (e: MouseEvent) => {
    if (context) {
      context.strokeStyle = brushColor;
      context.lineWidth = brushWidth;
      context.globalAlpha = brushOpacity;
      const { offsetX, offsetY } = e.nativeEvent;
      setStartPos({ x: offsetX, y: offsetY });
      setIsDrawing(true);
      if (shape === 'brush') {
        context.beginPath();
        context.moveTo(offsetX, offsetY);
      }
    }
  };

  const draw = (e: MouseEvent) => {
    if (!isDrawing || !context) return;

    const { offsetX, offsetY } = e.nativeEvent;
    if (shape === 'brush') {
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else if (startPos) {
      // Clear and redraw all shapes to keep canvas clean
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      redrawShapes();

      context.strokeStyle = brushColor;
      context.lineWidth = brushWidth;
      context.globalAlpha = brushOpacity;
      if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(offsetX - startPos.x, 2) + Math.pow(offsetY - startPos.y, 2));
        context.beginPath();
        context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        context.stroke();
      } else if (shape === 'triangle') {
        context.beginPath();
        context.moveTo(startPos.x, startPos.y);
        context.lineTo(offsetX, offsetY);
        context.lineTo(startPos.x * 2 - offsetX, offsetY);
        context.closePath();
        context.stroke();
      }
    }
  };

  const stopDrawing = (e: MouseEvent) => {
    if (context && startPos) {
      const { offsetX, offsetY } = e.nativeEvent;
      const newShape: Shape = {
        type: shape,
        color: brushColor,
        width: brushWidth,
        opacity: brushOpacity,
        startX: startPos.x,
        startY: startPos.y,
        endX: offsetX,
        endY: offsetY,
      };
      setShapes([...shapes, newShape]);
      setIsDrawing(false);
      context.closePath();
    }
  };

  const redrawShapes = () => {
    if (context) {
      shapes.forEach((shape) => {
        context.strokeStyle = shape.color;
        context.lineWidth = shape.width;
        context.globalAlpha = shape.opacity;
        if (shape.type === 'circle') {
          const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
          context.beginPath();
          context.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
          context.stroke();
        } else if (shape.type === 'triangle') {
          context.beginPath();
          context.moveTo(shape.startX, shape.startY);
          context.lineTo(shape.endX, shape.endY);
          context.lineTo(shape.startX * 2 - shape.endX, shape.endY);
          context.closePath();
          context.stroke();
        } else if (shape.type === 'brush') {
          context.beginPath();
          context.moveTo(shape.startX, shape.startY);
          context.lineTo(shape.endX, shape.endY);
          context.stroke();
        }
      });
    }
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setShapes([]); // Clear shape history
    }
  };

  return (
    <div className="text-center">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={800}
        height={600}
        style={{ border: '1px solid #000' }}
      ></canvas>
      <div className="mt-3">
        <button className="btn btn-primary" style={{ marginLeft: '1rem' }} onClick={downloadImage}>
          Download Drawing
        </button>
        <button className="btn btn-primary" style={{marginLeft: '1rem'}} onClick={clearCanvas}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default Canvas;
