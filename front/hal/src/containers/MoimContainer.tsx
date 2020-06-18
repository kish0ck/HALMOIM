import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../modules'
import { is_moims } from '../modules/moim'
import Moim from '../routes/tabs/Moim'

function MoimContainer() {
  const moim = useSelector((state: RootState) => state.moim.moim)
  const dispatch = useDispatch()

  const isMoims = (moim: Array<any>) => {
    dispatch(is_moims(moim))
  }

  return <Moim moim={moim} isMoims={isMoims} />
}

export default MoimContainer
