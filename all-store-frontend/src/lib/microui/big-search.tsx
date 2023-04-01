import "./neutext.css";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import React from "react";
import { BasicDeviceModel } from "../devices/models/device-models";
import {
  ButtonBase,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { BACKEND_API } from "../utils/env";
import { axiosErrorHandler } from "../utils/error-handler";
import InfoIcon from "@material-ui/icons/Info";
import throttle from "lodash/throttle";

function BigSearch() {
  const [value, setValue] = React.useState<BasicDeviceModel | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<BasicDeviceModel[]>([]);

  function callDeviceApi(
    input: string,
    callback: (results?: BasicDeviceModel[]) => void
  ) {
    const DEVICE_SEARCH_URI = "/devices/search?searchkey=";
    axios
      .get(BACKEND_API + DEVICE_SEARCH_URI + input)
      .then((response) => callback(response.data))
      .catch((error) => axiosErrorHandler(error, "device search failed"));
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: BasicDeviceModel[]) => void
        ) => {
          //call
          console.log(request.input);
          callDeviceApi(request.input, callback);
        },
        1000
      ),
    []
  );

  React.useEffect(() => {
    let active = true;
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results?: BasicDeviceModel[]) => {
      if (active) {
        let newOptions: BasicDeviceModel[] = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-main",
    options: options,
    getOptionLabel: (option) => option.name,
    value: value,
    clearOnBlur: false,
    onChange: (event: any, newValue: BasicDeviceModel | null) => {
      setOptions(newValue ? [newValue, ...options] : options);
      setValue(newValue);
    },
    onInputChange: (event, newInputValue) => {
      setInputValue(newInputValue);
    },
  });
  return (
    <div className="finder-container">
      <div className="finder">
        <div className="finder__outer">
          <div className="finder__inner" {...getRootProps()}>
            <SearchIcon className="finder__icon" fontSize="large" />
            <label {...getInputLabelProps()}></label>
            <input
              className="finder__input"
              type="text"
              placeholder="Search Phones, Roms and More"
              {...getInputProps()}
            />
          </div>
          <RenderOptionList listOfOptions={options} inputValue={inputValue} />
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  searchDetailsRoot: {
    minHeight: 150,
    maxHeight: 400,
    padding: 25,
    borderRadius: 20,
    justifyContent: "center",
    textAlign: "center",
    background: "#ededed",
    zIndex: 10,
    top: "7rem",
    position: "absolute",
    overflow: "auto",
    width: "calc(100% - 6em)",
  },
  searchHeader: {
    color: "#7a7a7a",
    fontSize: "2em",
    fontWeight: 500,
    fontFamily: "sans-serif",
    padding: "0.5em",
  },
  searchItem: {
    background: "#f2f2f2",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "inset 6px 6px 10px #d1d1d1, inset -6px -6px 10px #ffffff",
    borderRadius: 10,
    "&:hover": {
      background: "#ffffff",
    },
    height: "5em",
    cursor: "pointer",
  },
  itemImage: {
    resizeMode: "contain",
    flex: 1,
    height: "100%",
    width: "auto",
  },
  itemImageContainer: {
    height: "4em",
    marginLeft: "1.5em",
  },
  itemHeader: {
    width: "100%",
    color: "#7a7a7a",
    fontSize: "min(3vw,1.2em)",
    fontWeight: 500,
    paddingTop: 5,
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "1.1em",
    lineHeight: "1.1em",
  },
});

function RenderOptionList(props: {
  listOfOptions: BasicDeviceModel[];
  inputValue: string;
}) {
  const classes = useStyles();
  return props.inputValue.length > 0 ? (
    <Paper className={classes.searchDetailsRoot}>
      {props.listOfOptions.length > 0 ? (
        <div>
          <div className={classes.searchHeader}>
            Results &nbsp;
            <HtmlTooltip title="Device results are powered by looking up GSMArena">
              <Chip icon={<InfoIcon />} label="from GSMArena" />
            </HtmlTooltip>
          </div>
          <Grid container spacing={2}>
            {props.listOfOptions.map((option) => (
              <RenderOptionItem optionItem={option} />
            ))}
          </Grid>
        </div>
      ) : (
        <div className={classes.searchHeader}>No Results Found</div>
      )}
    </Paper>
  ) : null;
}

function RenderOptionItem(props: { optionItem: BasicDeviceModel }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6}>
      <Paper className={classes.searchItem}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className={classes.itemImageContainer}>
              <HtmlTooltip
                interactive
                title={
                  <React.Fragment>
                    <Typography color="inherit">Device Details</Typography>
                    {props.optionItem.description}
                    <a
                      href={
                        "https://www.gsmarena.com/" + props.optionItem.full_url
                      }
                      target="_blank"
                    >
                      <br />
                      GSMArena Link for this device
                    </a>
                  </React.Fragment>
                }
              >
                <img
                  className={classes.itemImage}
                  alt="device"
                  src={props.optionItem.img}
                />
              </HtmlTooltip>
            </div>
          </Grid>
          <Grid item xs={8} container>
            <Typography
              gutterBottom
              className={classes.itemHeader}
              component="div"
            >
              {props.optionItem.name}
            </Typography>
            <Typography variant="body2" gutterBottom style={{ width: "100%" }}>
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                icon={<GetAppIcon />}
                label={
                  (props.optionItem.roms ? props.optionItem.roms : 0) +
                  " Roms Available"
                }
              />
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

export default BigSearch;
