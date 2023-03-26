import styles from '../../styles/SearchMenu.module.css';

import SearchMenuItem from './SearchMenuItem';

const SearchMenu = () => {
    return <div className={styles.searchMenu}>
        <ul>
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
        </ul>
    </div>
};

export default SearchMenu;
