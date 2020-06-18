import { createAction, ActionType, createReducer } from 'typesafe-actions'


const UPDATE_INFO = 'myInfo/UPDATE_INFO';
const UPDATE_ME = 'myInfo/UPDATE_ME';
const UPDATE_OTHER = 'myInfo/UPDATE_OTHER';

export const updateInfo = createAction(UPDATE_INFO)<boolean>();
export const updateMe = createAction(UPDATE_ME)<Array<any>>();
export const updateOther = createAction(UPDATE_OTHER)<Array<any>>();

const actions = { updateInfo, updateMe, updateOther }

type MyInfoAction = ActionType<typeof actions>

type MyinfoState = {
  update:boolean
  moimMe:Array<any>
  moimOther:Array<any>
}

const initialState: MyinfoState = {
  update: false,
  moimMe:[],
  moimOther:[],
}

const myInfoStatus = createReducer<MyinfoState, MyInfoAction>(initialState, {
  [UPDATE_INFO]: (state: any, action: any) => {
    return {
      ...state,
      update: action.payload,
    }
  },
  [UPDATE_ME]: (state: any, action: any) => {
    return {
      ...state,
      moimMe: action.payload,
    }
  },
  [UPDATE_OTHER]: (state: any, action: any) => {
    return {
      ...state,
      moimOther: action.payload,
    }
  },
  
})
export default myInfoStatus
