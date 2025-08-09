import { ChevronDown, Edit, Play, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button, Card, Dropdown, Form, ListGroup, Modal } from 'react-bootstrap';
import { useModelService } from '../hooks/useModelService';
import type { SavedWorkout } from '../services/ModelService';

const WorkoutListView: React.FC = () => {
  const { service } = useModelService();
  const [showAddModal, setShowAddModal] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [editing, setEditing] = useState<boolean>(true);

  // 從 ModelService 獲取選中的運動清單
  const savedWorkouts = service.savedWorkouts;
  const selectedWorkout = service.selectedWorkout;
  const selectedExercises = selectedWorkout?.exercises;
  const currentExercises = selectedWorkout ? selectedWorkout.exercises : selectedExercises;
  const currentWorkoutName = selectedWorkout ? selectedWorkout.name : '我的運動';



  // 切換選中的清單
  const handleWorkoutSelect = (w: SavedWorkout) => {
    service.setSelectedWorkout(w.name);
  };

  // 新增訓練清單
  const addWorkout = () => {
    if (workoutName.trim()) {
      const newWorkout: SavedWorkout = {
        name: workoutName,
        exercises: selectedExercises,
        selected: true
      };
      service.addSavedWorkout(newWorkout);
    }
  };



  // 更新訓練清單
  const updateWorkout = () => {
    if (!selectedWorkout) return;
    selectedWorkout.name = workoutName;
    service.saveAndNotify();
  };


// 關閉 Modal 時清空狀態
const handleCloseModal = () => {
  setShowAddModal(false);
  setWorkoutName('');
  service.clearSelectedExercises();
};

const onEditOrAdd = (edit:boolean)=>{
  setEditing(edit);
  setShowAddModal(true);
}

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

            {savedWorkouts.map((workout) => (
              <Dropdown.Item
                key={workout.name}
                onClick={() => handleWorkoutSelect(workout)}
                className={`text-white ${workout.selected ? 'bg-cyan-custom' : 'hover:bg-dark-custom'}`}
              >
                {workout.name} ({workout.exercises.length} 個運動)
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button
          variant="outline-warning"
          size="sm"
          onClick={() => onEditOrAdd(true)}
        >
          <Edit size={14} />
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => {
            service.clearSelectedExercises();
          }}
        >
          <Trash2 size={14} />
        </Button>
      </div>
      <Button
        variant="cyan-custom"
        size="sm"
        onClick={() => onEditOrAdd(false)}
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
          {editing ? '編輯訓練清單' : '新增訓練清單'}
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
          onClick={editing ? updateWorkout : addWorkout}
          disabled={!workoutName.trim()}
        >
          {editing ? '更新' : '新增'}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);
};

export default WorkoutListView;
