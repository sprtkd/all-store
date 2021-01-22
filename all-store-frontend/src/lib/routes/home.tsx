import GridAppList from "../app-group/app-list-grid";
import HorizontalAppList from "../app-group/app-list-horizontal";
import { AppMiniDetails } from "../app-group/models/app-models";
import Landing from "../harness/Landing";

function getDummyAppList(): AppMiniDetails[] {
  let list: AppMiniDetails[] = [
    {
      id: "41545",
      name: "Facebook",
      icon: "https://image.flaticon.com/icons/png/512/124/124010.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41546",
      name: "Instagram",
      icon: "https://image.flaticon.com/icons/png/512/174/174855.png",
      size: 2568974,
      stars: 4.2,
      downloads: 9035256355,
    },
    {
      id: "41547",
      name: "Youtube",
      icon: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c545.png",
      size: 435589,
      stars: 3.2,
      downloads: 48563,
    },
    {
      id: "41548",
      name: "Google Duo",
      icon: "https://assets.stickpng.com/thumbs/5e8ce423664eae0004085465.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41745",
      name: "Netflix",
      icon:
        "https://img2.pngio.com/download-free-png-netflix-app-icon-png-383430-free-icons-netflix-icon-png-2000_2000.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41515",
      name: "Flipkart",
      icon:
        "https://cdn.icon-icons.com/icons2/729/PNG/512/flipkart_icon-icons.com_62718.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "49545",
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

export default function Home() {
  return (
    <div>
      <Landing />
      <HorizontalAppList
        appList={getDummyAppList()}
        listName="Top New"
        listDescription="Exciting new apps"
      />
      <br />
      <GridAppList
        appList={getDummyAppList()}
        listName="Most Downloaded"
        listDescription="Flying off shelves"
      />
    </div>
  );
}
