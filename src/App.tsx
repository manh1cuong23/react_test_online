import mitt from "mitt";
import { useEffect } from "react";

function App() {
  let eventSource: EventSource | null = null;
  let onlineUserCount="";
  const emitter = mitt<any>();
  const test = ()=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MjI4NDUxMTgsImV4cCI6MTcyMjkzMTUxOH0.HvoT8y0rDyJPezQXAcSUYzzmQweKrNNBepnIPDVlhQc"
    // const sseUrl = `http://localhost:7001/api/sse/1?token=${token}`;
    const sseUrl = `https://news-api.toolhub.asia/api/sse/1?token=${token}`;

    eventSource = new EventSource(sseUrl);
    console.log("evenSource",eventSource)

    eventSource.onmessage = (event) =>{
      const {type,data} = JSON.parse(event.data); 
      console.log("type",type)
      if(type === 'close'){
        console.log("close")
      }
      else if(type === 'updateOnlineUserCount'){
        onlineUserCount = data;
        emitter.emit('onlineUser', onlineUserCount);
      }
    }
  
  }
  // useEffect(()=>{
  //   test();
  // },[])
  emitter.on('onlineUser', (data:any)=>{
    console.log("check data",data)
  });
  const handleClick = ()=>{
    test();
  }
  
  return (
    <div>
      <button onClick={handleClick}>click cho vui</button>
    </div>
  )
}

export default App
