import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useModelService } from '../hooks/useModelService';
import ActivityItemView from './ActivityItemView';

const ActivityItemListView: React.FC = () => {
  const { service } = useModelService();
  const exercises = service.getExercisesData();

  return (
    <div className="bg-dark-custom p-4">
      <h2 className="text-cyan-custom mb-4">運動總列表</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {exercises.map((exercise) => (
          <Col key={exercise.id}>
            <ActivityItemView
              exercise={exercise}
              onExerciseClick={(exercise) => service.handleExerciseClick(exercise)}
              onStartWorkout={(exercise) => service.handleStartWorkout([exercise])}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ActivityItemListView;
