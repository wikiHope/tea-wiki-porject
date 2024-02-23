import { useState, useEffect } from 'react'
import Api from '../../store/api/axios-auth'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../store/modules/filter'
import PropTypes from 'prop-types'

function Select(props) {
  const [optionList, setOptionList] = useState([])
  const [selectedOption, setSelectedOption] = useState('')

  const dispatch = useDispatch()

  const setDefault = () => {
    setSelectedOption(props.default)
    dispatch(setFilter([props.model, props.default]))
  }

  useEffect(() => {
    setDefault()
    if (props.data) {
      setOptionList(props.data)
    } else {
      Api().get(props.url).then(response => {
        setOptionList(response.data)
      }).catch(error => {
        console.error('Error fetching data:', error)
      })  
    }
	}, [])

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
    dispatch(setFilter([props.model, event.target.value]))
  }

  return (
    <>
      <div className='form-floating'>
        <select className="form-control border-primary" id={props.model} value={selectedOption} onChange={handleChange}>
          <option value="">{ 'Seçiniz'}</option>
          {optionList && optionList.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}      
        </select>
        <label htmlFor={props.model}>{props.label}</label>
      </div>
    </>
  )
}

Select.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  model: PropTypes.string.isRequired,
  data: PropTypes.array,
  default: PropTypes.string.isRequired
}

export default Select
