import {Renderer} from './renderer';
import {ObjectCustomType} from "../services/app.service";

declare var THREE;

export class Configurator {

    public renderer: Renderer;
    public preLoader: any;
    private light: ObjectCustomType = {};

    constructor( id: string = '') {
        this.renderer = new Renderer(id);

        this.config();
    }


    config() {

        // Light

        this.light['ambient'] = new THREE.AmbientLight(0xdddddd);

        this.light['point1'] = new THREE.PointLight(0xcccccc, 0.8, 200);
        this.light['point1'].position.set(50, 50, 50);

        this.light['point2'] = new THREE.PointLight(0xcccccc, 0.8, 200);
        this.light['point2'].position.set(-50, 50, 50);

        this.light['point3'] = new THREE.PointLight(0xcccccc, 0.8, 200);
        this.light['point3'].position.set(-50, 50, -50);

        this.light['point4'] = new THREE.PointLight(0xcccccc, 0.8, 200);
        this.light['point4'].position.set(50, 50, -50);

        this.renderer.scene.add(this.light['ambient']);
        this.renderer.scene.add(this.light['point1']);
        this.renderer.scene.add(this.light['point2']);
        this.renderer.scene.add(this.light['point3']);
        this.renderer.scene.add(this.light['point4']);



        let geometry = new THREE.BoxBufferGeometry( 5, 3, 3 );
        let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0,0,0);
        this.renderer.scene.add( mesh );


        this.preLoader = new THREE.ObjectLoader(new THREE.LoadingManager());

        this.preLoader.load('../assets/json-models/f300-svg.json', (object) => {
            console.log(object);
            this.renderer.scene.add(object);
            this.renderer.scene.add(object);
        });

    }

}
