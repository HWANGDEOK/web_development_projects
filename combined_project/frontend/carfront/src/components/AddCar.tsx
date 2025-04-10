import { Dialog } from "@mui/material";
import { useState } from "react";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";


function AddCar(){
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modalYaer: 0,
    price: 0,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClickOpen= () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setCar({...car, [event.target.name]:
      event.target.value})
  }

  // 자동차를 저장하고 모달 폼을 닫아야 함.
  const handleSave = () => {
    mutate(car);
    setCar({brand:'', model: '', color:'', registrationNumber:'', modelYear: 0, price: 0});
    handleClose();
  }

  return(
    <>
      <button onClick={handleClickOpen}> New 차량 추가 🚐</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <input placeholder="Brand" name="brand" value={car.brand} onChange={handleChange}/><br/>

          <input placeholder="Model" name="model" value={car.model} onChange={handleChange}/><br/>

          <input placeholder="Color" name="color" value={car.color} onChange={handleChange}/><br/>

          <input placeholder="Year" name="modelYear" value={car.modelYear} onChange={handleChange}/><br/>

          <input placeholder="Reg.nr" name="registrationNumber" value={car.registrationNumber} onChange={handleChange}/><br/>

          <input placeholder="Price" name="price" value={car.price} onChange={handleChange}/><br/>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>취소</button>
          <button onClick={handleSave}>저장</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;