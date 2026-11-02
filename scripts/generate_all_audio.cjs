const fs = require('fs');
const path = require('path');

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // ElevenLabs Alice
const MODEL = 'eleven_multilingual_v2';
const API_KEY = 'sk_1477a0b0a31e89b834b1e17ca4468c02a6e8bf554f621c5a';

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

// Slugify helper matching audio.js exactly
function getSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '_');
}

// 1. Static Texts: Intro, Wonder, Story, Simulate, Reflect, Results, Feedback
const staticTexts = [
  // Intro Screen
  'Welcome to Geometry: Shapes in Daily Life!',
  'Today, we are going to explore flat 2D shapes and solid 3D shapes all around us.',
  'Click Start to begin our shape adventure!',

  // Wonder Phase
  'Hmm... I wonder... Where can we find circles, triangles, and cylinders around us? Can you spot shapes in daily life?',
  "Shapes are hiding all around us in the playground! Tap Let's Discover to find them!",
  'Shape Discovery Scene! Look at this playground scene! There are shapes hiding everywhere!',
  'Find all six glowing shapes in the scene!',
  'Tap on the glowing circles to discover each shape and its properties!',
  'Look at the wall clock! It is a circle. Circles are perfectly round and have no straight sides or corners.',
  'Look at the clipboard! It is a rectangle. Rectangles have four straight sides where opposite sides are equal, and four corners.',
  'Look at the square tile! It is a square. Squares have four straight sides that are all equal in length, and four corners.',
  'Look at the warning sign! It is a triangle. Triangles have three straight sides and three pointy corners.',
  'Look at the spider web! It is a hexagon with six straight sides and six corners.',
  'Look at the kite! It is a diamond or rhombus shape with four equal straight sides.',

  // Story Phase Panels
  'Oliver and Emma sit down for breakfast. Ms. Parker serves them tasty food.',
  'Oliver notices his plate is a perfect circle! Emma holds a piece of toast that is a rectangle.',
  'They run down to the playground. The sandpit is a large square.',
  'Near the slide, the tall climbing poles are cylinders.',
  'Oliver kicks a soccer ball—it is a round sphere!',
  'For lunch, they visit a local cafe. Oliver spots a soup tin—it is a cylinder!',
  'Emma enjoys an ice cream cone, which is a cone.',
  'Oliver pulls a napkin from a tissue box, which is a cuboid.',
  'On their way home, Emma spots a hexagonal drain cover with six sides.',
  'Oliver points to a triangular road sign.',
  'Behind them, the apartment block rises high like a giant cuboid!',
  'Oliver and Emma make a list of all twelve shapes they found today!',
  'They learned six flat 2D shapes and six solid 3D shapes. Now they see shapes everywhere!',
  'Let us play some games and practice what we learned!',

  // Simulation Guidance - Station Intros
  'Welcome to Station A: Shape Explorer!',
  'Drag each flat 2D shape to the correct circle based on its number of sides and corners.',
  'Welcome to Station B: Solid Spinner!',
  'Tap and drag the 3D solid to spin it! Count its flat faces and match it with a real-world object.',
  'Welcome to Station C: Shape Hunt!',
  'Find and tap all the target shapes hidden in the Singapore street scene. Look closely!',
  'Find and tap all the target shapes hidden in the scene. Look closely!',

  // Simulation Guidance - Station Completions
  'Great job! Station complete! Moving to the next one.',
  'Fantastic! You completed all three simulation stations! Click Go to Practice below.',

  // Simulation Guidance - Interactive Station A
  'No, a Circle does not belong in this zone. Let us look at its properties.',
  'No, a Triangle does not belong in this zone. Let us look at its properties.',
  'No, a Rectangle does not belong in this zone. Let us look at its properties.',
  'No, a Square does not belong in this zone. Let us look at its properties.',
  'No, a Pentagon does not belong in this zone. Let us look at its properties.',
  'No, a Hexagon does not belong in this zone. Let us look at its properties.',

  // Simulation Guidance - Interactive Station B
  'Not quite! A Sphere does not match that object. Try again!',
  'Not quite! A Cylinder does not match that object. Try again!',
  'Not quite! A Cone does not match that object. Try again!',
  'Not quite! A Cube does not match that object. Try again!',
  'Not quite! A Cuboid does not match that object. Try again!',
  'Not quite! A Pyramid does not match that object. Try again!',
  'Not quite! That does not match this solid. Try again!',

  // Simulation Guidance - Interactive Station C
  'You found the Football! It is a Sphere!',
  'You found the Dice! It is a Cube!',
  'You found the Ice Cream! It is a Cone!',
  'You found the Traffic Cone! It is a Cone!',
  "You found the Rubik's Cube! It is a Cuboid!",
  'You found the Pyramid! It is a Pyramid!',

  // Practice Phase Feedback
  'Good, keep it up!',
  "Not quite, let's try in the next question!",
  'Fantastic job! That is correct!',
  'Amazing work! You got it!',
  'Brilliant! Yes, that is correct!',
  'Not quite! Let us look at the sides and corners together.',
  'Try again! Count the flat faces carefully.',
  'Remember: look at the shape properties to help you.',

  // Reflect & Results Phase
  'Congratulations! You completed the learning phases!',
  'Now, take a look around your own room.',
  'Can you write down one flat 2D shape and one solid 3D shape that you see right now?',
  'Welcome to the Reflect Phase! You have completed all 3 simulation stations. Try Practice mode to earn your high score!',
  'Incredible work! You completed the geometry lesson and earned your badges!',
  'You are now a certified Geometry Master! Share your badges with your classmates!'
];

// Ensure dir exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

async function main() {
  // Dynamically load the 100 questions from questionBank.js
  const qbModule = await import('../src/data/questionBank.js');
  const questionBank = qbModule.questionBank;

  const questionTexts = [];
  questionBank.forEach(q => {
    questionTexts.push(q.text);
    questionTexts.push(q.hint);
  });

  const allTexts = [...new Set([...staticTexts, ...questionTexts])];
  console.log(`Total unique narration strings to process: ${allTexts.length}`);

  const audioMap = {};
  let newlyFetched = 0;
  let alreadyExisted = 0;
  let failed = 0;

  for (let i = 0; i < allTexts.length; i++) {
    const text = allTexts[i];
    if (!text || !/[a-zA-Z0-9]/.test(text)) continue;

    const slug = getSlug(text);
    const filename = `${slug}.mp3`;
    const filePath = path.join(AUDIO_DIR, filename);

    audioMap[slug] = filename;

    // Check if already exists and has valid audio size (> 2000 bytes)
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      if (stat.size > 2000) {
        alreadyExisted++;
        continue;
      }
    }

    console.log(`[${i + 1}/${allTexts.length}] ElevenLabs TTS: "${text.substring(0, 50)}..."`);

    let attempts = 0;
    let success = false;

    while (attempts < 3 && !success) {
      attempts++;
      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
          method: 'POST',
          headers: {
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            model_id: MODEL,
            voice_settings: {
              stability: 0.25,
              similarity_boost: 0.60,
              style: 0.45,
              use_speaker_boost: true
            }
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error(`  HTTP ${response.status}: ${errText.substring(0, 100)} (Attempt ${attempts})`);
          if (response.status === 429) {
            console.log('  Rate limited. Waiting 3 seconds before retry...');
            await new Promise(r => setTimeout(r, 3000));
          } else {
            await new Promise(r => setTimeout(r, 1500));
          }
          continue;
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);
        console.log(`  ✓ Saved: ${filename} (${buffer.length} bytes)`);
        newlyFetched++;
        success = true;

        // Polite delay between requests to stay well within rate limit
        await new Promise(r => setTimeout(r, 650));
      } catch (err) {
        console.error(`  Network error on attempt ${attempts}: ${err.message}`);
        await new Promise(r => setTimeout(r, 1500));
      }
    }

    if (!success) {
      console.error(`  ✗ FAILED after 3 attempts for: "${text.substring(0, 40)}"`);
      failed++;
    }
  }

  // Also include any other existing audio files in public/assets/audio in the map
  const existingFiles = fs.readdirSync(AUDIO_DIR);
  existingFiles.forEach(file => {
    if (file.endsWith('.mp3')) {
      const slug = file.replace(/\.mp3$/, '');
      if (!audioMap[slug]) {
        audioMap[slug] = file;
      }
    }
  });

  // Write audioMap.js
  const audioMapPath = path.join(__dirname, '..', 'src', 'utils', 'audioMap.js');
  const fileContent = `// Auto-generated by scripts/generate_all_audio.cjs. Do not edit manually.
export const audioMap = ${JSON.stringify(audioMap, null, 2)};
`;
  fs.writeFileSync(audioMapPath, fileContent);

  console.log('\n========================================');
  console.log(`Audio Generation Summary:`);
  console.log(`Total mapped: ${Object.keys(audioMap).length}`);
  console.log(`Already cached on disk: ${alreadyExisted}`);
  console.log(`Newly generated & downloaded: ${newlyFetched}`);
  console.log(`Failed: ${failed}`);
  console.log(`audioMap.js updated successfully!`);
  console.log('========================================\n');
}

main().catch(err => {
  console.error('Fatal error in generator:', err);
  process.exit(1);
});

