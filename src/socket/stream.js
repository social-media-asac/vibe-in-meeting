
let messageQueue={};
console.log('messageQueue///////////',messageQueue,'messageQueue//////////////////////////////')

const stream = ( socket ) => {
  
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );

        if (!socket.adapter.rooms.get(data.room)) {
            delete messageQueue[data.room];
            console.log(
                messageQueue,
              'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
            );
          }
      

      
        socket.emit('oldMessage',{oldMessage:messageQueue}),
        console.log({oldMessage:messageQueue},'/*****/////////*********')
       console.log(messageQueue);
       
        
        
          
          
           
      
       
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
        // console.log(data, 'data')
        
        // console.log(Object.keys(socket.rooms).filter(item => item!=socket.id),'----------------')

            //    console.log( sockets.manager.roomClients[socket.id],'*********');
            // if(socket.adapter.rooms){
            //     var omar =[];
            //     var first = socket.adapter.rooms.keys();
            //     var second = first.next().value;
            //     var third = second;
            //     console.log(first);
            //     console.log(first.next().value,'****************')
            //     console.log(second,'***99999*************')
            //     omar.push(second)
            //     console.log(third,'*-*-*----**-*---*-*-');
                
            //     // console.log(first.next().value, ' #########################33333')

            // }
           
       
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } ,  );
    
      
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } ,);
        
       

        
    } );

 var ahmad = [];
    socket.on( 'chat', ( data ) => {
      
 
        ahmad.push(data.room);
      
   if(!messageQueue[data.room]){
    messageQueue[data.room]=[];
   }

   messageQueue[data.room]=[...messageQueue[ data.room ],{ sender: data.sender ,msg: data.msg,}];

   console.log(messageQueue);
     
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg },
        
       
        );
    } );

    socket.on('disconnect', () => {
       
        socket.on('disconnected',(data)=>{
            console.log(data.room,'disco*///*/*/*/*/*/*')
          
          
           
          })
        
        
          if (!socket.adapter.rooms) {
           console.log(delete messageQueue,'--------------------') ;
            console.log('////////////////////////////////////////',
              messageQueue,
              'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
            );

            };

      
        
    
      
    
        
    });
    
};

module.exports = stream;
