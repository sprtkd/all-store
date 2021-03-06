import { Avatar, Chip } from "@material-ui/core";

export default function UserChip(props: {
  name: string;
  size: "small" | "medium";
}) {
  return (
    <Chip
      avatar={<Avatar>{props.name.charAt(0).toUpperCase()}</Avatar>}
      label={props.name}
      clickable
      color="primary"
      variant="outlined"
      size={props.size}
    />
  );
}
