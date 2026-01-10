import fs from 'fs';
import path from 'path';

export interface ItineraryItem {
  day: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Tour {
  slug: string;
  title: string;
  location: string;
  price: string;
  duration: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  importantInfo: string[];
  faqs: FAQItem[];
  quickHighlights: {
    duration: string;
    hotel: string;
    meals: string;
    transport: string;
    groupType: string;
  };
}

const TOURS_DIR = path.join(process.cwd(), 'data/tours');

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const filePath = path.join(TOURS_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as Tour;
  } catch (error) {
    console.error(`Error fetching tour ${slug}:`, error);
    return null;
  }
}

export async function getAllTours(): Promise<Tour[]> {
  try {
    if (!fs.existsSync(TOURS_DIR)) return [];
    const files = fs.readdirSync(TOURS_DIR).filter(f => f.endsWith('.json'));
    const tours = files.map(file => {
      const content = fs.readFileSync(path.join(TOURS_DIR, file), 'utf8');
      return JSON.parse(content) as Tour;
    });
    return tours;
  } catch (error) {
    console.error('Error fetching all tours:', error);
    return [];
  }
}

export async function getAllTourSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(TOURS_DIR)) return [];
    const files = fs.readdirSync(TOURS_DIR).filter(f => f.endsWith('.json'));
    return files.map(file => file.replace('.json', ''));
  } catch (error) {
    console.error('Error fetching tour slugs:', error);
    return [];
  }
}
