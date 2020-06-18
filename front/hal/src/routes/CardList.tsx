import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, CardContent, CardActions, Typography, withStyles, CardMedia } from '@material-ui/core'
import api from '../apis/api'
import { useDispatch } from 'react-redux'
import { updateInfo } from '../modules/myInfo'
type CardProps = {
  data: any
  classes: any
  setUpdate: React.Dispatch<boolean>
}
const styles: any = (muiBaseTheme: any) => ({
  card: {
    maxWidth: 'auto',
    margin: '10px',
    transition: '0.3s ease-in-out',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    borderRadius: '10px',
  },
  cardWrapper: {
    '&:active': {
      // boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
      transform: 'rotateY(180deg)',
      '& $front': {
        display: 'none',
      },
      '& $back': {
        display: 'block',
      },
    },
  },
  media: {
    width: '4',
    margin: 'auto',
    borderRadius: '10px',
  },
  content: {
    textAlign: 'left',
    // padding: muiBaseTheme.spacing(3),
    fontSize: '20px',
  },
  front: {
    width: '100%',
    height: '100%',
  },
  back: {
    width: '100%',
    height: '100%',
    display: 'none',
    transform: 'rotateY(-180deg)',
  },
  divider: {
    margin: `${muiBaseTheme.spacing(1)}px 0`,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '30px',
    margin: '0px',
  },
  subheading: {
    fontWeight: 'bold',
    lineHeight: 1.8,
    // fontSize: '0.9rem',
    fontSize: '25px',
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -muiBaseTheme.spacing(1),
    },
  },
  btn: {
    backgroundColor: '#FDE26C',
    color: 'black',
    width: '100%',
    fontSize: '20px',
  },
})

const CardList = ({ data, classes, setUpdate }: CardProps) => {
  const dispatch = useDispatch()
  const didMountRef = useRef(false)
  const [join, setJoin] = useState(Array<any>())
  const [button, setButton] = useState(false)
  const user = JSON.parse(window.sessionStorage.getItem('user') || '{}')
  const myInfoUpdate = (infoUpdate: boolean) => {
    dispatch(updateInfo(infoUpdate))
  }
  useEffect(() => {
    if (didMountRef.current) {
      if (join.length > 0) {
        join.map((bool: any, index: number) => {
          if (bool.moim.mid === data.mid) {
            setButton(true)
          }
        })
      }
    } else {
      getJoinMoim(user.uid, setJoin)
      didMountRef.current = true
    }
  }, [join, data])
  const time = data.time.split(/[. : T -]/)

  const handleAddParticipate = async (e: React.MouseEvent, mid: any, uid: number | null) => {
    e.preventDefault()
    await api
      .post('/moims/participate', {
        pid: 0,
        mid: mid,
        uid: uid,
      })
      .then((res: any) => {})
    myInfoUpdate(false)
  }
  const handleDelParticipate = async (e: React.MouseEvent, mid: any, uid: number | null) => {
    e.preventDefault()
    await api.delete('/moims/' + mid + '/users/' + uid + '/participate', {}).then((res: any) => {})
    myInfoUpdate(false)
  }
  const getJoinMoim = async (uid: number, setJoin: React.Dispatch<any>) => {
    await api.get('/moims/users/' + uid + '/participate', {}).then((res: any) => {
      setJoin(res.data.data)
    })
  }
  return (
    <>
      {data.state ? (
        <Card elevation={1} className={classes.card}>
          <div className={classes.cardWrapper}>
            <div className={classes.front}>
              <CardMedia className={classes.media} component={'img'} image={data.moimImg} />
              <CardContent className={classes.content}>
                <Typography className={classes.heading} variant={'h6'} gutterBottom>
                  {data.title}
                </Typography>
                <Typography className={classes.subheading} variant={'h6'}>
                  * {data.coment} *
                </Typography>
                <Typography className={classes.content} variant={'caption'}>
                  장소 : {data.location}
                  <br />
                </Typography>
                <Typography className={classes.content} variant={'caption'}>
                  시간 : {time[0]}년 {time[1]}월 {time[2]}일 <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {time[3]}시 {time[4]}분까지
                </Typography>
              </CardContent>
            </div>
            <div className={classes.back}>
              <CardMedia className={classes.media} component={'img'} image={data.moimImg} />
              <CardContent className={classes.content}>
                <Typography className={classes.heading} variant={'h6'} gutterBottom>
                  주최자 : {data.host.name}
                </Typography>
                <Typography className={classes.subheading} variant={'caption'}>
                  생년월일 : {data.host.birth}
                </Typography>
                <br />
                <Typography className={classes.subheading} variant={'caption'}>
                  성별 : {data.host.gender === 1 ? '남성' : '여성'}
                </Typography>
                <br />
                <Typography className={classes.subheading} variant={'caption'}>
                  연락처 : {data.host.phone}
                </Typography>
              </CardContent>
            </div>
          </div>
          <CardActions>
            {button ? (
              <Button
                style={{ width: '100%', fontSize: '20px', backgroundColor: '#eb9f9f', color: 'black' }}
                // style={{ width: '100%', fontSize: '20px'}}
                // color = 'secondary' variant = 'contained'
                onClick={(e: React.MouseEvent) => {
                  handleDelParticipate(e, data.mid, user.uid)
                  setUpdate(false)
                  didMountRef.current = false
                  setButton(false)
                }}
              >
                취소
              </Button>
            ) : (
              <Button
                style={{ width: '100%', fontSize: '20px' }}
                color="primary"
                variant="contained"
                onClick={(e: React.MouseEvent) => {
                  handleAddParticipate(e, data.mid, user.uid)
                  setUpdate(false)
                  didMountRef.current = false
                  setButton(true)
                }}
              >
                참가
              </Button>
            )}
            {/* <Typography style={{ display: 'inline-flex', flex: '1' }}>{data.count}명</Typography> */}
            <Typography style={{ position: 'absolute', right: '32px', color: 'white' }}>{data.count}명</Typography>
          </CardActions>
        </Card>
      ) : (
        <></>
      )}
      <br />
    </>
  )
}

export default withStyles(styles)(CardList)
