import Select from './ui/Select'
import DatePicker from './ui/DatePicker'
import CitiesData from '../data/cities'
import { useDispatch, useSelector } from 'react-redux'
import { setEvents } from '../store/modules/event'
import Api from '../store/api/axios-auth'
import * as Yup from 'yup'
import { setLoading } from '../store/modules/loading'
import { useEffect, useRef } from 'react'

function Filter() {
  const filterOptions = [
    {
      type: 'singleSelect',
      url: '/categories',
      label: 'Kategori',
      customClass: '',
      model: 'category',
      default: ''
    },
    {
      type: 'singleSelect',
      label: 'Şehir',
      customClass: '',
      model: 'city',
      data: CitiesData,
      default: ''
    },
    {
      type: 'datePicker',
      model: 'startDate',
      label: 'Başlangıç Tarihi',
      default: new Date().toISOString().split('T')[0]
    },
    {
      type: 'datePicker',
      model: 'endDate',
      label: 'Bitiş Tarihi',
      default: new Date('12/31/2024').toISOString().split('T')[0]
    }
  ]

  const isFirst = useRef(true)

  const filterValidationSchema = Yup.object().shape({
    startDate: Yup.date(),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'Bitiş tarihi başlangıç tarihinden önce olamaz.'),
    category: Yup.string().nullable(),
    city: Yup.string().nullable(),
  })

  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filter.filters)

  const handleFilterClick = () => {
    filterValidationSchema.validate(filters)
      .then(validData => {
        dispatch(setLoading(true))
        Api().post('/events/filter', {...validData}).then(response => {
          dispatch(setEvents(response.data))
          dispatch(setLoading(false))
        }).catch(error => {
          console.error('Error fetching data:', error)
          dispatch(setLoading(false))
        })    
      })
      .catch(validationError => {
        console.error('Validation error:', validationError.errors)
      })
  }

  useEffect(() => {
    if (isFirst.current) {
      handleFilterClick()
      isFirst.current = false
    }
  }, [filters])

  return (
    <>
      <div className='row mb-5 d-flex align-items-center justify-content-end'>
        {
          filterOptions.map((filter, index) => {
            if (filter.type === 'singleSelect') {
              return (
                <div key={index} className='col-lg-2 col-md-6 mb-3'>
                  <Select key={index} url={filter.url} label={filter.label} customClass={filter.customClass} model={filter.model} data={filter.data} default={filter.default}></Select>
                </div>
              )
            } else if (filter.type === 'datePicker') {
              return (
                <div key={index} className='col-lg-3 col-md-6 mb-3'>
                  <DatePicker key={index} label={filter.label} model={filter.model} default={filter.default}></DatePicker>
                </div>
              )
            }
          })
        }
        <div className='col-lg-1 col-md-2 col-sm-3 mb-3 text-end'>
          <button type="button" className="btn btn-lg btn-primary" onClick={handleFilterClick}>Bul</button>
        </div>
      </div>
    </>
  )
}

export default Filter
