import React from 'react';
import { Button, TextField, Grid, Container, CssBaseline, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Profile.css'

//interface Props extends RouteComponentProps {}

const Profile = ( props:any ) => {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  // ********
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
    large: {
      width: '90%',
      height: '90%',
    },
    balloon: {
      margin: theme.spacing(2),
      alignItems: 'center',
      fontSize: '10px',
    },
  }));
  const classes = useStyles();
  // ********
  
  const handleProfileUpdate = (e:any) => {
    props.history.push('/profileUpdate');
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Grid container spacing={1}>
            {/* 사 진 */}
            <Grid item xs>
              <Avatar alt="프로필 사진" src={user.profileImg}
                  className={classes.large} />
            </Grid>

            {/* 설 명 */}
            <Grid item xs>
              <div className="arrow_box">
                <TextField className={classes.balloon}
                  InputProps={{ disableUnderline: true }} 
                  multiline={true} rows={5}
                  inputProps={{
                    readOnly: true,
                  }}
                  value={user.description}
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
                inputProps={{
                  readOnly: true,
                }}
                value={user.phone}
                />
            </Grid>
            
            {/* 주소 */}
            <Grid item xs={12}>
                <TextField
                variant="outlined" required fullWidth
                inputProps={{
                  readOnly: true,
                }}
                id="addr" label="지역" name="addr" value={user.addr} />
            </Grid>
        </Grid>
        

        {/* Register Submit */}
        <Button
          type="submit"  fullWidth variant="contained" color="secondary" 
          className={classes.submit} onClick={handleProfileUpdate}>
          정보를 수정할래요!
        </Button>
      </div>
    </Container>
  )
}

export default Profile
