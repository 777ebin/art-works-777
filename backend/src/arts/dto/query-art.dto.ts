export class QueryArtDto {
  search?: string;
  category?: string;
  region?: string;
  artForm?: string;
  language?: string;
  status?: string;
  featured?: string;
  sensitive?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

