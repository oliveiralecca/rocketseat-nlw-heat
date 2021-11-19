import styles from './styles.module.scss'
import logo from '../../assets/logo.svg'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0], //msg mais antiga da fila
          prevState[0], //msg que já tinha em messages da posição 0
          prevState[1] //msg que já tinha em messages da posição 1
        ].filter(Boolean)) //filtra só os valores true, pois messages pode estar vazio (undefined ou null)

        messagesQueue.shift() //remove o item mais antigo da fila de mensagens
      }
    }, 3000)
  }, [])

  useEffect(() => {
    //chamada para a api, na rota 'messages/last3'
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data)    
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((message) => 
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>
              {message.text}
            </p>
            <div className={styles.messageUser}>
              <div className={styles.userImg}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        )}        
      </ul>
    </div>
  )
}
