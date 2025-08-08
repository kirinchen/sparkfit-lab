import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { Play, Trash2, Edit, Save, X } from 'lucide-react';
import { useModelService } from '../hooks/useModelService';
import type { Exercise, SavedWorkout } from '../services/ModelService';

const WorkoutListView: React.FC = () => {
  const { service } = useModelService();
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<SavedWorkout | null>(null);

  // 載入已儲存的訓練清單
  useEffect(() => {
    const saved = localStorage.getItem('tabataWorkouts');
    if (saved) {
      setSavedWorkouts(JSON.parse(saved));
    }
  }, []);

  // 儲存訓練清單到 localStorage
  const saveWorkout = () => {
    if (workoutName.trim() && selectedExercises.length > 0) {
      const newWorkout = {
        id: Date.now(),
        name: workoutName,
        exercises: selectedExercises
      };
      const updatedWorkouts = [...savedWorkouts, newWorkout];
      setSavedWorkouts(updatedWorkouts);
      localStorage.setItem('tabataWorkouts', JSON.stringify(updatedWorkouts));
      setShowSaveModal(false);
      setWorkoutName('');
      setSelectedExercises([]);
    }
  };

  // 刪除訓練清單
  const deleteWorkout = (id: number) => {
    const updatedWorkouts = savedWorkouts.filter(w => w.id !== id);
    setSavedWorkouts(updatedWorkouts);
    localStorage.setItem('tabataWorkouts', JSON.stringify(updatedWorkouts));
  };

  // 編輯訓練清單
  const editWorkout = (workout: SavedWorkout) => {
    setEditingWorkout(workout);
    setWorkoutName(workout.name);
    setSelectedExercises(workout.exercises);
    setShowSaveModal(true);
  };

  // 更新訓練清單
  const updateWorkout = () => {
    if (editingWorkout && workoutName.trim() && selectedExercises.length > 0) {
      const updatedWorkouts = savedWorkouts.map(w => 
        w.id === editingWorkout.id 
          ? { ...w, name: workoutName, exercises: selectedExercises }
          : w
      );
      setSavedWorkouts(updatedWorkouts);
      localStorage.setItem('tabataWorkouts', JSON.stringify(updatedWorkouts));
      setShowSaveModal(false);
      setWorkoutName('');
      setSelectedExercises([]);
      setEditingWorkout(null);
    }
  };

  return (
    <div className="bg-dark-custom p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-cyan-custom mb-0">我的運動清單</h2>
        <Button 
          variant="cyan-custom" 
          size="sm"
          onClick={() => setShowSaveModal(true)}
        >
          <Save size={16} className="me-1" />
          新增清單
        </Button>
      </div>

      {savedWorkouts.length === 0 ? (
        <Card className="bg-dark-card text-white">
          <Card.Body className="text-center">
            <p className="mb-0">尚未建立任何運動清單。</p>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {savedWorkouts.map((workout) => (
            <ListGroup.Item 
              key={workout.id} 
              className="bg-dark-card text-white border-secondary"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{workout.name}</h6>
                  <small className="text-muted">{workout.exercises.length} 個運動</small>
                </div>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-success" 
                    size="sm"
                    onClick={() => service.handleStartWorkout(workout.exercises)}
                  >
                    <Play size={14} />
                  </Button>
                  <Button 
                    variant="outline-warning" 
                    size="sm"
                    onClick={() => editWorkout(workout)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => deleteWorkout(workout.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* 儲存/編輯清單 Modal */}
      <Modal 
        show={showSaveModal} 
        onHide={() => {
          setShowSaveModal(false);
          setWorkoutName('');
          setSelectedExercises([]);
          setEditingWorkout(null);
        }}
        className="text-white"
      >
        <Modal.Header className="bg-dark-card border-secondary">
          <Modal.Title>
            {editingWorkout ? '編輯訓練清單' : '儲存訓練清單'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark-card">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>清單名稱</Form.Label>
              <Form.Control
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="bg-dark-custom text-white border-secondary"
              />
            </Form.Group>
            {selectedExercises.length > 0 && (
              <Form.Group>
                <Form.Label>已選擇的運動</Form.Label>
                <ListGroup>
                  {selectedExercises.map((exercise, index) => (
                    <ListGroup.Item 
                      key={index} 
                      className="bg-dark-custom text-white border-secondary d-flex justify-content-between align-items-center"
                    >
                      {exercise.name}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setSelectedExercises(prev => prev.filter((_, i) => i !== index))}
                      >
                        <X size={12} />
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark-card border-secondary">
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowSaveModal(false);
              setWorkoutName('');
              setSelectedExercises([]);
              setEditingWorkout(null);
            }}
          >
            取消
          </Button>
          <Button 
            variant="cyan-custom" 
            onClick={editingWorkout ? updateWorkout : saveWorkout}
            disabled={!workoutName.trim() || selectedExercises.length === 0}
          >
            {editingWorkout ? '更新' : '儲存'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkoutListView;
