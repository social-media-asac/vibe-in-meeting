'use strict';
//////////////////////////
////// Dependencies /////
////////////////////////

let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );



//////////////////////////
////// Imports      /////
////////////////////////

let stream = require( './socket/stream' );


//////////////////////////
////// Middle Ware  /////
////////////////////////

app.use( favicon( path.join( __dirname, 'favicon-32x32.png' ) ) );

app.use( express.static( 'public' ) );


io.of( '/stream' ).on( 'connection', stream );





//////////////////////////
////// Exports      /////
////////////////////////

module.exports = {
    server: app,
    startup: (port) => {
      server.listen(port, () => {
        console.log(`Server Up on ${port}`);
      });
    },
  };