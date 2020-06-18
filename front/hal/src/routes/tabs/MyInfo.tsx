import React, { useEffect } from 'react'
import Profile from '../../components/Profile/Profile'
import api from '../../apis/api'
import MyInfoMoimList from '../../containers/MyInfoMoimList'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../modules'
import { updateInfo, updateMe, updateOther } from '../../modules/myInfo'
import '../../App.css'

const MyInfo = (props: any) => {
  const update = useSelector((state: RootState) => state.myInfo.update)
  const moimMe = useSelector((state: RootState) => state.myInfo.moimMe)
  const moimOther = useSelector((state: RootState) => state.myInfo.moimOther)

  const dispatch = useDispatch()
  const setUpdate = (isupdate: boolean) => {
    dispatch(updateInfo(isupdate))
  }
  const setMoimMe = (moims: Array<any>) => {
    dispatch(updateMe(moims))
  }
  const setMoimOther = (moims: Array<any>) => {
    dispatch(updateOther(moims))
  }

  async function getMoimMeList(uid: Number) {
    await api.get('/moims/make/users/' + uid, {}).then((res: any) => setMoimMe(res.data.data))
  }
  async function getMoimOtherList(uid: Number) {
    await api.get('/moims/join/users/' + uid, {}).then((res: any) => setMoimOther(res.data.data))
  }

  useEffect(() => {
    if (update) {
    } else {
      let user = JSON.parse(sessionStorage.getItem('user') || '{}')
      getMoimMeList(user.uid)
      getMoimOtherList(user.uid)

      setUpdate(true)
    }
  })

  return (
    <div>
      <Profile {...props} />
      <div className="wrapperInfo">
        <Typography gutterBottom variant="subtitle1" style={{ marginTop: '10px' }}>
          내가 개설한 모임
        </Typography>
        <MyInfoMoimList moims={moimMe} showButton={false} />
        <Divider variant="middle" />
        <Typography gutterBottom variant="subtitle1" style={{ marginTop: '10px' }}>
          내가 참여한 모임
        </Typography>
        <MyInfoMoimList moims={moimOther} showButton={true} />
      </div>
    </div>
  )
}

export default MyInfo
