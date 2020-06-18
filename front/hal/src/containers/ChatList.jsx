import React from 'react'
import { ListView } from '@progress/kendo-react-listview'
import API, { websocketUri } from '../apis/api'
import ChatItem from '../components/Chat/ChatItem'
import ChatWindow from '../components/Chat/ChatWindow'
import incomingMessageSound from '../components/Chat/assets/sounds/notification.mp3'
import '../styles'
import '../styles/all.css'
import '../styles/bootstrap.min.css'
import SockJsClient from 'react-stomp'

class ChatList extends React.Component {
  user = JSON.parse(sessionStorage.getItem('user') || '{}')

  constructor(props) {
    super(props)
    this.state = {
      receiverData: [],
      isOpen: false,
      // messageList: [],
      totalmessageList: {},
      receiver: '',
      roomId: '',
      newMessagesCount: [],
    }
    this.websocket = React.createRef()
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

  // Launcher.js 함수
  componentWillReceiveProps(nextProps) {
    if (this.props.mute) {
      return
    }
    const nextMessage = nextProps.totalmessageList[nextProps.totalmessageList.length - 1]
    const isIncoming = (nextMessage || {}).author === 'them'
    const isNew = nextProps.totalmessageList.length > this.props.totalmessageList.length
    if (isIncoming && isNew) {
      this.playIncomingMessageSound()
    }
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
      })
    }
  }

  async componentDidMount() {
    // Load async data.
    let userData = await API.get('chats/users/'+this.user.uid+'/rooms')

    this.setState({
      ...this.state,
      ...{
        receiverData: userData.data.data,
      },
    })
  }
  _openChatWindow = (flag, roomId, receiver, totalChatData) => {
    this.setState({
      ...this.state,
      ...{
        isOpen: flag,
        receiver: receiver,
        roomId: roomId,
        newMessagesCount: {
          ...this.state.newMessagesCount,
          [roomId]: 0,
        },
        totalmessageList: {
          ...this.state.totalmessageList,
          [roomId]: totalChatData,
        },
      },
    })
  }

  MyCustomItem = (props) => <ChatItem {...props} userId={this.user.uid} openChatWindow={this._openChatWindow} />

  render() {
    var topics = []
    this.state.receiverData.forEach(function (item, index, array) {
      topics.push('/topic/roomId/' + item.rid)
    })

    return (
      <div>
        <SockJsClient
          url={websocketUri}
          topics={topics}
          onMessage={(msg) => {
            const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
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
              newMessagesCount: newMessagesCount,
              totalmessageList: {
                ...this.state.totalmessageList,
                [this.state.roomId]: tmpMessageList,
              },
            })
          }}
          ref={this.websocket}
        />

        <ListView data={this.state.receiverData} item={this.MyCustomItem} style={{ width: '100%' }} />

        <div id="chat-launcher">
          <ChatWindow
            messageList={this.state.totalmessageList[this.state.roomId]}
            onUserInputSubmit={this._onMessageWasSent.bind(this)}
            onFilesSelected={this.props.onFilesSelected}
            agentProfile={{
              teamName: this.state.receiver.name,
              imageUrl: this.state.receiver.profileImg,
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

export default ChatList
