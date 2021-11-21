
const socket = io('/');
const videogrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined,{
    path: '/peerjs',
    host: '/',
    port: '3030'

})

let myvideoStream;



navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true
}).then(stream => {

    myvideoStream = stream;
    addVideoStream(myVideo, stream)

});

peer.on('open',id=>{

  //  console.log(id);

    socket.emit('join-room',ROOM_ID,id);
})
  

    socket.on('user-connected', (userId)=>{

        connectToNewUser(userId);

    });

   const connectToNewUser = (userId) => {


    console.log(userId);

   }

const addVideoStream = (video, stream) =>{

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', ()=>{
            video.play();

    })
    videogrid.append(video);

}