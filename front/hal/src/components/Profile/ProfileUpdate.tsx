import React, {useState, useEffect} from 'react'
import { Button, TextField, Grid, Container, Badge, CssBaseline, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../apis/api'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './Profile.css'

declare var kakao:any

const ProfileUpdate = ( props:any ) => {

  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const [phone, setPhone] = useState('');
  const [addr, setAddr] = useState('');
  const [base64Img, setBase64Img] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [description, setDescription] = useState('');
  const [phoneList, setphoneList] = useState(Array<String>());

   useEffect(() => {
    setPhone(user.phone);
    setAddr(user.addr);
    setLatitude(user.latitude);
    setlongitude(user.longitude);
    setProfileImg(user.profileImg);
    setDescription(user.description);

    // 핸드폰 전체목록 가져오기 (유효성확인)
    const userPhoneList = async() => {
      await api
      .get('/users/phonelist')
      .then( (res:any) => {
        setphoneList(res.data.data);
      })
    }
    userPhoneList();
   }, []);

  // ********
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    small: {
      width: '60%',
      height: '60%',
    },
    large: {
      width: '90%',
      height: '90%',
    },
    balloon: {
      margin: theme.spacing(2),
      alignItems: 'center',
      fontSize: '10px',
    },
    notchedOutline: {
      borderWidth: "2px",
      // borderColor: "orange !important"
      borderColor: "#6a60a9 !important"
    },
  }));
  const classes = useStyles();
  // ********
  
  const options = {
    enableHighAccuracy: true, 
    maximumAge: 30000, 
    timeout: 5000
  };

  function success(position: any) {
    const latitude  = position.coords.latitude;  // 위도
    const longitude = position.coords.longitude; // 경도
    
    const loc = new kakao.maps.services.Geocoder();
    loc.coord2Address(longitude, latitude, (result:any, status:any) => {
      if (status === kakao.maps.services.Status.OK) {
        alert(result[0].address.address_name);
        setAddr(result[0].address.address_name);
        setLatitude(latitude);
        setlongitude(longitude);
      }
    });

  }
  function error(err: any) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  // ************** 정보 수정 핸들러 시작 **************
  const handlePhone = (e:any) => {
    // 숫자 형식 변형
    const onlyNums = e.target.value.replace(/[^0-9]+/g, '');
    if(onlyNums.length <= 11) {
      setPhone(onlyNums);
    }

    // 핸드폰 번호 유효성 검사
    if(onlyNums.length === 11) {
      phoneList.map( (data:String, index:number) => {
        if(onlyNums === data && onlyNums !== user.phone) {
          alert("이미 등록된 번호입니다.");
          return;
        }
      })
    }
  }
  
  const handleAddr = (e:any) => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      console.warn("현재 위치를 표시 할 수 없습니다.")
    }
  }

  const handleDescription = (e:any) => {
    setDescription(e.target.value);
  }

  const handleProfileImg = (e:any) => {
    if(e.target.files[0]) { // 이거를 안해주면 취소 누를 때 에러 남
      // 사진 미리보기
      let reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        if (base64) {
          setBase64Img(base64.toString())
        }
      }
      reader.readAsDataURL(e.target.files[0])
      // 사진 저장
      setProfileImg(e.target.files[0]);
    }
  }

  const handleProfileUpdate = async(e:any) => {
    e.preventDefault();

    if(phone === '') {
      alert("핸드폰 번호를 입력해주세요");
      return;
    } else if(phone.length !== 11 || phone.substr(0,3) !== '010') {
      alert("핸드폰 번호를 정확히 입력해주세요.");
      return;
    } 
    else if(addr === '') {
      alert("지역을 확인해주세요.");
      return;
    }


    // 변경 사항이 있다면
    if(  phone !== user.phone
      || addr !== user.addr
      || latitude !== user.latitude
      || longitude !== user.longitude
      || profileImg !== user.profileImg
      || description !== user.description)
    {
      // formdata 셋팅
      let formdata = new FormData();
      formdata.append('phone', phone);
      formdata.append('addr',addr);
      formdata.append('latitude',latitude);
      formdata.append('longitude',longitude);
      formdata.append('profileImg',profileImg);
      formdata.append('description',description);
      formdata.append('uid', user.uid);

      await api
      .put('/users', formdata)
      .then( (res:any) => {
        // 세션스토리지 변경
        sessionStorage.setItem('user', JSON.stringify(res.data.data));
        props.history.push('/myInfo');
      })
    } else { // 변경사항이 없다면
      console.log("No Changes Profile!")
      props.history.push('/myInfo');
    }
  }
  // ************** 정보 수정 핸들러 끝 **************

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
            <Grid item xs>
              {/* 사 진 */}
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                className={classes.large}
                badgeContent={
                  // 사진 업로드
                  <Button className={classes.small} component="label">
                    <input id="profileImg" type="file" style={{display:"none"}} onChange={handleProfileImg}/>
                    <PhotoCameraIcon fontSize='large' className={classes.small} style={{backgroundColor: "white"}}/>
                  </Button>
                }
              >
                {/* 미리 보기 */}
                {base64Img === '' ? 
                // 기존사진 
                <Avatar alt="프로필 사진" src={profileImg} className={classes.large} />
                : 
                // 수정사진
                <Avatar alt="수정 사진" src={base64Img} className={classes.large}  />
                }
              </Badge>
              
              
            </Grid>

            {/* 설명 description */}
            <Grid item xs>
              <div className="arrow_box">
                <TextField className={classes.balloon}
                  InputProps={{ disableUnderline: true }} 
                  multiline={true} rows={5}
                  placeholder="소개글을 적어주세요!"
                  value={description}
                  onChange={handleDescription}
                  />
              </div>
            </Grid>
        </Grid>

        <hr style={{
          height: .9,
        }}/>

        <Grid container spacing={2}>

            {/* 성 함 */}
            <Grid item xs>
            <TextField
                color='secondary'
                id="name" label="성 함" name="name" required fullWidth
                variant="outlined"
                inputProps={{
                  readOnly: true,
                }}
                value={user.name} />
            </Grid>

            {/* 생일년도 */}
            <Grid item xs>
            <TextField
            color='secondary'
                id="birth"  label="생일년도" name="birth" required fullWidth 
                variant="outlined"  
                type="number"
                inputProps={{
                  readOnly: true,
                }}
                value={user.birth} />
            </Grid>

            {/* 성 별 */}
            <Grid item xs>
                <TextField
                color='secondary'
                variant="outlined" required fullWidth
                id="gender" label="성별" name="gender"
                inputProps={{
                  readOnly: true,
                }}
                value={user.gender === 1 ? '남자' : '여자'}
                />
            </Grid>

            {/* 핸드폰 번호 */}
            <Grid item xs={12}>
              <TextField
                variant="outlined" required fullWidth
                id="phone" label="핸드폰 번호" name="phone"
                error={phone === ''}
                InputProps={{
                  classes: {notchedOutline: classes.notchedOutline}
                }}
                value={phone}
                onChange={handlePhone}
                />
            </Grid>
            
            {/* 주소 */}
            <Grid item xs={12} sm={8}>
                <TextField
                variant="outlined" required fullWidth
                id="addr" label="지역" name="addr"
                InputProps={{
                  readOnly: true,
                  classes: {notchedOutline: classes.notchedOutline}
                }}
                value={addr} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                variant="outlined" color='secondary' size='large' style={{marginTop:5, marginLeft:5}}
                onClick={handleAddr}>위치변경</Button>
            </Grid>
        </Grid>
        

        {/* Register Submit */}
        <Button
          type="submit"  fullWidth variant="contained" color="primary" 
          className={classes.submit} onClick={handleProfileUpdate} >
          정보수정을 완료할래요!
        </Button>
      </div>
    </Container>
  )
}

export default ProfileUpdate
