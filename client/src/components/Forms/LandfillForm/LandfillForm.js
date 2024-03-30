import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { message } from "antd";

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

const LandfillForm = ({ landfillModalIsOpen, closeLandfillModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); 

  const onSubmit = (data) => {
    // console.log(typeof(data.capacity), typeof(data.coordinates), typeof(data.operationalTimespan));
    fetch('http://localhost:5000/landfill', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(success => {
         if(success){
             closeLandfillModal();
             message.success("Landfill created successfully");
         }
    })
  };

  return (
    <div>
      <Modal
        isOpen={landfillModalIsOpen}
        onRequestClose={closeLandfillModal}
        style={customStyles}
        contentLabel="Landfill Modal"
      >
        <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <p className="text-secondary mb-1">Capacity (Ton)</p>
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
            <p className="text-secondary mb-1">Operational Timespan</p>
            <input
              type="text"
              {...register("operationalTimespan", { required: true })}
              placeholder="Operational Timespan"
              className="form-control"
            />
            {errors && errors.operationalTimespan && (
              <span className="text-danger">This field is required</span>
            )}
          </div>

          <div className="form-group">
            <p className="text-secondary mb-1">GPS Coordinates</p>
            <input
              type="text"
              {...register("coordinates", { required: true })}
              placeholder="GPS Coordinates"
              className="form-control"
            />
            {errors && errors.coordinates && (
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

export default LandfillForm;
