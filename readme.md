1) check when is the middleware passed through => io middleware and socket middleware are totally different things
2) presumption: when socket is established the server and client constantly exchange http request. find out how frequent and what request it is. => false, requests are only sent when events are emitted

16 May:
1) rooms: can client broadcast without specifying room?  => client have to join room, otherwise only the server hears him
2) can we board client from broadcasting
3) can client join room themselves, or must the server do it => no, only server can assign

18 May:
1) test what would happen if receipient is not online when message is sent => the message is sent to an empty room 
2) what is one grey tick
3) one blue tick
4) two blue ticks
5) => when room has no client left, the room gets deleted
6) => if recipient is offline when message is sent, server will track when the receipient is online and emit event to sender when the recipient is online(?) => no, the server have to save the unsent message and do the sending