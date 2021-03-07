import { getDeviceDetails } from "./utils/device-detector";

export default function ThisDevice() {
  return <div>{JSON.stringify(getDeviceDetails())}</div>;
}
