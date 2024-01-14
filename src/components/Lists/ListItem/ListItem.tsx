import { IList } from "@interfaces/IList";
import styles from "./ListItem.module.css";
import useHandleSelectedList from "@state/hooks/useHandleSelectedList";

interface ListItemProps {
  list: IList
}

export default function ListItem({ list }: ListItemProps) {
  const handleSelectedList = useHandleSelectedList();
  return (
    <li
      className={`${styles.listItem} ${
        list.selected ? styles["listItem--selected"] : ""
      }`}
      onClick={() => handleSelectedList(list.id)}
    >
      {list.name}
    </li>
  );
}
