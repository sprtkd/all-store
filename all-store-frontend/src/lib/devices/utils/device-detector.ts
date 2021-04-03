import { DeviceDetails } from "../models/device";
import UAParser from 'ua-parser-js';

export function getDeviceDetails(): DeviceDetails {
    const allDetails = window.navigator;
    var parser = new UAParser();
    return {
        language: getLanguage(allDetails),
        browser: getBrowser(allDetails, parser.getResult()),
        os: getOs(parser.getResult()),
        hardware: getHardware(allDetails, parser.getResult()),
        platform: getPlatform(parser.getResult()),
        fingerprint: getFingerprint(allDetails, parser.getResult()),
        lastUsed: new Date()
    }
}

export function getDeviceName(device: DeviceDetails) {
    let devType = device.platform.type.replace(/\b[a-z]/g, (x) => x.toUpperCase());
    let modelString = device.platform.vendor === 'Unknown' ? '' : device.platform.vendor;
    modelString += device.platform.model === 'Unknown' ? '' : " " +
        (device.platform.model.length > 2 ? device.platform.model : devType);
    modelString = modelString.length > 0 ? modelString : device.os.name
        + " " + devType;
    return modelString;
}

function getLanguage(allDetails: Navigator): string {
    return allDetails.language;
}

function getBrowser(allDetails: Navigator, browserDetails: UAParser.IResult) {
    return {
        make: allDetails.vendor,
        name: fallback(browserDetails.browser.name),
        version: fallback(browserDetails.browser.version),
    };
}

function getOs(browserDetails: UAParser.IResult) {
    return {
        name: fallback(browserDetails.os.name),
        version: fallback(browserDetails.os.version),
    };
}

function getHardware(allDetails: Navigator, browserDetails: UAParser.IResult) {
    let ram: number = ((allDetails as any).deviceMemory);
    return {
        cpu: {
            architecture: fallback(browserDetails.cpu.architecture),
            cores: allDetails.hardwareConcurrency,
        },
        ram: ram ? ram : 0,
        screen: getScreen(allDetails),
        gpu: getGPU()
    }
}

function getGPU() {
    var canvas = document.createElement('canvas');
    var gl: any;
    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
        return "Unknown";
    }
    if (gl) {
        let gpu: string = gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);
        return parseGpuInfo(gpu);
    }
    return "Unknown";
}

function extractValue(reg: any, str: string) {
    const matches = str.match(reg);
    return matches && matches[0];
}

function parseGpuInfo(renderer: any) {
    return (extractValue(/(NVIDIA|AMD|Intel)\D*\d*\S*/, renderer) || renderer).trim();
}

function getScreen(allDetails: Navigator) {
    return {
        height: window.screen.height,
        width: window.screen.width,
        hasTouch: allDetails.maxTouchPoints > 0,
    };
}

function getPlatform(browserDetails: UAParser.IResult) {
    return {
        model: fallback(browserDetails.device.model),
        type: getDeviceType(browserDetails),
        vendor: fallback(browserDetails.device.vendor)
    };
}

function getDeviceType(browserDetails: UAParser.IResult) {
    if (browserDetails.device.type) { return browserDetails.device.type; }
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
}

function getFingerprint(allDetails: Navigator, browserDetails: UAParser.IResult) {
    return "a1b87c";
}

function fallback(detail: string | undefined) {
    return (detail ? detail : "Unknown");
}