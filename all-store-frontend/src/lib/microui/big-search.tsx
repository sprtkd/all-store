import "./neutext.css";
import SearchIcon from "@material-ui/icons/Search";

function BigSearch() {
  return (
    <div className="finder-container">
      <div className="finder">
        <div className="finder__outer">
          <div className="finder__inner">
            <SearchIcon className="finder__icon" fontSize="large" />
            <input className="finder__input" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigSearch;
