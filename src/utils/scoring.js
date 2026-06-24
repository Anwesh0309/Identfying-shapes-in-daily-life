export function calcXP(attemptNumber = 1, hintsUsed = 0, currentStreak = 0) {
  let baseXP = 10;
  if (attemptNumber === 2) baseXP = 5;
  else if (attemptNumber >= 3) baseXP = 2;

  // Deduct for hints
  const hintDeduction = hintsUsed * 2;
  let xp = Math.max(2, baseXP - hintDeduction); // minimum 2 XP for correct answer

  // Streak bonus: +2 XP for every streak multiplier of 3
  if (currentStreak > 0 && currentStreak % 3 === 0) {
    xp += 2;
  }

  return xp;
}

export function calcStars(correctCount) {
  if (correctCount >= 9) return 3;
  if (correctCount >= 6) return 2;
  if (correctCount >= 3) return 1;
  return 0;
}
