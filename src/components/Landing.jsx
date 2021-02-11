import React, { useEffect } from "react";
import {
  Scene,
  Raycaster,
  Vector2,
  PerspectiveCamera,
  WebGLRenderer,
  SpotLight,
  TextureLoader,
  MeshPhysicalMaterial,
  RepeatWrapping,
  PlaneBufferGeometry,
  Mesh,
  CubeTextureLoader,
  TetrahedronBufferGeometry,
} from "three";
import TextureJPG from "../assets/texture.jpg";
import RockJPEG from "../assets/rock.jpeg";

const num = 30;
const objects = [];
const raycaster = new Raycaster();
const mouse = new Vector2();
let light, t;

const Landing = () => {
  useEffect(() => {
    // create camera
    var camera = new PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0.0, 0.0, 5);
    // create a scene
    var scene = new Scene();

    // create renderer
    var renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector(".three").appendChild(renderer.domElement);

    light = new SpotLight("lightgreen", 0.8);
    light.position.set(0, 0, 5);
    scene.add(light);

    // load a ground texture
    var texture = new TextureLoader().load(TextureJPG);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(12, 12);

    // create ground material
    var material = new MeshPhysicalMaterial({
      map: texture,
      bumpMap: texture,
    });

    // create ground mesh
    var geometry = new PlaneBufferGeometry(100, 100);
    var ground = new Mesh(geometry, material);
    ground.rotation.z = (Math.PI / 180) * -45;
    ground.rotation.x = (Math.PI / 180) * -90;
    ground.position.y = -2.0;
    scene.add(ground);

    // load object texture
    var rockTexture = new TextureLoader().load(RockJPEG);

    var envMap = new CubeTextureLoader()
      .setPath("../assets/")
      .load([
        "right.jpg",
        "left.jpg",
        "top.jpg",
        "bottom.jpg",
        "front.jpg",
        "back.jpg",
      ]);

    // create Tetrahedron
    var geometry = new TetrahedronBufferGeometry(2, 0);
    var material = new MeshPhysicalMaterial({
      envMap: envMap,
      metalness: 1.0,
      color: "darkgreen",
    });
    var t = new Mesh(geometry, material);
    t.rotation.x = (Math.PI / 180) * -10;
    scene.add(t);

    // start animation loop
    var animate = function () {
      requestAnimationFrame(animate);
      t.rotation.y -= 0.005;
      camera.lookAt(t.position);
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div className="three"></div>;
};

export default Landing;
