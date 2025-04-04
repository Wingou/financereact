import React from 'react'
import {
  handleUpdateYear,
  handleUpdateMonth,
  handleUpdateAllYears,
  handleUpdateAllMonths,
  handleUpdateMultipleYears,
  handleUpdateMultipleMonths
} from '../../actions/search'

export const DateInput = ({
  years,
  months,
  isAllYearsChecked,
  isAllMonthsChecked,
  multipleYearsChecked,
  multipleMonthsChecked
}) => (
  <div key='div_dateInput'>
    <div className='InputDiv'>
      <label key={'multipleYearsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'multipleYearsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleYears'
          checked={multipleYearsChecked}
          onChange={e => {
            handleUpdateMultipleYears(e)
          }}
        />
        MULTI
      </label>
      <label key={'allYearsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'allYearsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='allYears'
          checked={isAllYearsChecked}
          onChange={e => {
            handleUpdateAllYears(e)
          }}
        />
        ALL -
      </label>
      {years.map((y, index) => {
        return (
          <label key={'yearLabel_' + index} className='CheckboxLabel'>
            <input
              key={'yearInput_' + index}
              className='CheckboxInput'
              type='checkbox'
              name={y.year}
              checked={y.filtered}
              onChange={e => {
                handleUpdateYear(e)
              }}
            />
            {y.year}
          </label>
        )
      })}
    </div>
    <div className='InputDiv'>
      <label key={'multipleMonthsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'multipleMonthsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='multipleMonths'
          checked={multipleMonthsChecked}
          onChange={e => {
            handleUpdateMultipleMonths(e)
          }}
        />
        MULTI
      </label>
      <label key={'allMonthsLabel'} className='CheckboxLabel HeadLabel'>
        <input
          key={'allMonthsInput'}
          className='CheckboxInput'
          type='checkbox'
          name='allMonths'
          checked={isAllMonthsChecked}
          onChange={e => {
            handleUpdateAllMonths(e)
          }}
        />
        ALL -
      </label>
      {months.map((m, index) => {
        return (
          <label key={'monthLabel_' + index} className='CheckboxLabel'>
            <input
              key={'monthInput_' + index}
              className='CheckboxInput'
              type='checkbox'
              name={m.month}
              checked={m.filtered}
              onChange={e => {
                handleUpdateMonth(e)
              }}
            />
            {m.name}
          </label>
        )
      })}
    </div>
  </div>
)
