import { WordCategory, DifficultyLevel, FlashCard, ConjugationTask, StoryTask } from '../types';
import { NOUNS, VERBS, ADJECTIVES } from '../data/vocabData';
import { CONJUGATION_DATA } from '../data/conjugationData';
import { STORIES } from '../data/storyData';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getStaticFlashcards = async (category: WordCategory, level: DifficultyLevel): Promise<FlashCard[]> => {
  // Simulate network delay for effect (optional)
  await new Promise(resolve => setTimeout(resolve, 200));

  let sourceData = [];
  switch (category) {
    case WordCategory.NOUNS: sourceData = NOUNS[level] || NOUNS[1]; break;
    case WordCategory.VERBS: sourceData = VERBS[level] || VERBS[1]; break;
    case WordCategory.ADJECTIVES: sourceData = ADJECTIVES[level] || ADJECTIVES[1]; break;
  }

  // Get 10 random items
  const selected = shuffle(sourceData).slice(0, 10);

  return selected.map((item, index) => ({
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