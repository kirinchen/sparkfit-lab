import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useModelService } from '../hooks/useModelService';
import ActivityItemView from './ActivityItemView';
import { fetchExercisesFromGoogleSheets } from '../utils/csvParser';
import type { Exercise } from '../model/Models';

const ActivityItemListView: React.FC = () => {
  const { service } = useModelService();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedExercises = await fetchExercisesFromGoogleSheets();
        setExercises(fetchedExercises);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load exercises');
        console.error('Error loading exercises:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  if (loading) {
    return (
      <div className="bg-dark-custom p-4">
        <h2 className="text-cyan-custom mb-4">運動總列表</h2>
        <div className="text-center">
          <div className="spinner-border text-cyan-custom" role="status">
            <span className="visually-hidden">載入中...</span>
          </div>
          <p className="text-cyan-custom mt-2">正在載入運動資料...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark-custom p-4">
        <h2 className="text-cyan-custom mb-4">運動總列表</h2>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">載入失敗</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">請檢查網路連線後重新整理頁面。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-custom p-4">
      <h2 className="text-cyan-custom mb-4">運動總列表</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {exercises.map((exercise) => (
          <Col key={exercise.id}>
            <ActivityItemView
              exercise={exercise}
              onExerciseClick={(exercise) => service.handleExerciseClick(exercise)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ActivityItemListView;
