import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { useModelService } from '../hooks/useModelService';
import YouTubePlayerView from './YouTubePlayerView';

// YouTube 影片播放元件

const ExerciseModal: React.FC = () => {
  const { service } = useModelService();
  const show = service.getShowExerciseModal();
  const exercise = service.getSelectedExercise();

  if (!exercise) return null;

  return (
    <Modal 
      show={show} 
      onHide={() => service.closeExerciseModal()}
      size="lg"
      className="text-white"
    >
      <Modal.Header className="bg-dark-card border-secondary">
        <Modal.Title className="text-cyan-custom">{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark-card">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-cyan-custom mb-3">運動描述</h5>
            <p className="text-white">{exercise.description}</p>
          </div>
          <div className="col-md-6">
            <h5 className="text-cyan-custom ">動畫演示</h5>
            <div className="d-flex justify-content-center">
              <YouTubePlayerView animationType={exercise.animationType} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-dark-card border-secondary">
        <Button variant="secondary" onClick={() => service.closeExerciseModal()}>
          關閉
        </Button>
        <Button 
          variant="cyan-custom" 
          onClick={() => {
            service.addToSelectedWorkout(exercise);
            service.closeExerciseModal();
          }}
        >
          <Plus size={16} className="me-1" />
          新增至訓練清單
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
