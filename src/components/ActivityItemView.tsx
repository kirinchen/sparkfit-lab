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
  const renderDisplayContent = () => {
    if (exercise.displayType === 'YouTube' && exercise.displayLink) {
      // Extract video ID from YouTube URL
      const videoId = extractYouTubeVideoId(exercise.displayLink);
      if (videoId) {
        return (
          <div className="mb-3">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={exercise.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            ></iframe>
          </div>
        );
      }
    } else if (exercise.displayImg) {
      return (
        <div className="mb-3">
          <img
            src={exercise.displayImg}
            alt={exercise.name}
            className="img-fluid rounded"
            style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
          />
        </div>
      );
    }
    return null;
  };

  const extractYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Card 
      className={`bg-dark-card text-white h-100 ${showClickable ? 'cursor-pointer' : ''}`}
      onClick={showClickable && onExerciseClick ? () => onExerciseClick(exercise) : undefined}
      style={{ cursor: showClickable ? 'pointer' : 'default' }}
    >
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-cyan-custom">{exercise.name}</Card.Title>
        {renderDisplayContent()}
        <Card.Text className="flex-grow-1">
          {exercise.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ActivityItemView;
