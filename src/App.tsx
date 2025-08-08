import { Container, Row, Col } from 'react-bootstrap';
import { Settings } from 'lucide-react';
import './App.css';

// 導入元件
import ActivityItemListView from './components/ActivityItemListView';
import WorkoutListView from './components/WorkoutListView';
import ExerciseModal from './components/ExerciseModal';
import WorkoutTimerView from './components/WorkoutTimerView';

// 導入 Service 和 Hook
import { useModelService } from './hooks/useModelService';

// 主應用程式元件
function App() {
  // 使用 Custom Hook 連接 ModelService
  const { service } = useModelService();

  // 從 Service 取得當前狀態
  const currentView = service.getCurrentView();
  const selectedExercises = service.getSelectedExercises();
  const showExerciseModal = service.getShowExerciseModal();
  const selectedExercise = service.getSelectedExercise();

  // 如果當前視圖是運動計時器，則顯示計時器頁面
  if (currentView === 'workout') {
    return <WorkoutTimerView exercises={selectedExercises} onBack={() => service.handleBackToSelection()} />;
  }

  return (
    <div className="App bg-dark-custom min-h-screen">
      <Container fluid className="p-0">
        {/* 頁面標題 */}
        <Row className="bg-dark-card border-bottom border-secondary">
          <Col className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h1 className="text-cyan-custom mb-1">Tabata 運動計時器</h1>
                <p className="text-muted mb-0">建立您的專屬訓練計畫</p>
              </div>
              <div className="d-flex gap-2">
                <Settings size={24} className="text-cyan-custom" />
              </div>
            </div>
          </Col>
        </Row>

        {/* 主要內容區域 */}
        <Row className="g-0">
          {/* 左側：我的運動清單 */}
          <Col lg={4} className="border-end border-secondary">
            <WorkoutListView />
          </Col>

          {/* 右側：運動總列表 */}
          <Col lg={8}>
            <ActivityItemListView />
          </Col>
        </Row>

        {/* 運動詳情 Modal */}
        <ExerciseModal
          show={showExerciseModal}
          exercise={selectedExercise}
          onHide={() => service.closeExerciseModal()}
          onAddToWorkout={(exercise) => service.handleAddToWorkout(exercise)}
        />
      </Container>
    </div>
  );
}

export default App;
