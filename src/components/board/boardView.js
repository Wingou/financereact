import React, { Component } from 'react'
import { Board } from './board'
import { ActivatedCatsInput } from './categorieInput'
import { DateInput } from './datesInput'
import { SearchWordInput } from './searchInput'
import { NoBoard } from './noBoard'

export class BoardView extends Component {
  render () {
    const {
      years,
      months,
      filteredPrices,
      activatedCats,
      filteredCats,
      isAllYearsChecked,
      isAllMonthsChecked,
      isAllCatsChecked,
      searchOptions
    } = this.props
    const {
      isMultiYears,
      isMultiMonths,
      isMultiCats,
      searchWord,
      searchMin,
      searchMax
    } = searchOptions
    return (
      <div>
        <DateInput
          years={years}
          months={months}
          isAllYearsChecked={isAllYearsChecked}
          isAllMonthsChecked={isAllMonthsChecked}
          isMultiYears={isMultiYears}
          isMultiMonths={isMultiMonths}
        />

        <ActivatedCatsInput
          activatedCats={activatedCats}
          isAllCatsChecked={isAllCatsChecked}
          isMultiCats={isMultiCats}
        />

        <SearchWordInput
          searchWord={searchWord}
          searchMin={searchMin}
          searchMax={searchMax}
        />
        {filteredPrices.length !== 0 ? (
          <Board filteredPrices={filteredPrices} filteredCats={filteredCats} />
        ) : (
          <NoBoard />
        )}
      </div>
    )
  }
}
