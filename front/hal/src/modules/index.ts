import { combineReducers } from 'redux'
import moim from './moim'
import myInfo from './myInfo'

const rootReducer = combineReducers({
  moim,
  myInfo,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
