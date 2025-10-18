import type { Exercise } from '../model/Models';

export interface CsvExerciseData {
  timestamp: string;
  name: string;
  description: string;
  displayType: string;
  displayLink: string;
  displayImg: string;
}

export function parseCsvToExercises(csvText: string): Exercise[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  const exercises: Exercise[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    
    if (values.length >= headers.length) {
      const csvData: CsvExerciseData = {
        timestamp: values[0] || '',
        name: values[1] || '',
        description: values[2] || '',
        displayType: values[3] || '',
        displayLink: values[4] || '',
        displayImg: values[5] || ''
      };
      
      // Generate animation type based on exercise name
      const animationType = generateAnimationType(csvData.name);
      
      const exercise: Exercise = {
        id: i,
        name: csvData.name,
        description: csvData.description,
        animationType: animationType,
        displayType: csvData.displayType,
        displayLink: csvData.displayLink,
        displayImg: csvData.displayImg
      };
      
      exercises.push(exercise);
    }
  }
  
  return exercises;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

function generateAnimationType(exerciseName: string): string {
  const animationMap: { [key: string]: string } = {
    '深蹲': 'squat',
    '開合跳': 'jumpingJacks',
    '棒式': 'plank',
    '伏地挺身': 'pushups',
    '高抬腿': 'highKnees',
    '波比跳': 'burpees',
    '快速小碎步': 'quickFeet',
    '後踢腿': 'buttKicks',
    '開合跳深蹲摸地': 'squatJacksWithFloorTouch'
  };
  
  return animationMap[exerciseName] || 'default';
}

export async function fetchExercisesFromGoogleSheets(): Promise<Exercise[]> {
  try {
    const response = await fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTz_mHkTJNRrt7gfS_t-gQVFEOzpstG3XO1O8rFw5FRwGxLrzlqs7VSRJ8RTYCpgkZ95wGgQO8al8h1/pub?gid=631283657&single=true&output=csv'
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    return parseCsvToExercises(csvText);
  } catch (error) {
    console.error('Error fetching exercises from Google Sheets:', error);
    // Return fallback data when fetch fails
    return getFallbackExercises();
  }
}

function getFallbackExercises(): Exercise[] {
  return [
    { id: 1, name: '深蹲', description: '雙腳與肩同寬，核心收緊，臀部像坐椅子一樣向下坐，然後回到起始位置。', animationType: 'squat' },
    { id: 2, name: '開合跳', description: '雙腳併攏站立，雙臂放在身體兩側。跳躍時雙腳向外張開，同時雙臂舉過頭頂。', animationType: 'jumpingJacks' },
    { id: 3, name: '棒式', description: '以手肘和腳尖支撐身體，使身體呈一直線，核心用力，保持穩定。', animationType: 'plank' },
    { id: 4, name: '伏地挺身', description: '雙手略寬於肩，身體呈一直線，彎曲手肘將身體放低，再推回原位。', animationType: 'pushups' },
    { id: 5, name: '高抬腿', description: '原地跑步，將膝蓋抬高至腰部高度，保持核心穩定。', animationType: 'highKnees' },
    { id: 6, name: '波比跳', description: '蹲下、手撐地、向後跳、伏地挺身、向前跳、向上跳躍。', animationType: 'burpees' },
    { id: 7, name: '快速小碎步', description: '雙腳快速且輕盈地原地踩踏，如同在熱燙的地板上小跑步。 手臂配合步伐自然擺動，此動作能有效提升心率、下肢反應速度與心肺功能。', animationType: 'quickFeet' },
    { id: 8, name: '後踢腿', description: '類似原地慢跑，但重點在於將腳跟向後勾，盡量踢向臀部。此動作可以提升心率，作為持續的有氧運動。', animationType: 'buttKicks' },
    { id: 9, name: '開合跳深蹲摸地', description: '雙腳向外跳開，寬於肩膀，同時下蹲並伸手觸摸地面，接著跳回起始姿勢。 此動作能強化大腿內側、核心力量及身體柔軟度。', animationType: 'squatJacksWithFloorTouch' }
  ];
}
