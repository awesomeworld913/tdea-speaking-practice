/**
 * Pre-generated speaking practice scripts for TDEA (Level 1 & 2, 24 units)
 * Each unit has 4 dialogues + 1 monologue = 5 scripts
 * Expression Pattern is the structural backbone of every dialogue.
 * Level 1: present tense only
 * Level 2: past/future tenses allowed per grammar
 */

export interface ScriptLine {
  speaker: string;
  text: string;
}

export interface ConversationSet {
  id: number;
  type: "dialogue" | "monologue";
  title: string;
  monologueType?: string;
  speakers?: string[];
  lines: ScriptLine[];
}

export interface UnitScripts {
  unitId: string;
  levelNumber: number;
  unitNumber: number;
  unitTopic: string;
  conversations: ConversationSet[];
}

export const allScripts: Record<string, UnitScripts> = {
  // ============================================================
  // LEVEL 1
  // ============================================================

  // --- L1 U1: Hobbies (can / can't / good at) ---
  "cr_1_1": {
    unitId: "cr_1_1", levelNumber: 1, unitNumber: 1, unitTopic: "Hobbies",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Swimming and Biking",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, can you swim?" },
          { speaker: "Jake", text: "Yes, I can! I swim at the pool every week." },
          { speaker: "Mina", text: "That's cool. I can't swim well." },
          { speaker: "Jake", text: "Can you ride a bike?" },
          { speaker: "Mina", text: "Yes, I can. I ride my bike to the gym." },
          { speaker: "Jake", text: "Nice! I can't ride a bike. I always fall." },
          { speaker: "Mina", text: "Ha! I can teach you." },
          { speaker: "Jake", text: "And I can teach you swimming!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Music Class",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, can you play the flute?" },
          { speaker: "Brian", text: "No, I can't. But I can play the violin." },
          { speaker: "Sora", text: "Wow! I can play the trumpet." },
          { speaker: "Brian", text: "Are you good at it?" },
          { speaker: "Sora", text: "Yes! I'm in the school band." },
          { speaker: "Brian", text: "That's great. I want to learn the trumpet, too." },
          { speaker: "Sora", text: "I can teach you. It's fun!" },
          { speaker: "Brian", text: "Thanks, Sora!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Weekend Activities",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, can you cook?" },
          { speaker: "Jiho", text: "Yes, I can bake cookies. I'm good at baking." },
          { speaker: "Emma", text: "I can't bake at all. Can you teach me?" },
          { speaker: "Jiho", text: "Sure! Can you come to my house this weekend?" },
          { speaker: "Emma", text: "Yes, I can! I can bring some art supplies, too." },
          { speaker: "Jiho", text: "Oh, can you draw well?" },
          { speaker: "Emma", text: "Yes, I'm good at art." },
          { speaker: "Jiho", text: "Great! We can bake and draw together." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Sports Day",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, can you play volleyball?" },
          { speaker: "Hana", text: "Yes, I can. I'm good at volleyball." },
          { speaker: "Tom", text: "I can't play volleyball. I'm bad at it." },
          { speaker: "Hana", text: "What can you do well?" },
          { speaker: "Tom", text: "I can surf! I go surfing every summer." },
          { speaker: "Hana", text: "That's amazing! I can't surf." },
          { speaker: "Tom", text: "I can teach you. You can try!" },
          { speaker: "Hana", text: "Okay! I want to try surfing." },
        ],
      },
      {
        id: 5, type: "monologue", title: "School Club Announcement",
        monologueType: "announcement",
        lines: [
          { speaker: "", text: "Attention, students! We have new clubs this year." },
          { speaker: "", text: "You can join the swimming club or the art club." },
          { speaker: "", text: "The band is looking for students who can play the flute or violin." },
          { speaker: "", text: "You can also try bowling or ice skating." },
          { speaker: "", text: "Come to the gym to learn more. See you there!" },
        ],
      },
    ],
  },

  // --- L1 U2: Clothing (this/that/these/those) ---
  "cr_1_2": {
    unitId: "cr_1_2", levelNumber: 1, unitNumber: 2, unitTopic: "Clothing",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Shopping for Clothes",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Look! This is a nice T-shirt." },
          { speaker: "Jake", text: "That T-shirt is pink. I like purple." },
          { speaker: "Mina", text: "These sweaters are comfortable." },
          { speaker: "Jake", text: "Those sweaters are popular, too." },
          { speaker: "Mina", text: "This jacket is my favorite." },
          { speaker: "Jake", text: "That jacket is so cool!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "School Uniform Day",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, is this your uniform?" },
          { speaker: "Brian", text: "No, that is not mine. Mine is over there." },
          { speaker: "Sora", text: "These pants are too big for you." },
          { speaker: "Brian", text: "I know! Those pants are my size." },
          { speaker: "Sora", text: "This belt is nice. You can wear it." },
          { speaker: "Brian", text: "Thanks! That belt is comfortable." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Getting Ready",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, these boots are so stylish!" },
          { speaker: "Jiho", text: "Thanks! Those sneakers are cool, too." },
          { speaker: "Emma", text: "This scarf is my favorite. It's orange." },
          { speaker: "Jiho", text: "That scarf is pretty. Is this dress new?" },
          { speaker: "Emma", text: "Yes! This dress is comfortable and popular." },
          { speaker: "Jiho", text: "Nice. Those sunglasses are perfect with it." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Lost and Found",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, are these your gloves?" },
          { speaker: "Hana", text: "No, those are not mine. My gloves are navy." },
          { speaker: "Tom", text: "Is this your jacket?" },
          { speaker: "Hana", text: "Yes! That is my favorite jacket. Thank you!" },
          { speaker: "Tom", text: "These socks are here, too. Are they yours?" },
          { speaker: "Hana", text: "Yes, those are mine! You find everything!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Back-to-School Sale!",
        monologueType: "advertisement",
        lines: [
          { speaker: "", text: "Are you ready for school? Come to our big sale!" },
          { speaker: "", text: "These T-shirts are comfortable and popular." },
          { speaker: "", text: "Those jeans are stylish and on sale." },
          { speaker: "", text: "This jacket is warm and comes in purple, pink, and navy." },
          { speaker: "", text: "Sneakers, boots, and shoes — everything is here!" },
          { speaker: "", text: "Visit us today!" },
        ],
      },
    ],
  },

  // --- L1 U3: Belongings (possessive pronouns / 's) ---
  "cr_1_3": {
    unitId: "cr_1_3", levelNumber: 1, unitNumber: 3, unitTopic: "Belongings",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Whose Backpack?",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, whose backpack is this?" },
          { speaker: "Jake", text: "It's mine. My backpack is heavy today." },
          { speaker: "Mina", text: "Whose textbook is on the desk?" },
          { speaker: "Jake", text: "It's yours, Mina. Your name is on it." },
          { speaker: "Mina", text: "Oh! And whose diary is this?" },
          { speaker: "Jake", text: "It's Sora's diary. It's hers." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Locker Mix-Up",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, are these scissors yours?" },
          { speaker: "Brian", text: "No, they're not mine. They're his — Jiho's scissors." },
          { speaker: "Sora", text: "Whose camera is in your locker?" },
          { speaker: "Brian", text: "It's Emma's camera. It's hers." },
          { speaker: "Sora", text: "And these headphones? Are they ours?" },
          { speaker: "Brian", text: "Yes, they're ours! From the music class." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "After Class",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, whose slippers are these?" },
          { speaker: "Jiho", text: "They're theirs — the girls' slippers." },
          { speaker: "Emma", text: "This painting is beautiful. Whose is it?" },
          { speaker: "Jiho", text: "It's mine! I painted it yesterday." },
          { speaker: "Emma", text: "Wow! And whose magazine is on the table?" },
          { speaker: "Jiho", text: "It's Tom's. It's his." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "The Parking Lot",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, whose car is that? Is it yours?" },
          { speaker: "Hana", text: "No, it's not mine. It's my dad's car. It's his." },
          { speaker: "Tom", text: "The garden next to it is pretty. Whose is it?" },
          { speaker: "Hana", text: "It's ours! My family's garden." },
          { speaker: "Tom", text: "And whose coin is this? It's dirty." },
          { speaker: "Hana", text: "I don't know! It's not mine." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Lost and Found Guide",
        monologueType: "guide",
        lines: [
          { speaker: "", text: "Welcome to the school lost and found!" },
          { speaker: "", text: "This backpack belongs to a student in Class 3." },
          { speaker: "", text: "These headphones are the boys' from the music room." },
          { speaker: "", text: "If this camera is yours, please come to the office." },
          { speaker: "", text: "Remember: write your name on your things!" },
        ],
      },
    ],
  },

  // --- L1 U4: School (subjects, time, timetable) ---
  "cr_1_4": {
    unitId: "cr_1_4", levelNumber: 1, unitNumber: 4, unitTopic: "School",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Today's Timetable",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, what time is it?" },
          { speaker: "Jake", text: "It's nine o'clock. We have English first." },
          { speaker: "Mina", text: "When does science start?" },
          { speaker: "Jake", text: "Science starts at ten thirty." },
          { speaker: "Mina", text: "Science is interesting!" },
          { speaker: "Jake", text: "I think history is more exciting." },
          { speaker: "Mina", text: "But history is difficult for me." },
          { speaker: "Jake", text: "I can help you! It's easy for me." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Favorite Subjects",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, we have P.E. on Monday." },
          { speaker: "Brian", text: "Yes! P.E. is my favorite subject." },
          { speaker: "Sora", text: "I have English on Tuesday and Thursday." },
          { speaker: "Brian", text: "English is easy but I think math is boring." },
          { speaker: "Sora", text: "When does math end?" },
          { speaker: "Brian", text: "Math ends at eleven forty." },
          { speaker: "Sora", text: "Next is science. That's exciting!" },
          { speaker: "Brian", text: "You're right. I like science, too." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Busy Wednesday",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, what time does school start on Wednesday?" },
          { speaker: "Jiho", text: "It starts at eight thirty." },
          { speaker: "Emma", text: "We have history first. I think it's interesting." },
          { speaker: "Jiho", text: "I have English next. When does it end?" },
          { speaker: "Emma", text: "English ends at ten twenty." },
          { speaker: "Jiho", text: "Wednesday is busy but fun!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Weekend Plans",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, we have no subjects on Saturday!" },
          { speaker: "Hana", text: "I know! But I have English class on Sunday." },
          { speaker: "Tom", text: "What time does it start?" },
          { speaker: "Hana", text: "It starts at two o'clock." },
          { speaker: "Tom", text: "Is it easy or difficult?" },
          { speaker: "Hana", text: "It's easy and interesting. My favorite subject!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "School Timetable News",
        monologueType: "news",
        lines: [
          { speaker: "", text: "Good morning, students. Here is your new timetable." },
          { speaker: "", text: "English starts at nine o'clock on Monday and Friday." },
          { speaker: "", text: "We have science on Tuesday and Thursday." },
          { speaker: "", text: "P.E. is on Wednesday at one thirty." },
          { speaker: "", text: "Have an exciting week!" },
        ],
      },
    ],
  },

  // --- L1 U5: Lunchtime (there is/are, quantifiers) ---
  "cr_1_5": {
    unitId: "cr_1_5", levelNumber: 1, unitNumber: 5, unitTopic: "Lunchtime",
    conversations: [
      {
        id: 1, type: "dialogue", title: "In the Cafeteria",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, there is soup on the menu today." },
          { speaker: "Jake", text: "Nice! Is there any bread?" },
          { speaker: "Mina", text: "Yes, there is some bread over there." },
          { speaker: "Jake", text: "There are many people in the cafeteria." },
          { speaker: "Mina", text: "There is no seat left!" },
          { speaker: "Jake", text: "Look! There are two seats at that table." },
          { speaker: "Mina", text: "Great! Let's sit there." },
          { speaker: "Jake", text: "I need a fork and a spoon." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Lunchbox Time",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, there is pasta in my lunchbox!" },
          { speaker: "Brian", text: "Wow! There is curry and rice in mine." },
          { speaker: "Sora", text: "There are some side dishes, too." },
          { speaker: "Brian", text: "Is there any soup?" },
          { speaker: "Sora", text: "No, there is no soup. But there is some bread." },
          { speaker: "Brian", text: "There are many chopsticks here but no fork." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Setting the Table",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, there are some plates on the table." },
          { speaker: "Jiho", text: "But there is no cup. We need some cups." },
          { speaker: "Emma", text: "There are some glasses over there." },
          { speaker: "Jiho", text: "There are no napkins on the tray." },
          { speaker: "Emma", text: "I have some napkins here." },
          { speaker: "Jiho", text: "Thanks! There is one bowl left for soup." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "The Bench Outside",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, there is a bench over there." },
          { speaker: "Hana", text: "There are many people on it already." },
          { speaker: "Tom", text: "There is no seat left on the bench." },
          { speaker: "Hana", text: "Is there any space on that table?" },
          { speaker: "Tom", text: "Yes! There are two seats." },
          { speaker: "Hana", text: "There is some pasta on the menu today. Let's eat!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Cafeteria Voicemail",
        monologueType: "voicemail",
        lines: [
          { speaker: "", text: "Hi! This is a message about today's cafeteria menu." },
          { speaker: "", text: "There is curry and rice for lunch." },
          { speaker: "", text: "There are some side dishes, too." },
          { speaker: "", text: "There is no pasta today." },
          { speaker: "", text: "Please bring your own spoon and fork. Thank you!" },
        ],
      },
    ],
  },

  // --- L1 U6: Digital Life (like/enjoy/hate + -ing) ---
  "cr_1_6": {
    unitId: "cr_1_6", levelNumber: 1, unitNumber: 6, unitTopic: "Digital Life",
    conversations: [
      {
        id: 1, type: "dialogue", title: "After School Online",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, I enjoy checking social media." },
          { speaker: "Jake", text: "Me too! I like sharing photos online." },
          { speaker: "Mina", text: "I love chatting with my friends." },
          { speaker: "Jake", text: "I hate getting too many ads." },
          { speaker: "Mina", text: "Same! I don't like scrolling during homework." },
          { speaker: "Jake", text: "I keep checking my phone. It's a problem!" },
          { speaker: "Mina", text: "I know! We should use it less." },
          { speaker: "Jake", text: "You're right. I enjoy reading, too." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "App Talk",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, do you enjoy using apps?" },
          { speaker: "Brian", text: "Yes! I like posting on social media." },
          { speaker: "Sora", text: "I love sending messages to friends." },
          { speaker: "Brian", text: "I hate waiting for replies." },
          { speaker: "Sora", text: "I don't like wasting time online." },
          { speaker: "Brian", text: "I keep scrolling before bed. It's bad!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "The Internet",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, I enjoy using the internet." },
          { speaker: "Jiho", text: "I like getting messages from friends." },
          { speaker: "Emma", text: "I love sharing stories online." },
          { speaker: "Jiho", text: "I hate losing my password!" },
          { speaker: "Emma", text: "That's the same for me! I don't like deleting old posts." },
          { speaker: "Jiho", text: "I always keep checking my mobile during class." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Social Media Rules",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, do you like using social media?" },
          { speaker: "Hana", text: "I enjoy chatting, but I hate getting ads." },
          { speaker: "Tom", text: "I love sharing music online." },
          { speaker: "Hana", text: "I don't like posting too much." },
          { speaker: "Tom", text: "I keep scrolling. I always waste time." },
          { speaker: "Hana", text: "We should use apps less and enjoy real life!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Digital Safety Announcement",
        monologueType: "announcement",
        lines: [
          { speaker: "", text: "Attention, students! This is about internet safety." },
          { speaker: "", text: "We all enjoy using the internet and social media." },
          { speaker: "", text: "But keep your password safe. Don't share it online." },
          { speaker: "", text: "Don't like or reply to messages from strangers." },
          { speaker: "", text: "Use the internet wisely. Thank you!" },
        ],
      },
    ],
  },

  // --- L1 U7: Travel (want/hope/plan to) ---
  "cr_1_7": {
    unitId: "cr_1_7", levelNumber: 1, unitNumber: 7, unitTopic: "Travel",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Dream Destinations",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, I want to travel to the beach someday." },
          { speaker: "Jake", text: "Me too! I hope to visit the ocean." },
          { speaker: "Mina", text: "I plan to take a plane." },
          { speaker: "Jake", text: "I want to fly for the first time!" },
          { speaker: "Mina", text: "You can get there by bus, too." },
          { speaker: "Jake", text: "That's true. I hope to travel with friends." },
          { speaker: "Mina", text: "I plan to pack my bag this weekend!" },
          { speaker: "Jake", text: "Don't forget your passport!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "City or Mountain?",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, I want to visit a big city." },
          { speaker: "Brian", text: "I hope to go to the mountain." },
          { speaker: "Sora", text: "You can get there by train from the city." },
          { speaker: "Brian", text: "The train travels from the city to the mountain." },
          { speaker: "Sora", text: "I plan to book a hotel." },
          { speaker: "Brian", text: "I want to take a bus alone someday." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Packing for the Trip",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, I plan to travel to the beach." },
          { speaker: "Jiho", text: "Nice! I want to visit a country by plane." },
          { speaker: "Emma", text: "I hope to fly someday, too." },
          { speaker: "Jiho", text: "I need to pack my ticket and passport." },
          { speaker: "Emma", text: "I want to take my bicycle to the hotel." },
          { speaker: "Jiho", text: "A bicycle? You can ride on the beach!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Travel by Train",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, I hope to take the subway to the city." },
          { speaker: "Hana", text: "I want to travel to the ocean by ship." },
          { speaker: "Tom", text: "A ship? That sounds fun!" },
          { speaker: "Hana", text: "I plan to visit a new place with my family." },
          { speaker: "Tom", text: "I want to book a ticket for the train." },
          { speaker: "Hana", text: "The train travels from here to the mountain." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Travel Ad",
        monologueType: "advertisement",
        lines: [
          { speaker: "", text: "Do you want to travel this summer?" },
          { speaker: "", text: "Take a plane to the beach or a train to the mountain." },
          { speaker: "", text: "Book a hotel from the city to the ocean." },
          { speaker: "", text: "You can get there by bus, train, or ship." },
          { speaker: "", text: "Pack your bags and visit a new place!" },
          { speaker: "", text: "Buy your ticket today!" },
        ],
      },
    ],
  },

  // --- L1 U8: Parties (Wh-questions with be verb) ---
  "cr_1_8": {
    unitId: "cr_1_8", levelNumber: 1, unitNumber: 8, unitTopic: "Parties",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Planning a Party",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, when is the party?" },
          { speaker: "Jake", text: "It's on Saturday at three o'clock." },
          { speaker: "Mina", text: "Where is the party?" },
          { speaker: "Jake", text: "It's in the living room." },
          { speaker: "Mina", text: "What is on the table?" },
          { speaker: "Jake", text: "There are cupcakes and candles." },
          { speaker: "Mina", text: "Who is the guest of honor?" },
          { speaker: "Jake", text: "It's Sora! It's a surprise party for her!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Birthday Surprise",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, when is Emma's birthday party?" },
          { speaker: "Brian", text: "It's on Friday." },
          { speaker: "Sora", text: "What is the gift?" },
          { speaker: "Brian", text: "It's a secret! It's in the kitchen." },
          { speaker: "Sora", text: "Where are the decorations?" },
          { speaker: "Brian", text: "They're on the balcony." },
          { speaker: "Sora", text: "I want to bring a photo for her." },
          { speaker: "Brian", text: "That's a great idea!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Concert Night",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, when is the concert?" },
          { speaker: "Jiho", text: "It's on Sunday at seven o'clock." },
          { speaker: "Emma", text: "Where is the concert?" },
          { speaker: "Jiho", text: "It's in the yard." },
          { speaker: "Emma", text: "Who is the singer?" },
          { speaker: "Jiho", text: "That's my friend Tom!" },
          { speaker: "Emma", text: "Wow! I want to invite more guests." },
          { speaker: "Jiho", text: "Sure! Everyone is excited." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "After the Party",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, where are the gifts?" },
          { speaker: "Hana", text: "They're in the basement." },
          { speaker: "Tom", text: "What is that gold thing?" },
          { speaker: "Hana", text: "It's a special candle." },
          { speaker: "Tom", text: "Who is that in the photo?" },
          { speaker: "Hana", text: "That's my friend! She's special to me." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Party Invitation Guide",
        monologueType: "guide",
        lines: [
          { speaker: "", text: "Welcome! Here is how to plan a great party." },
          { speaker: "", text: "First, pick a day. Saturday and Sunday are good." },
          { speaker: "", text: "Decorate the living room with candles and photos." },
          { speaker: "", text: "Wrap the gifts and put them in the kitchen." },
          { speaker: "", text: "Invite your friends and have fun!" },
        ],
      },
    ],
  },

  // --- L1 U9: Routines (frequency adverbs) ---
  "cr_1_9": {
    unitId: "cr_1_9", levelNumber: 1, unitNumber: 9, unitTopic: "Routines",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Morning Routines",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, do you always get up early?" },
          { speaker: "Jake", text: "No, I sometimes oversleep." },
          { speaker: "Mina", text: "I always brush my hair every morning." },
          { speaker: "Jake", text: "I usually take a shower first." },
          { speaker: "Mina", text: "Do you sometimes skip breakfast?" },
          { speaker: "Jake", text: "Yes, I sometimes rush to school!" },
          { speaker: "Mina", text: "I never skip breakfast." },
          { speaker: "Jake", text: "You are always on time, Mina!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Weekday vs Weekend",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, I usually get up at seven on weekdays." },
          { speaker: "Brian", text: "I often hit the snooze button." },
          { speaker: "Sora", text: "Do you always get dressed quickly?" },
          { speaker: "Brian", text: "Yes, I usually rush every morning." },
          { speaker: "Sora", text: "I never rush on weekends." },
          { speaker: "Brian", text: "Me too! I sometimes stay in the bathroom for an hour." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Bedtime Habits",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, do you always brush your teeth?" },
          { speaker: "Jiho", text: "Yes, I always use my toothbrush and toothpaste." },
          { speaker: "Emma", text: "I sometimes forget to wash my face." },
          { speaker: "Jiho", text: "I never forget! It's part of my routine." },
          { speaker: "Emma", text: "I usually get dressed in the bedroom." },
          { speaker: "Jiho", text: "I often use a towel and wash early." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Alarm Problems",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, I always set my alarm at six." },
          { speaker: "Hana", text: "I often hit the snooze button twice." },
          { speaker: "Tom", text: "Do you sometimes oversleep?" },
          { speaker: "Hana", text: "Yes! I sometimes oversleep on weekdays." },
          { speaker: "Tom", text: "I never oversleep. I get up once the alarm rings." },
          { speaker: "Hana", text: "Wow, you are always early!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Healthy Morning News",
        monologueType: "news",
        lines: [
          { speaker: "", text: "Good morning! Here are tips for a healthy routine." },
          { speaker: "", text: "Always get up early and take a shower." },
          { speaker: "", text: "Usually brush your teeth with toothpaste twice a day." },
          { speaker: "", text: "Never skip breakfast." },
          { speaker: "", text: "A good routine makes a great day!" },
        ],
      },
    ],
  },

  // --- L1 U10: Managing Allowance (How much, I'd like) ---
  "cr_1_10": {
    unitId: "cr_1_10", levelNumber: 1, unitNumber: 10, unitTopic: "Managing Allowance",
    conversations: [
      {
        id: 1, type: "dialogue", title: "At the Shopping Mall",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "How much is this T-shirt?" },
          { speaker: "Jake", text: "It's twenty dollars." },
          { speaker: "Mina", text: "That's too expensive. How much are these socks?" },
          { speaker: "Jake", text: "They're three dollars. They're cheap!" },
          { speaker: "Mina", text: "I'd like two pairs, please." },
          { speaker: "Jake", text: "I think this sale is great." },
          { speaker: "Mina", text: "I'd like to pay with cash." },
          { speaker: "Jake", text: "Here's your change and receipt!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Trying on Shoes",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "How much are these sneakers?" },
          { speaker: "Brian", text: "They're fifty dollars." },
          { speaker: "Sora", text: "I think they're too expensive." },
          { speaker: "Brian", text: "I'd like to try on the medium size." },
          { speaker: "Sora", text: "This size is small. I'd like a large, please." },
          { speaker: "Brian", text: "The fitting room is over there." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Saving Money",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "How much is this bag?" },
          { speaker: "Jiho", text: "It's a hundred dollars. It's very expensive." },
          { speaker: "Emma", text: "I think that's too high." },
          { speaker: "Jiho", text: "I'd like to buy something cheap." },
          { speaker: "Emma", text: "How much are these glasses?" },
          { speaker: "Jiho", text: "They're only five dollars!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "At the Store",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "How much is this jacket?" },
          { speaker: "Hana", text: "It's forty dollars. I think it's cheap for a jacket." },
          { speaker: "Tom", text: "I'd like to pay with my credit card." },
          { speaker: "Hana", text: "I'd like to pick the small size." },
          { speaker: "Tom", text: "I think the medium is better for you." },
          { speaker: "Hana", text: "You're right! I'd like the medium, please." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Store Voicemail",
        monologueType: "voicemail",
        lines: [
          { speaker: "", text: "Hi! This is a message from Happy Store." },
          { speaker: "", text: "Our big sale starts today!" },
          { speaker: "", text: "Sneakers are only thirty dollars." },
          { speaker: "", text: "You can pay with cash or credit card." },
          { speaker: "", text: "Visit us at the shopping mall. Don't miss it!" },
        ],
      },
    ],
  },

  // --- L1 U11: Studies (present progressive) ---
  "cr_1_11": {
    unitId: "cr_1_11", levelNumber: 1, unitNumber: 11, unitTopic: "Studies",
    conversations: [
      {
        id: 1, type: "dialogue", title: "In the Library",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, what are you doing?" },
          { speaker: "Jake", text: "I'm reviewing for the test." },
          { speaker: "Mina", text: "Are you studying in the library?" },
          { speaker: "Jake", text: "Yes, I am. I'm solving math problems." },
          { speaker: "Mina", text: "I'm working on my project right now." },
          { speaker: "Jake", text: "Is Sora studying, too?" },
          { speaker: "Mina", text: "No, she's not. She's preparing a presentation." },
          { speaker: "Jake", text: "We are all working hard tonight!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Classroom Chat",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, what is Emma doing?" },
          { speaker: "Brian", text: "She's practicing her speech in the music room." },
          { speaker: "Sora", text: "Is she memorizing it?" },
          { speaker: "Brian", text: "Yes, she is. What are you doing?" },
          { speaker: "Sora", text: "I'm looking for my homework." },
          { speaker: "Brian", text: "I'm not doing anything right now. I can help!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Study Group",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, are you working on the group project?" },
          { speaker: "Jiho", text: "Yes, I am. I'm reviewing the notes." },
          { speaker: "Emma", text: "I'm preparing the presentation slides." },
          { speaker: "Jiho", text: "Is Tom raising his hand in class?" },
          { speaker: "Emma", text: "No, he's not. He's solving a problem." },
          { speaker: "Jiho", text: "We are all studying hard today!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Exam Week",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, what are you doing right now?" },
          { speaker: "Hana", text: "I'm memorizing answers for the exam." },
          { speaker: "Tom", text: "Are you studying in the classroom?" },
          { speaker: "Hana", text: "No, I'm not. I'm studying at home." },
          { speaker: "Tom", text: "I'm looking for the website with practice questions." },
          { speaker: "Hana", text: "I'm not looking at anything else tonight!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Library Announcement",
        monologueType: "announcement",
        lines: [
          { speaker: "", text: "Attention, students! The library is closing at five today." },
          { speaker: "", text: "Many students are studying for exams right now." },
          { speaker: "", text: "Please check the website for study group meetings." },
          { speaker: "", text: "The test is on Friday. Keep working hard!" },
          { speaker: "", text: "Good luck, everyone!" },
        ],
      },
    ],
  },

  // --- L1 U12: Special Days (dates, months, holidays) ---
  "cr_1_12": {
    unitId: "cr_1_12", levelNumber: 1, unitNumber: 12, unitTopic: "Special Days",
    conversations: [
      {
        id: 1, type: "dialogue", title: "When is the Festival?",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, what's the date today?" },
          { speaker: "Jake", text: "It's March 15th." },
          { speaker: "Mina", text: "When is the school festival?" },
          { speaker: "Jake", text: "It's on April 20th." },
          { speaker: "Mina", text: "On the festival, we exchange gifts." },
          { speaker: "Jake", text: "I love the festival! There are fireworks, too." },
          { speaker: "Mina", text: "It's in April. I can't wait!" },
          { speaker: "Jake", text: "We celebrate every year!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Holiday Traditions",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, when is your favorite holiday?" },
          { speaker: "Brian", text: "It's on December 25th." },
          { speaker: "Sora", text: "On that day, we put up a tree and decorations." },
          { speaker: "Brian", text: "For the holiday, we exchange gifts." },
          { speaker: "Sora", text: "My favorite is in October. We wear costumes!" },
          { speaker: "Brian", text: "That's fun! I love costumes." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Birthday Month",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, what's the date today?" },
          { speaker: "Jiho", text: "It's June 1st." },
          { speaker: "Emma", text: "When is your birthday?" },
          { speaker: "Jiho", text: "It's on July 8th." },
          { speaker: "Emma", text: "For your birthday, we can have a meal together." },
          { speaker: "Jiho", text: "That sounds great! I'm thankful for each other." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "New Year's Eve",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, when is New Year's Eve?" },
          { speaker: "Hana", text: "It's on December 31st." },
          { speaker: "Tom", text: "On that day, we watch fireworks at midnight." },
          { speaker: "Hana", text: "For New Year's, we have a special meal." },
          { speaker: "Tom", text: "I love the flowers and decorations in January." },
          { speaker: "Hana", text: "Me too! We celebrate the new year every year." },
        ],
      },
      {
        id: 5, type: "monologue", title: "School Holiday Guide",
        monologueType: "guide",
        lines: [
          { speaker: "", text: "Welcome! Here are the school holidays this year." },
          { speaker: "", text: "The spring festival is on May 5th." },
          { speaker: "", text: "Summer holiday is in July and August." },
          { speaker: "", text: "On the school festival day, we celebrate with pie and flowers." },
          { speaker: "", text: "Mark your calendar and enjoy each holiday!" },
        ],
      },
    ],
  },

  // ============================================================
  // LEVEL 2
  // ============================================================

  // --- L2 U1: Past Events (past tense) ---
  "cr_2_1": {
    unitId: "cr_2_1", levelNumber: 2, unitNumber: 1, unitTopic: "Past Events",
    conversations: [
      {
        id: 1, type: "dialogue", title: "An Embarrassing Moment",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, something terrible happened yesterday." },
          { speaker: "Jake", text: "What happened?" },
          { speaker: "Mina", text: "I spilled my soup at lunch. Everybody laughed." },
          { speaker: "Jake", text: "Oh no! I dropped my phone last week." },
          { speaker: "Mina", text: "Were you embarrassed?" },
          { speaker: "Jake", text: "Yes, I was nervous. The screen was broken." },
          { speaker: "Mina", text: "That's terrible! I was confused when it happened to me." },
          { speaker: "Jake", text: "It's okay. Mistakes happen. We learned a lesson!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "A Clumsy Day",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, I slipped on the stairs yesterday." },
          { speaker: "Brian", text: "Were you okay?" },
          { speaker: "Sora", text: "I was shocked but not hurt." },
          { speaker: "Brian", text: "I ripped my pants last Monday. I was so embarrassed!" },
          { speaker: "Sora", text: "Everyone makes mistakes." },
          { speaker: "Brian", text: "You're right. It was a funny moment." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Lost and Found",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, my keys disappeared yesterday." },
          { speaker: "Jiho", text: "Where did you last see them?" },
          { speaker: "Emma", text: "I left them on the table. Then they were gone." },
          { speaker: "Jiho", text: "I hid my diary once and forgot where." },
          { speaker: "Emma", text: "That's funny! Were you confused?" },
          { speaker: "Jiho", text: "Yes! I was nervous. But I found it a second later." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "The Silent Moment",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, I froze during my speech yesterday." },
          { speaker: "Hana", text: "You were silent? What happened?" },
          { speaker: "Tom", text: "I forgot everything! Everybody was shocked." },
          { speaker: "Hana", text: "I fell on stage last year. It was embarrassing." },
          { speaker: "Tom", text: "We both learned a lesson!" },
          { speaker: "Hana", text: "Yes! Almost everybody has a moment like that." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Funny Moments News",
        monologueType: "news",
        lines: [
          { speaker: "", text: "Good morning! Here is today's fun story." },
          { speaker: "", text: "A student spilled juice on the teacher's desk yesterday." },
          { speaker: "", text: "The teacher was shocked but laughed about it." },
          { speaker: "", text: "Another student dropped a whole tray in the cafeteria." },
          { speaker: "", text: "Everybody laughed, but nobody was hurt." },
          { speaker: "", text: "Mistakes happen. Learn from them and smile!" },
        ],
      },
    ],
  },

  // --- L2 U2: School Events (past tense negation/questions) ---
  "cr_2_2": {
    unitId: "cr_2_2", levelNumber: 2, unitNumber: 2, unitTopic: "School Events",
    conversations: [
      {
        id: 1, type: "dialogue", title: "The Field Trip",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, did you enjoy the field trip?" },
          { speaker: "Jake", text: "Yes, I did! The museum was amazing." },
          { speaker: "Mina", text: "Did you see the magic show?" },
          { speaker: "Jake", text: "No, I didn't. I was at the talent show." },
          { speaker: "Mina", text: "Was the talent show good?" },
          { speaker: "Jake", text: "It was wonderful! The actor performed very well." },
          { speaker: "Mina", text: "I was disappointed I didn't see it." },
          { speaker: "Jake", text: "The audience cheered loudly. It was amazing!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Competition Day",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, did you win the competition?" },
          { speaker: "Brian", text: "No, I didn't. But I tried my best." },
          { speaker: "Sora", text: "Were you disappointed?" },
          { speaker: "Brian", text: "I wasn't disappointed. The experience was enough." },
          { speaker: "Sora", text: "Did the audience clap?" },
          { speaker: "Brian", text: "Yes! They clapped loudly. I was proud." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "The Performance",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, was the performance good?" },
          { speaker: "Jiho", text: "It wasn't just good — it was wonderful!" },
          { speaker: "Emma", text: "Did you perform on stage?" },
          { speaker: "Jiho", text: "Yes, I did. I was nervous but lucky." },
          { speaker: "Emma", text: "Were you surprised by the crowd?" },
          { speaker: "Jiho", text: "Yes! It was crowded. The stage was bright." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "After the Event",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, did you go to the school event?" },
          { speaker: "Hana", text: "No, I didn't. I was bored at home." },
          { speaker: "Tom", text: "It wasn't boring at all! There was a talent show." },
          { speaker: "Hana", text: "Did anyone win a prize?" },
          { speaker: "Tom", text: "Yes! Emma won the first prize." },
          { speaker: "Hana", text: "I'm surprised! She must be proud." },
        ],
      },
      {
        id: 5, type: "monologue", title: "School Event Announcement",
        monologueType: "announcement",
        lines: [
          { speaker: "", text: "Attention, students! The school event was a great success." },
          { speaker: "", text: "The talent show was amazing. Every performer tried their best." },
          { speaker: "", text: "The audience cheered and clapped loudly." },
          { speaker: "", text: "The field trip to the museum was wonderful, too." },
          { speaker: "", text: "Congratulations to all the winners!" },
          { speaker: "", text: "We are proud of everyone." },
        ],
      },
    ],
  },

  // --- L2 U3: Careers (want to be/become, why/because) ---
  "cr_2_3": {
    unitId: "cr_2_3", levelNumber: 2, unitNumber: 3, unitTopic: "Careers",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Dream Jobs",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, what do you want to be?" },
          { speaker: "Jake", text: "I want to become a pilot." },
          { speaker: "Mina", text: "Why do you want to become a pilot?" },
          { speaker: "Jake", text: "Because I love flying and seeing the world." },
          { speaker: "Mina", text: "I want to be a scientist." },
          { speaker: "Jake", text: "Why?" },
          { speaker: "Mina", text: "Because I'm good at science. I want to change the world." },
          { speaker: "Jake", text: "That's a great goal!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Future Plans",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, what do you want to be in the future?" },
          { speaker: "Brian", text: "I want to become a chef." },
          { speaker: "Sora", text: "Why do you want to be a chef?" },
          { speaker: "Brian", text: "Because I love cooking. I want to be famous." },
          { speaker: "Sora", text: "I want to become a singer because I love music." },
          { speaker: "Brian", text: "You have a great life goal!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Career Day",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, do you want to be a teacher?" },
          { speaker: "Jiho", text: "Yes! I want to become a teacher because I like helping children." },
          { speaker: "Emma", text: "I want to be a designer." },
          { speaker: "Jiho", text: "Why?" },
          { speaker: "Emma", text: "Because I'm good at art and I love coding." },
          { speaker: "Jiho", text: "You can be a successful designer!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "At the University Fair",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, I want to become an engineer." },
          { speaker: "Hana", text: "Why do you want to be an engineer?" },
          { speaker: "Tom", text: "Because I want to build things and save the world." },
          { speaker: "Hana", text: "I want to be a writer because I love stories." },
          { speaker: "Tom", text: "That takes a lot of effort." },
          { speaker: "Hana", text: "I know! But it's my future goal." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Career Day Guide",
        monologueType: "guide",
        lines: [
          { speaker: "", text: "Welcome to Career Day!" },
          { speaker: "", text: "Today, we will learn about different jobs." },
          { speaker: "", text: "A pilot flies planes and travels the world." },
          { speaker: "", text: "A scientist studies the world and makes new things." },
          { speaker: "", text: "A nurse helps sick people and saves lives." },
          { speaker: "", text: "What do you want to become? Think about your interest and goal!" },
        ],
      },
    ],
  },

  // --- L2 U4: Neighborhood (location prepositions, directions) ---
  "cr_2_4": {
    unitId: "cr_2_4", levelNumber: 2, unitNumber: 4, unitTopic: "Neighborhood",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Finding the Bakery",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, where is the bakery?" },
          { speaker: "Jake", text: "It's across from the bank." },
          { speaker: "Mina", text: "Is it near the bus stop?" },
          { speaker: "Jake", text: "Yes! The bakery is between the bank and the bookstore." },
          { speaker: "Mina", text: "How do I get there?" },
          { speaker: "Jake", text: "Go straight for two blocks. Then turn left." },
          { speaker: "Mina", text: "Turn left at the corner?" },
          { speaker: "Jake", text: "Yes. It's on your right. You can't miss it!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "New in the Area",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, where is the supermarket?" },
          { speaker: "Brian", text: "It's behind the restaurant." },
          { speaker: "Sora", text: "Is there a playground near here?" },
          { speaker: "Brian", text: "Yes, there's a playground in front of the museum." },
          { speaker: "Sora", text: "Go straight and turn right?" },
          { speaker: "Brian", text: "Yes! It's not far from here." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "The Map",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, I'm looking at the map." },
          { speaker: "Jiho", text: "Where is the convenience store?" },
          { speaker: "Emma", text: "It's next to the parking lot." },
          { speaker: "Jiho", text: "Is the bookstore across from the store?" },
          { speaker: "Emma", text: "Yes! Go straight for one block and cross the street." },
          { speaker: "Jiho", text: "Thanks! The neighborhood is easy to walk around." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Giving Directions",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Excuse me, where is the museum?" },
          { speaker: "Hana", text: "Go straight for three blocks." },
          { speaker: "Tom", text: "Then what?" },
          { speaker: "Hana", text: "Turn right at the corner. Go past the bank." },
          { speaker: "Tom", text: "Is it far?" },
          { speaker: "Hana", text: "No, it's on your left. It's between the store and the restaurant." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Neighborhood Advertisement",
        monologueType: "advertisement",
        lines: [
          { speaker: "", text: "Welcome to Green Street neighborhood!" },
          { speaker: "", text: "There's a bakery across from the park." },
          { speaker: "", text: "The supermarket is behind the bank." },
          { speaker: "", text: "A new bookstore opened next to the restaurant." },
          { speaker: "", text: "There's a playground in front of the museum." },
          { speaker: "", text: "Come and explore! Everything is near the bus stop." },
        ],
      },
    ],
  },

  // --- L2 U5: Sports (comparatives, superlatives) ---
  "cr_2_5": {
    unitId: "cr_2_5", levelNumber: 2, unitNumber: 5, unitTopic: "Sports",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Sports Day Results",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, the relay race was fun!" },
          { speaker: "Jake", text: "Our team was faster than theirs." },
          { speaker: "Mina", text: "Jiho was the fastest runner in the whole race." },
          { speaker: "Jake", text: "The tug-of-war was harder than I expected." },
          { speaker: "Mina", text: "Our team was stronger than the other team." },
          { speaker: "Jake", text: "I think dodgeball is the most exciting sport." },
          { speaker: "Mina", text: "It was the best sports day ever!" },
          { speaker: "Jake", text: "I agree! Both teams competed well." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Choosing a Sport",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, which sport is better — dodgeball or relay?" },
          { speaker: "Brian", text: "I think relay is more exciting than dodgeball." },
          { speaker: "Sora", text: "Dodgeball is quicker than tug-of-war." },
          { speaker: "Brian", text: "The tug-of-war was the loudest event!" },
          { speaker: "Sora", text: "Who was the best player?" },
          { speaker: "Brian", text: "Tom was better than everyone. He was the winner!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "The Final Race",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, you were faster than Brian in the race!" },
          { speaker: "Jiho", text: "Thanks! But Mina was the fastest of all." },
          { speaker: "Emma", text: "The final race was more exciting than the relay." },
          { speaker: "Jiho", text: "I think it was the most exciting event today." },
          { speaker: "Emma", text: "You scored more points than me." },
          { speaker: "Jiho", text: "Don't give up! You are getting better." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Winners and Losers",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, our score was worse than theirs." },
          { speaker: "Hana", text: "Yes, but we competed well against each other." },
          { speaker: "Tom", text: "The cheering was louder than last year." },
          { speaker: "Hana", text: "Who was the youngest player?" },
          { speaker: "Tom", text: "Sora was the youngest, but she was the best!" },
          { speaker: "Hana", text: "She caught the ball better than the older players." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Sports Day News",
        monologueType: "news",
        lines: [
          { speaker: "", text: "Good morning! Here are the results from Sports Day." },
          { speaker: "", text: "Class 3 was faster than Class 2 in the relay race." },
          { speaker: "", text: "The tug-of-war was the most exciting event of the day." },
          { speaker: "", text: "Jiho was the fastest runner in the whole school." },
          { speaker: "", text: "The cheering was louder than ever!" },
          { speaker: "", text: "Congratulations to all the winners and losers alike!" },
        ],
      },
    ],
  },

  // --- L2 U6: Work (be going to) ---
  "cr_2_6": {
    unitId: "cr_2_6", levelNumber: 2, unitNumber: 6, unitTopic: "Work",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Summer Plans",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, are you going to get a part-time job this summer?" },
          { speaker: "Jake", text: "Yes, I'm going to work at a store." },
          { speaker: "Mina", text: "I'm going to apply at the bakery." },
          { speaker: "Jake", text: "Are you going to earn a lot of money?" },
          { speaker: "Mina", text: "I'm not going to earn much at first." },
          { speaker: "Jake", text: "I'm going to save my money for a new bike." },
          { speaker: "Mina", text: "It's going to be a busy summer!" },
          { speaker: "Jake", text: "But we're going to learn new skills." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "First Day at Work",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, I'm going to serve customers today." },
          { speaker: "Brian", text: "Are you going to manage the whole store?" },
          { speaker: "Sora", text: "No, I'm not going to manage it. I'm going to help the boss." },
          { speaker: "Brian", text: "I'm going to focus on learning this month." },
          { speaker: "Sora", text: "It's going to be tiring but useful." },
          { speaker: "Brian", text: "I'm not going to quit easily!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Winter Break Job",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, are you going to work during winter break?" },
          { speaker: "Jiho", text: "Yes, I'm going to hire at a café." },
          { speaker: "Emma", text: "I'm going to start my own business someday." },
          { speaker: "Jiho", text: "Are you going to earn tips?" },
          { speaker: "Emma", text: "I'm going to try! The customers are nice." },
          { speaker: "Jiho", text: "It's going to be a great experience." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Day Off",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, is it going to be your day off?" },
          { speaker: "Hana", text: "Yes! I'm not going to work this Saturday." },
          { speaker: "Tom", text: "I'm going to balance work and rest this semester." },
          { speaker: "Hana", text: "Are you going to apply for a new part-time job?" },
          { speaker: "Tom", text: "I'm not going to apply yet. I'm going to focus on school." },
          { speaker: "Hana", text: "That's a good balance!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Job Fair Voicemail",
        monologueType: "voicemail",
        lines: [
          { speaker: "", text: "Hi! This is a message about the summer job fair." },
          { speaker: "", text: "The fair is going to be at the school gym next Monday." },
          { speaker: "", text: "Many stores and businesses are going to hire students." },
          { speaker: "", text: "You're going to learn new skills easily." },
          { speaker: "", text: "It's going to be a great opportunity. Don't miss it!" },
          { speaker: "", text: "Please call us back if you have questions." },
        ],
      },
    ],
  },

  // --- L2 U7: Weather and Seasons (will / won't) ---
  "cr_2_7": {
    unitId: "cr_2_7", levelNumber: 2, unitNumber: 7, unitTopic: "Weather and Seasons",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Weather Forecast",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, it will rain tomorrow." },
          { speaker: "Jake", text: "Really? It won't be sunny?" },
          { speaker: "Mina", text: "No, the forecast says it will be cool all day." },
          { speaker: "Jake", text: "I will bring my sunscreen just in case." },
          { speaker: "Mina", text: "It won't be hot. You won't need sunscreen!" },
          { speaker: "Jake", text: "Will it snow this winter?" },
          { speaker: "Mina", text: "Yes, it will! We can build a snowman." },
          { speaker: "Jake", text: "That will be fun!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Spring Plans",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, the flowers will bloom in spring." },
          { speaker: "Brian", text: "Will the temperature be warm?" },
          { speaker: "Sora", text: "Yes, it will be about fifteen degrees." },
          { speaker: "Brian", text: "I will go hiking this spring." },
          { speaker: "Sora", text: "It won't rain much in April." },
          { speaker: "Brian", text: "Great! We will enjoy the sunshine." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Summer at the Beach",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, it will be very humid this summer." },
          { speaker: "Jiho", text: "I will turn on the air conditioner." },
          { speaker: "Emma", text: "Will you go to the beach?" },
          { speaker: "Jiho", text: "Yes! I will build a sandcastle." },
          { speaker: "Emma", text: "The sun will shine all day long." },
          { speaker: "Jiho", text: "I won't forget to grab my swimsuit!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Winter Storm",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, will there be a storm tonight?" },
          { speaker: "Hana", text: "Yes, it will snow until morning." },
          { speaker: "Tom", text: "I will turn on the heater." },
          { speaker: "Hana", text: "The snow won't melt soon." },
          { speaker: "Tom", text: "Will it be cold all week?" },
          { speaker: "Hana", text: "Yes, it will last long. Grab your coat!" },
        ],
      },
      {
        id: 5, type: "monologue", title: "Weather Forecast Report",
        monologueType: "news",
        lines: [
          { speaker: "", text: "Good morning! Here is today's weather forecast." },
          { speaker: "", text: "It will be cloudy this morning, but the sun will shine this afternoon." },
          { speaker: "", text: "The temperature will be about twenty degrees." },
          { speaker: "", text: "It won't rain today, but it will rain tomorrow." },
          { speaker: "", text: "This fall will be cool and beautiful." },
          { speaker: "", text: "Enjoy your day!" },
        ],
      },
    ],
  },

  // --- L2 U8: Health (should, must, have to) ---
  "cr_2_8": {
    unitId: "cr_2_8", levelNumber: 2, unitNumber: 8, unitTopic: "Health",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Feeling Sick",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, I have a headache and a sore throat." },
          { speaker: "Jake", text: "You should take medicine." },
          { speaker: "Mina", text: "I have a cold, too. My nose is runny." },
          { speaker: "Jake", text: "You must rest at home today." },
          { speaker: "Mina", text: "Do I have to go to the doctor?" },
          { speaker: "Jake", text: "Yes, you have to see a doctor. You should not stay up late." },
          { speaker: "Mina", text: "I don't have to go to school tomorrow?" },
          { speaker: "Jake", text: "No, you should rest. Take care of yourself!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "At the Doctor",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, you look sick. What's wrong?" },
          { speaker: "Brian", text: "I have a fever and a cough." },
          { speaker: "Sora", text: "You should take medicine and rest." },
          { speaker: "Brian", text: "I must not touch my face." },
          { speaker: "Sora", text: "You have to wear a mask." },
          { speaker: "Brian", text: "I should get better soon." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Healthy Habits",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, you should eat healthy food." },
          { speaker: "Jiho", text: "I know. I must not eat too much candy." },
          { speaker: "Emma", text: "You have to drink water every day." },
          { speaker: "Jiho", text: "I should not stay up late anymore." },
          { speaker: "Emma", text: "You don't have to go to the hospital if you eat well." },
          { speaker: "Jiho", text: "You're right. I must take care of my body!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Stomach Trouble",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, my stomach hurts." },
          { speaker: "Hana", text: "You should not push yourself too hard." },
          { speaker: "Tom", text: "I have to take a pill." },
          { speaker: "Hana", text: "You must rest on time. You should drink warm water." },
          { speaker: "Tom", text: "I must not catch a cold again." },
          { speaker: "Hana", text: "Take care! I hope you get better soon." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Health Tips Announcement",
        monologueType: "announcement",
        lines: [
          { speaker: "", text: "Attention, students! Here are some health tips." },
          { speaker: "", text: "You should wash your hands before meals." },
          { speaker: "", text: "You must not come to school if you have the flu." },
          { speaker: "", text: "You have to wear a mask when you cough." },
          { speaker: "", text: "You should take medicine on time." },
          { speaker: "", text: "Stay healthy and take care of yourselves!" },
        ],
      },
    ],
  },

  // --- L2 U9: Cooking (some/any/a lot of, sequence) ---
  "cr_2_9": {
    unitId: "cr_2_9", levelNumber: 2, unitNumber: 9, unitTopic: "Cooking",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Making Pasta",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, do we have any tomatoes?" },
          { speaker: "Jake", text: "Yes, we have some tomatoes and some cheese." },
          { speaker: "Mina", text: "We need a lot of pasta." },
          { speaker: "Jake", text: "We don't have any butter. I need to buy some." },
          { speaker: "Mina", text: "First, cut the onion. Then, add some oil to the pan." },
          { speaker: "Jake", text: "Do we need any salt?" },
          { speaker: "Mina", text: "Yes, add some salt and pepper." },
          { speaker: "Jake", text: "Finally, mix everything together!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Cooking Class",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, we need some butter for the recipe." },
          { speaker: "Brian", text: "Do we have any sugar?" },
          { speaker: "Sora", text: "Yes, there's a lot of sugar in the bottle." },
          { speaker: "Brian", text: "First, heat the pan. Then, pour some oil." },
          { speaker: "Sora", text: "We need two pieces of meat." },
          { speaker: "Brian", text: "Finally, add a lot of cheese on top!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Soup Recipe",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, do we have any potatoes?" },
          { speaker: "Jiho", text: "We have some potatoes. But we don't have any onion." },
          { speaker: "Emma", text: "First, boil some water in the pot." },
          { speaker: "Jiho", text: "Then, cut half a potato into slices." },
          { speaker: "Emma", text: "Add some salt and pepper." },
          { speaker: "Jiho", text: "Finally, fry the meat in another pan!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Baking Together",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, we need some sugar and a lot of butter." },
          { speaker: "Hana", text: "Do we have any cheese?" },
          { speaker: "Tom", text: "No, we don't have any cheese." },
          { speaker: "Hana", text: "First, mix the sugar and butter." },
          { speaker: "Tom", text: "Then, add some oil to the stove." },
          { speaker: "Hana", text: "Finally, heat it for ten minutes." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Cooking Show Guide",
        monologueType: "guide",
        lines: [
          { speaker: "", text: "Welcome to today's cooking class!" },
          { speaker: "", text: "We need some tomatoes, a lot of cheese, and some oil." },
          { speaker: "", text: "First, cut the tomatoes into small pieces." },
          { speaker: "", text: "Then, add some salt and pepper." },
          { speaker: "", text: "Heat the pan and pour some oil." },
          { speaker: "", text: "Finally, mix everything and enjoy your meal!" },
        ],
      },
    ],
  },

  // --- L2 U10: Social Media (adverbs, and/but/so) ---
  "cr_2_10": {
    unitId: "cr_2_10", levelNumber: 2, unitNumber: 10, unitTopic: "Social Media",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Online Safety",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, you should type your password carefully." },
          { speaker: "Jake", text: "I know, but I sometimes share it quickly." },
          { speaker: "Mina", text: "Don't reply to strangers rudely, and protect your account." },
          { speaker: "Jake", text: "I actually uploaded a photo, but I deleted it." },
          { speaker: "Mina", text: "You should post kindly, so others feel good." },
          { speaker: "Jake", text: "You're right. I will think carefully before I click." },
          { speaker: "Mina", text: "Being careful online is really important." },
          { speaker: "Jake", text: "I should take a break and go outside, too." },
        ],
      },
      {
        id: 2, type: "dialogue", title: "Comments and Followers",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, do you reply to comments kindly?" },
          { speaker: "Brian", text: "Yes, I always write clearly, but some people are mean." },
          { speaker: "Sora", text: "You shouldn't reply rudely, so just ignore them." },
          { speaker: "Brian", text: "I actually want to grow my followers." },
          { speaker: "Sora", text: "Post slowly and carefully, and people will follow." },
          { speaker: "Brian", text: "Thanks! I will explain my ideas clearly from now on." },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Downloading Apps",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, I downloaded a new app quickly." },
          { speaker: "Jiho", text: "You should search carefully, so you don't get a bad one." },
          { speaker: "Emma", text: "I understand. I was confident, but I should be more careful." },
          { speaker: "Jiho", text: "Protect your password, and don't click on strange links." },
          { speaker: "Emma", text: "I will read the comments slowly before I download." },
          { speaker: "Jiho", text: "That's actually a good idea!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Taking a Break",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, I scroll through social media too quickly." },
          { speaker: "Hana", text: "You should take a break, so you feel better." },
          { speaker: "Tom", text: "I understand, but it's hard to stop." },
          { speaker: "Hana", text: "Others use their phones carefully, and they feel good." },
          { speaker: "Tom", text: "I should actually upload less and enjoy real life." },
          { speaker: "Hana", text: "That's right! Be kind to yourself, too." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Digital Safety Ad",
        monologueType: "advertisement",
        lines: [
          { speaker: "", text: "Are you using social media safely?" },
          { speaker: "", text: "Type your password carefully, and don't share it with others." },
          { speaker: "", text: "Reply to comments kindly, so everyone feels welcome." },
          { speaker: "", text: "Don't click on strange links quickly." },
          { speaker: "", text: "Protect your account, and take a break sometimes." },
          { speaker: "", text: "Be safe, be kind, and enjoy the internet!" },
        ],
      },
    ],
  },

  // --- L2 U11: Time Travel (to-infinitive: adj, adv purpose, adj modifier) ---
  "cr_2_11": {
    unitId: "cr_2_11", levelNumber: 2, unitNumber: 11, unitTopic: "Time Travel",
    conversations: [
      {
        id: 1, type: "dialogue", title: "The Time Machine",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, I have something to show you." },
          { speaker: "Jake", text: "What is it? I'm curious to see!" },
          { speaker: "Mina", text: "I built a time machine to travel to the past." },
          { speaker: "Jake", text: "Wow! I want a chance to go back in time." },
          { speaker: "Mina", text: "I traveled to the past to fix a mistake." },
          { speaker: "Jake", text: "Were you glad to see your younger self?" },
          { speaker: "Mina", text: "I was grateful to say goodbye to my old toy." },
          { speaker: "Jake", text: "That sounds like an amazing journey!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "A Letter from the Future",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, I found a letter to read." },
          { speaker: "Brian", text: "Where did you find it?" },
          { speaker: "Sora", text: "It was from the future! I was surprised to see it." },
          { speaker: "Brian", text: "I would love a chance to write to my future self." },
          { speaker: "Sora", text: "I decided to return to the present." },
          { speaker: "Brian", text: "I'm glad to hear that. The present is good!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "Lost Teddy Bear",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, I traveled back to find my lost teddy bear." },
          { speaker: "Jiho", text: "Did you have a memory to look for?" },
          { speaker: "Emma", text: "Yes, I wanted something to remember my childhood." },
          { speaker: "Jiho", text: "Were you glad to find it?" },
          { speaker: "Emma", text: "I was so happy! I decided to leave the bracelet behind." },
          { speaker: "Jiho", text: "I wonder what it looks like now." },
        ],
      },
      {
        id: 4, type: "dialogue", title: "No Regrets",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, if I had a robot to help me, I'd travel forward." },
          { speaker: "Hana", text: "I went back to fix a regret." },
          { speaker: "Tom", text: "I'm curious to know what happened." },
          { speaker: "Hana", text: "I was grateful to see my old self again." },
          { speaker: "Tom", text: "There's only one chance to change something." },
          { speaker: "Hana", text: "That's why I'm glad to be here now." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Time Travel Guide",
        monologueType: "guide",
        lines: [
          { speaker: "", text: "Welcome to the Time Travel Museum!" },
          { speaker: "", text: "People traveled to the past to see lost memories." },
          { speaker: "", text: "Some had something important to find." },
          { speaker: "", text: "Others went forward to discover the future." },
          { speaker: "", text: "Everyone was curious to see what changed." },
          { speaker: "", text: "The best journey is the one you decide to take!" },
        ],
      },
    ],
  },

  // --- L2 U12: Vacations (before/after/when/while) ---
  "cr_2_12": {
    unitId: "cr_2_12", levelNumber: 2, unitNumber: 12, unitTopic: "Vacations",
    conversations: [
      {
        id: 1, type: "dialogue", title: "Planning the Trip",
        speakers: ["Mina", "Jake"],
        lines: [
          { speaker: "Mina", text: "Jake, I look up flights before I choose a hotel." },
          { speaker: "Jake", text: "I pack my suitcase after I check the list." },
          { speaker: "Mina", text: "Before we leave, we should buy souvenirs." },
          { speaker: "Jake", text: "When we arrive, let's go sightseeing first." },
          { speaker: "Mina", text: "I was worried before I took a flight for the first time." },
          { speaker: "Jake", text: "After I checked in, I was relieved." },
          { speaker: "Mina", text: "While we wait, let's review the tour plan." },
          { speaker: "Jake", text: "This vacation is going to be amazing!" },
        ],
      },
      {
        id: 2, type: "dialogue", title: "At the Airport",
        speakers: ["Sora", "Brian"],
        lines: [
          { speaker: "Sora", text: "Brian, I unpacked my luggage after I arrived." },
          { speaker: "Brian", text: "I was lonely while I waited at the airport." },
          { speaker: "Sora", text: "Before we check in, let's find the gate." },
          { speaker: "Brian", text: "When the plane took off, I was excited!" },
          { speaker: "Sora", text: "After we land, let's look for a local restaurant." },
          { speaker: "Brian", text: "I can't wait!" },
        ],
      },
      {
        id: 3, type: "dialogue", title: "The Hostel",
        speakers: ["Emma", "Jiho"],
        lines: [
          { speaker: "Emma", text: "Jiho, I chose a hostel before I booked the flight." },
          { speaker: "Jiho", text: "When I checked in, the view was beautiful." },
          { speaker: "Emma", text: "I watched the sunset while I lay on the beach." },
          { speaker: "Jiho", text: "After we unpack, let's go sightseeing!" },
          { speaker: "Emma", text: "Before we go, I want to buy a few souvenirs." },
          { speaker: "Jiho", text: "This is the best vacation abroad!" },
        ],
      },
      {
        id: 4, type: "dialogue", title: "Coming Home",
        speakers: ["Tom", "Hana"],
        lines: [
          { speaker: "Tom", text: "Hana, I was relieved after the flight landed." },
          { speaker: "Hana", text: "Before we left, I was worried about my luggage." },
          { speaker: "Tom", text: "When I carried my suitcase, it was so heavy!" },
          { speaker: "Hana", text: "While I was looking up reviews, I found a great local restaurant." },
          { speaker: "Tom", text: "After this trip, I want to go abroad again." },
          { speaker: "Hana", text: "Me too! Let's plan before the next vacation." },
        ],
      },
      {
        id: 5, type: "monologue", title: "Vacation Voicemail",
        monologueType: "voicemail",
        lines: [
          { speaker: "", text: "Hi! This is a message about your vacation package." },
          { speaker: "", text: "Before you travel, please check in online." },
          { speaker: "", text: "When you arrive at the airport, carry your passport." },
          { speaker: "", text: "After you check in at the hostel, enjoy the local sightseeing." },
          { speaker: "", text: "While you're on vacation, try a few local restaurants." },
          { speaker: "", text: "Have a great trip! Call us back if you have questions." },
        ],
      },
    ],
  },
};
