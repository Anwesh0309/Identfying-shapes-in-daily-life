const fs = require('fs');
const path = require('path');

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // ElevenLabs Alice
const MODEL = 'eleven_multilingual_v2';
const API_KEY = 'sk_7ef27dccb32144843f8ee5068dfd4223a85326c56c14b00a';

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');

// Replicated simple shapes data
const shapes = {
  circle: { name: 'Circle', sides: 0, corners: 0 },
  triangle: { name: 'Triangle', sides: 3, corners: 3 },
  rectangle: { name: 'Rectangle', sides: 4, corners: 4 },
  square: { name: 'Square', sides: 4, corners: 4 },
  pentagon: { name: 'Pentagon', sides: 5, corners: 5 },
  hexagon: { name: 'Hexagon', sides: 6, corners: 6 },
  sphere: { name: 'Sphere', edges: 0, vertices: 0, faces: 0 },
  cylinder: { name: 'Cylinder', edges: 2, vertices: 0, faces: 2 },
  cone: { name: 'Cone', edges: 1, vertices: 1, faces: 1 },
  cube: { name: 'Cube', edges: 12, vertices: 8, faces: 6 },
  cuboid: { name: 'Cuboid', edges: 12, vertices: 8, faces: 6 },
  pyramid: { name: 'Pyramid', edges: 8, vertices: 5, faces: 5 }
};

// Replicated text content
const staticTexts = [
  // Intro Screen
  'Welcome to Geometry: Shapes in Daily Life!',
  'Today, we are going to explore flat 2D shapes and solid 3D shapes all around us.',
  'Click Start to begin our shape adventure!',

  // Wonder Phase
  'Look at this playground scene! There are shapes hiding everywhere!',
  'Can you find all six glowing shapes?',
  'Tap on them to see their names and discover what makes them special!',

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

  // Simulate Station Intros
  'Welcome to Station A: Shape Explorer!',
  'Drag each flat 2D shape to the correct circle based on its number of sides and corners.',
  'Welcome to Station B: Solid Spinner!',
  'Tap and drag the 3D solid to spin it! Count its flat faces and match it with a real-world object.',
  'Welcome to Station C: Shape Hunt!',
  'Find and tap all the target shapes hidden in the Singapore street scene. Look closely!',

  // Reflect Phase
  'Congratulations! You completed the learning phases!',
  'Now, take a look around your own room.',
  'Can you write down one flat 2D shape and one solid 3D shape that you see right now?',

  // Feedback responses
  'Fantastic job! That is correct!',
  'Amazing work! You got it!',
  'Brilliant! Yes, that is correct!',
  'Not quite! Let us look at the sides and corners together.',
  'Try again! Count the flat faces carefully.',
  'Remember: look at the shape properties to help you.'
];

// Replicated Question Generator to get all 100 questions
function generateQuestions() {
  const list = [];
  const WORLDS = [
    { id: 1, name: 'Hawker Centre' },
    { id: 2, name: 'HDB Playground' },
    { id: 3, name: 'MRT Station' },
    { id: 4, name: 'Sentosa Beach' },
    { id: 5, name: 'Changi Airport' },
    { id: 6, name: 'Botanic Gardens' },
    { id: 7, name: 'Marina Bay Sands' },
    { id: 8, name: 'National Museum' },
    { id: 9, name: 'Classroom Desk' },
    { id: 10, name: 'Kitchen Pantry' }
  ];
  const NAMES = ['Oliver', 'Emma', 'Jack', 'Sophia', 'Leo', 'Mia', 'Chloe', 'Henry', 'Lucas', 'Ella'];

  for (let w = 0; w < 10; w++) {
    const world = WORLDS[w];
    const name1 = NAMES[w];
    const name2 = NAMES[(w + 1) % 10];

    for (let t = 1; t <= 10; t++) {
      let text = '';
      let hint = '';

      switch (t) {
        case 1: {
          const targetShapes = ['triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
          const target = shapes[targetShapes[w % targetShapes.length]];
          text = `${name1} finds a shape with ${target.sides} straight sides and ${target.corners} corners. What shape is it?`;
          hint = `Count the sides! A ${target.name.toLowerCase()} has exactly ${target.sides} sides.`;
          break;
        }
        case 2: {
          const targetSolids = ['sphere', 'cylinder', 'cone', 'cube', 'cuboid', 'pyramid'];
          const target = shapes[targetSolids[w % targetSolids.length]];
          const desc = target === shapes.sphere ? 'no flat faces and is completely round' :
                       target === shapes.cylinder ? '2 flat circular faces and a curved middle' :
                       target === shapes.cone ? '1 flat circular face and a sharp point at the top' :
                       target === shapes.cube ? '6 flat faces that are all equal squares' :
                       target === shapes.cuboid ? '6 flat rectangular faces' :
                       '1 square face at the bottom and 4 triangular faces';
          text = `${name1} holds a solid block that has ${desc}. What solid is it?`;
          hint = `Think about its flat faces and curved surfaces! This matches a ${target.name.toLowerCase()}.`;
          break;
        }
        case 3: {
          const targetShapes = ['triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
          const target = shapes[targetShapes[(w + 1) % targetShapes.length]];
          text = `How many straight sides does a ${target.name.toLowerCase()} have?`;
          hint = `Count them: a ${target.name.toLowerCase()} has ${target.sides} straight sides!`;
          break;
        }
        case 4: {
          const targetShapes = ['triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
          const target = shapes[targetShapes[(w + 2) % targetShapes.length]];
          text = `How many corners does a ${target.name.toLowerCase()} have?`;
          hint = `Corners are where the straight sides meet. A ${target.name.toLowerCase()} has ${target.corners} corners!`;
          break;
        }
        case 5: {
          const targetSolids = ['sphere', 'cylinder', 'cone', 'cube', 'cuboid', 'pyramid'];
          const target = shapes[targetSolids[(w + 1) % targetSolids.length]];
          const flatCount = target === shapes.sphere ? 0 :
                            target === shapes.cylinder ? 2 :
                            target === shapes.cone ? 1 :
                            target === shapes.cube ? 6 :
                            target === shapes.cuboid ? 6 : 5;
          text = `How many flat faces does a ${target.name.toLowerCase()} have?`;
          hint = `Flat faces are the flat surfaces you can touch. A ${target.name.toLowerCase()} has ${flatCount} flat faces!`;
          break;
        }
        case 6: {
          const targetSolids = ['sphere', 'cylinder', 'cube', 'cone'];
          const target = targetSolids[w % targetSolids.length];
          if (target === 'sphere') {
            text = `At the ${world.name}, ${name1} rolls a football. Can a sphere roll?`;
            hint = 'Spheres are completely round, which makes them perfect for rolling!';
          } else if (target === 'cylinder') {
            text = `${name2} stacks two empty soup tins. Can cylinders stack on top of each other?`;
            hint = 'Cylinders have flat circular faces on the top and bottom, so they can stack!';
          } else if (target === 'cube') {
            text = `${name1} slides a wooden toy box across the carpet. Can a cube slide?`;
            hint = 'Cubes have flat square faces, which let them slide easily on flat surfaces!';
          } else {
            text = `Can a cone both roll and slide?`;
            hint = 'A cone has a flat circular face to slide, and a curved surface to roll in a circle!';
          }
          break;
        }
        case 7: {
          const items = [
            { name: 'round clock face', shape: 'Circle' },
            { name: 'triangular warning sign', shape: 'Triangle' },
            { name: 'rectangular notice board', shape: 'Rectangle' },
            { name: 'square window pane', shape: 'Square' },
            { name: 'five-sided school crossing sign', shape: 'Pentagon' },
            { name: 'six-sided metal nut', shape: 'Hexagon' },
            { name: 'rectangular postcard', shape: 'Rectangle' },
            { name: 'triangular traffic flag', shape: 'Triangle' },
            { name: 'round wheel of a bicycle', shape: 'Circle' },
            { name: 'square tiles on the floor', shape: 'Square' }
          ];
          const item = items[w];
          text = `While walking through the ${world.name}, ${name1} spots a ${item.name}. What 2D shape is it?`;
          hint = `This ${item.name} represents a ${item.shape.toLowerCase()} shape.`;
          break;
        }
        case 8: {
          const items = [
            { name: 'can of soda', solid: 'Cylinder' },
            { name: 'orange fruit', solid: 'Sphere' },
            { name: 'cardboard tissue box', solid: 'Cuboid' },
            { name: 'game dice', solid: 'Cube' },
            { name: 'pointy traffic cone', solid: 'Cone' },
            { name: 'glass display pyramid', solid: 'Pyramid' },
            { name: 'cylindrical glue stick', solid: 'Cylinder' },
            { name: 'tennis ball', solid: 'Sphere' },
            { name: 'rectangular brick', solid: 'Cuboid' },
            { name: 'party hat', solid: 'Cone' }
          ];
          const item = items[w];
          text = `At the ${world.name}, ${name2} looks at a ${item.name}. What 3D solid is it?`;
          hint = `The ${item.name} has the shape of a ${item.solid.toLowerCase()}.`;
          break;
        }
        case 9: {
          const pairs = [
            { q: 'Which shape has more sides: a pentagon or a triangle?', hint: 'A pentagon has 5 sides and a triangle has 3 sides.' },
            { q: 'Which shape has fewer corners: a rectangle or a hexagon?', hint: 'A rectangle has 4 corners and a hexagon has 6 corners.' },
            { q: 'Which solid has more flat faces: a cube or a cylinder?', hint: 'A cube has 6 flat faces, while a cylinder only has 2 flat faces.' },
            { q: 'Which solid has a sharp point (vertex) at the top: a cone or a sphere?', hint: 'A cone has a sharp point at the top, but a sphere has no corners at all!' },
            { q: 'Do a square and a rectangle have the same number of corners?', hint: 'Yes! Both a square and a rectangle have 4 sides and 4 corners.' },
            { q: 'Which shape has more sides: a hexagon or a rectangle?', hint: 'A hexagon has 6 sides, and a rectangle has 4 sides.' },
            { q: 'Which solid has flat faces that are all equal squares?', hint: 'A cube has 6 equal square faces, but a cuboid has rectangular faces.' },
            { q: 'Which solid has no flat faces at all?', hint: 'A sphere is completely round and has zero flat faces.' },
            { q: 'Which shape has 5 sides and 5 corners?', hint: 'A pentagon has 5 sides and 5 corners.' },
            { q: 'Which solid has exactly 5 flat faces?', hint: 'A square-based pyramid has 1 square base and 4 triangular sides, making 5 flat faces in total.' }
          ];
          text = pairs[w].q;
          hint = pairs[w].hint;
          break;
        }
        case 10: {
          const categories = [
            { q: 'Which of these is a flat 2D shape?', ans: 'Triangle' },
            { q: 'Which of these is a solid 3D shape?', ans: 'Cone' },
            { q: 'Which shape has curved lines?', ans: 'Circle' },
            { q: 'Which solid has curved surfaces?', ans: 'Cylinder' },
            { q: 'Which shape has only straight sides?', ans: 'Rectangle' },
            { q: 'Which of these is a solid 3D shape?', ans: 'Sphere' },
            { q: 'Which solid has exactly 6 flat square faces?', ans: 'Cube' },
            { q: 'Which of these is a flat 2D shape?', ans: 'Hexagon' },
            { q: 'Which solid has exactly two flat circular faces?', ans: 'Cylinder' },
            { q: 'Which of these shapes has the most straight sides?', ans: 'Hexagon' }
          ];
          text = categories[w].q;
          hint = `Think about whether it is flat (2D) or solid (3D). ${categories[w].ans} is the correct answer!`;
          break;
        }
      }

      list.push(text);
      list.push(hint);
    }
  }

  return list;
}

// Slugify helper
function getSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '_');
}

// Ensure dir exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// Gather all texts
const questionTexts = generateQuestions();
const allTexts = [...new Set([...staticTexts, ...questionTexts])];
console.log(`Found ${allTexts.length} unique text strings to generate.`);

const audioMap = {};

// Process sequentially to respect rate limit
async function run() {
  for (let i = 0; i < allTexts.length; i++) {
    const text = allTexts[i];
    if (!text || !/[a-zA-Z0-9]/.test(text)) continue;

    const slug = getSlug(text);
    const filename = `${slug}.mp3`;
    const filePath = path.join(AUDIO_DIR, filename);

    audioMap[slug] = filename;

    if (fs.existsSync(filePath)) {
      console.log(`[${i+1}/${allTexts.length}] File exists: ${filename}`);
      continue;
    }

    console.log(`[${i+1}/${allTexts.length}] Fetching from ElevenLabs: "${text}"...`);

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
            stability: 0.20,
            similarity_boost: 0.55,
            style: 0.50,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Error response: ${response.status} - ${errText}`);
        // If quota exceeded or other failure, we just continue (Web Speech API will handle runtime fallback)
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);
      console.log(`  Saved: ${filename}`);

      // Rate limit buffer
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (e) {
      console.error(`  Fetch failed for "${text}":`, e.message);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Write mapping to audioMap.js
  const audioMapPath = path.join(__dirname, '..', 'src', 'utils', 'audioMap.js');
  const code = `// Auto-generated. Do not edit manually.
export const audioMap = ${JSON.stringify(audioMap, null, 2)};
`;
  fs.writeFileSync(audioMapPath, code);
  console.log(`\nUpdated audioMap.js with ${Object.keys(audioMap).length} mappings.`);
  console.log('Audio pre-generation process completed successfully!');
}

run();
