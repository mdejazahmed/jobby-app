import {AiOutlineSearch} from 'react-icons/ai'

import './index.css'

const SearchBar = props => {
  const {searchInput, onChangeInput, onEnterSearchIcon} = props

  const onClickSearchIcon = () => {
    onEnterSearchIcon(searchInput)
  }

  const onClickEnter = event => {
    if (event.key === 'Enter') {
      onClickSearchIcon()
    }
  }

  const onChangeSearchInput = event => {
    onChangeInput(event.target.value)
  }

  return (
    <div className="inputContainer">
      <div className="wrapper">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="inputBox"
          onChange={onChangeSearchInput}
          onKeyDown={onClickEnter}
        />
        <button
          data-testid="searchButton"
          type="button"
          className="searchBtn"
          onClick={onClickSearchIcon}
        >
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
