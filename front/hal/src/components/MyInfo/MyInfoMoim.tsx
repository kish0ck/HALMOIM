import React, { useEffect, useState } from 'react'
import MyInfoMember from './MyInfoMember'
import {
  Typography,
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Grid,
  Dialog,
  ListItemText,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  ListItemAvatar,
  Avatar,
  Button,
} from '@material-ui/core'
import Color from 'color'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import PlaceIcon from '@material-ui/icons/Place'
import WatchLaterIcon from '@material-ui/icons/WatchLater'
import StarIcon from '@material-ui/icons/Star'
import FaceIcon from '@material-ui/icons/Face'
import GroupIcon from '@material-ui/icons/Group'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import api from '../../apis/api'
import { useDispatch } from 'react-redux'
import { updateInfo } from '../../modules/myInfo'

interface Props {
  data: any
  showButton: boolean
}
const useStyles = (color: string) =>
  makeStyles({
    appBar: {
      position: 'relative',
    },
    popupTitle: {
      flex: '1',
      marginLeft: '16px',
    },
    mediaStyles: {
      width: '100%',
      height: '0px',
      paddingBottom: '75%',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    actionArea: {
      height: '100%',
      borderRadius: '16',
      transition: '0.2s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    card: {
      width: '108px',
      height: '100%',
      borderRadius: '8',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
      },
    },
    content: {
      backgroundColor: color,
      height: '56.8px',
      padding: '0px',
      textAlign: 'center',
      verticalAlign: 'middle',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Keania One',
      fontSize: '14px',
      color: '#fff',
      marginBlockStart: '0px',
      marginBlockEnd: '0px',
      paddingBottom: '0px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxHeight: '52px',
      wordBreak: 'break-all',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      paddingLeft: '3px',
      paddingRight: '3px',
    },
  })
const handleAddParticipate = async (e: React.MouseEvent, mid: any, uid: number | null) => {
  // console.log(mid, uid)
  e.preventDefault()
  await api
    .post('/moims/participate', {
      pid: 0,
      mid: mid,
      uid: uid,
    })
    .then((res: any) => {
      // console.log(res)
    })
}
const handleDelParticipate = async (e: React.MouseEvent, mid: any, uid: number | null, isDelete: boolean) => {
  // console.log(mid, uid)
  e.preventDefault()
  await api.delete('/moims/' + mid + '/users/' + uid + '/participate', {}).then((res: any) => {
    // console.log(res)
  })
  //isDelete상태 변경
  isDelete = !isDelete
}
const getJoinMoim = async (uid: any, setJoin: React.Dispatch<any>) => {
  await api.get('/moims/users/' + uid + '/participate', {}).then((res: any) => {
    setJoin(res.data.data)
  })
}

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />
})

const MyInfoMoim = ({ data, showButton }: Props) => {
  let user = JSON.parse(window.sessionStorage.getItem('user') || '{}')
  const color = data.state === true ? '#FDE26C' : '#75682f'
  const classes = useStyles(color)()
  const [open, setOpen] = React.useState(false)
  const [openMember, setOpenMember] = React.useState(false)
  const time = data.time.split(/[. : T -]/)
  const timetext = time[0] + '년 ' + time[1] + '월 ' + time[2] + '일 ' + time[3] + '시:+' + time[4] + '분까지'
  const hosttext = data.host.name + ' (' + data.host.birth + ' / ' + (data.host.gender === 1 ? '남성' : '여성') + ')'
  const [member, setMember] = useState([])
  const [update, setUpdate] = useState(false)

  const [join, setJoin] = useState(Array<any>())
  const [button, setButton] = useState(false)

  const isDelete = false

  const dispatch = useDispatch()
  const setUpdateList = (isupdate: boolean) => {
    dispatch(updateInfo(isupdate))
  }

  async function getMember(mid: Number) {
    await api.get('/moims/' + mid + '/participate', {}).then((res: any) => setMember(res.data.data))
  }

  useEffect(() => {
    if (update) {
      if (join.length > 0) {
        join.map((bool: any, index: number) => {
          if (bool.moim.mid === data.mid) {
            setButton(true)
          }
        })
      }
    } else {
      getMember(data.mid)
      getJoinMoim(user.uid, setJoin)
      setUpdate(true)
    }
  }, [join])

  const myInfoMemberList = member.map((dataM: any, index: number) => <MyInfoMember data={dataM} key={index} />)

  const handleClick = () => {
    setOpenMember(!openMember)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    if (!isDelete) {
      setUpdateList(false)
    }
  }
  return (
    <Grid item>
      <CardActionArea className={classes.actionArea} onClick={handleClickOpen}>
        <Card className={classes.card}>
          <CardMedia className={classes.mediaStyles} image={data.moimImg} />
          <CardContent className={classes.content} style={{ paddingBottom: '0px' }}>
            <Typography className={classes.title} variant={'h2'}>
              {data.title}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.popupTitle}>
              {data.title}
            </Typography>
            {showButton ? (
              button ? (
                <Button
                  autoFocus
                  color="secondary"
                  onClick={(e) => {
                    handleDelParticipate(e, data.mid, user.uid, isDelete)
                    setUpdate(false)
                    setButton(false)
                  }}
                >
                  취소
                </Button>
              ) : (
                <Button
                  autoFocus
                  color="inherit"
                  onClick={(e) => {
                    handleAddParticipate(e, data.mid, user.uid)
                    setUpdate(false)
                    setButton(true)
                  }}
                >
                  참가
                </Button>
              )
            ) : null}
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PlaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="장소" secondary={data.location} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WatchLaterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="시간" secondary={timetext} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <StarIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="설명" secondary={data.coment} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={hosttext} secondary={data.host.phone} />
          </ListItem>

          <ListItem button onClick={handleClick}>
            <ListItemAvatar>
              <Avatar>
                <GroupIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="참여자" />
            {openMember ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMember} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myInfoMemberList}
            </List>
          </Collapse>
        </List>
      </Dialog>
    </Grid>
  )
}

export default MyInfoMoim
