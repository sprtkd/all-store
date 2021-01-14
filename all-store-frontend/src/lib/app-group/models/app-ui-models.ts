import { AppMiniDetails } from "./app-models";

export interface AppList {
    listName: string;
    listDescription?: string;
    appList: AppMiniDetails[];
}