import React, { Component } from 'react';
import axios from 'axios';
import {Card,CardTitle,CardSubtitle,CardImg} from 'reactstrap'
import Maz from './mazep.jpg';

class App extends Component {
  // 初始化元件的狀態
  state = {
    city:null,
    data: [],
    date:null,
    id: 1,
    message: null,
    message1: null,
    title:null,
    img:null,
    desc:null,
    price:null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

 
  // 當元件載入時，它首先要從資料庫中獲取所有的資料，這裡會設定一個輪詢邏輯，及時將資料在 `UI` 中更新。
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // 永遠不要讓一個程序持續存在
  // 當我們結束使用時，一定要殺死這個程序
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }


  // 我們的第一個使用後端api的get方法
  // 從我們的資料庫中獲取資料
  getDataFromDb = () => {
    fetch('http://localhost:3001/chat')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // 使用 put 方法，在資料庫裡面插入一條新的資料
  putDataToDB = (message,message1) => {

    if((message1 && message) !==null){
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/chat/', {
      id: idToBeAdded,
      message: message,
      message1: message1,
      date:new Date().toLocaleTimeString()
    });
  }else{
    alert("請補齊資料")

  }
 
  
  this.setState({  message1:""})
  
  };


 



  deleteFromDB = (idTodelete) => {

  fetch('http://localhost:3001/chat/'+idTodelete, {
    method: 'delete',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
   

    
  }).then(res=>res.json())
    .then(res => console.log(res));

  }

  // 我們的刪除方法使用我們的後端api
  // 刪除現有資料庫資訊
  // deleteFromDB = (idTodelete) => {
  //   parseInt(idTodelete);
  //   let objIdToDelete = null;
  //   this.state.data.forEach((dat) => {
  //     if (dat.id == idTodelete) {
  //       objIdToDelete = dat._id;
  //     }
  //   });

  //   axios.delete('http://localhost:3001/comments/', {
  //     data: {
  //       id: objIdToDelete,
  //     },
  //   });
  // };


  updateDB = (idTodelete,updateToApply) => {


    fetch('http://localhost:3000/comments/'+idTodelete, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
     
      body: JSON.stringify({
        "message": updateToApply,
        "message1": updateToApply,
        })

      
    }).then(res=>res.json())
      .then(res => console.log(res));


  }

  // 我們的更新方法使用我們的後端api
  // 覆蓋現有的資料庫資訊
  // updateDB = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   parseInt(idToUpdate);
  //   this.state.data.forEach((dat) => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });

  //   axios.post('http://localhost:3001/comments/:id', {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply },
  //   });
  // };

  scrollWindow=() =>{
    let h = document.querySelector('.chats');
    h.scrollTo(0, h.scrollHeight);
}




  render() {
    const { data } = this.state;
    const a=new Date().toLocaleString();;
  
  var timeInMs = Date.now();
    return (
      <div >












        <div style={{maxWidth:"100%",backgroundColor:"rgb(29,29,29)",color:"white",textAlign:"center",fontSize:"2em",fontFamily:"DFKai-sb"}}>聊天室範例</div>
        <ul>
          <Card style={{backgroundColor:"lightgrey",color:"black"}}>
      
          {data.length <= 0
            // ? 'NO DB ENTRIES YET'
            ? '來當第一個發言的'
            : data.map((dat) => (
             
              // setAttribute("src", `http://localhost:5000/${file[0].name}`);

                <ol style={{ padding: '10px' }} key={data.id}>
               <h1 style={{margin:"0",fontSize:"1em",float:"left"}}>{dat.message} : {dat.message1}</h1> &nbsp;&nbsp;&nbsp;&nbsp;<p style={{marginLeft:"5vw",fontSize:"0.2em",float:"left"}}>{dat.date}<br></br>{a}</p>
            {/* <CardTitle  style={{ color: 'gray' }}> id: {dat.message} </CardTitle>
            <CardTitle  style={{ color: 'gray' }}>title: {dat.message1}</CardTitle>
            <CardSubtitle  style={{ color: 'gray' }}> price:  {dat.price}</CardSubtitle>
            <CardSubtitle  style={{ color: 'gray' }}>  desc: {dat.desc}</CardSubtitle>      */}
 
                </ol>
              ))}
              </Card>
        </ul>
        <div style={{ padding: '10px',textAlign:"center" }}>
          <input
            type="text"
            
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="名字"
            style={{ height:"5vh",width: '20vw',fontSize:"1em",margin:"0",textAlign:"center" }}
          />
        
            <input
            id="hidden1"
            type="text"
           
            onChange={(e) => this.setState({ message1: e.target.value })}
            value={this.state.message1}
            placeholder="訊息"
            style={{ height:"5vh",width: '20vw',fontSize:"1em",margin:"0",textAlign:"center" }}
          />
       
          &nbsp;&nbsp;&nbsp;
          <button    style={{ maxHeight:"9vh",maxWidth: '15vw',fontSize:"1em",margin:"0",textAlign:"center",padding:"0" }} onClick={() => this.putDataToDB(this.state.message,this.state.message1)}>
          輸入
          </button>
        </div>
        {/* <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div> */}
      </div>
    );
  }
}

export default App;