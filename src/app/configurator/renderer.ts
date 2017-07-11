import { Events } from './events';
import { Raycaster } from './raycaster';

declare var THREE, window;

export class Renderer extends Events {

    // Init
    public mode = 'normal';
    public container: HTMLElement;
    public scene: any;
    public clock: any;
    public renderer: any;
    public camera: any;
    public controls: any;
    public raycaster: Raycaster;

    private width: number;
    private height: number;

    constructor(id) {
        super();

        this.container = ( id ? document.getElementById(id) : document.body);

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.name = 'Scene';

        // Clock
        this.clock = new THREE.Clock();

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true
        });

        this.renderer.setClearColor(0xffffff, 1.0);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.renderReverseSided = false;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.autoClear = false;
        this.renderer.sortObjects = false;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.container.appendChild(this.renderer.domElement);


        // Camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
        this.camera.name = 'Camera';
        this.camera.position.set(0, 0, -10);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.device = false;
        this.controls.inverse = false;
        this.controls.enableDamping = true;
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        // Raycaster
        this.raycaster = new Raycaster(this.camera, this.renderer);

        // Function
        this.listen();
        this.render();
        this.debug();
    }

    listen() {
        THREE.DefaultLoadingManager.onStart = () => this.emit("start");
        THREE.DefaultLoadingManager.onProgress = (item, loaded, total) => this.emit("progress", (loaded / total * 100), item, loaded, total);
        THREE.DefaultLoadingManager.onLoad = () => this.emit("load");
        THREE.DefaultLoadingManager.onError = () => this.emit("error");

        this.renderer.domElement.addEventListener("click", (event) => this.emit("click", event), false);
        this.renderer.domElement.addEventListener("dblclick", (event) => this.emit("dblclick", event), false);
        this.renderer.domElement.addEventListener("contextmenu", (event) => this.emit("contextmenu", event), false);

        //this.renderer.domElement.addEventListener("mouseout", (event) => this.emit("mouseout", event), false);
        this.renderer.domElement.addEventListener("mouseup", (event) => this.emit("mouseup, pointerup", event), false);
        //this.renderer.domElement.addEventListener("touchend", (event) => this.emit("touchend, pointerup", event), false);
        //this.renderer.domElement.addEventListener("touchcancel", (event) => this.emit("touchcancel", event), false);
        //this.renderer.domElement.addEventListener("touchleave", (event) => this.emit("touchleave", event), false);

        this.renderer.domElement.addEventListener("mousedown", (event) => this.emit("mousedown, pointerdown", event), false);
        //this.renderer.domElement.addEventListener("touchstart", (event) => this.emit("touchstart, pointerdown", event), false);

        this.renderer.domElement.addEventListener("mousemove", (event) => this.emit("mousemove, pointermove", event), false);
        //this.renderer.domElement.addEventListener("touchmove", (event) => this.emit("touchmove, pointermove", event), false);


        window.addEventListener("keydown", (event) => this.emit("keydown", event), false);
        window.addEventListener("keyup", (event) => this.emit("keyup", event), false);

        window.addEventListener("orientationchange", () => {
            this.resize();
            this.emit("orientationchange");
        }, false);

        window.addEventListener("resize", () => {
            this.resize();
            this.emit("resize");
        }, false);

    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height =this.container.offsetHeight;

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);
    }

    update(delta) {
        this.emit('update', delta);
    }

    render() {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            let delta = this.clock.getDelta();

            this.controls.update();

            this.update(delta);
            this.render();
        });
    }

    debug() {
        window.scene = this.scene;
        window.camera = this.camera;
        window.controls = this.controls;
    }
}
