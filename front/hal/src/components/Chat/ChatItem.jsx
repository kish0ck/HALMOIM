import React, { useState } from 'react'
// import { Avatar } from '@progress/kendo-react-layout';
import { Avatar } from '@material-ui/core'
import API from '../../apis/api'

const ChatItem = (props) => {
  let item = props.dataItem
  let userId = props.userId
  const [isOpen, setIsOpen] = useState(false)

  async function _onFormSubmit() {
    let totalChatData = await API.get('chats/rooms/'+item.rid)

    var roomMessageList = []

    totalChatData.data.data.forEach(function (item, index, array) {
      var replytext
      if (item.type === 'text') {
        replytext = { text: item.message }
      } else {
        replytext = { emoji: item.message }
      }
      roomMessageList.push({
        author: item.sender.uid === userId ? 'me' : 'them',
        type: item.type,
        data: replytext,
      })
    })

    setIsOpen(true)
    props.openChatWindow(true, item.rid, item.receiver, roomMessageList)
  }

  const classList = ['chat-launcher', 'row', 'p-2', 'border-bottom', 'align-middle', isOpen ? 'opened' : '']

  return (
    <div className={classList.join(' ')} style={{ margin: 10 }} onClick={_onFormSubmit}>
      <div className="col-3" style={{ padding: '0px' }}>
        <Avatar variant="rounded" src={item.receiver.profileImg} style={{ width: '70px', height: '70px' }} sizes="50px" />
      </div>
      <div className="col-6">
        <h2 style={{ fontSize: 25, color: '#000000', marginBottom: 0, padding: 5 }} className="text-uppercase">
          {item.receiver.name}
        </h2>
        <div style={{ fontSize: 16, color: '#a0a0a0' }}>채팅중입니다{}</div>
      </div>
      <div className="col-3">
        {/* <div className='k-chip k-chip-filled'  style={{backgroundColor:'#f1bbba'}}>
                        <div className='k-chip-content'>
                            {} new
                        </div>
                    </div> */}
      </div>
    </div>
  )
}
export default ChatItem
