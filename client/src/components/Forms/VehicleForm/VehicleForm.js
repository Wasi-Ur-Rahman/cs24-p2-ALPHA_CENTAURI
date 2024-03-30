import { Button, Card, Col, Form, Input, Row, Select, message } from 'antd';
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const VehicleForm = ({ vehicleModalIsOpen, closeVehicleModal}) => {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Destructure formState to access errors

  const onSubmit = data => {
    console.log(data);
    fetch('http://localhost:5000/vehicles', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(success => {
         if(success){
          closeVehicleModal();
          message.success("Vehicle Added Successfully");
         }
    })
  };

  return (
    <div>
      <Modal
        isOpen={vehicleModalIsOpen}
        onRequestClose={closeVehicleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
          <p className="text-secondary mb-1">Vehicle Registration Number</p>
            <input type="text" {...register("registration", { required: true })} placeholder="Vehicle Registration Number" className="form-control" />
            {errors && errors.registration && <span className="text-danger">This field is required</span>}
          </div>
          <div className="form-group row">
            <div className="col-4">
            <p className="text-secondary mb-1">Truck Type</p>
              <select className="form-control" {...register("type", { required: true })}>
                <option disabled={true} value="Not set"></option>
                <option value="Open Truck">Open Truck</option>
                <option value="Dump Truck">Dump Truck</option>
                <option value="Compactor">Compactor</option>
                <option value="Container Carrier">Container Carrier</option>
              </select>
              {errors && errors.type && <span className="text-danger">This field is required</span>}
            </div>
            <div className="col-4">
            <p className="text-secondary mb-1">Capacity{"(Ton)"}</p>
              <select className="form-control" {...register("capacity", { required: true })}>
                <option disabled={true} value="Not set"></option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="15">15</option>
              </select>
              {errors && errors.capacity && <span className="text-danger">This field is required</span>}
            </div>
            <div className="col-4">
              <input className="form-control" {...register("loadCost", { required: true })} placeholder="Fuel cost per kilometer (loaded)" type="number" />
              {errors && errors.loadCost && <span className="text-danger">This field is required</span>}
            </div>
            <div className="col-4">
              <input className="form-control" {...register("unloadCost", { required: true })} placeholder="Fuel cost per kilometer (unloaded)" type="number" />
              {errors && errors.unloadCost && <span className="text-danger">This field is required</span>}
            </div>
          </div>
          <div className="form-group text-right">
            <button type="submit" className="btn btn-brand">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VehicleForm;