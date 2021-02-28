import React from 'react'

const Sex = ({sex,setEditSex}) => {

    const handleChange = (e) =>{
        setEditSex(e.target.value);
    }
    
    return (
        <>
            <select name="sex" value={sex} onChange={handleChange} >
               <option value="M">남</option>
               <option value="F">여</option>
            </select>
        </>
    )
}

export default Sex
