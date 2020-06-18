import React, {useState} from 'react'

import { makeStyles,  Dialog, DialogTitle, DialogContent, Button, } from '@material-ui/core'
import Webcam from 'react-webcam';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    dialog: {
      textAlign: 'center',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > div': {
        width: '100%',
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
}))

const Registface = ( props ) => {
    const classes = useStyles();
    const ref = React.useRef();

    const [url, setUrl] = useState();
    const [retake, setRetake] = useState(false);

    const handleCapture = () => {
      const imgsrc = ref.current.getScreenshot();
      
      captureImage(imgsrc, (url) => {
        setUrl(url);
        setRetake(true);
      });

    }

    const captureImage = (imageBase64, cb) => {
      var img = new Image();
      img.src = imageBase64;
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, img.width , img.height );
        //ctx.rotate(rotation * (Math.PI / 180));
        ctx.drawImage(img, -img.width , -img.height );
        cb(canvas.toDataURL("image/png"))
      }
    };

    const handleClose = () => {
      props.setOpen(false);
    }

    const handleRetake = () => {
      setRetake(false);
    }
    const handleSave = () => {
      const file = dataURLtoFile(url, props.phone+".png");
      props.imgValue(file); // 부모 컴포넌트(Register.tsx)로 값을 넘긴다.
      handleClose(); // Dialog 닫기
    }

    // base64image -> file 변환 함수
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
            
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
        
      return new File([u8arr], filename, {type:mime});
    }
    

    const videoConstraints = {
      width:  200,
      height: 200,
      facingMode: "user"
    };

    return (
        <div>
            <Dialog
                //
                className={classes.dialog}
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >   
                <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <DialogTitle id="alert-dialog-title">얼굴 등록</DialogTitle>
                <DialogContent dividers>
                <div className={classes.root}>
                    {retake === false ?
                    <div>
                      <Webcam 
                        audio={false}
                        height={300}
                        width='100%'
                        ref={ref}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                      />
                      <Button variant="contained" color="primary" component="span" onClick={handleCapture}>
                        캡쳐하기
                      </Button>
                    </div>
                    : 
                    <div>
                      <img src={url} alt="dd"></img>
                      <canvas id="canvas" width='100%' style={{display: 'none'}}></canvas>
                      <br/><br/><br/>
                      <Button variant="contained" color="secondary" onClick={handleRetake}>다시찍기</Button> &nbsp;&nbsp;&nbsp;
                      <Button variant="contained" color="primary" onClick={handleSave}>저장하기</Button>
                    </div>
                    }
                </div>
                </DialogContent>
            </Dialog>
            </div>
    );
}


export default Registface