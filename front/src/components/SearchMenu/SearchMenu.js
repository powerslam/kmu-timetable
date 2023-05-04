import { useServiceState } from '../../lib/ServiceContext';
import SearchMenuItem from './SearchMenuItem';

const SearchMenu = () => {
    const state = useServiceState();

    return <div className={`Search-Menu ${ state.isMenuOpen ? "Slide-Menu-Show" : "Slide-Menu-Hide"}`}>
        <ul className="w-full h-full text-center">
            <div>나는 옵션이에요~</div>
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
            <SearchMenuItem />
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
