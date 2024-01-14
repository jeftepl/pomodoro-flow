import styles from "./Search.module.css";
import { useRecoilState } from "recoil";
import { searchState } from "@state/atom";

export default function Search() {
  const [search, setSearch] = useRecoilState<string>(searchState);

  return (
    <div className={styles.search}>
      <form className={styles.search__form}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Enter your search"
        />
      </form>
    </div>
  );
}
