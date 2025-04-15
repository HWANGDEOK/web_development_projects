import { Dialog } from "@mui/material";
import { useState } from "react";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from './CarDialogContent';


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
      <Button onClick={handleClickOpen}> New 차량 추가 🚐</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange}></CarDialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;