import React, {useState} from 'react'
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";
import { TextField, Button, Avatar, Typography, Container, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import api from '../apis/api'
import { makeStyles } from '@material-ui/core/styles';

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
    root: {
        //maxWidth: window.screen.width,
        maxWidth: 'xs',
        alignItems: 'center',
    },
    media: {
        height: window.screen.height/1.5,
    },
    contentColor: {
        backgroundColor: '#fffcf3'
    },
    large: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
  }));

const Mains = (history) => {

    const classes = useStyles();
    const [phone, setPhone] = useState('');
    
    const handlePhone = (e) => {
        // 숫자 형식 변형
        const onlyNums = e.target.value.replace(/[^0-9]+/g, '');
        if(onlyNums.length < 11) {
            setPhone(onlyNums);
        }
        else if (onlyNums.length === 11) {
        const number = onlyNums.replace(
            /(\d{3})(\d{4})(\d{4})/,
            '$1-$2-$3'
        );
        setPhone(number);
        }
    }

    const login = async (e) => {
        e.preventDefault(); // React.MouseEvent<any> | React.KeyboardEvent<HTMLDivElement>

        if(phone === '' || phone === null) {
        alert("핸드폰 번호를 입력해주세요!!");
        } else if(phone.length !== 13 || phone.substr(0,3) !== '010') {
        alert("정확한 핸드폰 번호를 입력해주세요..");
        setPhone('');
        } else {
        const num = phone.replace(/-/gi,'');
        await api
        .get('/users/login', {
            params: {
                phone: num
            }
        })
        .then( (res) => {  // res.data.data => User 정보
            if(res.data.data == null) {
            // 회원가입 페이지
            alert("등록된 정보가 없어요! 회원가입을 진행해 주세요!");
            history.push({
                pathname: '/register',
                state: { phone: num }
            })
            } else {
            // 로그인 페이지(얼굴인식)
            // sessionStorage.setItem('user', JSON.stringify(res.data.data));
            history.push({
                pathname: '/login_face',
                // pathname: '/moim',
                state: { user: res.data.data }
            });
            }
        })
        }
    } // login

    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © SSAFY 107팀'}
            <br/>
            {'김혜희 / 박성호 / 이학진 / 최현정 / 홍기석'}
            {/* {new Date().getFullYear()} */}
            {'.'}
          </Typography>
        );
    } // copyright

    return (
        <ReactFullpage 
        scrollOverflow={true}
        sectionsColor={["#fffcf0", "#fffcf0", "#fffcf0"]}
        //onLeave={this.onLeave.bind(this)}
        //afterLoad={this.afterLoad.bind(this)}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section section1">
              <Container component="main" maxWidth="sm">
                <img className={classes.large} src="maindefault.png" alt="mainimg" />
                <Typography component="h1" variant="h3" align="center">
                할 모 임
                </Typography>
                <TextField
                color = 'secondary'
                variant="outlined" margin="normal" required fullWidth
                id="phone" label="핸드폰 번호" name="phone" autoComplete="phone"
                value={phone}
                onKeyUp={(event) => {
                    if (event.key=== 'Enter') {
                    login(event);
                    }  
                }}
                onChange={handlePhone} autoFocus/>
                <Button
                id="login" type="submit" fullWidth variant="contained"
                color="primary" className={classes.submit}
                onClick={login}
                > 로그인 </Button>

                {/* CopyRight */}
                <Box mt={8}>
                    <Copyright/>
                </Box>
              </Container>
              </div>

              <div className="section">
                {/* Intro 1 */}
                {/* <Container component="main" > */}
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="http://imgnews.naver.net/image/5727/2019/03/11/0000000043_001_20190311155701622.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent className={classes.contentColor}>
                        <Typography gutterBottom variant="h5" component="h2">
                            노후를 즐겁게!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            지금은 동네 친구가 필요한 순간!
                            같은 관심사를 가진 사람들과 소통해 보세요!
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.contentColor}>
                    <Button onClick={() => fullpageApi.moveTo(1, 0)}>
                        로그인하기
                    </Button>
                    </CardActions>
                </Card>
                {/* </Container> */}
              </div>
              <div className="section">
                {/* Intro 2 */}
                {/* <Container component="main"> */}
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="https://ppss.kr/wp-content/uploads/2016/10/title_%EC%8B%9C%EB%8B%88%EC%96%B4.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent className={classes.contentColor}>
                        <Typography gutterBottom variant="h5" component="h2">
                            쉽고 간편하게!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            얼굴인식으로 편하게 로그인하세요! 주위 사람들과 편하게 대화해 보세요!
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.contentColor}>
                        <Button onClick={() => fullpageApi.moveTo(1, 0)}>
                            로그인하기
                        </Button>
                    </CardActions>
                </Card>
                {/* </Container> */}
              </div>
            </div>
          );
        }}
      />
    );
}


export default Mains