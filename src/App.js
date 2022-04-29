import { Component } from 'react';










class App extends Component {
   constructor(props){
       super(props);
       this.state = {
           gif:"",
           nombre:"",
           imagen:"",
           tipo:"",
           movimientos:[]
       }
   }

  apiCall(url,consecuencia){
   fetch(url)
    .then(response => response.json())
    .then(data=> consecuencia(data))
    .catch(error => console.log(error))
  }

componentDidMount(){
    console.log("me monte");
     this.traerGifNuevo();
}

traerGifNuevo(){

  var idRandom =Math.round(Math.random() * (898 - 1) + 1) ;
  console.log(idRandom);
    this.apiCall("https://pokeapi.co/api/v2/pokemon/"+idRandom,this.mostrarGif)


}
mostrarGif =(data)=>{
  let id="";
  if(data.id<10){
    id="00" + data.id;
  }else if(data.id<100 && data.id >9 ){

    id="0" + data.id;
  }else{
    id=data.id;
  }

  console.log(id)
    
    this.setState({
        gif: data.sprites.front_default,
        imagen: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + id + ".png",
        tipo: data.types[0].type.name,
        movimientos: data.moves
    })

    this.setState({
      
      nombre: data.forms[0].name
  })
    console.log(this.state.movimientos)

  
    
}

componentDidUpdate(){
    console.log("me actualize")
   

}
    render() {
        console.log("estoy renderizando");
        let contenido;

       

        if(this.state.gif == ""){
            contenido=<p>Cargando...</p>
        }else{
            contenido =  <div>
            <img src={this.state.gif}/>
            <h2>{this.state.nombre}</h2>
            
          </div>   ;
            
        }
        console.log("este es el nombre" +  this.state.nombre);
       return (
        <div >




          <div className='contenedor'>

          
          <div className="card">
  <div className="card-image">
    <figure className="image">
      <img src={this.state.imagen} alt="Placeholder image"/>
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <img src={this.state.gif}  alt="Placeholder image"/>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4">{this.state.nombre}</p>
        <p className="subtitle is-6">Tipo : {this.state.tipo}</p>
      </div>
    </div>

    <div className="content">
      
    
     
      <br/>
     
    </div>
    
  </div>
  </div>
</div>
          
          <button className='button' onClick={() => this.traerGifNuevo()}>random Gif</button>
        </div>



    );

}
}



export default App;