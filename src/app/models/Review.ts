export class Review {
  id: number;
  type: string;
  movieTitle: string;
  movieYear: string;
  movieGenre: string[];
  moviePlot: string;
  moviePoster: string;
  movieRating: string;
  userRating: number;
  review: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}