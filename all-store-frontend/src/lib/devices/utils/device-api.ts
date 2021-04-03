import axios from "axios";
import { DeviceDetails } from "device-details/lib/models";
import { BACKEND_API } from "../../utils/env";
import { axiosErrorHandler } from "../../utils/error-handler";
import { OtherDevicesResponse } from "../models/device-models";

const DEVICE_URI = "/device";
const DEVICE_LAST_USED_URI = "/device/refreshuse";
const ALL_DEVICES_URI = "/devices";

const SUCCESS_DEVICE = "Device API successful";
const FAILED_DEVICE_API = "Device API failed";

export async function postNewDeviceForExistingId(device: DeviceDetails,
    deviceId: string, token: string) {
    try {
        await axios.post(BACKEND_API + DEVICE_URI + '/' + deviceId, device, {
            headers: {
                "access-token": token
            }
        });
        console.log(SUCCESS_DEVICE);
        return undefined;
    } catch (error) {
        return axiosErrorHandler(error, FAILED_DEVICE_API);

    }
}

export async function postNewDevice(device: DeviceDetails, token: string) {
    try {
        const response = await axios.post(BACKEND_API + DEVICE_URI, device, {
            headers: {
                "access-token": token
            }
        });
        console.log(SUCCESS_DEVICE);
        return { fingerprint: response.data };
    } catch (error) {
        return { fingerprint: "unknown", apiError: axiosErrorHandler(error, FAILED_DEVICE_API) };
    }
}

export async function getAllDevices(token: string): Promise<OtherDevicesResponse> {
    try {
        const response = await axios.get(BACKEND_API + ALL_DEVICES_URI, {
            headers: {
                "access-token": token
            }
        });
        console.log(SUCCESS_DEVICE);
        return { otherDevices: response.data, apiError: undefined };
    } catch (error) {
        return { otherDevices: [], apiError: axiosErrorHandler(error, FAILED_DEVICE_API) };
    }
}

export async function refreshDeviceLastUsed(deviceId: string, token: string) {
    try {
        const response = await axios.post(BACKEND_API + DEVICE_LAST_USED_URI + '/' + deviceId, {
            headers: {
                "access-token": token
            }
        });
        console.log(SUCCESS_DEVICE);
        return undefined;
    } catch (error) {
        return axiosErrorHandler(error, FAILED_DEVICE_API);
    }
}