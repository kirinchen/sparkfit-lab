import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { useModelService } from '../hooks/useModelService';

// 火柴人動畫元件
const StickFigureAnimation: React.FC<{ animationType: string }> = ({ animationType }) => {
  return (
    <div className="w-32 h-32 mx-auto relative">
      {/* 頭部 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full"></div>
      
      {/* 身體 */}
      <div className={`body absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-cyan-400 ${
        animationType === 'squat' ? 'animate-squat' :
        animationType === 'pushups' ? 'animate-pushups' :
        animationType === 'burpees' ? 'animate-burpees' : ''
      }`}></div>
      
      {/* 手臂 */}
      <div className={`arm absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-cyan-400 origin-left ${
        animationType === 'jumpingJacks' ? 'animate-jumping-jacks' : ''
      }`}></div>
      <div className={`arm absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-cyan-400 origin-right ${
        animationType === 'jumpingJacks' ? 'animate-jumping-jacks-reverse' : ''
      }`} style={{ transform: 'translateX(-100%)' }}></div>
      
      {/* 腿部 */}
      <div className={`leg absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-cyan-400 origin-top ${
        animationType === 'jumpingJacks' ? 'animate-jumping-jacks' :
        animationType === 'highKnees' ? 'animate-high-knees' : ''
      }`}></div>
      <div className={`leg absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-cyan-400 origin-top ${
        animationType === 'jumpingJacks' ? 'animate-jumping-jacks-reverse' :
        animationType === 'highKnees' ? 'animate-high-knees-delayed' : ''
      }`} style={{ transform: 'translateX(4px)' }}></div>
    </div>
  );
};

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
            <h5 className="text-cyan-custom mb-3">動畫演示</h5>
            <div className="d-flex justify-content-center">
              <StickFigureAnimation animationType={exercise.animationType} />
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
            service.handleAddToWorkout(exercise);
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
