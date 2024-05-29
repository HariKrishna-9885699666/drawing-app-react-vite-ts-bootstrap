// src/components/BrushSettings.tsx
import React from 'react';
import { Form } from 'react-bootstrap';

interface BrushSettingsProps {
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushWidth: number;
  setBrushWidth: (width: number) => void;
  brushOpacity: number;
  setBrushOpacity: (opacity: number) => void;
  setShape: (shape: string) => void; // Add setShape prop
}

const BrushSettings: React.FC<BrushSettingsProps> = ({
  brushColor,
  setBrushColor,
  brushWidth,
  setBrushWidth,
  brushOpacity,
  setBrushOpacity,
  setShape,
}) => {
  return (
    <Form>
      <Form.Group controlId="brushColor">
        <Form.Label>Brush Color</Form.Label>
        <Form.Control
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="brushWidth">
        <Form.Label>Brush Width</Form.Label>
        <Form.Control
          type="range"
          min="1"
          max="50"
          value={brushWidth}
          onChange={(e) => setBrushWidth(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId="brushOpacity">
        <Form.Label>Brush Opacity</Form.Label>
        <Form.Control
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={brushOpacity}
          onChange={(e) => setBrushOpacity(Number(e.target.value))}
        />
      </Form.Group>
      <Form.Group controlId="shapeSelect">
        <Form.Label>Shape</Form.Label>
        <Form.Control as="select" onChange={(e) => setShape(e.target.value)}>
          <option value="brush">Brush</option>
          <option value="circle">Circle</option>
          <option value="triangle">Triangle</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default BrushSettings;
