import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Typography, Form, Input, Select, Col, Row, message } from 'antd';
import './STS.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faGripHorizontal, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../../contexts/AuthContext';
import VehicleForm from '../../Forms/VehicleForm/VehicleForm';
import StsForm from '../../Forms/StsForm/StsForm';
import LandfillForm from '../../Forms/LandfillForm/LandfillForm';
import STSTable from './STSTable/STSTable';
import axios from 'axios';
import GoogleMap from "../../Maps/GoogleMap";

const { Option } = Select;

const containerStyle = {
    backgroundColor: "#F4FDFB",
    border: '1px solid red'
}

const STS = () => {
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
    const [stsData, setStsData] = useState([]);
    const [trucksData, setTrucksData] = useState([]);
    const [selectedTrucks, setSelectedTrucks] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const stsResponse = await axios.get('http://localhost:5000/sts');
                const trucksResponse = await axios.get('http://localhost:5000/vehicles');
                setStsData(stsResponse.data);
                setTrucksData(trucksResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleTruckSelection = (stsId, selectedTruckId) => {
        setSelectedTrucks(prevState => ({
            ...prevState,
            [stsId]: selectedTruckId
        }));
    };

    const saveTruckAssignment = async (stsId) => {
        try {
            const response = await axios.put(`http://localhost:5000/sts/${stsId}/assign-truck`, {
                truckId: selectedTrucks[stsId]
            });
            message.success(response.data.message);
        } catch (error) {
            console.error('Error assigning truck to STS:', error);
            message.error('Failed to assign truck to STS');
        }
    };
    

    // Extract latitude and longitude from STS data
    const coordinates = stsData.map(sts => {
        const [latitude, longitude] = sts.coordinate.split(',').map(coord => parseFloat(coord.trim()));
        return { latitude, longitude };
    });

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
                    <STSTable></STSTable>
                </div>
                <div className="col-md-5 col-sm-12 col-12">
                    <GoogleMap coordinates={coordinates}></GoogleMap>
                </div>
                
            </div>
        </section>
    );
};

export default STS;
