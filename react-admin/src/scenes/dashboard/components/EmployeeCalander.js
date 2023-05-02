import React, {useState} from 'react';
import DateSelector from './DateSelector';
import Select from 'react-select';
import useFetch from '../../organogram/useFetch';
import Calendar from './Calander';

export default function EmployeeCalander() {
    const [query_date, setDate] = useState("");
    const handleDate = (val) => {
        setDate(val);
        console.log(query_date);
    }

    const emplList = useFetch('http://localhost:5000/employee');

    const emList = emplList?.map((item)=> { return { value: item.id, label: item.name }});
    // const optionList = [
    //     { value: "red", label: "Red" },
    //     { value: "green", label: "Green" },
    //     { value: "yellow", label: "Yellow" },
    //     { value: "blue", label: "Blue" },
    //     { value: "white", label: "White" }
    //   ];
      const [selectedOptions, setSelectedOptions] = useState();
      function handleSelect(data) {
        setSelectedOptions(data);
      }
    // console.log(selectedOptions);
   

  return (
    <div>
        <div className="dropdown-container" style={{width:"400px", paddingBottom:"50px"}}>
      <Select
        options={emList}
        placeholder="Select an employee"
        value={selectedOptions}
        onChange={handleSelect}
        isSearchable={true}
      />
    </div>
    <Calendar id={selectedOptions?.value}/>
    </div>
  )
}
