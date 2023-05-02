// import * as React from 'react';
import React from 'react';
import { Handle, Position } from 'reactflow';
import Avatar from "@mui/material/Avatar";




const CustomNode = React.memo(function CustomNode({ data, myProp}) {
      // console.log("no");
      // console.log({myProp});
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        console.log("opened");
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">

      <div className="flex">
      <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
        <Avatar src={process.env.PUBLIC_URL+"/user_images/"+data.emoji}/>
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-black">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
          <div className="text-gray-300">{data.department}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
});

export default CustomNode;