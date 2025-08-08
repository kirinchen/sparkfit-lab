import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Play } from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  description: string;
  animationType: string;
}

interface ActivityItemListViewProps {
  exercises: Exercise[];
  onExerciseClick: (exercise: Exercise) => void;
  onStartWorkout: (exercises: Exercise[]) => void;
}

const ActivityItemListView: React.FC<ActivityItemListViewProps> = ({
  exercises,
  onExerciseClick,
  onStartWorkout
}) => {
  return (
    <div className="bg-dark-custom p-4">
      <h2 className="text-cyan-custom mb-4">運動總列表</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {exercises.map((exercise) => (
          <Col key={exercise.id}>
            <Card 
              className="bg-dark-card text-white h-100 cursor-pointer"
              onClick={() => onExerciseClick(exercise)}
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
                    onStartWorkout([exercise]);
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
