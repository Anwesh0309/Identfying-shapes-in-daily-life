export const BADGES = [
  { id: 'first_step', name: 'First Step', desc: 'Completed the Wonder Phase! 🌟', icon: '🏃' },
  { id: 'storyteller', name: 'Storyteller', desc: 'Read the shape adventure story! 📖', icon: '📚' },
  { id: 'lab_assistant', name: 'Lab Assistant', desc: 'Finished all 3 simulation stations! 🧪', icon: '🔬' },
  { id: 'shape_explorer', name: 'Shape Explorer', desc: 'Got 10/10 correct in any practice world! 🗺️', icon: '🔍' },
  { id: 'super_streak', name: 'Super Streak', desc: 'Achieved a streak of 6 correct answers! 🔥', icon: '⚡' },
  { id: 'star_student', name: 'Star Student', desc: 'Earned 15 stars in the Play phase! ⭐', icon: '🏅' },
  { id: 'journalist', name: 'Journalist', desc: 'Shared your reflection with LearnFlow! ✏️', icon: '✍️' },
  { id: 'geometry_master', name: 'Geometry Master', desc: 'Completed all phases and earned 25+ stars! 👑', icon: '🏆' },
];

export function checkBadges(state) {
  const currentBadges = new Set(state.badges || []);
  const newlyUnlocked = [];

  const checkAndAdd = (badgeId) => {
    if (!currentBadges.has(badgeId)) {
      newlyUnlocked.push(badgeId);
    }
  };

  // 1. First Step: Wonder Complete
  if (state.phaseComplete.wonder) {
    checkAndAdd('first_step');
  }

  // 2. Storyteller: Story Complete
  if (state.phaseComplete.story) {
    checkAndAdd('storyteller');
  }

  // 3. Lab Assistant: Simulate Complete
  if (state.phaseComplete.simulate || (state.simStationsComplete && state.simStationsComplete.every(s => s))) {
    checkAndAdd('lab_assistant');
  }

  // 4. Shape Explorer: Got 10/10 correct in any world
  if (state.worldScores && state.worldScores.some(score => score === 10)) {
    checkAndAdd('shape_explorer');
  }

  // 5. Super Streak: streak >= 6
  if (state.maxStreak >= 6) {
    checkAndAdd('super_streak');
  }

  // 6. Star Student: stars >= 15
  if (state.totalStars >= 15) {
    checkAndAdd('star_student');
  }

  // 7. Journalist: Reflect Complete
  if (state.phaseComplete.reflect) {
    checkAndAdd('journalist');
  }

  // 8. Geometry Master: Reflect complete and stars >= 25
  if (state.phaseComplete.reflect && state.totalStars >= 25) {
    checkAndAdd('geometry_master');
  }

  return newlyUnlocked;
}
