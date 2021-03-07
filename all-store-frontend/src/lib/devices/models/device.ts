export interface DeviceDetails {
    language: string;
    browser: {
        make: string;
        name: string;
        version: string;
    }
    os: {
        name: string;
        version: string;
    };
    hardware: {
        cpu: {
            architecture: string;
            cores: number;
        };
        ram: number;
        screen: {
            height: number;
            width: number;
            hasTouch: boolean;
        }
    },
    platform: {
        model: string;
        type: string;
        vendor: string;
    }
}