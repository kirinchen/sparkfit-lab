import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Play } from 'lucide-react';
import type { Exercise } from '../services/ModelService';

interface ActivityItemViewProps {
  exercise: Exercise;
  onExerciseClick?: (exercise: Exercise) => void;
  onStartWorkout?: (exercise: Exercise) => void;
  showStartButton?: boolean;
  showClickable?: boolean;
}

const ActivityItemView: React.FC<ActivityItemViewProps> = ({
  exercise,
  onExerciseClick,
  onStartWorkout,
  showStartButton = true,
  showClickable = true
}) => {
  return (
    <Card 
      className={`bg-dark-card text-white h-100 ${showClickable ? 'cursor-pointer' : ''}`}
      onClick={showClickable && onExerciseClick ? () => onExerciseClick(exercise) : undefined}
      style={{ cursor: showClickable ? 'pointer' : 'default' }}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-cyan-custom">{exercise.name}</Card.Title>
        <Card.Text className="flex-grow-1">
          {exercise.description}
        </Card.Text>
        {showStartButton && onStartWorkout && (
          <Button 
            variant="outline-cyan-custom" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStartWorkout(exercise);
            }}
          >
            <Play size={16} className="me-1" />
            開始運動
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ActivityItemView;
