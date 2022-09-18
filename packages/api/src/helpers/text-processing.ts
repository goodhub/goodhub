import { removeStopwords } from 'stopword';
import { isSingular, singular } from 'pluralize';
import { Content } from '../types';

const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export const getKeywordsFromContent = (text: Content) => {
  const title = text.blocks[0].text;
  return getKeywords(title);
}

export const getKeywords = (text: string): string[] => {
  const titleLowercase = text.toLowerCase();
  const titleNoPunctuation = titleLowercase.replace(punctuation, '');
  const words = titleNoPunctuation.split(' ');
  const keywords = removeStopwords(words);
  const normalisedWords = keywords.map((word) => {
    if (isSingular(word)) return word;
    return singular(word);
  });
  return normalisedWords;
}