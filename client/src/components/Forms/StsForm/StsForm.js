import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const StsForm = ({ stsModalIsOpen, closeStsModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Destructure formState to access errors

  const onSubmit = (data) => {
    fetch('http://localhost:5000/sts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(success => {
         if(success){
             closeStsModal();
             message.success("STS created successfully");
         }
    })
  };

  return (
    <div>
      <Modal
        isOpen={stsModalIsOpen}
        onRequestClose={closeStsModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <p className="text-secondary mb-1">Ward Number</p>
            <input
              type="number"
              {...register("ward", { required: true })}
              placeholder="Ward Number"
              className="form-control"
            />
            {errors && errors.ward && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="form-group">
            <p className="text-secondary mb-1">Capacity{"(Ton)"}</p>
            <input
              type="number"
              {...register("capacity", { required: true })}
              placeholder="Capacity"
              className="form-control"
            />
            {errors && errors.capacity && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="form-group">
            <p className="text-secondary mb-1">GPS Coordinates</p>
            <input
              type="text"
              {...register("coordinate", { required: true })}
              placeholder="GPS Coordinate"
              className="form-control"
            />
            {errors && errors.coordinate && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="form-group text-right">
            <button type="submit" className="btn btn-brand">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StsForm;
