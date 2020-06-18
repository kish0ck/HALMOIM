import React, { useState } from 'react'
import { makeStyles, Theme, Dialog, DialogTitle, DialogContent, TextField, Button } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import convert from 'date-fns/locale/ko'
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers'
import api from '../apis/api'
import Moment from 'moment'

declare const daum: any
declare const kakao: any
const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    textAlign: 'center',
  },
  dialogContent: {
    padding: '0',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  title: {
    width: '80%',
  },
  previewNone: {
    margin: '0px auto',
    backgroundColor: '#efefef',
    width: '300px',
    maxWidth: '65vw',
    maxHeight: '25vh',
    height: '200px',
    border: 'solid 3px',
    borderColor: 'red',
  },
  preview: {
    margin: '0px auto',
    maxWidth: '65vw',
    maxHeight: '25vh',
  },
  btn: {
    variant: 'contained',
    backgroundColor: '#FDE26C',
  },
  btnPink: {
    variant: 'contained',
    backgroundColor: '#eb9f9f',
  },
}))

function MakeMoim(props: any) {
  const [location, setLocation] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [title, setTitle] = useState('')
  const [coment, setComent] = useState('')
  const [imgBase64, setImgBase64] = useState('')
  const [file, setFile] = React.useState<FileList | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
    //
  )
  const classes = useStyles()
  const user = JSON.parse(window.sessionStorage.getItem('user') || '{}')

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const handleComent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComent(event.target.value)
  }
  const handleClose = () => {
    setTitle('')
    setComent('')
    setFile(null)
    setImgBase64('')
    setLocation('')
    props.setOpen(false)
  }
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result
      if (base64) {
        setImgBase64(base64.toString())
      }
    }
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0])
      setFile(e.target.files)
    }
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (title === '' || location === '' || coment === '' || imgBase64 === '') {
      alert('모임 정보를 입력해 주세요')
    } else {
      const data = new FormData()
      data.append('mid', JSON.stringify(0))
      data.append('title', title)
      data.append('time', Moment(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
      data.append('location', location)
      data.append('state', JSON.stringify(true))
      data.append('latitude', latitude.toString())
      data.append('longitude', longitude.toString())
      data.append('coment', coment)
      if (file) {
        data.append('file', file[0])
      }
      data.append('uid', JSON.stringify(user.uid))
      // 만들기 전송
      await api.post('/moims', data).then((res) => {
        console.log(res)
      })
      handleClose()
    }
  }
  const post = async () => {
    await new daum.Postcode({
      oncomplete: function (data: any) {
        setLocation(data.address)
        const geocoder = new kakao.maps.services.Geocoder()
        geocoder.addressSearch(data.address, function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            setLatitude(result[0].y)
            setLongitude(result[0].x)
          }
        })
      },
    }).open()
  }

  return (
    <div>
      <Dialog
        //
        className={classes.dialog}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">모임 만들기</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div className={classes.root}>
            <div className={imgBase64 === '' ? classes.previewNone : classes.preview}>{imgBase64 === '' ? '' : <img className={classes.preview} src={imgBase64} alt="" />}</div>
            <input
              //
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImg}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="secondary" component="span">
                이미지 업로드
              </Button>
            </label>
            <br />
            <TextField className={classes.title} id="title" error={title === ''} label="제목" color="secondary" variant="outlined" value={title} onChange={handleTitle} />
            <br />
            <MuiPickersUtilsProvider locale={convert} utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.title}
                color="secondary"
                margin="normal"
                id="date-picker-dialog"
                label="모임 날짜"
                format="yyyy/MM/dd"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <br />
              <KeyboardTimePicker
                className={classes.title}
                color="secondary"
                margin="normal"
                format="HH:mm:ss"
                id="time-picker"
                label="모임 시간"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
            <br />
            <TextField
              className={classes.title}
              color="secondary"
              variant="outlined"
              error={location === ''}
              label="만날 장소를 검색해주세요."
              InputProps={{
                readOnly: true,
              }}
              value={location}
              onClick={post}
            ></TextField>
            <br />
            <TextField
              //
              className={classes.title}
              error={coment === ''}
              color="secondary"
              id="outlined-multiline-static"
              label="모임 설명"
              multiline
              value={coment}
              onChange={handleComent}
              variant="outlined"
            />

            <div>
              <Button className={classes.btnPink} onClick={handleClose}>
                취소
              </Button>
              &emsp;
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                만들기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MakeMoim
