


import { WordCategory, DifficultyLevel, FlashCard, ConjugationTask, StoryTask } from '../types';
import { NOUNS, VERBS, ADJECTIVES, NUMBERS_CARDINAL, NUMBERS_ORDINAL, ADVERBS } from '../data/vocabData';
import { CONJUGATION_DATA } from '../data/conjugationData';
import { STORIES } from '../data/storyData';
import { getMistakes } from './storageService';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getStaticFlashcards = async (category: WordCategory, level: DifficultyLevel): Promise<FlashCard[]> => {
  // Simulate network delay for effect (optional)
  await new Promise(resolve => setTimeout(resolve, 200));

  let sourceData: { serbian: string; hungarian: string; hungarianAlt: string[] }[] = [];
  switch (category) {
    case WordCategory.NOUNS: sourceData = NOUNS[level] || NOUNS[1]; break;
    case WordCategory.VERBS: sourceData = VERBS[level] || VERBS[1]; break;
    case WordCategory.ADJECTIVES: sourceData = ADJECTIVES[level] || ADJECTIVES[1]; break;
    case WordCategory.NUMBERS_CARDINAL: sourceData = NUMBERS_CARDINAL[level] || NUMBERS_CARDINAL[1]; break;
    case WordCategory.NUMBERS_ORDINAL: sourceData = NUMBERS_ORDINAL[level] || NUMBERS_ORDINAL[1]; break;
    case WordCategory.ADVERBS: sourceData = ADVERBS[level] || ADVERBS[1]; break;
  }

  // --- SMART SHUFFLE LOGIC ---
  const savedMistakes = getMistakes(); // Array of serbian words
  
  // 1. Separate source data into "Priority (Mistakes)" and "Standard"
  const priorityWords = sourceData.filter(item => savedMistakes.includes(item.serbian));
  const standardWords = sourceData.filter(item => !savedMistakes.includes(item.serbian));

  // 2. Decide how many priority words to include
  // We want up to 5 priority words (50% of the deck), or fewer if we don't have enough.
  const maxPriorityCount = 5; 
  const shuffledPriority = shuffle(priorityWords);
  const selectedPriority = shuffledPriority.slice(0, maxPriorityCount);

  // 3. Fill the rest of the 10 slots with standard words
  const slotsRemaining = 10 - selectedPriority.length;
  const shuffledStandard = shuffle(standardWords);
  const selectedStandard = shuffledStandard.slice(0, slotsRemaining);

  // 4. Combine and shuffle again so mistakes aren't always first
  const finalSelection = shuffle([...selectedPriority, ...selectedStandard]);

  return finalSelection.map((item, index) => ({
    id: `${category}-${level}-${index}-${Date.now()}`,
    serbian: item.serbian,
    hungarian: item.hungarian,
    hungarianAlt: item.hungarianAlt
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
   // Simple evaluation since we don't use AI
   return `
   Hvala na prevodu!
   
   Uporedite svoj prevod sa originalom:
   "${correct}"
   `;
};
