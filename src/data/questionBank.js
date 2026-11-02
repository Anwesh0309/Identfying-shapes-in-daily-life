// Question Bank for Grade 2 Geometry: Identifying Shapes in Daily Life
// 10 Unique Worlds × 10 Distinct Question Types = 100 Unique Questions & Hints

export const WORLDS = [
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

export const questionBank = [
  // ── WORLD 1: Hawker Centre ──
  {
    id: 'q1',
    world: 1,
    worldName: 'Hawker Centre',
    type: 1,
    inputType: 'mcq',
    text: 'At the Hawker Centre, Oliver finds a food stall sign with 3 straight sides and 3 corners. What shape is it?',
    options: ['Triangle', 'Circle', 'Square', 'Rectangle'],
    answer: 'Triangle',
    hint: 'Count the 3 straight sides and 3 pointy corners! A triangle has exactly 3 sides.'
  },
  {
    id: 'q2',
    world: 1,
    worldName: 'Hawker Centre',
    type: 2,
    inputType: 'mcq',
    text: 'Oliver spots a drink tin at the Hawker Centre that has 2 flat circular faces and a curved surface. What 3D solid is it?',
    options: ['Cylinder', 'Sphere', 'Cube', 'Cone'],
    answer: 'Cylinder',
    hint: 'Look at the two flat circles on the top and bottom. A cylinder has 2 flat circular faces!'
  },
  {
    id: 'q3',
    world: 1,
    worldName: 'Hawker Centre',
    type: 3,
    inputType: 'mcq',
    text: 'Oliver looks at a rectangular food tray at the Hawker Centre. How many straight sides does a rectangle have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'Count the top, bottom, left, and right sides. A rectangle has 4 straight sides!'
  },
  {
    id: 'q4',
    world: 1,
    worldName: 'Hawker Centre',
    type: 4,
    inputType: 'mcq',
    text: 'Oliver points to a square napkin on the dining table. How many corners does a square have?',
    options: ['4', '3', '0', '5'],
    answer: '4',
    hint: 'Corners are the pointy spots where two straight sides meet. A square has 4 corners!'
  },
  {
    id: 'q5',
    world: 1,
    worldName: 'Hawker Centre',
    type: 5,
    inputType: 'mcq',
    text: 'Oliver holds an ice cube from his iced lemon tea. How many flat faces does a cube have?',
    options: ['6', '4', '8', '12'],
    answer: '6',
    hint: 'Think of a game dice or box. A cube has 6 flat square faces!'
  },
  {
    id: 'q6',
    world: 1,
    worldName: 'Hawker Centre',
    type: 6,
    inputType: 'mcq',
    text: 'At the Hawker Centre, Oliver drops a round lime fruit. Can a sphere roll?',
    options: ['Yes, it can roll', 'No, it only slides', 'No, it cannot move', 'It only stacks'],
    answer: 'Yes, it can roll',
    hint: 'Spheres are completely round with curved surfaces, which helps them roll smoothly!'
  },
  {
    id: 'q7',
    world: 1,
    worldName: 'Hawker Centre',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through the Hawker Centre, Oliver spots a round wall clock face. What 2D shape is it?',
    options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
    answer: 'Circle',
    hint: 'The clock face is perfectly curved all the way around with no straight edges. It is a circle!'
  },
  {
    id: 'q8',
    world: 1,
    worldName: 'Hawker Centre',
    type: 8,
    inputType: 'mcq',
    text: 'At the Hawker Centre, Emma drinks from a can of soya milk. What 3D solid is the can?',
    options: ['Cylinder', 'Sphere', 'Cone', 'Cube'],
    answer: 'Cylinder',
    hint: 'A drink can has a round body with flat round ends. That is a cylinder!'
  },
  {
    id: 'q9',
    world: 1,
    worldName: 'Hawker Centre',
    type: 9,
    inputType: 'mcq',
    text: 'Oliver compares a triangular curry puff to a rectangular plate. Which shape has more sides: a rectangle or a triangle?',
    options: ['Rectangle', 'Triangle', 'Both have the same', 'Neither shape'],
    answer: 'Rectangle',
    hint: 'A rectangle has 4 sides and a triangle has 3 sides. Four is greater than three!'
  },
  {
    id: 'q10',
    world: 1,
    worldName: 'Hawker Centre',
    type: 10,
    inputType: 'mcq',
    text: 'Oliver wants to find a flat 2D shape among the objects on the food table. Which of these is a flat 2D shape?',
    options: ['Triangle', 'Cylinder', 'Sphere', 'Cone'],
    answer: 'Triangle',
    hint: '2D shapes are completely flat like drawings on paper. A triangle is a flat 2D shape!'
  },

  // ── WORLD 2: HDB Playground ──
  {
    id: 'q11',
    world: 2,
    worldName: 'HDB Playground',
    type: 1,
    inputType: 'mcq',
    text: 'At the HDB Playground, Emma spots a hopscotch tile with 4 equal straight sides and 4 square corners. What shape is it?',
    options: ['Square', 'Circle', 'Triangle', 'Pentagon'],
    answer: 'Square',
    hint: 'All 4 straight sides are equal in length. That means it is a square!'
  },
  {
    id: 'q12',
    world: 2,
    worldName: 'HDB Playground',
    type: 2,
    inputType: 'mcq',
    text: 'Emma looks at a playground ball that has no flat faces and no corners at all. What solid is it?',
    options: ['Sphere', 'Cube', 'Cylinder', 'Cone'],
    answer: 'Sphere',
    hint: 'A solid that is completely round with no flat faces is a sphere!'
  },
  {
    id: 'q13',
    world: 2,
    worldName: 'HDB Playground',
    type: 3,
    inputType: 'mcq',
    text: 'Emma sees a yellow warning sign near the playground gate. How many straight sides does a triangle have?',
    options: ['3', '4', '5', '6'],
    answer: '3',
    hint: 'Tri means three! A triangle always has exactly 3 straight sides.'
  },
  {
    id: 'q14',
    world: 2,
    worldName: 'HDB Playground',
    type: 4,
    inputType: 'mcq',
    text: 'Emma looks at a rectangular park bench seat. How many corners does a rectangle have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'Count the 4 vertices where the straight edges meet. A rectangle has 4 corners!'
  },
  {
    id: 'q15',
    world: 2,
    worldName: 'HDB Playground',
    type: 5,
    inputType: 'mcq',
    text: 'Emma inspects a tall climbing pole on the playground frame. How many flat faces does a cylinder have?',
    options: ['2', '0', '1', '6'],
    answer: '2',
    hint: 'A cylinder has 1 flat circular face on top and 1 on the bottom, making 2 flat faces!'
  },
  {
    id: 'q16',
    world: 2,
    worldName: 'HDB Playground',
    type: 6,
    inputType: 'mcq',
    text: 'Jack stacks two cylindrical playground stepping stones. Can cylinders stack on top of each other?',
    options: ['Yes, they can stack', 'No, they cannot stack', 'They only roll', 'No, they fall over'],
    answer: 'Yes, they can stack',
    hint: 'Cylinders have flat top and bottom faces, allowing them to rest firmly on top of each other!'
  },
  {
    id: 'q17',
    world: 2,
    worldName: 'HDB Playground',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through the HDB Playground, Emma spots a triangular road sign on the pathway. What 2D shape is it?',
    options: ['Triangle', 'Circle', 'Rectangle', 'Pentagon'],
    answer: 'Triangle',
    hint: 'This warning sign has 3 straight edges and 3 pointy corners. It is a triangle!'
  },
  {
    id: 'q18',
    world: 2,
    worldName: 'HDB Playground',
    type: 8,
    inputType: 'mcq',
    text: 'At the HDB Playground, Jack kicks an orange football into the goal. What 3D solid is the ball?',
    options: ['Sphere', 'Cube', 'Cone', 'Cylinder'],
    answer: 'Sphere',
    hint: 'A football is round like the Earth with no flat edges. That is a sphere!'
  },
  {
    id: 'q19',
    world: 2,
    worldName: 'HDB Playground',
    type: 9,
    inputType: 'mcq',
    text: 'Emma wonders which solid has more flat faces: a cube or a cylinder?',
    options: ['Cube', 'Cylinder', 'Both have the same', 'Neither solid'],
    answer: 'Cube',
    hint: 'A cube has 6 flat faces, while a cylinder only has 2 flat faces. Six is more than two!'
  },
  {
    id: 'q20',
    world: 2,
    worldName: 'HDB Playground',
    type: 10,
    inputType: 'mcq',
    text: 'Which of these playground objects is a solid 3D shape?',
    options: ['Cone', 'Square', 'Circle', 'Hexagon'],
    answer: 'Cone',
    hint: '3D solids take up space and are not flat. A cone is a 3D solid!'
  },

  // ── WORLD 3: MRT Station ──
  {
    id: 'q21',
    world: 3,
    worldName: 'MRT Station',
    type: 1,
    inputType: 'mcq',
    text: 'At the MRT Station, Jack notices an information board with 4 straight sides where opposite sides are equal. What shape is it?',
    options: ['Rectangle', 'Triangle', 'Circle', 'Hexagon'],
    answer: 'Rectangle',
    hint: 'Two long sides and two short sides make 4 straight sides. That is a rectangle!'
  },
  {
    id: 'q22',
    world: 3,
    worldName: 'MRT Station',
    type: 2,
    inputType: 'mcq',
    text: 'Jack sees a maintenance safety cone near the train platform. It has 1 flat circular face and a sharp point at the top. What solid is it?',
    options: ['Cone', 'Cylinder', 'Pyramid', 'Cube'],
    answer: 'Cone',
    hint: 'A shape with a round circular base that tapers to a single point is a cone!'
  },
  {
    id: 'q23',
    world: 3,
    worldName: 'MRT Station',
    type: 3,
    inputType: 'mcq',
    text: 'Jack checks a five-sided priority seating sign. How many straight sides does a pentagon have?',
    options: ['5', '4', '6', '3'],
    answer: '5',
    hint: 'Penta means five! A pentagon has 5 straight sides.'
  },
  {
    id: 'q24',
    world: 3,
    worldName: 'MRT Station',
    type: 4,
    inputType: 'mcq',
    text: 'Jack looks at a hexagonal safety tile near the ticket barrier. How many corners does a hexagon have?',
    options: ['6', '5', '4', '8'],
    answer: '6',
    hint: 'Hexa means six! A hexagon has 6 corners where its sides join together.'
  },
  {
    id: 'q25',
    world: 3,
    worldName: 'MRT Station',
    type: 5,
    inputType: 'mcq',
    text: 'Jack examines an ice cream cone held by Sophia. How many flat faces does a cone have?',
    options: ['1', '0', '2', '4'],
    answer: '1',
    hint: 'A cone has only 1 flat face at its circular opening or base!'
  },
  {
    id: 'q26',
    world: 3,
    worldName: 'MRT Station',
    type: 6,
    inputType: 'mcq',
    text: 'Sophia pushes a wooden toy box on the MRT concourse floor. Can a cube slide on its flat face?',
    options: ['Yes, it can slide', 'No, it only rolls', 'No, it cannot slide', 'It can bounce only'],
    answer: 'Yes, it can slide',
    hint: 'Flat square faces allow cubes to glide smoothly across a level surface!'
  },
  {
    id: 'q27',
    world: 3,
    worldName: 'MRT Station',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through the MRT Station, Jack spots a rectangular route map on the wall. What 2D shape is it?',
    options: ['Rectangle', 'Circle', 'Triangle', 'Pentagon'],
    answer: 'Rectangle',
    hint: 'The train line map is wide and rectangular with 4 straight edges. It is a rectangle!'
  },
  {
    id: 'q28',
    world: 3,
    worldName: 'MRT Station',
    type: 8,
    inputType: 'mcq',
    text: 'At the MRT Station, Sophia pulls a wipe from a cardboard tissue box. What 3D solid is the tissue box?',
    options: ['Cuboid', 'Sphere', 'Cone', 'Cylinder'],
    answer: 'Cuboid',
    hint: 'A rectangular box with 6 flat rectangular faces is called a cuboid!'
  },
  {
    id: 'q29',
    world: 3,
    worldName: 'MRT Station',
    type: 9,
    inputType: 'mcq',
    text: 'Jack asks: Which solid has a sharp point at the top: a cone or a sphere?',
    options: ['Cone', 'Sphere', 'Both have points', 'Neither solid'],
    answer: 'Cone',
    hint: 'A cone has a pointy vertex at the top, while a sphere is completely round with no corners!'
  },
  {
    id: 'q30',
    world: 3,
    worldName: 'MRT Station',
    type: 10,
    inputType: 'mcq',
    text: 'Which shape has curved lines instead of straight sides?',
    options: ['Circle', 'Triangle', 'Square', 'Pentagon'],
    answer: 'Circle',
    hint: 'A circle is formed by one continuous curved line with no straight sides!'
  },

  // ── WORLD 4: Sentosa Beach ──
  {
    id: 'q31',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 1,
    inputType: 'mcq',
    text: 'At Sentosa Beach, Sophia finds a sea star shelter with 5 straight sides and 5 pointy corners. What shape is it?',
    options: ['Pentagon', 'Triangle', 'Rectangle', 'Circle'],
    answer: 'Pentagon',
    hint: 'Count the 5 straight outer edges. A five-sided flat shape is a pentagon!'
  },
  {
    id: 'q32',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 2,
    inputType: 'mcq',
    text: 'Sophia builds a sand castle block with 6 flat square faces that are all the exact same size. What solid is it?',
    options: ['Cube', 'Cuboid', 'Pyramid', 'Cylinder'],
    answer: 'Cube',
    hint: 'When all 6 flat faces are equal squares, the 3D solid is a cube!'
  },
  {
    id: 'q33',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 3,
    inputType: 'mcq',
    text: 'Sophia counts the straight sides on a square beach towel. How many straight sides does a square have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'A square has 4 straight sides that are all equal in length!'
  },
  {
    id: 'q34',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 4,
    inputType: 'mcq',
    text: 'Sophia checks a triangular beach flag flapping in the breeze. How many corners does a triangle have?',
    options: ['3', '4', '5', '0'],
    answer: '3',
    hint: 'A triangle has 3 corners where the straight lines meet!'
  },
  {
    id: 'q35',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 5,
    inputType: 'mcq',
    text: 'Sophia picks up a beach volleyball from the sand. How many flat faces does a sphere have?',
    options: ['0', '1', '2', '4'],
    answer: '0',
    hint: 'A sphere is completely curved all over and has zero flat faces!'
  },
  {
    id: 'q36',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 6,
    inputType: 'mcq',
    text: 'Leo holds a party hat shaped like a cone on the beach. Can a cone both roll and slide?',
    options: ['Yes, it can do both', 'No, it can only roll', 'No, it can only slide', 'No, it cannot move'],
    answer: 'Yes, it can do both',
    hint: 'A cone slides on its flat circular base, and rolls in a circle on its curved side!'
  },
  {
    id: 'q37',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through Sentosa Beach, Sophia spots a square window pane on the lifeguard tower. What 2D shape is it?',
    options: ['Square', 'Circle', 'Triangle', 'Hexagon'],
    answer: 'Square',
    hint: 'The window has 4 equal straight sides and 4 corners. It is a square!'
  },
  {
    id: 'q38',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 8,
    inputType: 'mcq',
    text: 'At Sentosa Beach, Leo rolls a game dice onto a beach mat. What 3D solid is the dice?',
    options: ['Cube', 'Sphere', 'Cone', 'Cylinder'],
    answer: 'Cube',
    hint: 'A playing dice has 6 identical square faces. That is a cube!'
  },
  {
    id: 'q39',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 9,
    inputType: 'mcq',
    text: 'Sophia asks: Do a square and a rectangle have the same number of corners?',
    options: ['Yes, both have 4 corners', 'No, square has more', 'No, rectangle has more', 'Neither has corners'],
    answer: 'Yes, both have 4 corners',
    hint: 'Yes! Both a square and a rectangle have exactly 4 straight sides and 4 corners.'
  },
  {
    id: 'q40',
    world: 4,
    worldName: 'Sentosa Beach',
    type: 10,
    inputType: 'mcq',
    text: 'Which 3D solid has curved surfaces?',
    options: ['Cylinder', 'Cube', 'Cuboid', 'Pyramid'],
    answer: 'Cylinder',
    hint: 'A cylinder has a smooth curved surface around its middle!'
  },

  // ── WORLD 5: Changi Airport ──
  {
    id: 'q41',
    world: 5,
    worldName: 'Changi Airport',
    type: 1,
    inputType: 'mcq',
    text: 'At Changi Airport, Leo spots a decorative wall pattern with 6 straight sides and 6 corners. What shape is it?',
    options: ['Hexagon', 'Pentagon', 'Square', 'Triangle'],
    answer: 'Hexagon',
    hint: 'Count all 6 straight sides! A shape with 6 straight sides is a hexagon.'
  },
  {
    id: 'q42',
    world: 5,
    worldName: 'Changi Airport',
    type: 2,
    inputType: 'mcq',
    text: 'Leo looks at a luggage trolley cargo box that has 6 flat rectangular faces. What solid is it?',
    options: ['Cuboid', 'Sphere', 'Cylinder', 'Cone'],
    answer: 'Cuboid',
    hint: 'A solid shaped like a shoe box or rectangular suitcase is a cuboid!'
  },
  {
    id: 'q43',
    world: 5,
    worldName: 'Changi Airport',
    type: 3,
    inputType: 'mcq',
    text: 'Leo checks the luggage tag on his backpack. How many straight sides does a rectangle have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'A rectangle tag has 2 long sides and 2 short sides, making 4 straight sides!'
  },
  {
    id: 'q44',
    world: 5,
    worldName: 'Changi Airport',
    type: 4,
    inputType: 'mcq',
    text: 'Leo observes a five-sided airport badge. How many corners does a pentagon have?',
    options: ['5', '4', '6', '3'],
    answer: '5',
    hint: 'A pentagon has 5 corners where its 5 sides connect!'
  },
  {
    id: 'q5',
    id: 'q45',
    world: 5,
    worldName: 'Changi Airport',
    type: 5,
    inputType: 'mcq',
    text: 'Leo inspects a shipping crate at the airport cargo bay. How many flat faces does a cuboid have?',
    options: ['6', '4', '8', '12'],
    answer: '6',
    hint: 'Count the top, bottom, and four sides of the crate. A cuboid has 6 flat faces!'
  },
  {
    id: 'q46',
    world: 5,
    worldName: 'Changi Airport',
    type: 6,
    inputType: 'mcq',
    text: 'Leo rolls a souvenir mini soccer ball across the airport lounge floor. Can a sphere roll in any direction?',
    options: ['Yes, it can roll', 'No, it only slides', 'No, it cannot roll', 'It only stacks'],
    answer: 'Yes, it can roll',
    hint: 'Because a sphere is curved equally in all directions, it rolls effortlessly!'
  },
  {
    id: 'q47',
    world: 5,
    worldName: 'Changi Airport',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through Changi Airport, Leo spots a five-sided school crossing sign outside the terminal. What 2D shape is it?',
    options: ['Pentagon', 'Hexagon', 'Square', 'Triangle'],
    answer: 'Pentagon',
    hint: 'This crossing sign has 5 straight sides like a little house. It is a pentagon!'
  },
  {
    id: 'q48',
    world: 5,
    worldName: 'Changi Airport',
    type: 8,
    inputType: 'mcq',
    text: 'At Changi Airport, Mia points to an orange traffic cone on the tarmac. What 3D solid is it?',
    options: ['Cone', 'Cylinder', 'Sphere', 'Cube'],
    answer: 'Cone',
    hint: 'A traffic cone has a flat circular base and points up sharply. That is a cone!'
  },
  {
    id: 'q49',
    world: 5,
    worldName: 'Changi Airport',
    type: 9,
    inputType: 'mcq',
    text: 'Leo asks Mia: Which shape has more sides: a hexagon or a rectangle?',
    options: ['Hexagon', 'Rectangle', 'Both have the same', 'Neither shape'],
    answer: 'Hexagon',
    hint: 'A hexagon has 6 straight sides, while a rectangle has 4 straight sides. Six is more than four!'
  },
  {
    id: 'q50',
    world: 5,
    worldName: 'Changi Airport',
    type: 10,
    inputType: 'mcq',
    text: 'Which shape has only straight sides and no curved edges?',
    options: ['Rectangle', 'Circle', 'Oval', 'Cylinder'],
    answer: 'Rectangle',
    hint: 'A rectangle is made purely of 4 straight line segments!'
  },

  // ── WORLD 6: Botanic Gardens ──
  {
    id: 'q51',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 1,
    inputType: 'mcq',
    text: 'At the Botanic Gardens, Mia finds a plant marker with 3 straight sides and 3 pointy corners. What shape is it?',
    options: ['Triangle', 'Square', 'Circle', 'Rectangle'],
    answer: 'Triangle',
    hint: 'Count 1, 2, 3 straight sides! A shape with 3 straight sides is a triangle.'
  },
  {
    id: 'q52',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 2,
    inputType: 'mcq',
    text: 'Mia discovers a glass greenhouse display with 1 square base at the bottom and 4 triangular faces meeting at the top. What solid is it?',
    options: ['Pyramid', 'Cube', 'Cone', 'Cylinder'],
    answer: 'Pyramid',
    hint: 'A solid with a square bottom and triangular sides sloping to an apex is a pyramid!'
  },
  {
    id: 'q53',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 3,
    inputType: 'mcq',
    text: 'Mia counts the edges on a hexagonal paving stone along the garden path. How many straight sides does a hexagon have?',
    options: ['6', '5', '4', '8'],
    answer: '6',
    hint: 'Hexagons always have 6 straight sides!'
  },
  {
    id: 'q54',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 4,
    inputType: 'mcq',
    text: 'Mia looks at a square garden flowerbed. How many corners does a square have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'A square has 4 corners where its equal sides meet.'
  },
  {
    id: 'q55',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 5,
    inputType: 'mcq',
    text: 'Mia examines a wooden souvenir pyramid model. How many flat faces does a square-based pyramid have?',
    options: ['5', '4', '6', '8'],
    answer: '5',
    hint: 'Count 1 square bottom face plus 4 triangular side faces. That makes 5 flat faces in total!'
  },
  {
    id: 'q56',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 6,
    inputType: 'mcq',
    text: 'Chloe stacks two cylindrical garden plant pots. Can cylinders be stacked stably on their flat ends?',
    options: ['Yes, they can stack', 'No, they cannot stack', 'They only roll', 'No, they slide off'],
    answer: 'Yes, they can stack',
    hint: 'Cylinders have two flat circular faces that can rest securely on top of each other!'
  },
  {
    id: 'q57',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through the Botanic Gardens, Mia spots a six-sided metal nut on a garden gate. What 2D shape is it?',
    options: ['Hexagon', 'Pentagon', 'Circle', 'Triangle'],
    answer: 'Hexagon',
    hint: 'The metal nut has 6 equal straight edges and 6 corners. It is a hexagon!'
  },
  {
    id: 'q58',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 8,
    inputType: 'mcq',
    text: 'At the Botanic Gardens, Chloe looks at a pyramid-shaped glass terrarium. What 3D solid is it?',
    options: ['Pyramid', 'Cone', 'Cube', 'Cylinder'],
    answer: 'Pyramid',
    hint: 'With its flat triangular faces meeting at the top, it is a pyramid!'
  },
  {
    id: 'q59',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 9,
    inputType: 'mcq',
    text: 'Mia asks Chloe: Which solid has flat faces that are all equal squares?',
    options: ['Cube', 'Cuboid', 'Cylinder', 'Pyramid'],
    answer: 'Cube',
    hint: 'A cube is unique because all 6 of its flat faces are identical squares!'
  },
  {
    id: 'q60',
    world: 6,
    worldName: 'Botanic Gardens',
    type: 10,
    inputType: 'mcq',
    text: 'Which of these shapes is a solid 3D shape?',
    options: ['Sphere', 'Circle', 'Triangle', 'Pentagon'],
    answer: 'Sphere',
    hint: 'A sphere is a round 3D solid that you can hold in your hand, unlike flat 2D shapes!'
  },

  // ── WORLD 7: Marina Bay Sands ──
  {
    id: 'q61',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 1,
    inputType: 'mcq',
    text: 'At Marina Bay Sands, Chloe notices an architectural glass panel with 4 straight sides and 4 square corners. What shape is it?',
    options: ['Rectangle', 'Triangle', 'Circle', 'Pentagon'],
    answer: 'Rectangle',
    hint: 'Four straight sides with opposite sides equal make a rectangle!'
  },
  {
    id: 'q62',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 2,
    inputType: 'mcq',
    text: 'Chloe looks at the tall hotel tower that rises high with 6 flat rectangular faces. What solid is it?',
    options: ['Cuboid', 'Sphere', 'Cone', 'Cylinder'],
    answer: 'Cuboid',
    hint: 'A 3D solid with rectangular faces on all sides is a cuboid!'
  },
  {
    id: 'q63',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 3,
    inputType: 'mcq',
    text: 'Chloe checks a triangular sail on a boat in Marina Bay. How many straight sides does a triangle have?',
    options: ['3', '4', '5', '6'],
    answer: '3',
    hint: 'A triangle is a 3-sided polygon!'
  },
  {
    id: 'q64',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 4,
    inputType: 'mcq',
    text: 'Chloe looks at an information kiosk screen that is a rectangle. How many corners does a rectangle have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'A rectangle has 4 corners where the vertical and horizontal sides join!'
  },
  {
    id: 'q65',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 5,
    inputType: 'mcq',
    text: 'Chloe holds a souvenir snow globe. How many flat faces does a sphere have?',
    options: ['0', '1', '2', '6'],
    answer: '0',
    hint: 'A sphere has a curved surface and zero flat faces!'
  },
  {
    id: 'q66',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 6,
    inputType: 'mcq',
    text: 'Henry slides a rectangular key card across the hotel counter. Can a cuboid slide on its flat faces?',
    options: ['Yes, it can slide', 'No, it only rolls', 'No, it cannot slide', 'It only bounces'],
    answer: 'Yes, it can slide',
    hint: 'Cuboids have flat smooth faces, allowing them to slide easily across a surface!'
  },
  {
    id: 'q67',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through Marina Bay Sands, Chloe spots a rectangular postcard at the gift shop. What 2D shape is it?',
    options: ['Rectangle', 'Square', 'Circle', 'Triangle'],
    answer: 'Rectangle',
    hint: 'The postcard has 2 long straight sides and 2 short straight sides. It is a rectangle!'
  },
  {
    id: 'q68',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 8,
    inputType: 'mcq',
    text: 'At Marina Bay Sands, Henry inspects a cylindrical glue stick in his souvenir craft kit. What 3D solid is it?',
    options: ['Cylinder', 'Cone', 'Cube', 'Sphere'],
    answer: 'Cylinder',
    hint: 'A glue stick has two circular ends and a round tube body. That is a cylinder!'
  },
  {
    id: 'q69',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 9,
    inputType: 'mcq',
    text: 'Chloe asks: Which solid has no flat faces at all?',
    options: ['Sphere', 'Cylinder', 'Cone', 'Cube'],
    answer: 'Sphere',
    hint: 'A sphere is completely round in every direction with zero flat faces!'
  },
  {
    id: 'q70',
    world: 7,
    worldName: 'Marina Bay Sands',
    type: 10,
    inputType: 'mcq',
    text: 'Which solid has exactly 6 flat square faces?',
    options: ['Cube', 'Cuboid', 'Pyramid', 'Cylinder'],
    answer: 'Cube',
    hint: 'Only a cube has exactly 6 flat faces that are all equal squares!'
  },

  // ── WORLD 8: National Museum ──
  {
    id: 'q71',
    world: 8,
    worldName: 'National Museum',
    type: 1,
    inputType: 'mcq',
    text: 'At the National Museum, Henry admires a square heritage tile with 4 equal sides and 4 corners. What shape is it?',
    options: ['Square', 'Circle', 'Triangle', 'Hexagon'],
    answer: 'Square',
    hint: 'When all 4 sides are straight and exactly the same length, it is a square!'
  },
  {
    id: 'q72',
    world: 8,
    worldName: 'National Museum',
    type: 2,
    inputType: 'mcq',
    text: 'Henry looks at an ancient round stone cannonball in an exhibit that has zero corners and zero edges. What solid is it?',
    options: ['Sphere', 'Cube', 'Cylinder', 'Cone'],
    answer: 'Sphere',
    hint: 'A solid that is completely round with no corners is a sphere!'
  },
  {
    id: 'q73',
    world: 8,
    worldName: 'National Museum',
    type: 3,
    inputType: 'mcq',
    text: 'Henry counts the straight sides on a historical pentagon badge. How many straight sides does a pentagon have?',
    options: ['5', '4', '6', '3'],
    answer: '5',
    hint: 'A pentagon always has 5 straight sides!'
  },
  {
    id: 'q74',
    world: 8,
    worldName: 'National Museum',
    type: 4,
    inputType: 'mcq',
    text: 'Henry checks a triangular pennant flag in the gallery. How many corners does a triangle have?',
    options: ['3', '4', '5', '0'],
    answer: '3',
    hint: 'A triangle has 3 pointy corners!'
  },
  {
    id: 'q75',
    world: 8,
    worldName: 'National Museum',
    type: 5,
    inputType: 'mcq',
    text: 'Henry examines an antique tea tin shaped like a cylinder. How many flat circular faces does a cylinder have?',
    options: ['2', '1', '0', '4'],
    answer: '2',
    hint: 'Look at the top lid and bottom base: a cylinder has 2 flat circular faces!'
  },
  {
    id: 'q76',
    world: 8,
    worldName: 'National Museum',
    type: 6,
    inputType: 'mcq',
    text: 'Lucas tests a display dice on a smooth ramp. Can a cube roll smoothly like a ball?',
    options: ['No, it slides instead', 'Yes, it rolls smoothly', 'Yes, it rolls like a ball', 'It bounces only'],
    answer: 'No, it slides instead',
    hint: 'Because a cube has flat faces and sharp edges, it slides rather than rolling smoothly!'
  },
  {
    id: 'q77',
    world: 8,
    worldName: 'National Museum',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through the National Museum, Henry spots a triangular traffic flag from the old days. What 2D shape is it?',
    options: ['Triangle', 'Rectangle', 'Circle', 'Square'],
    answer: 'Triangle',
    hint: 'The flag has 3 straight edges and 3 corners. It is a triangle!'
  },
  {
    id: 'q78',
    world: 8,
    worldName: 'National Museum',
    type: 8,
    inputType: 'mcq',
    text: 'At the National Museum, Lucas examines an antique round tennis ball in a sports exhibit. What 3D solid is it?',
    options: ['Sphere', 'Cube', 'Cylinder', 'Cone'],
    answer: 'Sphere',
    hint: 'A tennis ball is spherical in shape with no flat surfaces. It is a sphere!'
  },
  {
    id: 'q79',
    world: 8,
    worldName: 'National Museum',
    type: 9,
    inputType: 'mcq',
    text: 'Henry asks Lucas: Which shape has 5 sides and 5 corners?',
    options: ['Pentagon', 'Hexagon', 'Square', 'Triangle'],
    answer: 'Pentagon',
    hint: 'A pentagon has 5 straight sides and 5 corners!'
  },
  {
    id: 'q80',
    world: 8,
    worldName: 'National Museum',
    type: 10,
    inputType: 'mcq',
    text: 'Which of these flat 2D shapes has the most straight sides: a hexagon, a pentagon, a square, or a triangle?',
    options: ['Hexagon', 'Pentagon', 'Square', 'Triangle'],
    answer: 'Hexagon',
    hint: "A hexagon has 6 sides, which is more than a pentagon's 5, a square's 4, or a triangle's 3!"
  },

  // ── WORLD 9: Classroom Desk ──
  {
    id: 'q81',
    world: 9,
    worldName: 'Classroom Desk',
    type: 1,
    inputType: 'mcq',
    text: 'At the Classroom Desk, Lucas finds an origami paper with 5 straight sides and 5 corners. What shape is it?',
    options: ['Pentagon', 'Triangle', 'Rectangle', 'Circle'],
    answer: 'Pentagon',
    hint: 'Count the 5 straight edges of the paper. It is a pentagon!'
  },
  {
    id: 'q82',
    world: 9,
    worldName: 'Classroom Desk',
    type: 2,
    inputType: 'mcq',
    text: 'Lucas sharpens a brand new pencil to a pointy tip, leaving a flat circular end. What 3D solid does the sharpened tip resemble?',
    options: ['Cone', 'Cylinder', 'Sphere', 'Cube'],
    answer: 'Cone',
    hint: 'A shape that tapers from a circular base to a pointy tip is a cone!'
  },
  {
    id: 'q83',
    world: 9,
    worldName: 'Classroom Desk',
    type: 3,
    inputType: 'mcq',
    text: 'Lucas measures his classroom math notebook cover. How many straight sides does a rectangle have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'The book cover has 4 straight sides with opposite sides equal!'
  },
  {
    id: 'q84',
    world: 9,
    worldName: 'Classroom Desk',
    type: 4,
    inputType: 'mcq',
    text: 'Lucas counts the corners on a square sticky note. How many corners does a square have?',
    options: ['4', '3', '5', '6'],
    answer: '4',
    hint: 'A square sticky note has 4 sharp corners!'
  },
  {
    id: 'q85',
    world: 9,
    worldName: 'Classroom Desk',
    type: 5,
    inputType: 'mcq',
    text: 'Lucas checks a square-based pyramid pencil sharpener. How many flat faces does this pyramid have?',
    options: ['5', '4', '6', '8'],
    answer: '5',
    hint: 'It has 1 square base plus 4 triangular sides, making 5 flat faces!'
  },
  {
    id: 'q86',
    world: 9,
    worldName: 'Classroom Desk',
    type: 6,
    inputType: 'mcq',
    text: 'Ella accidentally drops a marble on the desk. Can a sphere roll easily across the desk?',
    options: ['Yes, it rolls easily', 'No, it only slides', 'No, it cannot move', 'It only stacks'],
    answer: 'Yes, it rolls easily',
    hint: 'Spheres have smooth round surfaces that make them roll freely!'
  },
  {
    id: 'q87',
    world: 9,
    worldName: 'Classroom Desk',
    type: 7,
    inputType: 'mcq',
    text: 'While sitting at the Classroom Desk, Lucas looks at a bicycle wheel sticker. What 2D shape is the wheel?',
    options: ['Circle', 'Triangle', 'Square', 'Rectangle'],
    answer: 'Circle',
    hint: 'The bicycle wheel is round like a ring. That is a circle!'
  },
  {
    id: 'q88',
    world: 9,
    worldName: 'Classroom Desk',
    type: 8,
    inputType: 'mcq',
    text: 'At the Classroom Desk, Ella places a rectangular pencil case on the desk. What 3D solid is the box?',
    options: ['Cuboid', 'Sphere', 'Cone', 'Cylinder'],
    answer: 'Cuboid',
    hint: 'A box with 6 rectangular flat faces is a cuboid!'
  },
  {
    id: 'q89',
    world: 9,
    worldName: 'Classroom Desk',
    type: 9,
    inputType: 'mcq',
    text: 'Lucas asks Ella: Which solid has exactly 5 flat faces?',
    options: ['Pyramid', 'Cube', 'Cylinder', 'Sphere'],
    answer: 'Pyramid',
    hint: 'A square-based pyramid has 1 square face and 4 triangular faces, giving 5 flat faces in total!'
  },
  {
    id: 'q90',
    world: 9,
    worldName: 'Classroom Desk',
    type: 10,
    inputType: 'mcq',
    text: 'Which solid has exactly two flat circular faces?',
    options: ['Cylinder', 'Cone', 'Sphere', 'Cube'],
    answer: 'Cylinder',
    hint: 'A cylinder has 2 flat circular faces, one on each end!'
  },

  // ── WORLD 10: Kitchen Pantry ──
  {
    id: 'q91',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 1,
    inputType: 'mcq',
    text: 'In the Kitchen Pantry, Ella finds a hexagonal honey jar label with 6 straight sides and 6 corners. What shape is it?',
    options: ['Hexagon', 'Pentagon', 'Square', 'Triangle'],
    answer: 'Hexagon',
    hint: 'Count the 6 straight sides on the honey jar label. It is a hexagon!'
  },
  {
    id: 'q92',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 2,
    inputType: 'mcq',
    text: 'Ella picks up a soup can with 2 flat circular ends and a curved middle. What solid is it?',
    options: ['Cylinder', 'Cube', 'Sphere', 'Cone'],
    answer: 'Cylinder',
    hint: 'Two flat circular ends connected by a curved side make a cylinder!'
  },
  {
    id: 'q93',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 3,
    inputType: 'mcq',
    text: 'Ella counts the sides on a triangular tea bag packet. How many straight sides does a triangle have?',
    options: ['3', '4', '5', '6'],
    answer: '3',
    hint: 'A triangle packet has exactly 3 straight sides!'
  },
  {
    id: 'q94',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 4,
    inputType: 'mcq',
    text: 'Ella checks a square sandwich bread slice. How many corners does a square have?',
    options: ['4', '3', '5', '0'],
    answer: '4',
    hint: 'A square bread slice has 4 corners!'
  },
  {
    id: 'q95',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 5,
    inputType: 'mcq',
    text: 'Ella checks a cereal box in the pantry. How many flat faces does a cuboid cereal box have?',
    options: ['6', '4', '8', '12'],
    answer: '6',
    hint: 'Top, bottom, front, back, and two sides make 6 flat faces for a cuboid!'
  },
  {
    id: 'q96',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 6,
    inputType: 'mcq',
    text: 'Oliver stacks two round tuna cans on the pantry shelf. Can cylinders stack securely?',
    options: ['Yes, they can stack', 'No, they cannot stack', 'They only roll', 'No, they fall over'],
    answer: 'Yes, they can stack',
    hint: 'The flat circular faces allow cylinders to stack neatly on top of one another!'
  },
  {
    id: 'q97',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 7,
    inputType: 'mcq',
    text: 'While walking through the Kitchen Pantry, Ella spots square floor tiles under her feet. What 2D shape are the tiles?',
    options: ['Square', 'Circle', 'Triangle', 'Hexagon'],
    answer: 'Square',
    hint: 'The floor tiles have 4 equal straight sides and 4 corners. They are squares!'
  },
  {
    id: 'q98',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 8,
    inputType: 'mcq',
    text: 'In the Kitchen Pantry, Oliver puts away a pointy party hat from a birthday party. What 3D solid is it?',
    options: ['Cone', 'Cylinder', 'Cube', 'Sphere'],
    answer: 'Cone',
    hint: 'A party hat has a circular opening and tapers to a single point. It is a cone!'
  },
  {
    id: 'q99',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 9,
    inputType: 'mcq',
    text: 'Ella asks Oliver: Which shape has fewer corners: a rectangle or a hexagon?',
    options: ['Rectangle', 'Hexagon', 'Both have the same', 'Neither has corners'],
    answer: 'Rectangle',
    hint: 'A rectangle has 4 corners and a hexagon has 6 corners. Four is fewer than six!'
  },
  {
    id: 'q100',
    world: 10,
    worldName: 'Kitchen Pantry',
    type: 10,
    inputType: 'mcq',
    text: 'Which of these flat 2D shapes has 6 straight sides and 6 corners?',
    options: ['Hexagon', 'Pentagon', 'Rectangle', 'Triangle'],
    answer: 'Hexagon',
    hint: 'A hexagon is a flat 2D shape with exactly 6 straight sides and 6 corners!'
  }
];

export function generateQuestionBank() {
  return questionBank;
}
