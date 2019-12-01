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
  
  export interface EntryData { // Data contained within a series entry.json file.
    title: string;
    subtitle: string;
    navigation: NavigationItem[];
    content: ContentItem[];
  }
  
  export interface EntryLinks {
    next: string;
    prev: string;
  }
  
  export interface SeriesEntry extends EntryData, EntryLinks {}
  
  export interface SeriesEntryReference {
    ref: string;
    path: string;
  }
  
  export interface Series {
    name: string;
    path: string;
    data: SeriesEntryReference[];
  }
  
  export interface SeriesMetadata {
    series: Series[];
  }
  