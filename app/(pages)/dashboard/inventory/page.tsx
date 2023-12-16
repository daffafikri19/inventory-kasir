"use client"
import React, { useState } from 'react'
import FormSelectBooth from './formSelectBooth'
import { TableData } from './tableData'

const InventoryPage = () => {
  const [selectedBooth, setSelectedBooth] = useState("");
  const handleBoothSelected = (booth : string) => {
    console.log("selected booth", booth);
    setSelectedBooth(booth)
  }

  return (
    <div>
      <FormSelectBooth onSelectedBooth={handleBoothSelected} />
      <TableData selectedBooth={selectedBooth} />
    </div>
  )
}

export default InventoryPage