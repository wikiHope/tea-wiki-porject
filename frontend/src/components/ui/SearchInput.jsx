import PropTypes from 'prop-types'
import { useState } from 'react'

function SearchInput(props) {
  const [keyword, setKeyword] = useState('');

  const onChangeHandler = (event) => {
    event.preventDefault()
    setKeyword(event.target.value)
  }

  const clickHandler = () => {
    props.clickHandler(keyword)
    setKeyword('')
  }

  return (
    <div className='search-wrapper'>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        aria-label={props.label}
        aria-describedby="basic-addon2"
        onChange={onChangeHandler}
        value={keyword}
      />
      <button
        id='searchButton'
        className="btn"
        type="button"
        onClick={clickHandler}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </button>
    </div>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  clickHandler: PropTypes.func
}

export default SearchInput
