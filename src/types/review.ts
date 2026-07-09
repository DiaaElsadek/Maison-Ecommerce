export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

export interface FAQQuestion {
  q: string;
  a: string;
}

export interface FAQSection {
  category: string;
  questions: FAQQuestion[];
}
