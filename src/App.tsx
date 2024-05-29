import React, { useState } from 'react';
import Canvas from './components/Canvas';
import BrushSettings from './components/BrushSettings';
import { Container, Row, Col } from 'react-bootstrap';
import FloatingIcon from './FloatingIcon';

const App: React.FC = () => {
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushOpacity, setBrushOpacity] = useState(1);
  const [shape, setShape] = useState('brush'); // Add state for shape

  return (
    <Container fluid>
      <nav className="navbar navbar-light bg-light mb-5">
        <div className="container-fluid d-flex justify-content-center">
          <span className="navbar-brand mb-0 h1 text-center">
            Drawing Application - Vite + React + TS + Bootstrap CSS
          </span>
        </div>
      </nav>
      <Row>
        <Col xs={12} md={8} className="mb-2">
          <Canvas brushColor={brushColor} brushWidth={brushWidth} brushOpacity={brushOpacity} shape={shape} />
        </Col>
        <Col xs={8} md={2}>
          <BrushSettings
            brushColor={brushColor}
            setBrushColor={setBrushColor}
            brushWidth={brushWidth}
            setBrushWidth={setBrushWidth}
            brushOpacity={brushOpacity}
            setBrushOpacity={setBrushOpacity}
            setShape={setShape} // Pass down setShape
          />
        </Col>
      </Row>
      <FloatingIcon />
    </Container>
  );
};

export default App;