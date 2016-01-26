import THREE from 'three';
window.THREE = THREE;
import Light from './objects/Light';
import Project from './objects/Project';
import Ground from './objects/Ground';

export default class Webgl {
  constructor( width, height, datas ) {
    this.params = {
      usePostprocessing: false,
      // projectPositionX: this.project.position.x,
      // projectPositionY: this.project.position.y,
      // projectPositionZ: this.project.position.z,
      // projectRotationX: this.project.position.x,
      // projectRotationY: this.project.position.y,
      // projectRotationZ: this.project.position.z,
    };

    this.datas = datas;

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 10000 );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0xe3e3e3, 0.001 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x000000 );
    // this.renderer.setClearColor( 0x00091D );
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.enabled = true;

    this.composer = null;
    this.initPostprocessing();

    this.prepareRaycaster();

    this.project = new Project( width, height, this.datas );
    this.project.position.set( -400, -400, 0 );
    this.scene.add( this.project );

    // this.light = new Light();
    // this.scene.add( this.light );

    // this.ground = new Ground();
    // this.ground.position.set( 0, 0, -250 );
    // this.scene.add( this.ground );
  }

  initPostprocessing() {
    if ( !this.params.usePostprocessing ) { return; }

    /* Add the effect composer of your choice */
  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  prepareRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.offset = new THREE.Vector3();
  }

  render() {
    if ( this.params.usePostprocessing ) {
      console.warn( 'WebGL - No effect composer set.' );
    } else {
      this.renderer.render( this.scene, this.camera );
    }

    this.project.update();
    // this.ground.update();
  }
}
