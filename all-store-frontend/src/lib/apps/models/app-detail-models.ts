export interface DetailedAppModel {
    id: string;
    basic: {
        name: string;
        icon: string;
        stars: number;
        downloads: number;
        size: number;
    }
}