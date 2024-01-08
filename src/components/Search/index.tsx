import styles from "./Search.module.css";

export default function Search() {
  return (
    <div className={styles.search}>
      <form className={styles.search__form}>
        <label htmlFor="search">Search</label>
        <input type="text" id="search" placeholder="Enter your search"/>
      </form>
    </div>
  );
}
