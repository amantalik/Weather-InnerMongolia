let button = document.getElementById('startButton');

button.addEventListener('click', ()=>{
    console.log("Pressed");
    window.location = '/secondPage/nextPage.html';
});


/*----------3js Code----------*/


container = document.getElementById( '3jsCanvas' );
document.body.appendChild( container );

//a scene, a camera, a renderer

//create a scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color('transparent');

//create a camera
const camera = new THREE.PerspectiveCamera( 500, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;

//create a renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement); //added

//add the renderer to the DoM
// document.body.appendChild( renderer.domElement );

//Add OrbitControls
const controls = new THREE.OrbitControls( camera, renderer.domElement );

//GEOMETRY, MATERIAL, MESH
//initializing the geometry
const geometry = new THREE.SphereGeometry(2.45,50,32);

// //initializr the material to a color
// const material = new THREE.MeshBasicMaterial( { color: 'green', wireframe:false} );

//set the material to be an image
let imageLink = 'moonTexture.jpg';
let imageLoader = new THREE.TextureLoader();
let imageTexture = imageLoader.load(imageLink);
// //Now we can pass the texture onto the material
let material = new THREE.MeshBasicMaterial({map: imageTexture});

//initialize the mesh
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

let rotate = true;
let rotateX = 0.001;
let rotateY = 0.001;



//ANIMATE: DEFINE AN ANIMATE FUNCTION / CALL IT REPETEDLY
function animate(){

    if(rotate){
        sphere.rotation.x += rotateX;
        sphere.rotation.y += rotateY;
    }
 
    //allow for controls to update
    controls.update();

    //call render
    renderer.render( scene, camera );
    requestAnimationFrame( animate ); //to make sure the animation runs repeatedly.

}
animate();

// function updateImage(){
//     if(imageLink === 'moonTexture.jpg'){
//         imageLink = 'marsTexture.jpg';
//     }
//     else{
//         imageLink = 'moonTexture.jpg';
//     }
//     let imageLoaderUpdate = new THREE.TextureLoader();
//     let imageTextureUpdate = imageLoaderUpdate.load(imageLink);

//     sphere.material.map = imageTextureUpdate;
//     //set needsUpdate to true
//     sphere.material.needsUpdate = true;
// }

// let rotateToggle = document.getElementById('rotate-toggle');
// rotateToggle.addEventListener('click', () =>{
//     rotate = !rotate;
// });

// let imageToggle = document.getElementById('image-toggle');
// imageToggle.addEventListener('click', () =>{
//     updateImage();
// });


/*----------p5 Code----------*/

// var stars = [];
// var speed;


// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//       }

// function setup(){
//     createCanvas(winWidth, winHeight);
    
//     for (var i = 0; i < 800; i++) {
//         stars[i] = new Star();
//     }
// }

// function draw(){
//     speed = map(mouseX, 0, width, 0.5, 2);
//     background(0);
//     translate(width / 2, height / 2);
//     for (var i = 0; i < stars.length; i++) {
//         stars[i].update();
//         stars[i].show();
//     }

// }



