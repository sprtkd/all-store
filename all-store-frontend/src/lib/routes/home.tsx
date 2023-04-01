import GridAppList from "../app-group/app-list-grid";
import HorizontalAppList from "../app-group/app-list-horizontal";
import { AppMiniDetails } from "../app-group/models/app-models";
import Landing from "../harness/Landing";

function getDummyAppList(): AppMiniDetails[] {
  let list: AppMiniDetails[] = [
    {
      id: "41545",
      name: "Pixel Experience",
      icon: "https://www.saashub.com/images/app/service_logos/129/2mpo1lgp53oo/large.png?1580582508",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41546",
      name: "Havoc OS",
      icon: "https://a.fsdn.com/allura/p/havoc-os/icon?1589020935?&w=90",
      size: 2568974,
      stars: 4.2,
      downloads: 9035256355,
    },
    {
      id: "41547",
      name: "Arrow OS",
      icon: "https://stats.arrowos.net/static/images/ArrowLogo.svg",
      size: 435589,
      stars: 3.2,
      downloads: 48563,
    },
    {
      id: "41548",
      name: "Cherish OS",
      icon: "https://images.pling.com/cache/85x85-2/img/00/00/58/10/26/1512154/acd0d2a97a31b451711e51a6e114d4efb6d76715c28adc93aba0c8d49677032e52ee.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41745",
      name: "MIUI",
      icon: "data:image/jpeg;base64,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",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "41515",
      name: "Lineage OS",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LineageOS_Logo.svg/1200px-LineageOS_Logo.svg.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "49545",
      name: "Corvus OS",
      icon: "https://avatars.githubusercontent.com/u/54178640?s=200&v=4",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "49545",
      name: "Ancient OS",
      icon: "https://images.pling.com/cache/400x400/img/00/00/57/75/02/1424176/61e3a20fcbfe5b483b5c0a647bcceb2cbe1aa29426bca4e7453be904b8e6e84c83cf.png",
      size: 125555,
      stars: 4.2,
      downloads: 902563,
    },
    {
      id: "49545",
      name: "Resurrection Remix",
      icon: "https://resurrectionremix.com/img/rr-logo.png",
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
