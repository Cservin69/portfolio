import Webgl from './Webgl';
import Home from './Home';
import raf from 'raf';
import dat from 'dat-gui';
import insertCss from 'insert-css';
import 'gsap';

let webgl;
let home;

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
}

function onCanvasMouseMove( e ) {
  home.mouseMove( e );
}

function onItemEnter( e ) {
  console.log( e );
  webgl.project.changeProject( e.target.attributes[0].value );
}

function animate() {
  raf( animate );
  webgl.render();
}

function loadJson() {
  return new Promise( ( resolve, reject ) => {
    const req = new XMLHttpRequest();
    req.open( 'GET', './datas.json' );

    req.onload = () => {
      if ( req.status === 200 ) {
        resolve( req.response );
      } else {
        reject( Error( req.statusText ) );
      }
    };

    req.onerror = () => {
      reject( Error( 'Erreur réseau' ) );
    };

    req.send();
  });
}

// Load datas
loadJson().then( ( result ) => {
  // Webgl settings
  const datas = JSON.parse( result );
  webgl = new Webgl( window.innerWidth, window.innerHeight, datas );
  document.getElementById( 'wrapper' ).appendChild( webgl.renderer.domElement );

  // // GUI settings
  // window.gui = new dat.GUI();
  // window.gui.add( webgl.params, 'usePostprocessing' );

  // Set interface
  home = new Home( datas );

  // Toggle mousemove projects / experiments
  document.getElementById( 'wrapper' ).addEventListener( 'mousemove', onCanvasMouseMove );

  // Toggle animation texture event
  const items = document.querySelectorAll( 'nav li' );
  for ( let i = 0; i < items.length; i++ ) {
    items[i].addEventListener( 'mouseenter', onItemEnter );
  }

  // Let's play !
  animate();
});

// Handle resize
window.addEventListener( 'resize', resizeHandler );

// Insert our stylus css into our app
insertCss( require( '../public/stylus/app.styl' ) );
