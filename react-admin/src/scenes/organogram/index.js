import React from 'react';
import 'reactflow/dist/base.css';
import './index.css';
import DefaultScreen from './DefaultScreen';
import AsholOrganogram from './AsholOrganogram';
import useFetch from './useFetch';
import axios from 'axios';


const makeNodes = (node) => {
  if (!node.employee) {
    // console.log("true");
    return {
      id: node.id.toString(),
      type: 'custom',
      data: { name: '', job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
      position: {},
    }
  }
  return {
    id: node.id.toString(),
    type: 'custom',
    data: { name: node.employee.name, job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
    position: {},
  };
}
const makeFnode=(node)=>
{
  if (!node.employee) {
    return {
      id: node.id.toString(),
      type: 'custom',
      data: { name: '', job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
      position: {x:0,y:0},
    }
  }
  return {
    id: node.id.toString(),
    type: 'custom',
    data: { name: node.employee.name, job: node.name, emoji: '', department: node.department.name, dep_id: node.department.id },
    position: {x:0,y:0},
  };
}


const makeFedge=(nodes)=>
{
  let newID = "e-".concat(nodes.id);

  const edge ={
    id: newID,
    source: nodes.id.toString(),
    target: nodes.parent_id.toString(),
    type: 'smoothstep',
    style: { stroke: '#ff0072' }
  }
  return edge;
}

const makeEdges=(nodes)=>
{
  let newID = "e-".concat(nodes.id);

  const edge ={
    id: newID,
    source: nodes.parent_id.toString(),
    target: nodes.id.toString(),
    type: 'smoothstep',
    style: { stroke: '#ff0072' }
  }
  return edge;
}




const Organogram = () => {
  const [open, setOpen] = React.useState(false);
  const chuncks = useFetch("http://localhost:5000/office_post");
  const [office_posts, setPosts] = React.useState(chuncks);

  React.useEffect(() => {
      setPosts(chuncks);
  }, [chuncks]);
  

  const handleOffice_posts = () =>
  {
    axios
      .get("http://localhost:5000/office_post")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
    // console.log("triggered");
    window.location.reload();
  }

  const initNodes = chuncks?.map((items)=>(items.parent_id == -1)?makeFnode(items): makeNodes(items));

  const initEdges = chuncks?.map((items)=>(items.parent_id == -1)?makeFedge(items): makeEdges(items));
  let departments = useFetch("http://localhost:5000/department");

  
  if(initNodes.length === 0)
  {
    return <DefaultScreen open={open} setOpen = {setOpen}/>
  }

  else 
  {
    return (
      // <OrganogramScene/>
      <AsholOrganogram nodes={initNodes} edges={initEdges} departments={departments} office_posts={office_posts} handleOffice_posts={handleOffice_posts}/>
    );

  }
  
};

export default Organogram;
      

  