// 定義類型
export interface Exercise {
  id: number;
  name: string;
  description: string;
  animationType: string;
}

export interface SavedWorkout {
  selected: boolean;
  name: string;
  exercises: Exercise[];
}

export type ViewType = 'selection' | 'workout';

class ModelService {
  // Singleton 模式：靜態私有實例
  private static instance: ModelService;

  // 存放所有訂閱者的回呼函式
  private subscribers: Set<() => void> = new Set();

  // 核心狀態資料
  private currentView: ViewType = 'selection';
  private showExerciseModal: boolean = false;
  private selectedExercise: Exercise | null = null;
  private _savedWorkouts: SavedWorkout[] = [];

  // 運動資料結構
  private exercisesData: Exercise[] = [
    { id: 1, name: '深蹲', description: '雙腳與肩同寬，核心收緊，臀部像坐椅子一樣向下坐，然後回到起始位置。', animationType: 'squat' },
    { id: 2, name: '開合跳', description: '雙腳併攏站立，雙臂放在身體兩側。跳躍時雙腳向外張開，同時雙臂舉過頭頂。', animationType: 'jumpingJacks' },
    { id: 3, name: '棒式', description: '以手肘和腳尖支撐身體，使身體呈一直線，核心用力，保持穩定。', animationType: 'plank' },
    { id: 4, name: '伏地挺身', description: '雙手略寬於肩，身體呈一直線，彎曲手肘將身體放低，再推回原位。', animationType: 'pushups' },
    { id: 5, name: '高抬腿', description: '原地跑步，將膝蓋抬高至腰部高度，保持核心穩定。', animationType: 'highKnees' },
    { id: 6, name: '波比跳', description: '蹲下、手撐地、向後跳、伏地挺身、向前跳、向上跳躍。', animationType: 'burpees' },
  ];

  // Singleton 模式：私有化建構子
  private constructor() {
    console.log("ModelService Initialized!");
    this.loadFromLocalStorage();
  }

  public get savedWorkouts(): SavedWorkout[] {
    const ans = this._savedWorkouts;
    if(ans.length === 0){
      this.addSavedWorkout({
        name: '我的運動',
        exercises: [],
        selected: true
      });
    }
    return ans;
  }

  public addSavedWorkout(w:SavedWorkout){
    this._savedWorkouts = [...this._savedWorkouts, w];
    this.setSelectedWorkout(w.name);

  }

  public setSelectedWorkout(wName:string){
    this._savedWorkouts = this.savedWorkouts.map(w => ({...w, selected: w.name === wName}));
    this.saveAndNotify();
  }

  public saveAndNotify(){
    this.saveToLocalStorage();
    this.notify();
  }

  public get selectedWorkout(): SavedWorkout  {
    return this.savedWorkouts.find(w => w.selected) !;
  }


  private loadFromLocalStorage() {
    // 載入已儲存的訓練清單
    const savedWorkouts = localStorage.getItem('tabataWorkouts');
    if (savedWorkouts) {
      try {
        this._savedWorkouts = JSON.parse(savedWorkouts) as SavedWorkout[];
        console.log('Loaded saved workouts from localStorage:', this._savedWorkouts);
      } catch (error) {
        console.error('Error parsing saved workouts:', error);
        this._savedWorkouts = [];
      }
    }
  }

  private saveToLocalStorage(){
    const json = JSON.stringify(this._savedWorkouts);
    localStorage.setItem('tabataWorkouts', json);
  }

  // Singleton 模式：提供靜態方法來取得唯一的實例
  public static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }

  // Observer 模式：通知所有訂閱者
  private notify() {
    console.log("Notifying all subscribers of data change...");
    this.subscribers.forEach(callback => callback());
  }

  // Observer 模式：提供訂閱方法
  public subscribe(callback: () => void): () => void {
    this.subscribers.add(callback);
    // 返回一個取消訂閱的函式
    return () => {
      this.subscribers.delete(callback);
      console.log("A subscriber has unsubscribed.");
    };
  }

  // --- 公開 API ---

  // 取得運動資料
  public getExercisesData(): Exercise[] {
    return this.exercisesData;
  }

  // 取得當前視圖
  public getCurrentView(): ViewType {
    return this.currentView;
  }

  // 設定當前視圖
  public setCurrentView(view: ViewType) {
    this.currentView = view;
    this.notify();
  }



  // 取得運動詳情彈出視窗狀態
  public getShowExerciseModal(): boolean {
    return this.showExerciseModal;
  }

  // 設定運動詳情彈出視窗狀態
  public setShowExerciseModal(show: boolean) {
    this.showExerciseModal = show;
    this.notify();
  }

  // 取得選中的運動
  public getSelectedExercise(): Exercise | null {
    return this.selectedExercise;
  }

  // 設定選中的運動
  public setSelectedExercise(exercise: Exercise | null) {
    this.selectedExercise = exercise;
    this.notify();
  }

  // 添加運動到選中清單
  public addToSelectedExercises(exercise: Exercise) {
    // 檢查是否已經存在
    if (!this.selectedExercises.find(e => e.id === exercise.id)) {
      this.selectedExercises = [...this.selectedExercises, exercise];
      this.notify();
    }
  }

  // 從選中清單移除運動
  public removeFromSelectedExercises(exerciseId: number) {
    this.selectedExercises = this.selectedExercises.filter(e => e.id !== exerciseId);
    this.notify();
  }

  // 清空選中清單
  public clearSelectedExercises() {
    this.selectedExercises = [];
    this.notify();
  }

  // 處理運動點擊
  public handleExerciseClick(exercise: Exercise) {
    this.setSelectedExercise(exercise);
    this.setShowExerciseModal(true);
  }

  // 處理新增運動到訓練清單
  public handleAddToWorkout(exercise: Exercise) {
    this.addToSelectedExercises(exercise);
    console.log('Added exercise to selected exercises:', exercise.name);
  }

  // 處理開始訓練
  public handleStartWorkout(exercises: Exercise[]) {
    this.setSelectedExercises(exercises);
    this.setCurrentView('workout');
  }

  // 處理返回選擇頁面
  public handleBackToSelection() {
    this.setCurrentView('selection');
    this.setSelectedExercises([]);
  }

  // 關閉運動詳情彈出視窗
  public closeExerciseModal() {
    this.setShowExerciseModal(false);
    this.setSelectedExercise(null);
  }
}

// 導出唯一的 Service 實例
export const modelService = ModelService.getInstance();
