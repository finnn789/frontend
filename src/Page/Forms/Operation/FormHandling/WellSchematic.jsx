import React from 'react'
import CardFormK3 from '../../Components/CardFormK3'
import { FaOilWell } from 'react-icons/fa6'
import FormInputFile from '../../Components/FormInputFile'

const WellSchematic = () => {

    
  return (
    <div>
      <CardFormK3 title='Well Schematic' subtitle='Well Schematic' icon={FaOilWell}>
            <FormInputFile onFileSelect={(file) => console.log(file)} label='Upload File' acceptedFormats='.pdf' acceptedOption={['PDF', 'CSV']}/>
      </CardFormK3>
    </div>
  )
}

export default WellSchematic
