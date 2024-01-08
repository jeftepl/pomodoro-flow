import Tasks from "@components/Tasks";
import styles from "./Widgets.module.css";
import Search from "@components/Search";
import Lists from "@components/Lists";

export default function Widgets() {
  return (
    <div className={styles.widgets}>
      <Search />
      <Lists />
      <Tasks />
    </div>
  )
}