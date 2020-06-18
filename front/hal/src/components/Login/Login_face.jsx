import { useEffect } from 'react'
import * as faceapi from 'face-api.js'
import * as React from 'react'
import { Grid, Typography, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import CheckIcon from '@material-ui/icons/Check'

const videoStyle = {
  display: 'flex',
  height: '50vh',
  justifyContent: 'center',
  alignItems: 'center',
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '0 auto',
  },
  demo: {
    maxWidth: '48ch',
    backgroundColor: '#fffcf0',
    margin: '0 auto',
  },
  title: {
    marginTop: theme.spacing(7),
    alignItems: 'center',
  },
  contents: {
    alignItems: 'center',
  },
}))

const Login_face = (props) => {
  let videoRef = React.createRef()
  const phone = props.location.state.user.phone
  const classes = useStyles()

  const load_faceApi = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    ]).then(startVideo)
  }
  useEffect(() => {
    load_faceApi()
  }, [])

  async function startVideo() {
    const video = videoRef.current
    const constraints = { video: true }
    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream
    })

    // Canvas container 생성
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)

    // 영상을 화면에 표시
    //  const canvas = faceapi.createCanvasFromMedia(video)
    //  document.body.append(canvas)
    //  container.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    //  faceapi.matchDimensions(canvas, displaySize)
    // document.body.append("로그인 중 15초 동안 로그인 안될시 메인페이지로?")

    let timeCount = 0

    video.addEventListener('play', async () => {
      var repeat = setInterval(async () => {
        timeCount++
        // 얼굴과 라벨을 매칭
        const labeledFaceDescriptors = await loadLabeledImage()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

        //영상에서 얼굴을 식별한다
        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        const result = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor))

        // var login_flag = false;
        result.forEach((result, i) => {
          // const box = resizedDetections[i].detection.box
          // const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          // drawBox.draw(canvas)
          // console.log(result._label) 사진이름
          console.log(result._distance) //distance값

          if (result._label === phone && result._distance < 0.4) {
            // document.body.append('로그인 성공')
            //login_flag = true
            console.log('로그인 성공')
            //console.log('result._label :: ' + result._label)
            //console.log('distance :: ' + result._distance)
            clearInterval(repeat)

            // 비디오 스트림 정지
            //console.log(video.srcObject);
            let tracks = video.srcObject.getTracks()
            tracks.forEach(function (track) {
              track.stop()
            })
            video.srcObject = null

            // 세션에 유저정보 담기
            sessionStorage.setItem('user', JSON.stringify(props.location.state.user))
            // 페이지 이동
            props.history.push('/moim')
            return
          }
          //   else {
          //   setTimeout(() => {
          //     // document.body.append('로그인 실패')
          //     if (!login_flag) {
          //       console.log('10초 :: 로그인 실패')
          //       //console.log('result._label :: ' + result._label)
          //       //console.log('distance :: ' + result._distance)
          //       clearInterval(repeat)
          //       props.history.push('/')
          //     }
          //   }, 10000)
          // }
        })

        if (timeCount > 10) {
          console.log('10초 :: 로그인 실패')
          clearInterval(repeat)
          let tracks = video.srcObject.getTracks()
          tracks.forEach(function (track) {
            track.stop()
          })
          video.srcObject = null
          props.history.push('/')
        }
      }, 1000)
    })
  }

  function loadLabeledImage() {
    // 여기에 번호
    const labels = []
    labels.push(phone)
    // console.log(typeof(labels))
    return Promise.all(
      labels.map(async (label) => {
        const description = []
        //const img = await faceapi.fetchImage('user_img/' + label + '.png')
        const img = await faceapi.fetchImage(props.location.state.user.loginImg) // 서버이미지
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        description.push(detections.descriptor)
        return new faceapi.LabeledFaceDescriptors(label, description)
      })
    )
  }
  return (
    <div className={classes.root}>
      <Grid item xs={'auto'} md={'auto'}>
        <Typography variant="h5" className={classes.title} align="center">
          카메라를 응시해주세요.
        </Typography>
        <div style={videoStyle}>
          <video id="video" width="360" height="280" ref={videoRef} autoPlay muted />
        </div>
        <div className={classes.demo}>
          <List dense={false}>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="로그인 성공 시 자동으로 메인창으로 넘어갑니다." />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="로그인 실패 시 메인페이지로 돌아갑니다." />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="최대 15초 이상 걸릴 수 있으니 기다려주세요." />
            </ListItem>
          </List>
        </div>
      </Grid>
    </div>
  )
}

export default Login_face
