import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Play } from 'lucide-react';
import { useModelService } from '../hooks/useModelService';

const ActivityItemListView: React.FC = () => {
  const { service } = useModelService();
  const exercises = service.getExercisesData();

  return (
    <div className="bg-dark-custom p-4">
      <h2 className="text-cyan-custom mb-4">運動總列表</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {exercises.map((exercise) => (
          <Col key={exercise.id}>
            <Card 
              className="bg-dark-card text-white h-100 cursor-pointer"
              onClick={() => service.handleExerciseClick(exercise)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-cyan-custom">{exercise.name}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {exercise.description}
                </Card.Text>
                <Button 
                  variant="outline-cyan-custom" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    service.handleStartWorkout([exercise]);
                  }}
                >
                  <Play size={16} className="me-1" />
                  開始運動
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ActivityItemListView;
