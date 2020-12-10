import React from 'react'

const Age = ({age,setEditAge}) => {

    const handleChange = (e) =>{
        setEditAge(e.target.value);
    }
    console.log("age!@#@!##="+age)
    return (
        <>
            <select name="age" value={age} onChange={handleChange}>
                {Array(60)
                .fill(0)
                .map((item, idx) => (
                    <option key={`age-${idx}`} value={idx}>{`${idx}살`}</option>
                ))}
            </select>
        </>
    )
}

export default Age;
