import { ArrowLeft, Pause, Play, RotateCcw } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import startupSound from '../assets/audio/startup.wav';
import takebreakSound from '../assets/audio/takebreak.wav';
import type { Exercise } from '../model/Models';
import YouTubePlayerView from './YouTubePlayerView';

interface WorkoutTimerViewProps {
  exercises: Exercise[];
  onBack: () => void;
}

// 計時器 Hook
const useTimer = (exercises: Exercise[]) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWorkout, setIsWorkout] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(30);
  const [restTime, setRestTime] = useState(10);
  const intervalRef = useRef<number | null>(null);
  const startupAudio = useRef(new Audio(startupSound));
  const takebreakAudio = useRef(new Audio(takebreakSound));

  const startTimer = () => {
    if (exercises.length === 0) return;
    
    startupAudio.current.play();
    setIsRunning(true);
    setTimeLeft(workoutTime);
    setIsWorkout(true);
    setCurrentExerciseIndex(0);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsWorkout(true);
    setCurrentExerciseIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const tick = () => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        // 切換階段
        if (isWorkout) {
          // 從運動切換到休息
          setIsWorkout(false);
          takebreakAudio.current.play();
          return restTime;
        } else {
          // 從休息切換到下一個運動
          const nextIndex = currentExerciseIndex + 1;
          if (nextIndex >= exercises.length) {
            // 訓練完成
            setIsRunning(false);
            return 0;
          }
          setCurrentExerciseIndex(nextIndex);
          setIsWorkout(true);
          startupAudio.current.play();
          return workoutTime;
        }
      }
      return prev - 1;
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => tick(), 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isWorkout, currentExerciseIndex, workoutTime, restTime, exercises]);

  return {
    isRunning,
    timeLeft,
    isWorkout,
    currentExerciseIndex,
    workoutTime,
    restTime,
    setWorkoutTime,
    setRestTime,
    startTimer,
    pauseTimer,
    resetTimer
  };
};

const WorkoutTimerView: React.FC<WorkoutTimerViewProps> = ({ exercises, onBack }) => {
  const {
    isRunning,
    timeLeft,
    isWorkout,
    currentExerciseIndex,
    workoutTime,
    restTime,
    setWorkoutTime,
    setRestTime,
    startTimer,
    pauseTimer,
    resetTimer
  } = useTimer(exercises);

  const currentExercise = exercises[currentExerciseIndex];
  const isCompleted = currentExerciseIndex >= exercises.length;

  useEffect(() => {
    if (exercises.length > 0 && !isCompleted) {
      startTimer();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-dark-custom text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="text-success mb-4">訓練完成！</h1>
          <Button variant="cyan-custom" size="lg" onClick={onBack}>
            <ArrowLeft size={20} className="me-2" />
            返回主頁
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-custom text-white p-4">
      <Container fluid>
        <Row>
          {/* 左側主要區域 */}
          <Col lg={8}>
            {/* 計時器顯示 */}
            <Card className="bg-dark-card text-center mb-4">
              <Card.Body>
                <div className="display-1 text-cyan-custom mb-3">
                  {formatTime(timeLeft)}
                </div>
                <div className="h4 text-muted">
                  {isWorkout ? '運動中' : '休息一下'}
                </div>
              </Card.Body>
            </Card>

            {/* 當前運動資訊 */}
            {isWorkout && currentExercise && (
              <Card className="bg-dark-card mb-4">
                <Card.Body>
                  <h2 className="text-cyan-custom  text-center">{currentExercise.name}</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <YouTubePlayerView animationType={currentExercise.animationType} />
                    </div>
                    <div className="col-md-6">
                      <p className="text-white">{currentExercise.description}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* 控制按鈕 */}
            <Card className="bg-dark-card">
              <Card.Body className="d-flex justify-content-center gap-3">
                {!isRunning ? (
                                  <Button 
                  variant="success" 
                  size="lg"
                  onClick={() => startTimer()}
                >
                    <Play size={20} className="me-2" />
                    開始
                  </Button>
                ) : (
                  <Button 
                    variant="warning" 
                    size="lg"
                    onClick={pauseTimer}
                  >
                    <Pause size={20} className="me-2" />
                    暫停
                  </Button>
                )}
                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={resetTimer}
                >
                  <RotateCcw size={20} className="me-2" />
                  重設
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={onBack}
                >
                  <ArrowLeft size={20} className="me-2" />
                  返回
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* 右側設定區域 */}
          <Col lg={4}>
            {/* 設定 */}
            <Card className="bg-dark-card mb-4">
              <Card.Header className="bg-dark-custom border-secondary">
                <h5 className="text-cyan-custom mb-0">設定</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>運動時間 (秒)</Form.Label>
                    <Form.Control
                      type="number"
                      value={workoutTime}
                      onChange={(e) => setWorkoutTime(Number(e.target.value))}
                      className="bg-dark-custom text-white border-secondary"
                      min="1"
                      max="300"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>休息時間 (秒)</Form.Label>
                    <Form.Control
                      type="number"
                      value={restTime}
                      onChange={(e) => setRestTime(Number(e.target.value))}
                      className="bg-dark-custom text-white border-secondary"
                      min="1"
                      max="300"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            {/* 運動清單 */}
            <Card className="bg-dark-card">
              <Card.Header className="bg-dark-custom border-secondary">
                <h5 className="text-cyan-custom mb-0">運動清單</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {exercises.map((exercise, index) => (
                    <ListGroup.Item 
                      key={index}
                      className={`bg-dark-custom text-white border-secondary ${
                        index === currentExerciseIndex && isWorkout
                          ? 'border-cyan-custom'
                          : index < currentExerciseIndex
                          ? 'text-muted'
                          : ''
                      }`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{exercise.name}</span>
                        {index === currentExerciseIndex && isWorkout && (
                          <span className="badge bg-cyan-custom text-dark">進行中</span>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WorkoutTimerView;
