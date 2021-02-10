import "./neutext.css";

interface Props {
  namestring: string;
}

function BigText(props: Props) {
  return <div className="bigAppName neu-text">{props.namestring}</div>;
}

export default BigText;
