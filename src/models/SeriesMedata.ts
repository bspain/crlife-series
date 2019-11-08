export interface SeriesData {
    ref: string,
    path: string
}

export interface SeriesEntry {
    name: string,
    path: string,
    data: SeriesData[]
}

export interface SeriesMetadata {
    series: SeriesEntry[]
}