export interface AppMiniDetails {
    id: string;
    name: string;
    icon: string;
    stars: number;
    downloads: number;
    size: number;
}

export interface AppList {
    listName: string;
    listDescription?: string;
    appList: AppMiniDetails[];
}