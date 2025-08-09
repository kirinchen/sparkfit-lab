import type { Exercise } from "../model/Models";
import type { SavedWorkout } from "../model/Models";
import { CommUtils } from "../utils/CommUtils";

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
    const ans = this.savedWorkouts.find(w => w.selected) ;
    if(ans) return ans;
    this.savedWorkouts[0].selected = true;
    return this.savedWorkouts[0];

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
  public addToSelectedWorkout(_new: Exercise) {
    const exercises =  this.selectedWorkout.exercises;
    const n = CommUtils.clone(_new);
    n.id = CommUtils.randInt();
    this.selectedWorkout.exercises =  [...exercises, n];
    this.saveAndNotify();
  }

  // 從選中清單移除運動
  public removeFromSelectedExercises(exerciseId: number) {
    const exercises =  this.selectedWorkout.exercises;
    this.selectedWorkout.exercises = exercises.filter(e => e.id !== exerciseId);
    this.notify();
  }

  // 清空選中清單
  public delSelectedWorkout() {
    this._savedWorkouts = this.savedWorkouts.filter(w=> !w.selected);
    this.notify();
  }

  // 處理運動點擊
  public handleExerciseClick(exercise: Exercise) {
    this.setSelectedExercise(exercise);
    this.setShowExerciseModal(true);
  }



  // 處理開始訓練
  public handleStartWorkout() {
    this.setCurrentView('workout');
  }

  // 處理返回選擇頁面
  public handleBackToSelection() {
    this.setCurrentView('selection');
  }

  // 關閉運動詳情彈出視窗
  public closeExerciseModal() {
    this.setShowExerciseModal(false);
    this.setSelectedExercise(null);
  }
}

// 導出唯一的 Service 實例
export const modelService = ModelService.getInstance();
