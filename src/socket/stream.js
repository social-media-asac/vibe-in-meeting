const moment =require('moment');
let messageQueue={};
console.log('messageQueue',messageQueue,'messageQueue')
const stream = ( socket ) => {
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );

      
       
       

          
          
           
    
       
        // console.log(data.room,'555555555555555555')
        //   console.log(socket.adapter.nsp._eventsCount,'--*----------')
        //Inform other members in the room of new user's arrival
        if ( socket.adapter.nsp._eventsCount  ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } ,  );
          
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
       
       
       
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender },  
       
        
        );
    } );


    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
        socket.emit('oldMessage',{oldMessage:messageQueue}),
        console.log({oldMessage:messageQueue},'/////////////////**************')
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
    } );


    socket.on( 'chat', ( data ) => {

        console.log(data,'+984444444444444444444444+')
   if(!messageQueue[data.room]){
    messageQueue[data.room]=[];
   }

   messageQueue[data.room]=[...messageQueue[ data.room ],{ sender: data.sender ,msg: data.msg,
    //  time: moment().format('h:mm a'),
    }];
   console.log(messageQueue);
        // console.log(data,'==========================')
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg },
        // console.log({ sender: data.sender, msg: data.msg },'+++++++++++++++++++'),
        // console.log('-------------------------',data.room,'+++++++++++++++++++')
        );
    } );
};

module.exports = stream;
