import socketIOClient from "socket.io-client";
const ENDPOINT = `http://${window.location.host.split(':')[0]}:4001`;

const socket = socketIOClient(ENDPOINT);

export default socket;
