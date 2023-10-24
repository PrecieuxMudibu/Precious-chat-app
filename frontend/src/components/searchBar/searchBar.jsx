/* eslint-disable import/order */
import './searchBar.css';

// eslint-disable-next-line import/no-cycle

import { useNavigate } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { applicationContext } from '../../App';

export default function SearchBar() {
  const { setTextSearchInput } = useContext(applicationContext);
  const navigate = useNavigate();
  function search(e) {
    // setTextSearchInput(e.target.value);
    if (e.keyCode === 13) {
      if (window.location.pathname === '/search') {
        navigate('/ ');
      }
      navigate('/search');
      // axios({
      //   method: 'post',
      //   url: routeGetUsersSearched,
      //   headers: {
      //     Authorization: token,
      //   },
      // })
      //   .then((response) => {
      //     console.log('RESULTAT', response.data);
      //     console.log(window.location.pathname);
      //     if (window.location.pathname === '/')
      //       setConversations(response.data.users);
      //   })
      //   .catch((error) => console.error(error));
    }
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="middle-section__search-bar">
      <div className="middle-section__magnifying-glass">
        <BsSearch />
      </div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setTextSearchInput(e.target.value)}
        onKeyDown={(e) => search(e)}
      />
      {/* <input type="text" placeholder="Search" onChange={(e) => search(e)} /> */}
      <div className="middle-section__more">
        <FiMoreVertical />
      </div>
    </div>
  );
}
