import { DeviceDetails } from "device-details/lib/models";

export interface DeviceDetailsWrapped extends DeviceDetails {
    fingerprint: string;
    lasUsed: Date;
}

export interface CurrentDeviceResponse extends DeviceDetailsWrapped {
    apiError?: string;
}

export interface OtherDevicesResponse {
    otherDevices: DeviceDetailsWrapped[];
    apiError?: string;
}

export interface LocalStoredDevice {
    fingerprint: string;
    hash: string;
}

export interface BasicDeviceModel {
    name: string;
    full_url: string;
    img: string;
    description: string;
    roms: number;
}