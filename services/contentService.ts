

import { WordCategory, DifficultyLevel, FlashCard, ConjugationTask, StoryTask } from '../types';
import { NOUNS, VERBS, ADJECTIVES, NUMBERS_CARDINAL, NUMBERS_ORDINAL, ADVERBS } from '../data/vocabData';
import { CONJUGATION_DATA } from '../data/conjugationData';
import { STORIES } from '../data/storyData';
import { getMistakes, getMastered } from './storageService';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getStaticFlashcards = async (category: WordCategory, level: DifficultyLevel): Promise<FlashCard[]> => {
  // Simulate network delay for effect (optional)
  await new Promise(resolve => setTimeout(resolve, 200));

  let sourceData: { serbian: string; hungarian: string; hungarianAlt: string[]; display?: string }[] = [];
  switch (category) {
    case WordCategory.NOUNS: sourceData = NOUNS[level] || NOUNS[1]; break;
    case WordCategory.VERBS: sourceData = VERBS[level] || VERBS[1]; break;
    case WordCategory.ADJECTIVES: sourceData = ADJECTIVES[level] || ADJECTIVES[1]; break;
    case WordCategory.NUMBERS_CARDINAL: sourceData = NUMBERS_CARDINAL[level] || NUMBERS_CARDINAL[1]; break;
    case WordCategory.NUMBERS_ORDINAL: sourceData = NUMBERS_ORDINAL[level] || NUMBERS_ORDINAL[1]; break;
    case WordCategory.ADVERBS: sourceData = ADVERBS[level] || ADVERBS[1]; break;
  }

  // --- SMART SHUFFLE LOGIC ---
  const savedMistakes = getMistakes(); // Words user struggled with
  const savedMastered = getMastered(); // Words user got right on first try
  
  // 1. Identify Priority Words (Mistakes available in this level)
  const priorityList = sourceData.filter(item => savedMistakes.includes(item.serbian));
  
  // 2. Identify New Words (Words NOT in Mistakes AND NOT in Mastered)
  const newList = sourceData.filter(item => 
    !savedMistakes.includes(item.serbian) && 
    !savedMastered.includes(item.serbian)
  );

  // 3. Identify Review Words (Mastered words, used as fallback if we run out of new ones)
  const reviewList = sourceData.filter(item => savedMastered.includes(item.serbian));

  // Construct Deck
  const deckSize = 10;
  let deck: typeof sourceData = [];

  // A. Add Priority Words (Mistakes) - up to 5 (50% of deck)
  const shuffledPriority = shuffle(priorityList);
  deck = [...deck, ...shuffledPriority.slice(0, 5)];

  // B. Fill remaining slots with New Words (Unseen)
  let remainingSlots = deckSize - deck.length;
  const shuffledNew = shuffle(newList);
  deck = [...deck, ...shuffledNew.slice(0, remainingSlots)];

  // C. If deck is still not full (e.g. user mastered almost everything), fill with Review Words
  remainingSlots = deckSize - deck.length;
  if (remainingSlots > 0) {
    const shuffledReview = shuffle(reviewList);
    deck = [...deck, ...shuffledReview.slice(0, remainingSlots)];
  }
  
  // Final shuffle of the assembled deck so mistakes aren't always at the start
  const finalSelection = shuffle(deck);

  return finalSelection.map((item, index) => ({
    id: `${category}-${level}-${index}-${Date.now()}`,
    serbian: item.serbian,
    hungarian: item.hungarian,
    hungarianAlt: item.hungarianAlt,
    display: item.display
  }));
};

export const getStaticConjugationTask = async (level: DifficultyLevel): Promise<ConjugationTask> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const tasks = CONJUGATION_DATA[level] || CONJUGATION_DATA[1];
  const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  return randomTask;
};

export const getStaticStoryTask = async (level: DifficultyLevel): Promise<StoryTask> => {
  await new Promise(resolve => setTimeout(resolve, 200));

  const stories = STORIES[level] || STORIES[1];
  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  return randomStory;
};

export const evaluateTranslationLocally = (correct: string, user: string): string => {
   return `
   Hvala na prevodu!
   
   Uporedite svoj prevod sa originalom:
   "${correct}"
   `;
};