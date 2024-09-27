import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import io from 'socket.io-client';
let socket

import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { ScrollArea } from "../components/ui/scroll-area";

type Props = {
  props: Object
}

const Play: React.FC<Props> = (props) => {

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const [clientName, setClientName] = useState('')
  const [connected, setConnected] = useState(false)
  const [players, setPlayers] = useState([])
  const [messages, setMessages] = useState([])

  console.log(messages)

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    await socket.on('connect', () => {
      setConnected(true)
    })

    await socket.on('update-players', (playerList) => {
      setPlayers(playerList)
    })

    await socket.on('update-messages', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    await socket.onclose(() => {
      socket.emit('remove-player', clientName)
      // setMessages([])
      // setPlayers([])
      // setConnected(false)
    })

  }

  const handleJoin = async (e) => {
    e.preventDefault()

    if (!socket) {
      await socketInitializer()
    }
    socket.emit('add-player', clientName)
    setConnected(true)
  }

  const handleQuit = async (e) => {
    e.preventDefault()
    if (!socket) {
      await socketInitializer()
    }
    socket.emit('remove-player', clientName)
    setMessages([])
    setConnected(false)
  }

  const clearPlayers = async (e) => {
    e.preventDefault()
    if (!socket) {
      await socketInitializer()
    }
    await socket.emit('clear-players', clientName)
  }

  if (connected) {

    return (
      <div className="h-screen flex flex-col">
        <div className="grow bg-muted border-2 border-primary p-2">
            <ScrollArea className={`w-1/2`} >
              {players.map((player, id) => {
                return (
                  <div key={id}>
                    {/* <Button className="text-md p-4" variant="outline">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>{player}</Button> */}
                    {player}
                  </div>
                )
              })}
            </ScrollArea>
        </div>
        <div className="h-64 bg-muted border-2 border-primary p-2 ">
          { messages.map( message => <div>{message}</div>) }
        </div>
    
        <div className="flex justify-end my-4">
          <div className="justify-end" >
            {/* <Button variant="outline" onClick={toggleDrawer}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Players

            </Button> */}
            <Button variant="outline" className="mx-1" onClick={clearPlayers}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
              </svg>
              Reset

            </Button>
            <Button onClick={handleQuit}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Exit
            </Button>
          </div>
        </div>
        </div>
    )
  } else {
    return (
      <Layout width="full" >
        < div className="w-full flex grow justify-center" >
          <div className="grow bg-center bg-no-repeat bg-[url('../public/images/banner.jpg')] bg-secondary bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl min-h-full text-center flex justify-center items-center">
              <div>
                <form>
                  <Input className="w-3/4 text-2xl p-8 mx-auto text-center rounded-full" placeholder="Enter your name" name="name" onChange={(e) => setClientName(e.target.value)} />
                  <Button className="w-3/4 text-md uppercase font-md my-2" variant="secondary" size="lg" onClick={(e) => handleJoin(e)}>Join session</Button>
                </form>
                <p className="text-sm">By clicking Join Session, you agree to our Terms of Service</p>
              </div>
            </div>
          </div>
        </div >
      </Layout >
    )
  }
}


export default Play
