export interface Book {
  id: string;
  title: string;
  authors: string[];
  publish_date: string;
  description: string;
  coverImage: string;
  typeTopic: string;  // 
  publish_place?: string;
  number_of_pages?: number | string; //same here
  language?: string;
}
