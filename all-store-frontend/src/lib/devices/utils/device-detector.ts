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
        platform: getPlatform(parser.getResult())
    }
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
        screen: getScreen(allDetails)
    }
}

function getScreen(allDetails: Navigator) {
    return {
        height: window.screen.availHeight,
        width: window.screen.availWidth,
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

function fallback(detail: string | undefined) {
    return (detail ? detail : "Unknown");
}