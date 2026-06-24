// Question Bank Generator for P2 Geometry
// 10 Worlds, 10 Question Types = 100 Questions

import { shapes } from './shapeData.js';

const WORLDS = [
  { id: 1, name: 'Apple Orchard' },
  { id: 2, name: 'Sticker Studio' },
  { id: 3, name: 'Toy Town' },
  { id: 4, name: 'Puppy Park' },
  { id: 5, name: 'Pencil Palace' },
  { id: 6, name: 'Group Galaxy' },
  { id: 7, name: 'Basket Bay' },
  { id: 8, name: 'Number Nest' },
  { id: 9, name: 'Rainbow Groups' },
  { id: 10, name: 'Division Castle' }
];

const NAMES = ['Oliver', 'Emma', 'Jack', 'Sophia', 'Leo', 'Mia', 'Chloe', 'Henry', 'Lucas', 'Ella'];

// Question templates mapping to the 10 types
// Type 1: Name 2D Shape
// Type 2: Name 3D Solid
// Type 3: Count sides (2D)
// Type 4: Count corners (2D)
// Type 5: Count flat faces (3D)
// Type 6: Roll, stack, or slide (3D)
// Type 7: Real-world 2D shape identification
// Type 8: Real-world 3D solid identification
// Type 9: Compare shape properties
// Type 10: Categorize/Match objects

export function generateQuestionBank() {
  const bank = [];

  for (let w = 0; w < 10; w++) {
    const world = WORLDS[w];
    const name1 = NAMES[w];
    const name2 = NAMES[(w + 1) % 10];

    for (let t = 1; t <= 10; t++) {
      const qId = w * 10 + t; // 1 to 100
      let question = {
        id: `q${qId}`,
        world: world.id,
        worldName: world.name,
        type: t,
        inputType: 'mcq', // default is MCQ
        text: '',
        options: [],
        answer: '',
        hint: ''
      };

      switch (t) {
        case 1: {
          // Identify 2D shape by description
          const targetShapes = ['triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
          const target = shapes[targetShapes[w % targetShapes.length]];
          question.text = `${name1} finds a shape with ${target.sides} straight sides and ${target.corners} corners. What shape is it?`;
          question.options = ['Circle', 'Triangle', 'Rectangle', 'Square', 'Pentagon', 'Hexagon'];
          question.answer = target.name;
          question.hint = `Count the sides! A ${target.name.toLowerCase()} has exactly ${target.sides} sides.`;
          break;
        }
        case 2: {
          // Identify 3D solid by description
          const targetSolids = ['sphere', 'cylinder', 'cone', 'cube', 'cuboid', 'pyramid'];
          const target = shapes[targetSolids[w % targetSolids.length]];
          const desc = target.id === 'sphere' ? 'no flat faces and is completely round' :
                       target.id === 'cylinder' ? '2 flat circular faces and a curved middle' :
                       target.id === 'cone' ? '1 flat circular face and a sharp point at the top' :
                       target.id === 'cube' ? '6 flat faces that are all equal squares' :
                       target.id === 'cuboid' ? '6 flat rectangular faces' :
                       '1 square face at the bottom and 4 triangular faces';
          question.text = `${name1} holds a solid block that has ${desc}. What solid is it?`;
          question.options = ['Sphere', 'Cylinder', 'Cone', 'Cube', 'Cuboid', 'Pyramid'];
          question.answer = target.name;
          question.hint = `Think about its flat faces and curved surfaces! This matches a ${target.name.toLowerCase()}.`;
          break;
        }
        case 3: {
          // Count sides (2D) — MCQ with 4 options
          const targetShapes = ['triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
          const target = shapes[targetShapes[(w + 1) % targetShapes.length]];
          const correctSides = target.sides;
          // Generate 3 wrong distractors that are plausible (nearby numbers, always different)
          const sidePool = [0, 3, 4, 5, 6].filter(n => n !== correctSides);
          const wrongOpts = sidePool.slice(0, 3).map(String);
          const allOpts = [String(correctSides), ...wrongOpts].sort(() => Math.random() - 0.5);
          question.inputType = 'mcq';
          question.text = `How many straight sides does a ${target.name.toLowerCase()} have?`;
          question.options = allOpts;
          question.answer = String(correctSides);
          question.hint = `Count them: a ${target.name.toLowerCase()} has ${correctSides} straight sides!`;
          break;
        }
        case 4: {
          // Count corners (2D) — MCQ with 4 options
          const targetShapes = ['triangle', 'rectangle', 'square', 'pentagon', 'hexagon'];
          const target = shapes[targetShapes[(w + 2) % targetShapes.length]];
          const correctCorners = target.corners;
          const cornerPool = [0, 3, 4, 5, 6].filter(n => n !== correctCorners);
          const wrongOpts = cornerPool.slice(0, 3).map(String);
          const allOpts = [String(correctCorners), ...wrongOpts].sort(() => Math.random() - 0.5);
          question.inputType = 'mcq';
          question.text = `How many corners does a ${target.name.toLowerCase()} have?`;
          question.options = allOpts;
          question.answer = String(correctCorners);
          question.hint = `Corners are where the straight sides meet. A ${target.name.toLowerCase()} has ${correctCorners} corners!`;
          break;
        }
        case 5: {
          // Count flat faces (3D) — MCQ with 4 options
          const targetSolids = ['sphere', 'cylinder', 'cone', 'cube', 'cuboid', 'pyramid'];
          const target = shapes[targetSolids[(w + 1) % targetSolids.length]];
          const flatCount = target.id === 'sphere' ? 0 :
                            target.id === 'cylinder' ? 2 :
                            target.id === 'cone' ? 1 :
                            target.id === 'cube' ? 6 :
                            target.id === 'cuboid' ? 6 : 5;
          const facePool = [0, 1, 2, 5, 6].filter(n => n !== flatCount);
          const wrongOpts = facePool.slice(0, 3).map(String);
          const allOpts = [String(flatCount), ...wrongOpts].sort(() => Math.random() - 0.5);
          question.inputType = 'mcq';
          question.text = `How many flat faces does a ${target.name.toLowerCase()} have?`;
          question.options = allOpts;
          question.answer = String(flatCount);
          question.hint = `Flat faces are the flat surfaces you can touch. A ${target.name.toLowerCase()} has ${flatCount} flat faces!`;
          break;
        }
        case 6: {
          // Roll, stack, or slide (3D)
          const targetSolids = ['sphere', 'cylinder', 'cube', 'cone'];
          const target = targetSolids[w % targetSolids.length];
          if (target === 'sphere') {
            question.text = `${name1} rolls a football at the ${world.name}. Can a sphere roll?`;
            question.options = ['Yes, it can roll', 'No, it only slides'];
            question.answer = 'Yes, it can roll';
            question.hint = 'Spheres are completely round, which makes them perfect for rolling!';
          } else if (target === 'cylinder') {
            question.text = `${name2} stacks two empty soup tins. Can cylinders stack on top of each other?`;
            question.options = ['Yes, they can stack', 'No, they cannot stack'];
            question.answer = 'Yes, they can stack';
            question.hint = 'Cylinders have flat circular faces on the top and bottom, so they can stack!';
          } else if (target === 'cube') {
            question.text = `${name1} slides a wooden toy box across the carpet. Can a cube slide?`;
            question.options = ['Yes, it can slide', 'No, it only rolls'];
            question.answer = 'Yes, it can slide';
            question.hint = 'Cubes have flat square faces, which let them slide easily on flat surfaces!';
          } else {
            question.text = `Can a cone both roll and slide?`;
            question.options = ['Yes, it can do both', 'No, it can only roll', 'No, it can only slide'];
            question.answer = 'Yes, it can do both';
            question.hint = 'A cone has a flat circular face to slide, and a curved surface to roll in a circle!';
          }
          break;
        }
        case 7: {
          // Real-world 2D shape identification
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
          question.text = `While walking through the ${world.name}, ${name1} spots a ${item.name}. What 2D shape is it?`;
          question.options = ['Circle', 'Triangle', 'Rectangle', 'Square', 'Pentagon', 'Hexagon'];
          question.answer = item.shape;
          question.hint = `This ${item.name} represents a ${item.shape.toLowerCase()} shape.`;
          break;
        }
        case 8: {
          // Real-world 3D solid identification
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
          question.text = `At the ${world.name}, ${name2} looks at a ${item.name}. What 3D solid is it?`;
          question.options = ['Sphere', 'Cylinder', 'Cone', 'Cube', 'Cuboid', 'Pyramid'];
          question.answer = item.solid;
          question.hint = `The ${item.name} has the shape of a ${item.solid.toLowerCase()}.`;
          break;
        }
        case 9: {
          // Comparing shapes/solids properties
          const pairs = [
            { q: 'Which shape has more sides: a pentagon or a triangle?', opt: ['Pentagon', 'Triangle'], ans: 'Pentagon', hint: 'A pentagon has 5 sides and a triangle has 3 sides.' },
            { q: 'Which shape has fewer corners: a rectangle or a hexagon?', opt: ['Rectangle', 'Hexagon'], ans: 'Rectangle', hint: 'A rectangle has 4 corners and a hexagon has 6 corners.' },
            { q: 'Which solid has more flat faces: a cube or a cylinder?', opt: ['Cube', 'Cylinder'], ans: 'Cube', hint: 'A cube has 6 flat faces, while a cylinder only has 2 flat faces.' },
            { q: 'Which solid has a sharp point (vertex) at the top: a cone or a sphere?', opt: ['Cone', 'Sphere'], ans: 'Cone', hint: 'A cone has a sharp point at the top, but a sphere has no corners at all!' },
            { q: 'Do a square and a rectangle have the same number of corners?', opt: ['Yes, both have 4 corners', 'No, they are different'], ans: 'Yes, both have 4 corners', hint: 'Yes! Both a square and a rectangle have 4 sides and 4 corners.' },
            { q: 'Which shape has more sides: a hexagon or a rectangle?', opt: ['Hexagon', 'Rectangle'], ans: 'Hexagon', hint: 'A hexagon has 6 sides, and a rectangle has 4 sides.' },
            { q: 'Which solid has flat faces that are all equal squares?', opt: ['Cube', 'Cuboid'], ans: 'Cube', hint: 'A cube has 6 equal square faces, but a cuboid has rectangular faces.' },
            { q: 'Which solid has no flat faces at all?', opt: ['Sphere', 'Cylinder', 'Cone'], ans: 'Sphere', hint: 'A sphere is completely round and has zero flat faces.' },
            { q: 'Which shape has 5 sides and 5 corners?', opt: ['Pentagon', 'Hexagon', 'Square'], ans: 'Pentagon', hint: 'A pentagon has 5 sides and 5 corners.' },
            { q: 'Which solid has exactly 5 flat faces?', opt: ['Pyramid', 'Cube', 'Cylinder'], ans: 'Pyramid', hint: 'A square-based pyramid has 1 square base and 4 triangular sides, making 5 flat faces in total.' }
          ];
          const pair = pairs[w];
          question.text = pair.q;
          question.options = pair.opt;
          question.answer = pair.ans;
          question.hint = pair.hint;
          break;
        }
        case 10: {
          // Classifying 2D and 3D categories
          const categories = [
            { q: 'Which of these is a flat 2D shape?', opt: ['Triangle', 'Cube', 'Cylinder', 'Sphere'], ans: 'Triangle' },
            { q: 'Which of these is a solid 3D shape?', opt: ['Cone', 'Square', 'Circle', 'Hexagon'], ans: 'Cone' },
            { q: 'Which shape has curved lines?', opt: ['Circle', 'Triangle', 'Square', 'Pentagon'], ans: 'Circle' },
            { q: 'Which solid has curved surfaces?', opt: ['Cylinder', 'Cube', 'Cuboid', 'Pyramid'], ans: 'Cylinder' },
            { q: 'Which shape has only straight sides?', opt: ['Rectangle', 'Circle', 'Oval'], ans: 'Rectangle' },
            { q: 'Which of these is a solid 3D shape?', opt: ['Sphere', 'Circle', 'Triangle', 'Pentagon'], ans: 'Sphere' },
            { q: 'Which solid has exactly 6 flat square faces?', opt: ['Cube', 'Cuboid', 'Pyramid', 'Cylinder'], ans: 'Cube' },
            { q: 'Which of these is a flat 2D shape?', opt: ['Hexagon', 'Cone', 'Sphere', 'Cylinder'], ans: 'Hexagon' },
            { q: 'Which solid has exactly two flat circular faces?', opt: ['Cylinder', 'Cone', 'Sphere', 'Cube'], ans: 'Cylinder' },
            { q: 'Which of these shapes has the most straight sides?', opt: ['Hexagon', 'Pentagon', 'Square', 'Triangle'], ans: 'Hexagon' }
          ];
          const cat = categories[w];
          question.text = cat.q;
          question.options = cat.opt;
          question.answer = cat.ans;
          question.hint = `Think about whether it is flat (2D) or solid (3D). ${cat.ans} is the correct answer!`;
          break;
        }
      }

      // Ensure every MCQ has exactly 4 options, answer is included, no duplicates
      if (question.inputType === 'mcq') {
        if (!question.options.includes(question.answer)) {
          question.options.push(question.answer);
        }
        // Deduplicate
        question.options = [...new Set(question.options)];
        // Trim or pad to exactly 4 options
        if (question.options.length > 4) {
          // Keep the answer + 3 others
          const withoutAnswer = question.options.filter(o => o !== question.answer);
          question.options = [question.answer, ...withoutAnswer.slice(0, 3)];
        }
        // If somehow fewer than 4, pad with generic distractors (shouldn't happen)
        const genericPad = ['Circle', 'Square', 'Triangle', 'Cube', 'Sphere', '3', '4', '6'];
        while (question.options.length < 4) {
          const pad = genericPad.find(p => !question.options.includes(p));
          if (pad) question.options.push(pad);
          else break;
        }
      }

      bank.push(question);
    }
  }

  return bank;
}

export const questionBank = generateQuestionBank();
