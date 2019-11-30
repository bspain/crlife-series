export interface NavigationItem {
  ref: string;
  value: string;
}

export interface ContentItem {
  id: string;
  type: 'devotion' | 'passage';
  title: string;
  value: string;
}

export interface Series {
  title: string;
  subtitle: string;
  navigation: NavigationItem[];
  content: ContentItem[];
}

export interface LinkedSeries extends Series {
  next: string;
  prev: string;
}

export interface SeriesData {
  ref: string;
  path: string;
}

export interface SeriesEntry {
  name: string;
  path: string;
  data: SeriesData[];
}

export interface SeriesMetadata {
  series: SeriesEntry[];
}
