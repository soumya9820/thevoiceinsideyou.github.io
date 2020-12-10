// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

//add material name here first
let newMaterial, Standard, newStandard, pointnewmaterial;

//let raycaster;
//let mouse;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );


  createskybox();
  createCamera();
  createControls();
  createLights();
  createMaterials();
  loadModels();
  createRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}
function createskybox(){

scene.background = new THREE.CubeTextureLoader()
					.setPath( 'js/three.js-master/examples/textures/cube/cloud/' )
					.load( [ 'bk.jpg','fn.jpg', 'up.jpg', 'dw.jpg', 'rt.jpg', 'Lf.jpg' ] );}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 50, container.clientWidth / container.clientHeight, 0.1, 100000 );
  camera.position.set( 25, 25, 120);

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xdd7eff, 0x0f000d, 40 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function createMaterials(){

     let diffuseColor = "#9E4300";
     newMaterial = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );
     Standard = new THREE.MeshStandardMaterial( { color: "#9E4300", skinning: true} );
     //othermaterial = new THREE.MeshlambertMaterial( {color: "#f42e7c", skinning: true} );

     var imgTexture = new THREE.TextureLoader().load( "texture/forest-bathing-2-e1556293782134.jpg" );
     				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
     				imgTexture.anisotropy = 1006;


     newStandard = new THREE.MeshStandardMaterial( {
										map: imgTexture,
										bumpMap: imgTexture,
										bumpScale: 500,
										//color: diffuseColor,
										metalness: 0.05,
										roughness: 1.2,
										envMap: imgTexture,
                    displacementmap: imgTexture,
                    displacementscale: 10.5,
                    skinning: true
									} );

          //pointnewmaterial = new THREE.PointsMaterial( { color: 0x8FBCD4 } );

          //const othermaterial = new THREE.MeshlambertMaterial();

          //loader.load()


          //othermaterial = new THREE.MeshlambertMaterial( {
                           //color: "#f42e7c",
                           //reflectivity: float,
                           //skinning: true,

                         //} );




}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position, material ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

  /* const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();
    */
    //var newMesh = new THREE.MESH()

    let object = gltf.scene;

    object.traverse((child) => {
                       if (child.isMesh) {
                       child.material = material; // a material created above
                  }
                 });
                   scene.add(object);

    //scene.add( model );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {console.log("inprogress")};


  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  const parrotPosition = new THREE.Vector3( -10, -50, -150 );
  loader.load( 'models/lady.glb', gltf => onLoad( gltf, parrotPosition, newStandard), onProgress, onError );

  const Position2 = new THREE.Vector3( 9, 0, -150 );
  loader.load( 'models/illusion.glb', gltf => onLoad( gltf, Position2, newStandard), onProgress, onError );

  //const storkPosition = new THREE.Vector3( 0, -2.5, -10 );
  //loader.load( 'models/Stork.glb', gltf => onLoad( gltf, storkPosition ), onProgress, onError );

}
//const renderer = new THREE.WebGLRenderer({
      // antialias: true
  // })
   //renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.setPixelRatio(window.devicePixelRatio)
   //document.body.appendChild( renderer.domElement );

   //camera.position.z = 1000;

//  function animate() {
      // requestAnimationFrame( animate );
       //renderer.render( scene, camera );
  // }
  // animate();

  // const loader = new THREE.GLTFLoader();

    //loader.load( 'models/illusion.glb', function ( gltf ) {
      //  const model = gltf.scene;
      //  scene.add(model);

      //  gltf.rotateX(0.5)

      //  },

      //  function ( xhr ) {

        //    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      //  },
        // called when loading has errors
      //  function ( error ) {

        //    console.log( 'An error happened' );

      //  }

  //  );

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );
  document.body.appendChild( renderer.domElement );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 0.5;
  renderer.gammaOutput = true;
  renderer.rotateX = 9.2;
  renderer.rotateY = 9.5;
  renderer.rotate = 9.5;

  renderer.physicallyCorrectLights = true;



  container.appendChild( renderer.domElement );

}
function animate() {
        requestAnimationFrame( animate );
       renderer.render( scene, camera );
   }
    //animate();
function update() {

  const delta = clock.getDelta();

  // /*for ( const mixer of mixers ) {
  //
  //   mixer.update( delta );
  // }
  // */

}

function render() {
	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );


	// calculate objects intersecting the picking ray
  //var intersects = raycaster.intersectsObjects( scene.children)
	const intersects = raycaster.intersectObjects( scene.children, true );

  //if ( intersects.length > 0) {
    //if INTERSECTED != in
  //}
  console.log("Intersetion list", intersects);

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xfff0ff );
  }

  console.log(camera.position);
  newStandard.displacementscale += 0.001;
  newStandard.metalness += 0.001;


  renderer.render( scene, camera );

}


function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

document.addEventListener(`mousedown`, function () {
        if (model) {
            model.rotation.x += 0.01;
        }
    })

window.addEventListener( 'resize', onWindowResize );
window.addEventListener('mousemove', onMouseMove, false );

window.requestAnimationFrame(render);

init();
