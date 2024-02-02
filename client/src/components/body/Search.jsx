import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../../features/tweetSlice';
import { setInput } from '../../features/authSlice';

const Search = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.auth.searchText);
  const handleSearchInputChange = (e) => {
    dispatch(setInput({ fieldName: 'searchText', value: e.target.value }));
  };
  console.log('searchText', searchText);
  const handleSearch = () => {};
  return (
    <form action='' className='search-form flow-1'>
      <SearchIcon />
      <input
        type='text'
        name={'search'}
        value={searchText}
        placeholder='Search'
        onChange={(e) => handleSearchInputChange(e)}
      />
      <Button variant='contained'>Search</Button>
    </form>
  );
};

export default Search;
