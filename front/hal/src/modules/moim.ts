import { createAction, ActionType, createReducer } from 'typesafe-actions'

const IS_MOIMS = 'moim/IS_MOIMS'
// const IS_HOSTS = 'moim/IS_HOSTS'

export const is_moims = createAction(IS_MOIMS)<Array<any>>()
// export const is_hosts = createAction(IS_HOSTS)

const actions = { is_moims }

type MoimAction = ActionType<typeof actions>

type MoimState = {
  moim: Array<any>
}

const initialState: MoimState = {
  moim: [],
}

const moimStatus = createReducer<MoimState, MoimAction>(initialState, {
  [IS_MOIMS]: (state: any, action: any) => {
    return {
      ...state,
      moim: action.payload,
    }
  },
})
export default moimStatus
