export interface ICourse {
  id: number,
  description: string,
  iconUrl: string,
  courseListIcon: string;
  longDescription: string;
  category: 'BEGINNER' | 'ADVANCED',
  lessonsCount: number
}
