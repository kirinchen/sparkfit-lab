import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { Play, Trash2, Edit, Plus, ChevronDown } from 'lucide-react';
import { useModelService } from '../hooks/useModelService';
import type { SavedWorkout } from '../services/ModelService';

const WorkoutListView: React.FC = () => {
  const { service } = useModelService();
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [editingWorkout, setEditingWorkout] = useState<SavedWorkout | null>(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(null);

  // 從 ModelService 獲取選中的運動清單
  const selectedExercises = service.getSelectedExercises();

  // 獲取當前選中的清單
  const selectedWorkout = savedWorkouts.find(w => w.id === selectedWorkoutId);
  const currentExercises = selectedWorkout ? selectedWorkout.exercises : selectedExercises;
  const currentWorkoutName = selectedWorkout ? selectedWorkout.name : '我的運動';

  // 載入已儲存的訓練清單
  useEffect(() => {
    const saved = localStorage.getItem('tabataWorkouts');
    if (saved) {
      const workouts = JSON.parse(saved);
      setSavedWorkouts(workouts);
      // 如果有清單，預設選中第一個
      if (workouts.length > 0 && !selectedWorkoutId) {
        setSelectedWorkoutId(workouts[0].id);
      }
    }
  }, []);

  // 切換選中的清單
  const handleWorkoutSelect = (workoutId: number) => {
    setSelectedWorkoutId(workoutId);
    const workout = savedWorkouts.find(w => w.id === workoutId);
    if (workout) {
      service.setSelectedExercises(workout.exercises);
    }
  };

  // 新增訓練清單
  const addWorkout = () => {
    if (workoutName.trim()) {
      const newWorkout = {
        id: Date.now(),
        name: workoutName,
        exercises: selectedExercises
      };
      const updatedWorkouts = [...savedWorkouts, newWorkout];
      setSavedWorkouts(updatedWorkouts);
      localStorage.setItem('tabataWorkouts', JSON.stringify(updatedWorkouts));
      setShowAddModal(false);
      setWorkoutName('');
      service.clearSelectedExercises();
      // 自動選中新建立的清單
      setSelectedWorkoutId(newWorkout.id);
    }
  };



  // 更新訓練清單
  const updateWorkout = () => {
    if (editingWorkout && workoutName.trim()) {
      const updatedWorkouts = savedWorkouts.map(w => 
        w.id === editingWorkout.id 
          ? { ...w, name: workoutName, exercises: selectedExercises }
          : w
      );
      setSavedWorkouts(updatedWorkouts);
      localStorage.setItem('tabataWorkouts', JSON.stringify(updatedWorkouts));
      setShowAddModal(false);
      setWorkoutName('');
      service.clearSelectedExercises();
      setEditingWorkout(null);
    }
  };

  // 關閉 Modal 時清空狀態
  const handleCloseModal = () => {
    setShowAddModal(false);
    setWorkoutName('');
    service.clearSelectedExercises();
    setEditingWorkout(null);
  };

  return (
    <div className="bg-dark-custom p-4">
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          {/* 下拉式選單 */}
          <Dropdown>
            <Dropdown.Toggle 
              variant="outline-cyan-custom" 
              className="d-flex align-items-center gap-2"
            >
              {currentWorkoutName}
              <ChevronDown size={16} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark-card border-secondary">
              <Dropdown.Item 
                onClick={() => {
                  setSelectedWorkoutId(null);
                  service.clearSelectedExercises();
                }}
                className={`text-white ${!selectedWorkoutId ? 'bg-cyan-custom' : 'hover:bg-dark-custom'}`}
              >
                我的運動 ({selectedExercises.length} 個運動)
              </Dropdown.Item>
              {savedWorkouts.map((workout) => (
                <Dropdown.Item 
                  key={workout.id}
                  onClick={() => handleWorkoutSelect(workout.id)}
                  className={`text-white ${selectedWorkoutId === workout.id ? 'bg-cyan-custom' : 'hover:bg-dark-custom'}`}
                >
                  {workout.name} ({workout.exercises.length} 個運動)
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Button 
            variant="outline-warning" 
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            <Edit size={14} />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => {
              // 清空所有訓練清單
              setSavedWorkouts([]);
              setSelectedWorkoutId(null);
              service.clearSelectedExercises();
              localStorage.removeItem('tabataWorkouts');
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
        <Button 
          variant="cyan-custom" 
          size="sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} className="me-1" />
          新增清單
        </Button>
      </div>

      {/* Exercises List */}
      <div className="bg-dark-card rounded p-3">
        <h5 className="text-cyan-custom mb-3">
          {currentWorkoutName} ({currentExercises.length} 個運動)
        </h5>
        
        {currentExercises.length === 0 ? (
          <Card className="bg-dark-custom text-white">
            <Card.Body className="text-center">
              <p className="mb-0">
                {selectedWorkout ? '此清單中沒有運動項目。' : '尚未添加任何運動到訓練清單。'}
              </p>
              <small className="text-muted">
                {selectedWorkout ? '點擊運動卡片或從運動詳情中新增運動到此清單' : '點擊運動卡片或從運動詳情中新增運動'}
              </small>
            </Card.Body>
          </Card>
        ) : (
          <ListGroup>
            {currentExercises.map((exercise) => (
              <ListGroup.Item 
                key={exercise.id} 
                className="bg-dark-custom text-white border-secondary"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <h6 className="mb-1 text-cyan-custom">{exercise.name}</h6>
                    <p className="mb-0 text-muted small">{exercise.description}</p>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => service.handleStartWorkout([exercise])}
                    >
                      <Play size={14} />
                    </Button>
                    {!selectedWorkout && (
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => service.removeFromSelectedExercises(exercise.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>

      {/* 新增/編輯清單 Modal */}
      <Modal 
        show={showAddModal} 
        onHide={handleCloseModal}
        size="lg"
        className="text-white"
      >
        <Modal.Header className="bg-dark-card border-secondary">
          <Modal.Title>
            {editingWorkout ? '編輯訓練清單' : '新增訓練清單'}
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
                placeholder="輸入訓練清單名稱"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark-card border-secondary">
          <Button 
            variant="secondary" 
            onClick={handleCloseModal}
          >
            取消
          </Button>
          <Button 
            variant="cyan-custom" 
            onClick={editingWorkout ? updateWorkout : addWorkout}
            disabled={!workoutName.trim()}
          >
            {editingWorkout ? '更新' : '新增'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkoutListView;
