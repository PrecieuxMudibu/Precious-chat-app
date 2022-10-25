import './searchBar.css';

import { BsSearch } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';

export default function SearchBar() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="middle-section__search-bar">
      <div className="middle-section__magnifying-glass">
        <BsSearch />
      </div>
      <input type="text" placeholder="Search" />
      <div className="middle-section__more">
        <FiMoreVertical />
      </div>
    </div>
  );
}
