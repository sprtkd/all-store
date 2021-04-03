import getDeviceDetails from "device-details";
import hash from 'object-hash';
import { getAllDevices, postNewDevice, postNewDeviceForExistingId } from "./device-api";
import { CurrentDeviceResponse, LocalStoredDevice } from "../models/device-models";

export async function getCurrentDevice(token: string) {
    let currDevice = getDeviceDetails();
    let localStoredDevice = getLocalStoredDevice();
    let retDevice: CurrentDeviceResponse;
    let retFingerPrint: string;
    let currDeviceHash = hash(currDevice);
    let apiError = undefined;
    if (localStoredDevice) {
        if (localStoredDevice.hash === currDeviceHash) {
            //its existing device, so return this only
            retFingerPrint = localStoredDevice.fingerprint;
        } else {
            //its new device with same id, some spec changed
            apiError = await postNewDeviceForExistingId(currDevice, localStoredDevice.fingerprint, token);
            retFingerPrint = localStoredDevice.fingerprint;
            setLocalStoredDevice({ fingerprint: retFingerPrint, hash: currDeviceHash });
        }
    } else {
        //its new device altogether
        let resp = await postNewDevice(currDevice, token);
        retFingerPrint = resp.fingerprint;
        apiError = resp.apiError;
        if (apiError === undefined) {
            setLocalStoredDevice({ fingerprint: retFingerPrint, hash: currDeviceHash });
        }
    }
    retDevice = { fingerprint: retFingerPrint, lasUsed: new Date(), ...currDevice, apiError: apiError };
    return retDevice;
}

export async function getOtherDevices(token: string) {
    let allDevicesResp = await getAllDevices(token);
    let localStoredDev = getLocalStoredDevice();
    allDevicesResp.otherDevices = allDevicesResp.otherDevices.filter(
        item => item.fingerprint != localStoredDev?.fingerprint);
    return allDevicesResp;
}

const LOCALSTORAGE_DEVICE_KEY = "lcStorageDevice";

function getLocalStoredDevice(): LocalStoredDevice | undefined {
    let localStoredDevice = localStorage.getItem(LOCALSTORAGE_DEVICE_KEY);
    if (localStoredDevice) {
        return JSON.parse(localStoredDevice);
    } else {
        return undefined;
    }
}

function setLocalStoredDevice(localStoredDevice: LocalStoredDevice) {
    localStorage.setItem(LOCALSTORAGE_DEVICE_KEY, JSON.stringify(localStoredDevice));
}