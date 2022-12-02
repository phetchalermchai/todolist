import './App.css';
import {useState} from "react"
import { v4 as uuidv4 } from 'uuid';
import List from './Components/List';
import Alert from './Components/Alert';


function App() {
  const [name,setName] = useState("")
  const [list,setList] = useState([])
  const [checkedititem,setCheckedititem] = useState(false)
  const [editid,setEditid] = useState(null)

  const [alert,setAlert] = useState({show:false,msg:"",type:""})

  const submitData =(e)=>{
    e.preventDefault()
    if(!name){
      setAlert({show:true,msg:"กรุณาป้อนข้อมลด้วยครับ",type:"error"})
    }else if(checkedititem && name){
     const result = list.map((item)=>{
        if(item.id === editid){
          return {...item,title:name}
        }
        return item
      })
      setList(result)
      setName('')
      setCheckedititem(false)
      setEditid(null)
      setAlert({show:true,msg:"แก้ไชข้อมูลเรียบร้อย",type:"success"})
    }
    else{
      const newItem = {
        id : uuidv4(),
        title : name
      }
      setList([...list,newItem])
      setName("")
      setAlert({show:true,msg:"บันทึกข้อมูลเรียบร้อย",type:"success"})
    }
  }

  const removeItem =(id)=>{
   const newList = list.filter((item)=>{
      return item.id !== id
    })
    setList(newList)
    setAlert({show:true,msg:"ลบข้อมูลเรียบร้อย",type:"error"})
  }

  const editItem =(id)=>{
      setCheckedititem(true)
      setEditid(id)
      const searchItem = list.find((item)=>item.id === id)
      setName (searchItem.title)
  }
  return (
    <section className="container">
        <h1>TodoList App</h1>
        {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/>}
        <form className="form-group" onSubmit={submitData}>
            <div className="form-control">
            <input type="text" className="text-input" onChange={(e)=>setName(e.target.value)} value={name}/>
            <button type="submit" className="submit-btn">
              {checkedititem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
            </button>
            </div>
        </form>
        <section className='list-container'>
            {list.map((data,index)=>{
              return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/>
            })}
        </section>
    </section>
  );
}

export default App;
