
export interface TravelPreferences {
  destination: string;
  duration: number;
  budget: string;
  specificBudget: string;
  travelers: number;
  interests: string;
  restrictions: string;
}

export interface Activity {
  name: string;
  description: string;
  timeSlot?: string; // e.g., "Mañana", "Tarde"
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
  meals: {
    lunch: string;
    dinner: string;
  };
}

export interface Itinerary {
  tripTitle: string;
  summary: string;
  days: DayPlan[];
}
