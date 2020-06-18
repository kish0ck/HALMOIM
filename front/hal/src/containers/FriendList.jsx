import React from 'react'
import { ListView } from '@progress/kendo-react-listview'
import API, { websocketUri } from '../apis/api'
import FriendItem from '../components/Friend/FriendItem'
import ChatWindow from '../components/Chat/ChatWindow'
import DistanceSlider from '../components/Friend/DistanceSlider'
import incomingMessageSound from '../components/Chat/assets/sounds/notification.mp3'
import '../styles'
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import SockJsClient from 'react-stomp'

class FriendList extends React.Component {
  user = JSON.parse(sessionStorage.getItem('user') || '{}')

  constructor(props) {
    super(props)
    this.state = {
      friendsData: [],
      isOpen: false,
      // messageList: [],
      totalmessageList: {},
      receiver: '',
      roomId: '',
      dis: 3,
      // userId: this.user.uid ,
    }
    this.websocket = React.createRef()
    this._getFriendList = this._getFriendList.bind(this)
  }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound)
    audio.play()
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick()
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
        roomId: '',
      })
    }
  }

  async componentDidMount() {
    // Load async data.
    let userData = await API.get('users/'+this.user.uid+'/distance/'+this.state.dis)

    this.setState({
      ...this.state,
      friendsData: userData.data.data,
      userId: this.user.uid,
    })
  }

  async _getFriendList(dis) {
    let userData = await API.get('users/'+this.user.uid+'/distance/'+dis)

    this.setState({
      ...this.state,
      dis: dis,
      friendsData: userData.data.data,
    })
  }

  _openChatWindow = (flag, roomId, receiver, totalChatData) => {
    this.setState({
      ...this.state,
      isOpen: flag,
      receiver: receiver,
      roomId: roomId,
      totalmessageList: {
        ...this.state.totalmessageList,
        [roomId]: totalChatData,
      },
    })
  }

  // from Launcher를 사용하는 Chat.js 에서 가져옴
  _onMessageWasSent(message) {
    const chat = { message: '', type: '', time: new Date(), roomId: this.state.roomId, senderId: this.user.uid }

    if (message.type === 'text') {
      chat.message = message.data.text
      chat.type = 'text'
    } else if (message.type === 'emoji') {
      chat.type = 'emoji'
      chat.message = message.data.emoji
    }
    this.websocket.current.sendMessage('/app/sendMessage/' + this.state.roomId, JSON.stringify(chat))
  }

  MyCustomItem = (props) => <FriendItem {...props} userId={this.user.uid} openChatWindow={this._openChatWindow} />

  render() {
    var topics = []

    if (this.state.roomId.length > 0) {
      topics.push('/topic/roomId/' + this.state.roomId)
    }

    return (
      <div>
        <SockJsClient
          url={websocketUri}
          topics={topics}
          onMessage={(msg) => {
            var replytext
            if (msg.type === 'text') {
              replytext = { text: msg.message }
            } else {
              replytext = { emoji: msg.message }
            }

            var tmpMessageList = this.state.totalmessageList[this.state.roomId] === undefined ? [] : this.state.totalmessageList[this.state.roomId]
            tmpMessageList.push({
              author: msg.senderId === this.user.uid ? 'me' : 'them',
              type: msg.type,
              data: replytext,
            })
            this.setState({
              ...this.setState,
              totalmessageList: {
                ...this.state.totalmessageList,
                [this.state.roomId]: tmpMessageList,
              },
            })
          }}
          ref={this.websocket}
        />

        <DistanceSlider distance={this._getFriendList} text={'친구와의 거리'} />
        {this.state.friendsData.length > 0 ? (
          <ListView
            data={this.state.friendsData} //contacts : json데이터
            item={this.MyCustomItem}
            // item={ChatItem}
            style={{ width: '100%' }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>주변 {this.state.dis}km 내 친구가 존재하지 않습니다.</p>
          </div>
        )}

        <div id="chat-launcher">
          <ChatWindow
            messageList={this.state.totalmessageList[this.state.roomId]}
            onUserInputSubmit={this._onMessageWasSent.bind(this)}
            onFilesSelected={this.props.onFilesSelected}
            agentProfile={{
              teamName: this.state.receiver.name,
              imageUrl: this.state.receiver.profileImg, //프로필 사진
            }}
            isOpen={this.state.isOpen}
            onClose={this.handleClick.bind(this)}
            showEmoji={true}
          />
        </div>
      </div>
    )
  }
}

export default FriendList
