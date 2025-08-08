import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Settings } from 'lucide-react';
import './App.css';

// 導入元件
import ActivityItemListView from './components/ActivityItemListView';
import WorkoutListView from './components/WorkoutListView';
import ExerciseModal from './components/ExerciseModal';
import WorkoutTimerView from './components/WorkoutTimerView';

// 定義類型
interface Exercise {
  id: number;
  name: string;
  description: string;
  animationType: string;
}

// 運動資料結構
const exercisesData = [
  { id: 1, name: '深蹲', description: '雙腳與肩同寬，核心收緊，臀部像坐椅子一樣向下坐，然後回到起始位置。', animationType: 'squat' },
  { id: 2, name: '開合跳', description: '雙腳併攏站立，雙臂放在身體兩側。跳躍時雙腳向外張開，同時雙臂舉過頭頂。', animationType: 'jumpingJacks' },
  { id: 3, name: '棒式', description: '以手肘和腳尖支撐身體，使身體呈一直線，核心用力，保持穩定。', animationType: 'plank' },
  { id: 4, name: '伏地挺身', description: '雙手略寬於肩，身體呈一直線，彎曲手肘將身體放低，再推回原位。', animationType: 'pushups' },
  { id: 5, name: '高抬腿', description: '原地跑步，將膝蓋抬高至腰部高度，保持核心穩定。', animationType: 'highKnees' },
  { id: 6, name: '波比跳', description: '蹲下、手撐地、向後跳、伏地挺身、向前跳、向上跳躍。', animationType: 'burpees' },
];

// 主應用程式元件
function App() {
  const [currentView, setCurrentView] = useState<'selection' | 'workout'>('selection');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const handleAddToWorkout = (exercise: Exercise) => {
    // 這裡可以實現將運動添加到臨時清單的邏輯
    console.log('Added exercise to workout:', exercise.name);
  };

  const handleStartWorkout = (exercises: Exercise[]) => {
    setSelectedExercises(exercises);
    setCurrentView('workout');
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedExercises([]);
  };

  if (currentView === 'workout') {
    return <WorkoutTimerView exercises={selectedExercises} onBack={handleBackToSelection} />;
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
            <WorkoutListView onStartWorkout={handleStartWorkout} />
          </Col>

          {/* 右側：運動總列表 */}
          <Col lg={8}>
            <ActivityItemListView 
              exercises={exercisesData}
              onExerciseClick={handleExerciseClick}
              onStartWorkout={handleStartWorkout}
            />
          </Col>
        </Row>

        {/* 運動詳情 Modal */}
        <ExerciseModal
          show={showExerciseModal}
          exercise={selectedExercise}
          onHide={() => {
            setShowExerciseModal(false);
            setSelectedExercise(null);
          }}
          onAddToWorkout={handleAddToWorkout}
        />
      </Container>
    </div>
  );
}

export default App;
