export interface NavigationItem {
  ref: string;
  value: string;
}

export interface ContentItem {
  id: string;
  value: string;
}

export interface Series {
  navigation: NavigationItem[];
  content: ContentItem[];
}
