import React, {useState} from 'react'

export const CreateCollectionPage = () => {

    const [field, setField] = useState({
        fieldValue: [],
        fieldType: []
    })

    const [inputType, setInputType] = useState([])

    const addCountry = () => {
        setField({
            fieldValue: [...field.fieldValue, ""],
            fieldType: [...field.fieldType, inputType[0]]
        })
    }

    const handleChange = (e, i) =>{
        field.fieldValue[i] = e.target.value
        setField({
            fieldValue: field.fieldValue,
            fieldType: field.fieldType
        })
        console.log(field.fieldType)
        console.log(field.fieldValue)
    }

    const handleSelectChange = event => {
        inputType[0] = event.target.value
    }


    return(
        <div>
            <h1>The form</h1>
            <p>Adress</p>
            {
                field.fieldValue.map((country, i) =>{
                    return (
                        <div key={i}>
                            <p>Тип поля: {field.fieldType[i]}</p>
                            <input type="text" value={country} onChange={(e)=>handleChange(e, i)}/>
                        </div>
                    )
                })
            }
            <hr/>
            <select 
                onChange={handleSelectChange}
            >
                <option value="text">Строка</option>
                <option value="date">Дата</option>
                <option value="email">Мыло</option>
            </select>
            <button onClick={addCountry}>Add country</button>
        </div>
    )
}