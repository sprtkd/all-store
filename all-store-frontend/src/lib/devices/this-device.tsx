import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import LaptopRoundedIcon from "@material-ui/icons/LaptopRounded";
import TabletAndroidRoundedIcon from "@material-ui/icons/TabletAndroidRounded";
import PhoneAndroidRoundedIcon from "@material-ui/icons/PhoneAndroidRounded";
import TouchAppRoundedIcon from "@material-ui/icons/TouchAppRounded";
import AndroidRoundedIcon from "@material-ui/icons/AndroidRounded";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import MemoryIcon from "@material-ui/icons/Memory";
import AmpStoriesIcon from "@material-ui/icons/AmpStories";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import LanguageIcon from "@material-ui/icons/Language";
import TranslateIcon from "@material-ui/icons/Translate";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useContext, useEffect, useState } from "react";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { AppleIcon, WindowsIcon } from "../microui/svg-icons-new";
import { getCurrentDevice, getOtherDevices } from "./utils/device-utils";
import ProgressContext from "../harness/ProgressContext";
import ToastContext from "../harness/ToastContext";
import UserContext from "../user/utils/UserContext";
import { generalToast } from "../utils/general-utils";
import { Skeleton } from "@material-ui/lab";
import { DeviceDetailsWrapped } from "./models/device-models";

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  heading: {
    fontSize: 15,
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: 15,
    color: "#8a8a8a",
  },
  header: {
    color: "#8a8a8a",
    fontWeight: 500,
    paddingTop: 10,
  },
  accordianRoot: {
    background: "#f2f2f2",
  },
  otherDevRoot: {
    background: "#f0f0f0",
    borderRadius: 20,
    boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
  },
  thisDeviceDiv: {
    textAlign: "center",
  },
  thisDevice: {
    minHeight: 220,
    width: 250,
    padding: 12,
    borderRadius: 20,
    justifyContent: "center",
    textAlign: "center",
    background: "#f0f0f0",
    boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
  },
  thisDeviceIcon: {
    fontSize: 150,
    color: "#adadad",
  },
  thisDeviceName: {
    fontWeight: 500,
    color: "#787878",
  },
  miniDeviceDetailsRoot: {
    minHeight: 90,
    minWidth: 205,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    textAlign: "center",
    background: "#f0f0f0",
    boxShadow: "6px 6px 10px #d1d1d1, -6px -6px 10px #ffffff",
  },
  miniDeviceDetailsIcon: {
    fontSize: 60,
    padding: 8,
    paddingRight: 0,
    color: "#adadad",
    margin: "auto",
  },
  miniDeviceDetailsHeader: {
    color: "#666666",
    fontWeight: 500,
    paddingRight: 8,
  },
  miniDeviceDetailsSubheader: {
    color: "#8a8a8a",
    fontWeight: 500,
    paddingRight: 8,
    maxWidth: 100,
  },
});

export default function ThisDevice() {
  const classes = useStyles();
  let progressBar = useContext(ProgressContext);
  let userContext = useContext(UserContext);
  let toastContext = useContext(ToastContext);
  const [thisDevDetails, setThisDevDetails] = useState<
    DeviceDetailsWrapped | undefined
  >(undefined);

  const [otherDevDetails, setOtherDevDetails] = useState<
    DeviceDetailsWrapped[] | undefined
  >(undefined);

  useEffect(() => {
    progressBar.setValue(true);
    getCurrentDevice(userContext.user.auth).then(function (response) {
      setThisDevDetails(response);
      if (response.apiError) {
        generalToast(toastContext, response.apiError, false);
      }
    });
    getOtherDevices(userContext.user.auth).then(function (response) {
      setOtherDevDetails(response.otherDevices);
      if (response.apiError) {
        generalToast(toastContext, response.apiError, false);
      }
      progressBar.setValue(false);
    });
  }, []);

  return (
    <div className={classes.root}>
      <br />
      <Typography variant="h3" gutterBottom className={classes.header}>
        This Device
      </Typography>
      <br />
      {!thisDevDetails && <Skeleton animation="wave" height={300} />}
      {thisDevDetails && <RenderAnyDevice device={thisDevDetails} />}
      <br /> <br /> <br />
      <Typography variant="h3" gutterBottom className={classes.header}>
        Other Devices
      </Typography>
      <br />
      {!otherDevDetails && (
        <div>
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
        </div>
      )}
      {otherDevDetails && (
        <RenderOtherDevices otherDeviceList={otherDevDetails} />
      )}
    </div>
  );
}

function RenderOtherDevices(props: {
  otherDeviceList: DeviceDetailsWrapped[];
}) {
  const [expanded, setExpanded] = useState<any>(false);
  const classes = useStyles();
  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Paper className={classes.otherDevRoot}>
      {props.otherDeviceList.map((otherDevice, index) => (
        <Accordion
          key={index}
          expanded={expanded === "panel" + index}
          onChange={handleChange("panel" + index)}
          className={classes.accordianRoot}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {otherDevice.deviceName + " (" + "dfdf" + ")"}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {"Last used: " + new Date()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RenderAnyDevice device={otherDevice} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}

function RenderAnyDevice(props: { device: DeviceDetailsWrapped }) {
  const classes = useStyles();
  let minorDetailRenderFns = [
    renderIDFunc,
    renderOsFunc,
    renderScreenFunc,
    renderCPUFunc,
    renderRAMFunc,
    renderGPUFunc,
    renderBrowserFunc,
    renderLanguageFunc,
  ];
  return (
    <div className={classes.thisDeviceDiv}>
      <Grid container spacing={3}>
        <Grid item>
          <RenderDevice device={props.device} />
        </Grid>
        <Grid container spacing={3} xs={12} sm item>
          {minorDetailRenderFns.map((minorDetailRenderFn, index) => (
            <Grid item key={index}>
              <RenderMiniDetails
                device={props.device}
                renderFunction={minorDetailRenderFn}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

function RenderMiniDetails(props: {
  renderFunction: any;
  device: DeviceDetailsWrapped;
}) {
  const classes = useStyles();
  let currDetails = props.renderFunction(props.device);
  return (
    <Paper className={classes.miniDeviceDetailsRoot}>
      <Grid container spacing={3}>
        <Grid item>
          <currDetails.icon className={classes.miniDeviceDetailsIcon} />
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.miniDeviceDetailsHeader}
          >
            {currDetails.header}
          </Typography>
          <Typography className={classes.miniDeviceDetailsSubheader}>
            {currDetails.subheader}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

function renderOsFunc(device: DeviceDetailsWrapped) {
  let osIco;
  if (device.os.name.toLowerCase() === "windows") {
    osIco = WindowsIcon;
  } else if (
    device.os.name.toLowerCase() === "ios" ||
    device.os.name.toLowerCase() === "macos"
  ) {
    osIco = AppleIcon;
  } else if (device.os.name.toLowerCase() === "android") {
    osIco = AndroidRoundedIcon;
  } else {
    osIco = AcUnitIcon;
  }
  return {
    icon: osIco,
    header: device.os.name,
    subheader: device.os.version,
  };
}

function renderScreenFunc(device: DeviceDetailsWrapped) {
  return {
    icon: AspectRatioIcon,
    header: (
      <div>
        Screen
        {device.hardware.screen.hasTouch && <TouchAppRoundedIcon />}
      </div>
    ),
    subheader:
      device.hardware.screen.width + "x" + device.hardware.screen.height,
  };
}

function renderCPUFunc(device: DeviceDetailsWrapped) {
  return {
    icon: MemoryIcon,
    header: device.hardware.cpu.cores + " Core CPU",
    subheader: device.hardware.cpu.architecture,
  };
}

function renderRAMFunc(device: DeviceDetailsWrapped) {
  return {
    icon: AmpStoriesIcon,
    header: "Memory",
    subheader: device.hardware.ram.size + " " + device.hardware.ram.unit,
  };
}

function renderGPUFunc(device: DeviceDetailsWrapped) {
  return {
    icon: SportsEsportsIcon,
    header: "Graphics",
    subheader: device.hardware.gpu.name,
  };
}

function renderBrowserFunc(device: DeviceDetailsWrapped) {
  return {
    icon: LanguageIcon,
    header:
      device.browser.name === "Unknown"
        ? device.browser.vendor
        : device.browser.name,
    subheader: device.browser.version,
  };
}

function renderLanguageFunc(device: DeviceDetailsWrapped) {
  return {
    icon: TranslateIcon,
    header: "Language",
    subheader: device.language,
  };
}

function renderIDFunc(device: DeviceDetailsWrapped) {
  return {
    icon: FingerprintIcon,
    header: "Unique ID",
    subheader: device.fingerprint,
  };
}

function RenderDevice(props: { device: DeviceDetailsWrapped }) {
  const classes = useStyles();
  let thisDevDetails = props.device;
  return (
    <Paper className={classes.thisDevice}>
      {thisDevDetails.platform.type === "desktop" && (
        <LaptopRoundedIcon className={classes.thisDeviceIcon} />
      )}
      {thisDevDetails.platform.type === "tablet" && (
        <TabletAndroidRoundedIcon className={classes.thisDeviceIcon} />
      )}
      {thisDevDetails.platform.type === "mobile" && (
        <PhoneAndroidRoundedIcon className={classes.thisDeviceIcon} />
      )}
      {!["desktop", "tablet", "mobile"].includes(
        thisDevDetails.platform.type
      ) && <PhoneAndroidRoundedIcon className={classes.thisDeviceIcon} />}
      <Typography variant="h5" className={classes.thisDeviceName}>
        {thisDevDetails.deviceName}
      </Typography>
    </Paper>
  );
}
