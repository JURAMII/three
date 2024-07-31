import * as THREE from "three";
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useRef, useEffect } from "react";
import './style.css'

export default function Practice() {
  const starRef = useRef();

  useEffect(() => {
    const width = starRef.current.offsetWidth,
          height = starRef.current.offsetHeight;

    //카메라
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 30);
    camera.position.z = 20;

    //배경
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    const axess = new THREE.AxesHelper(5);
    scene.add(axess);

    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshStandardMaterial({ color: "blue" });

    const light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    // //dat.GUI 컨트롤러
    const datGUI = new dat.GUI();
    datGUI.add(camera.position, "x", -5, 5, 0.01).name("camera X");
    datGUI.add(camera.position, "y", -5, 5, 0.01).name("camera y");
    datGUI.add(camera.position, "z", -5, 5, 0.01).name("camera z");
    camera.lookAt(0, 0, 0);

    const group1 = new THREE.Group();
    const mesh1 = new THREE.Mesh(geometry, material);

    const group2 = new THREE.Group();
    const mesh2 = new THREE.Mesh(geometry, material);
    mesh2.scale.set(0.5, 0.5, 0.5);
    group2.position.x = 5;

    const group3 = new THREE.Group();
    const mesh3 = new THREE.Mesh(geometry, material);
    mesh3.scale.set(0.2, 0.2, 0.2);
    group3.position.x = 1;

    group1.add(mesh1, group2); //0,0,0을 기준으로 회전
    group2.add(mesh2, group3); //0,0,0을 기준으로 회전
    group3.add(mesh3); //mesh2를 기준으로 회전
    scene.add(group1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);
    starRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls( camera, renderer.domElement );

    // // animation
    const clock = new THREE.Clock();

    function animation() {
      const delta = clock.getDelta();

      group1.rotation.y += delta;
      group2.rotation.y += delta;
      group3.rotation.y += delta;

      controls.update()

      renderer.render(scene, camera);
    }
  }, []);

  return (
    <>
      <div ref={starRef} className="box"></div>
    </>
  );
}
