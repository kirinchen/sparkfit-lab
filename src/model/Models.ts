

export interface SavedWorkout {
  selected: boolean;
  name: string;
  exercises: Exercise[];
}// 定義類型
export interface Exercise {
  id: number;
  name: string;
  description: string;
  animationType: string;
}

