export const SHAPE_TYPES = {
  TWO_D: '2d',
  THREE_D: '3d',
};

export const shapes = {
  // ── 2D Shapes ──
  circle: {
    id: 'circle',
    name: 'Circle',
    type: SHAPE_TYPES.TWO_D,
    sides: 0,
    corners: 0,
    faces: 1, // for flat face counting
    curved: true,
    description: 'Completely round. It has no straight sides and no corners!',
    examples: ['Clock face', 'Plate', 'Coin', 'Wheel'],
    color: '#fb7185', // rose-400
    glow: 'rgba(251, 113, 133, 0.45)',
  },
  triangle: {
    id: 'triangle',
    name: 'Triangle',
    type: SHAPE_TYPES.TWO_D,
    sides: 3,
    corners: 3,
    faces: 1,
    curved: false,
    description: 'Has 3 straight sides and 3 pointy corners!',
    examples: ['Pizza slice', 'Road sign', 'Sandwich', 'Hanger'],
    color: '#fb923c', // orange-400
    glow: 'rgba(251, 146, 60, 0.45)',
  },
  rectangle: {
    id: 'rectangle',
    name: 'Rectangle',
    type: SHAPE_TYPES.TWO_D,
    sides: 4,
    corners: 4,
    faces: 1,
    curved: false,
    description: 'Has 4 straight sides (opposite sides are equal) and 4 corners!',
    examples: ['Door', 'Whiteboard', 'Envelope', 'Book'],
    color: '#38bdf8', // sky-400
    glow: 'rgba(56, 189, 248, 0.45)',
  },
  square: {
    id: 'square',
    name: 'Square',
    type: SHAPE_TYPES.TWO_D,
    sides: 4,
    corners: 4,
    faces: 1,
    curved: false,
    description: 'A special rectangle with 4 straight sides that are all equal in length!',
    examples: ['Chessboard', 'Window', 'Toast slice', 'Post-it note'],
    color: '#4ade80', // green-400
    glow: 'rgba(74, 222, 128, 0.45)',
  },
  pentagon: {
    id: 'pentagon',
    name: 'Pentagon',
    type: SHAPE_TYPES.TWO_D,
    sides: 5,
    corners: 5,
    faces: 1,
    curved: false,
    description: 'Has 5 straight sides and 5 corners. It looks like a house!',
    examples: ['School crossing sign', 'Okra slice', 'Black shapes on a soccer ball'],
    color: '#a78bfa', // violet-400
    glow: 'rgba(167, 139, 250, 0.45)',
  },
  hexagon: {
    id: 'hexagon',
    name: 'Hexagon',
    type: SHAPE_TYPES.TWO_D,
    sides: 6,
    corners: 6,
    faces: 1,
    curved: false,
    description: 'Has 6 straight sides and 6 corners. Honeybees love this shape!',
    examples: ['Honeycomb cell', 'Nut (for a bolt)', 'Pencil cross-section', 'Drain cover'],
    color: '#facc15', // yellow-400
    glow: 'rgba(250, 204, 21, 0.45)',
  },

  // ── 3D Solids ──
  sphere: {
    id: 'sphere',
    name: 'Sphere',
    type: SHAPE_TYPES.THREE_D,
    edges: 0,
    vertices: 0,
    faces: 0, // Flat faces
    curvedSurfaces: 1,
    description: 'Perfectly round 3D solid. It rolls easily in all directions!',
    examples: ['Football', 'Orange', 'Marble', 'Globe'],
    color: '#f472b6', // pink-400
    glow: 'rgba(244, 114, 182, 0.45)',
  },
  cylinder: {
    id: 'cylinder',
    name: 'Cylinder',
    type: SHAPE_TYPES.THREE_D,
    edges: 2, // curved edges
    vertices: 0,
    faces: 2, // 2 flat circular faces
    curvedSurfaces: 1,
    description: 'Has 2 flat circular faces and 1 curved surface in the middle. It rolls and stacks!',
    examples: ['Soda can', 'Glue stick', 'Milo tin', 'AA battery'],
    color: '#fbbf24', // amber-400
    glow: 'rgba(251, 191, 36, 0.45)',
  },
  cone: {
    id: 'cone',
    name: 'Cone',
    type: SHAPE_TYPES.THREE_D,
    edges: 1, // 1 curved edge
    vertices: 1, // 1 apex
    faces: 1, // 1 flat circular face
    curvedSurfaces: 1,
    description: 'Has 1 flat circular face, 1 curved surface, and 1 sharp point at the top!',
    examples: ['Ice cream cone', 'Party hat', 'Traffic cone', 'Funnel'],
    color: '#f97316', // orange-500
    glow: 'rgba(249, 115, 22, 0.45)',
  },
  cube: {
    id: 'cube',
    name: 'Cube',
    type: SHAPE_TYPES.THREE_D,
    edges: 12,
    vertices: 8,
    faces: 6, // 6 flat square faces
    curvedSurfaces: 0,
    description: 'Has 6 flat faces that are all equal squares, 8 corners, and 12 straight edges!',
    examples: ['Dice', 'Rubik\'s cube', 'Ice cube', 'Cardboard box'],
    color: '#2dd4bf', // teal-400
    glow: 'rgba(45, 212, 191, 0.45)',
  },
  cuboid: {
    id: 'cuboid',
    name: 'Cuboid',
    type: SHAPE_TYPES.THREE_D,
    edges: 12,
    vertices: 8,
    faces: 6, // 6 flat rectangular faces
    curvedSurfaces: 0,
    description: 'Like a cube, but its flat faces are rectangles. It has 6 flat faces, 8 corners, and 12 edges!',
    examples: ['Tissue box', 'Cereal box', 'Brick', 'Pencil case', 'Apartment Block'],
    color: '#60a5fa', // blue-400
    glow: 'rgba(96, 165, 250, 0.45)',
  },
  pyramid: {
    id: 'pyramid',
    name: 'Pyramid',
    type: SHAPE_TYPES.THREE_D,
    edges: 8,
    vertices: 5,
    faces: 5, // 1 square base + 4 triangular sides
    curvedSurfaces: 0,
    description: 'Has a square flat face at the bottom (base) and 4 triangular flat faces meeting at a point!',
    examples: ['Egyptian pyramid', 'Teabag', 'Roof of a gazebo'],
    color: '#c084fc', // purple-400
    glow: 'rgba(192, 132, 252, 0.45)',
  }
};
