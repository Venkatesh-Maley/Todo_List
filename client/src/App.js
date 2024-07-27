import React,{useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [item,setItem] = useState([]); 
  const [newtask,setNewtask] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:5000/gettask').then(
      arr => setItem(arr.data)
    )
  },[]) 

  const submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/addTask',{todo:newtask}).then(
      arr => setItem(arr.data)
    )
  }

  const deleteHandler = id => {
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr => setItem(arr.data)
    )
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <form onSubmit={submitHandler} className="form-inline">
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="New Task"
              value={newtask}
              onChange={(e) => setNewtask(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2 ml-2">
            Submit
          </button>
        </form>
      </div>
      <div className="mt-4">
        {item.map((task) => (
          <div key={task._id} className="card mb-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">{task.todo}</h5>
              <button className="btn btn-danger" onClick={() => deleteHandler(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
