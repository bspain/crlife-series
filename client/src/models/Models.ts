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
  next: string;
  prev: string;
}
