import { say, emphasize, ask, cheer } from './audio.js';

export const introNarration = [
  say('Welcome to Geometry: Shapes in Daily Life!'),
  say('Today, we are going to explore flat 2D shapes and solid 3D shapes all around us.'),
  say('Click Start to begin our shape adventure!')
];

export const wonderSection1Narration = [
  say('Hmm... I wonder... Where can we find circles, triangles, and cylinders around us? Can you spot shapes in daily life?'),
  say('Shapes are hiding all around us in the playground! Tap Let\'s Discover to find them!')
];

export const wonderSection2Narration = [
  say('Shape Discovery Scene! Look at this playground scene! There are shapes hiding everywhere!'),
  say('Find all six glowing shapes in the scene!'),
  say('Tap on the glowing circles to discover each shape and its properties!')
];

export const wonderNarration = wonderSection1Narration;

export const storyPanelNarration = [
  // Panel 1
  [
    say('Oliver and Emma sit down for breakfast. Ms. Parker serves them tasty food.'),
    say('Oliver notices his plate is a perfect circle! Emma holds a piece of toast that is a rectangle.')
  ],
  // Panel 2
  [
    say('They run down to the playground. The sandpit is a large square.'),
    say('Near the slide, the tall climbing poles are cylinders.'),
    say('Oliver kicks a soccer ball—it is a round sphere!')
  ],
  // Panel 3
  [
    say('For lunch, they visit a local cafe. Oliver spots a soup tin—it is a cylinder!'),
    say('Emma enjoys an ice cream cone, which is a cone.'),
    say('Oliver pulls a napkin from a tissue box, which is a cuboid.')
  ],
  // Panel 4
  [
    say('On their way home, Emma spots a hexagonal drain cover with six sides.'),
    say('Oliver points to a triangular road sign.'),
    say('Behind them, the apartment block rises high like a giant cuboid!')
  ],
  // Panel 5
  [
    say('Oliver and Emma make a list of all twelve shapes they found today!'),
    say('They learned six flat 2D shapes and six solid 3D shapes. Now they see shapes everywhere!'),
    say('Let us play some games and practice what we learned!')
  ]
];

export const simulateStationNarration = {
  explorer: [
    say('Welcome to Station A: Shape Explorer!'),
    say('Drag each flat 2D shape to the correct circle based on its number of sides and corners.')
  ],
  spinner: [
    say('Welcome to Station B: Solid Spinner!'),
    say('Tap and drag the 3D solid to spin it! Count its flat faces and match it with a real-world object.')
  ],
  hunt: [
    say('Welcome to Station C: Shape Hunt!'),
    say('Find and tap all the target shapes hidden in the scene. Look closely!')
  ]
};

export const reflectNarration = [
  cheer('Congratulations! You completed the learning phases!'),
  say('Now, take a look around your own room.'),
  ask('Can you write down one flat 2D shape and one solid 3D shape that you see right now?')
];

// Feedback narration bank
export const feedbackNarration = {
  correct: [
    cheer('Fantastic job! That is correct!'),
    cheer('Amazing work! You got it!'),
    cheer('Brilliant! Yes, that is correct!')
  ],
  incorrect: [
    say('Not quite! Let us look at the sides and corners together.'),
    say('Try again! Count the flat faces carefully.'),
    say('Remember: look at the shape properties to help you.')
  ]
};
