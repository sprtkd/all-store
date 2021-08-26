import { Review } from './../../review/models/review-models';
export interface DetailedAppModel {
    id: string;
    basic: {
        name: string;
        downloads: number;
        size: number;
        version: string;
    },
    details: {
        miniAbout: string;
        about: string;
        alert: string[];
        lastUpdateAddition: string[];
        lastUpdatedOn: Date;
        releasedOn: Date;
    }
    vendor: {
        vendorId: string;
        vendorName: string;
        vendorUrl: string;
    },
    media: {
        icon: string;
        backDrop: string;
        carousel: string[];
    },
    flags: {
        isMobileFriendly: boolean;
        isSafeForKids: boolean;
        isBeta: boolean;
        isOpenSource: boolean;
        isAdSupported: boolean;
        hasInAppPurchase: boolean;
        isTrial: boolean;
        requiresHardwareAccess: boolean;
    },
    devicePermissions: string[];
    supportedDevices: string[];
    tags: string[];
    review: {
        stars: number;
        reviewCount: number;
        reviewId: Review[];
        reviewTags: string[];
    },
    appCategories: string[];
}