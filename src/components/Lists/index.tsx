import styles from "./Lists.module.css";
import useLists from "@state/hooks/useLists";
import ListsItem from "./ListsItem";
import ListsForm from "./ListsForm";

export default function Lists() {
  const lists = useLists();

  return (
    <div className={styles.lists}>
      <h2 className={styles.lists__title}>Lists</h2>
      <ListsForm textAction="Add" />
      <ul>
        {lists.map((list) => (
          <ListsItem key={list.id} list={list} />
        ))}
      </ul>
    </div>
  );
}
