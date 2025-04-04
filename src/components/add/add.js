import { useState } from 'react'
import {
  handleAddPrice,
  handleCatIdInput,
  handleCommentInput,
  handleDateInput,
  handleObjIdInput,
  handlePriceInput
} from '../../actions/add'
import { CURRENT_DATE } from '../../constants/constants'
import { getCatById, getObjById } from '../../utils/helper'

export const AddForm = ({ props }) => {
  const { addPriceInput } = props

  const isObjetOK = addPriceInput.objId !== -1
  const isPriceOK =
    /^-?\d*\.?\d{0,2}$/.test(addPriceInput.priceValue) &&
    addPriceInput.priceValue !== '' &&
    addPriceInput.priceValue !== '-'

  const buttonOKTitle = !isObjetOK
    ? 'Objet manquant !'
    : !isPriceOK
    ? 'Prix incorrect !'
    : 'Valider'

  const buttonOKDisabled = !(isObjetOK && isPriceOK)

  const [comment_, setComment_] = useState(addPriceInput.comment)

  return (
    <div className='InputAdd_Form'>
      <div key={'Col1'} className='InputAdd_Col1'>
        <input
          key={'Input_Date'}
          className='InputAdd_Input_Date'
          type='date'
          name='dateAction'
          defaultValue={CURRENT_DATE}
          onChange={e => handleDateInput(e)}
        />

        <SelectCat props={props} />

        <SelectObj props={props} />
      </div>

      <div key={'Col2'} className='InputAdd_Col2'>
        <div key={'Col2_row1'} className='InputAdd_Col2_row1'>
          <div
            key={'Div_PriceAndCurrency'}
            className='InputAdd_Div_PriceAndCurrency'
          >
            <input
              key={'Input_Price'}
              className='InputAdd_Input_Price'
              type='text'
              name='price'
              placeholder='15.50'
              defaultValue={addPriceInput.priceValue}
              onChange={e => handlePriceInput(e)}
              pattern='/^-?\d*\.?\d{0,2}$/'
            />
            <input
              key={'Currency'}
              className='InputAdd_Input_Currency'
              type='text'
              defaultValue='€'
              disabled={true}
            />
          </div>
        </div>
        <div key={'Col2_row2'} className='InputAdd_Col2_row2'>
          <input
            key={'Input_Comment'}
            className='InputAdd_Input_Comment'
            type='text'
            name='comment'
            placeholder='Saisir un commentaire ici...'
            onBlur={e => handleCommentInput(e)}
            defaultValue={comment_}
          />
        </div>
        <div key={'Col2_row3'} className='InputAdd_Col2_row3'>
          <button
            className='InputAdd_Button_OK'
            onClick={() => {
              handleAddPrice(addPriceInput)
              return setComment_('')
            }}
            disabled={buttonOKDisabled}
            title={buttonOKTitle}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export const SelectCat = ({ props }) => {
  const { categories, addPriceInput } = props
  const cat = categories
    .filter(c => c.template === 0 && c.id > 0 && c.position !== null)
    .sort((a, b) => a.id > b.id)

  const catById = getCatById(categories, addPriceInput.catId)
  const catNameForTitle =
    catById.id === -1 ? 'Aucune catégorie sélectionnée' : catById.catName

  return (
    <select
      className='InputAdd_Select_Cat'
      value={addPriceInput.catId}
      onChange={e => handleCatIdInput(e)}
      title={catNameForTitle}
    >
      <option
        key={'option_catId_null'}
        value={-1}
        title='Aucune catégorie sélectionnée'
      >
        ¤ CATEGORIE ¤
      </option>
      {cat.map((cat_, index) => {
        return (
          <option
            key={'option_catId_' + index}
            value={cat_.id}
            title={cat_.catName}
          >
            {cat_.catName}
          </option>
        )
      })}
    </select>
  )
}

export const SelectObj = ({ props }) => {
  const { categories, objects, addPriceInput } = props

  const objectsAll = objects
    .filter(o => o.template === 0)
    .sort((a, b) => {
      return a.objName.localeCompare(b.objName)
    })

  const objectsByCatId =
    addPriceInput.catId === -1
      ? objectsAll
      : objects.filter(o => o.catId === addPriceInput.catId && o.template === 0)

  const objById = getObjById(objects, addPriceInput.objId)
  const objNameForTitle =
    objById.id === -1
      ? 'aucun objet sélectionné'
      : objById.objName +
        (addPriceInput.catId === -1 ? ' (' + objById.catName + ')' : '')

  const objLabel =
    '¤ OBJET ¤' +
    (addPriceInput.catId === -1
      ? ''
      : ' (' + getCatById(categories, addPriceInput.catId).catName + ')')

  return (
    <select
      className='InputAdd_Select_Obj'
      value={addPriceInput.objId}
      onChange={e => handleObjIdInput(e)}
      title={objNameForTitle}
    >
      <option
        key={'option_objId_null'}
        value={-1}
        title='Aucun objet sélectionné'
      >
        {objLabel}
      </option>
      {objectsByCatId.map((obj_, index) => {
        const objName =
          obj_.objName +
          (addPriceInput.catId !== -1 ? '' : ' (' + obj_.catName + ')')

        return (
          <option key={'option_objId_' + index} value={obj_.id} title={objName}>
            {objName}
          </option>
        )
      })}
    </select>
  )
}
