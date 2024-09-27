import { Server } from 'socket.io';

let playerList = []
let activeConnections = new Map()

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const wss = new Server(res.socket.server)
    res.socket.server.io = wss
    
    wss.on('connection', (ws) => {

      // Assign each client a unique id
      const id = uuidv4()
      const color = Math.floor(Math.random() * 360)
      const metadata = { id, color }

      activeConnections.set(ws, metadata)


      ws.on('message', (messageAsString) => {

        console.log(messageAsString)
        const message = JSON.parse(messageAsString);
        const metadata = clients.get(ws);

        message.sender = metadata.id;
        message.color = metadata.color;

        const outbound = JSON.stringify(message);

        [...activeConnections.keys()].forEach((client) => {
          client.send(outbound);
        });
      });

      ws.on('add-player', (player) => {
        playerList.push(player)
        ws.emit('update-players', playerList)
        ws.broadcast.emit('update-players', playerList)
        ws.emit('update-messages', `Welcome ${player}.`)
        ws.broadcast.emit('update-messages', `${player} has joined the session.`)
      })

      ws.on('clear-players', () => {
        playerList = []
        ws.emit('update-players', playerList )
        ws.broadcast.emit('update-players', playerList)
      })

      ws.on('remove-player', player => {
        playerList = playerList.filter(e => e !== player)
        ws.emit('update-players', playerList)
        ws.broadcast.emit('update-players', playerList)
        ws.broadcast.emit('update-messages', `${player} has left the session.`)
        activeConnections.delete(ws);
      })

      ws.on("close", () => {
        activeConnections.delete(ws);
      });
    })
  }
  res.end()
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default SocketHandler