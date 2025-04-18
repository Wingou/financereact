import { toast } from 'react-toastify'
import { store } from '../store/store'
import { AddPriceInput } from '../types/common'
import { formatPriceSQL, formatTextSQL } from '../utils/helper'

export const handleCatIdInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const catId = e.target.value
  const action = {
    type: 'ADDPRICEINPUT_SET_CATID',
    payload: catId
  }
  store.dispatch(action)
}

export const handleObjIdInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const objId = e.target.value
  const action = {
    type: 'ADDPRICEINPUT_SET_OBJID',
    payload: objId
  }
  store.dispatch(action)
}

export const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const actionDate = e.target.value.split('T')[0]
  const action = {
    type: 'ADDPRICEINPUT_SET_DATE',
    payload: actionDate
  }
  store.dispatch(action)
}

export const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const valeur = e.target.value.replace(',', '.')
  if (!/^-?\d*\.?\d{0,2}$/.test(valeur)) {
    e.target.value = e.target.value.slice(0, -1)
  }

  const action = {
    type: 'ADDPRICEINPUT_SET_PRICE',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const action = {
    type: 'ADDPRICEINPUT_SET_COMMENT',
    payload: e.target.value
  }
  store.dispatch(action)
}

export const handleAddPrice = async (addPriceInput: AddPriceInput) => {
  const dataInput = {
    price: formatPriceSQL(addPriceInput.amount),
    objId: addPriceInput.objId,
    actionDate: addPriceInput.actionDate,
    comment: formatTextSQL(addPriceInput.comment)
  }

  try {
    const api = `http://localhost:3001/addPrice`
    const resp = await fetch(api, {
      method: 'POST',
      body: JSON.stringify(dataInput)
    })
    const rs = await resp.json()

    if (resp.status === 200) {
      toast.success(`Prix ${dataInput.price}€ ajouté !`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
        style: {
          fontFamily: 'Verdana',
          fontSize: '12px',
          width: '200px'
        }
      }
      )
    }
    else {
      toast.error('ERROR!')
    }

    store.dispatch({
      type: 'SET_PRICES_AFTER_ADD',
      payload: { ...addPriceInput, id: rs.rs }
    })
  } catch (error) {
    console.error('error addPrice :', error)
  }
}
