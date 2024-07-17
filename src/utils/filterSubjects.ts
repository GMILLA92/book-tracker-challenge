import { standardSubjects } from './standardSubjects';

export const filterSubjects = (subjects: string[]): string[] => {
  return subjects.filter(subject => standardSubjects.includes(subject));
};