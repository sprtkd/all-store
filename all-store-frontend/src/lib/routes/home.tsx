import GridAppList from "../app-group/app-list-grid";
import HorizontalAppList from "../app-group/app-list-horizontal";
import { AppMiniDetails } from "../app-group/models/app-models";
import Landing from "../harness/Landing";

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
        listName="Top New"
        listDescription="Exciting new apps"
      />
    </div>
  );
}
