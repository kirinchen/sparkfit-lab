import React from 'react';
import { Card } from 'react-bootstrap';
import type { Exercise } from "../model/Models";

interface ActivityItemViewProps {
  exercise: Exercise;
  onExerciseClick?: (exercise: Exercise) => void;
  showClickable?: boolean;
}

const ActivityItemView: React.FC<ActivityItemViewProps> = ({
  exercise,
  onExerciseClick,
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

      </Card.Body>
    </Card>
  );
};

export default ActivityItemView;
