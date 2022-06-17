1) check when is the middleware passed through => io middleware and socket middleware are totally different things
2) presumption: when socket is established the server and client constantly exchange http request. find out how frequent and what request it is. => false, requests are only sent when events are emitted

16 May:
1) rooms: can client broadcast without specifying room?  => client have to join room, otherwise only the server hears him
2) can we board client from broadcasting
3) can client join room themselves, or must the server do it => no, only server can assign