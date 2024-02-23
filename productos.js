
Vue.component('v-selec.categoria', VueSele4c.VueSelec);
Vue.component('componente-productos', {
    data() {
        return {
            valor:'',
            productos:[],
            accion:'nuevo',
            producto:{
                categoria:[],
                    id:'',
                    label:''
                },
                idProducto: new Date().getTime(),
                codigo:'',
                nombre:'',
                marca:'',
                presentacion:'',
                precio:0.0
            }
        }
    },
    methods:{
        buscarProducto(e){
            this.listar();
        },
        eliminarProducto(idProducto){
            if( confirm(`Esta seguro de elimina el producto?`) ){
                let store = abrirStore('productos', 'readwrite'),
                query = store.delete(idProducto);
            query.onsuccess = e=>{
                this.nuevoProducto();
                this.listar();
            };
            }
        },
        modificarProducto(producto){
            this.accion = 'modificar';
            this.producto = producto;
        },
        guardarProducto(){
            //almacenamiento del objeto productos en indexedDB
            let store = abrirStore('productos', 'readwrite'),
                query = store.put({...this.producto});
            query.onsuccess = e=>{
                this.nuevoProducto();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en productos', e.message());
            };
        },
        nuevoProducto(){
            this.accion = 'nuevo';
            this.producto = {
                categoria:{
                    id'',
                    label
                idProducto: new Date().getTime(),
                codigo:'',
                nombre:'',
                marca:'',
                presentacion:'',
                precio:0.0
            }
        },
        listar(){
            let store = abrirStore('productos', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                let store = abrirStore('productos', 'readonly'),
                dataCat = storeCat.getAll();
            dataCat.onsuccess = resp=>{
                this.categorias = dataCat.result.map(categoria=>{
                    return {
                        id:categoria.idCategoria,
                        label:categoria.nombre
                    }
                });
            });
                this.productos = data.result
                    .filter(producto=>producto.codigo.includes(this.valor) || 
                    producto.nombre.toLowerCase().includes(this.valor.toLowerCase()) || 
                    producto.marca.toLowerCase().includes(this.valor.toLowerCase()) || 
                    producto.presentacion.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE PRODUCTOS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="producto.codigo" type="text" class="form-control">
                            </div>
                            <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <v-selec-categoria  required v-model="producto.categoria"
                                :options= "categorias>Por favor seleccione una categoria</v-selec.categoria
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="producto.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">MARCA</div>
                            <div class="col col-md-5">
                                <input v-model="producto.marca" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">PRESENTACION</div>
                            <div class="col col-md-3">
                                <input v-model="producto.presentacion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">PRECIO</div>
                            <div class="col col-md-3">
                                <input v-model="producto.precio" type="number" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarProducto" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoProducto" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE PRODUCTOS</div>
                    <div class="card-body">
                        <form id="frmProducto">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre, marca, presentacion" type="search" v-model="valor" @keyup="buscarProducto" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                    <th>CODIGO</th>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th>MARCA</th>
                                        <th>PRESENTACION</th>
                                        <th>PRECIO</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarProducto(producto)" v-for="producto in productos" :key="producto.idProducto">
                                        <td>{{producto.categoria.label}}</td>
                                        <td>{{producto.nombre}}</td>
                                        <td>{{producto.marca}}</td>
                                        <td>{{producto.presentacion}}</td>
                                        <td>{{producto.precio}}</td>
                                        <td><button @click.prevent.default="eliminarProducto(producto.idProducto)" class="btn btn-danger">del</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
});