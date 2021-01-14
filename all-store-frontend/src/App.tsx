import React from "react";
import HorizontalAppList from "./lib/app-group/app-list-horizontal";
import "./app.css";
import GridAppList from "./lib/app-group/app-list-grid";
import { AppMiniDetails } from "./lib/app-group/models/app-models";
import BigAppName from "./lib/microui/big-appname";
import BigSearch from "./lib/microui/big-search";

function getDummyAppList(): AppMiniDetails[] {
  let list: AppMiniDetails[] = [
    {
      id: "41545",
      name: "7zip - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41545",
      name: "7zip2 - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41545",
      name: "7zip3 - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41545",
      name: "7zip - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41545",
      name: "7zip - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41545",
      name: "7zip - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41545",
      name: "7zip - Easy unzip/compress files",
      icon:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/7-Zip_Icon.svg/1280px-7-Zip_Icon.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
  ];
  return list;
}

function App() {
  return (
    <div className="baseApp">
      <BigAppName />
      <BigSearch />
      <HorizontalAppList
        appList={getDummyAppList()}
        listName="Top New"
        listDescription="Exciting new apps"
      />
      <br />
      <GridAppList
        appList={getDummyAppList()}
        listName="Top New"
        listDescription="Exciting new apps"
      />
    </div>
  );
}

export default App;
