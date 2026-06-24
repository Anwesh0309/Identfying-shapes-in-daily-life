export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(questionBank) {
  // Group questions by world (1 to 10)
  const grouped = {};
  for (let i = 1; i <= 10; i++) {
    grouped[i] = [];
  }

  questionBank.forEach(q => {
    if (grouped[q.world]) {
      grouped[q.world].push(q);
    }
  });

  // Shuffle questions within each world and combine them
  let sessionQuestions = [];
  for (let i = 1; i <= 10; i++) {
    const shuffledWorld = shuffleArray(grouped[i]);
    sessionQuestions = [...sessionQuestions, ...shuffledWorld];
  }

  return sessionQuestions;
}
