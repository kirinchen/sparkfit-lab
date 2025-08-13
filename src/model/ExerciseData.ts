import type { Exercise } from "./Models";

export const EXERCISES_DATA: Exercise[] = [
    { id: 1, name: '深蹲', description: '雙腳與肩同寬，核心收緊，臀部像坐椅子一樣向下坐，然後回到起始位置。', animationType: 'squat' },
    { id: 2, name: '開合跳', description: '雙腳併攏站立，雙臂放在身體兩側。跳躍時雙腳向外張開，同時雙臂舉過頭頂。', animationType: 'jumpingJacks' },
    { id: 3, name: '棒式', description: '以手肘和腳尖支撐身體，使身體呈一直線，核心用力，保持穩定。', animationType: 'plank' },
    { id: 4, name: '伏地挺身', description: '雙手略寬於肩，身體呈一直線，彎曲手肘將身體放低，再推回原位。', animationType: 'pushups' },
    { id: 5, name: '高抬腿', description: '原地跑步，將膝蓋抬高至腰部高度，保持核心穩定。', animationType: 'highKnees' },
    { id: 6, name: '波比跳', description: '蹲下、手撐地、向後跳、伏地挺身、向前跳、向上跳躍。', animationType: 'burpees' },
    { id: 7, name: '快速小碎步', description: '雙腳快速且輕盈地原地踩踏，如同在熱燙的地板上小跑步。 手臂配合步伐自然擺動，此動作能有效提升心率、下肢反應速度與心肺功能。', animationType: 'quickFeet' },
    { id: 8, name: '後踢腿', description: '類似原地慢跑，但重點在於將腳跟向後勾，盡量踢向臀部。此動作可以提升心率，作為持續的有氧運動。', animationType: 'buttKicks' },
    { id: 9, name: '開合跳深蹲摸地', description: '雙腳向外跳開，寬於肩膀，同時下蹲並伸手觸摸地面，接著跳回起始姿勢。 此動作能強化大腿內側、核心力量及身體柔軟度。', animationType: 'squatJacksWithFloorTouch' },
    { id: 10, name: '半波比跳', description: '這是波比跳的簡化版，無需做伏地挺身。 動作順序為：深蹲、將雙腿向後伸直（呈高平板式）、雙腿跳回深蹲姿勢，最後站立。 適合初學者循序漸進地鍛鍊全身肌力。', animationType: 'halfBurpee' },
    { id: 11, name: '登山者', description: '從高平板式（伏地挺身預備姿勢）開始，雙手位於肩膀正下方。輪流將膝蓋快速地往胸口方向移動，模擬跑步的動作。過程中保持核心穩定，背部打直。', animationType: 'mountainClimbers' },
    { id: 12, name: '抱膝跳', description: '向上跳躍時，在空中將膝蓋快速抬向胸口，可用手肘輕碰膝蓋。 此動作能訓練爆發力與身體協調性。', animationType: 'tuckJumps' },
    { id: 13, name: '仰臥踢水', description: '仰躺在地面，雙手可置於身體兩側或臀部下方以支撐。雙腿伸直後，上下交替擺動，如同游泳時的打水動作。 此動作主要訓練腹部核心肌群。', animationType: 'flutterKicks' },
    { id: 14, name: '捲腹', description: '仰躺屈膝，雙腳平放於地。腹部發力，將上背部抬離地面，雙手可向前伸直或輕觸肚臍。 這個動作能有效強化腹直肌。', animationType: 'crunches' },
    { id: 15, name: '左右摸腳跟', description: '仰躺屈膝，雙腳平放於地。將肩膀微微抬離地面，用雙手交替觸摸左右兩側的腳跟。 此動作專注於訓練腹斜肌，雕塑側腹線條。', animationType: 'heelTaps' },
    { id: 16, name: '空中腳踏車', description: '仰躺，雙手置於頭部兩側。將一邊的膝蓋抬起，同時轉動上半身，用對側的手肘去靠近膝蓋，雙腿交替進行。 這個動作能同時訓練腹直肌、腹斜肌與身體協調性。', animationType: 'bicycleCrunches' },
    { id: 17, name: '反向捲腹', description: '仰躺，雙手平放於身體兩側。利用下腹部的力量將雙腿併攏，向上抬起，使臀部和下背部稍微離開地面，身體呈現彎曲如蝦子的狀態。 這個動作主要針對下腹部進行訓練。', animationType: 'reverseCrunches' },
    { id: 18, name: '仰臥摸腳尖', description: '仰躺，雙腿垂直向上舉起。利用上腹部的力量，將上半身抬起，伸手盡量觸摸腳尖。', animationType: 'toeTouches' },
    { id: 19, name: 'V型仰臥起坐', description: '仰躺，雙手向後伸直。利用核心力量，同時將雙腿與上半身抬起，使身體在最高點時呈現V字型，再緩慢還原。 此動作可全面性地強化腹部與腰部核心。', animationType: 'vUps' },
    { id: 20, name: '側向V型仰臥起坐', description: '這是V型仰臥起坐的變化式。 身體向一側稍微傾斜，利用側腹的力量將上半身與雙腿抬起，雙手觸摸同側腳，左右兩邊交替進行。 主要訓練腹斜肌與側核心。', animationType: 'obliqueVUps' },
  ];