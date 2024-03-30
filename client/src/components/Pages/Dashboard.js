import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Typography, Form, Input, Select, Col, Row } from 'antd';
import './Dashboard.css';
import { useAuth } from '../../contexts/AuthContext';
import VehicleForm from '../Forms/VehicleForm/VehicleForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faGripHorizontal, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import UsersTable from './UsersTable/UsersTable';
import StsForm from '../Forms/StsForm/StsForm';
import LandfillForm from '../Forms/LandfillForm/LandfillForm';

const { Option } = Select;

const containerStyle = {
    backgroundColor: "#F4FDFB",
    border: '1px solid red'
}

const Dashboard = () => {
    const [vehicleModalIsOpen, setVehicleModalIsOpen] = useState(false);
    function openVehicleModal() {
        setVehicleModalIsOpen(true);
    }
    function closeVehicleModal() {
        setVehicleModalIsOpen(false);
    }

    const [stsModalIsOpen, setStsModalIsOpen] = useState(false);
    function openStsModal() {
        setStsModalIsOpen(true);
    }
    function closeStsModal() {
        setStsModalIsOpen(false);
    }

    const [landfillModalIsOpen, setLandfillModalIsOpen] = useState(false);
    function openLandfillModal() {
        setLandfillModalIsOpen(true);
    }
    function closeLandfillModal() {
        setLandfillModalIsOpen(false);
    }

    const { userData, logout } = useAuth();
    const [vehicleFormVisible, setVehicleFormVisible] = useState(false);
    const [stsFormVisible, setSTSFormVisible] = useState(false);
    const [stsManagerFormVisible, setSTSManagerFormVisible] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    const handleAddVehicle = () => {
        setVehicleFormVisible(true);
    };

    const handleCreateSTS = () => {
        setSTSFormVisible(true);
    };

    const handleAssignSTSManager = () => {
        setSTSManagerFormVisible(true);
    };

    return (
        // <div className='dashboard-container'>
            // <Card className='profile-card'>
            //     <Flex vertical gap="small" align='center'>
            //         <Avatar size={150} icon={<UserOutlined />} className='avatar' />
            //         <Typography.Title level={2} strong className='username'>{userData.name}</Typography.Title>
            //         <Typography.Text type='secondary' strong>Email: {userData.email}</Typography.Text>
            //         <Typography.Text type='secondary'>Role: {userData.role}</Typography.Text>
            //         <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>

            //         {/* <Button size='large' type='primary' className='profile-btn' onClick={openVehicleModal}>Add Vehicle</Button>
            //         <Button size='large' type='primary' className='profile-btn' onClick={handleCreateSTS}>Create STS</Button>
            //         <Button size='large' type='primary' className='profile-btn' onClick={handleAssignSTSManager}>Assign STS Manager</Button> */}
            //     </Flex>
            // </Card>

        //     {/* Add Vehicle Form */}
        //     <VehicleForm vehicleModalIsOpen={vehicleModalIsOpen} closeVehicleModal={closeVehicleModal}></VehicleForm>
            
        //     {/* Create STS Form */}
        //     {stsFormVisible && <STSForm onClose={() => setSTSFormVisible(false)} />}

        //     {/* Assign STS Manager Form */}
        //     {stsManagerFormVisible && <STSManagerForm onClose={() => setSTSManagerFormVisible(false)} />}
        // </div>
        <section>
            <div style={containerStyle} className="row">
                <div className='col-md-2 col-sm-6 col-12 mt'>
                    <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4" style={{height:"100vh"}}>
                        <ul className="list-unstyled">
                        <Flex vertical gap="smallest" align='center'>
                                <Typography.Title level={2} strong className='username'>{userData.name}</Typography.Title>
                                <Typography.Text type='secondary' strong>Email: {userData.email}</Typography.Text>
                                <Typography.Text type='secondary'>Role: {userData.role}</Typography.Text>

                                
                                
                                <Button size='large' type='primary' className='profile-btn' onClick={openVehicleModal}>Add Vehicle</Button>
                                <VehicleForm vehicleModalIsOpen={vehicleModalIsOpen} closeVehicleModal={closeVehicleModal}></VehicleForm>

                                <Button size='large' type='primary' className='profile-btn' onClick={openStsModal}>Create STS</Button>
                                <StsForm stsModalIsOpen={stsModalIsOpen} closeStsModal={closeStsModal}></StsForm>
                                <Button size='large' type='primary' className='profile-btn' onClick={openLandfillModal}>Create Landfill Sites</Button>
                                <LandfillForm landfillModalIsOpen={landfillModalIsOpen} closeLandfillModal={closeLandfillModal}></LandfillForm>
                            </Flex>
                            <li className='mt-3'>
                                <Link to="/dashboard" className="text-white">
                                    <FontAwesomeIcon icon={faGripHorizontal} /> <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className='mt-1'>
                                <Link to="/STS" className="text-white">
                                    <FontAwesomeIcon icon={faGripHorizontal} /> <span>STS</span>
                                </Link>
                            </li>
                            <li className='mt-1'>
                                <Link to="/landfill" className="text-white">
                                    <FontAwesomeIcon icon={faGripHorizontal} /> <span>Landfill</span>
                                </Link>
                            </li>
                        </ul>
                        <div>
                        <Link to="/auth/register">
                            <Button size="large" className="btn">
                            Create an account
                            </Button>
                        </Link>
                            <Button size='large' type='primary' className='profile-btn' onClick={handleLogout}>Logout</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-12 col-12 d-flex justify-content-center">
                    <UsersTable></UsersTable>
                </div>
                <div className="col-md-5 col-sm-12 col-12">
                    <Typography.Title level={2} strong className='username'>All Roles</Typography.Title>
                </div>
            </div>
        </section>
    );
};


const STSForm = ({ onClose }) => {
    // Similar structure to VehicleForm, but for STS creation
};

const STSManagerForm = ({ onClose }) => {
    // Similar structure to VehicleForm, but for assigning STS manager
};

export default Dashboard;
