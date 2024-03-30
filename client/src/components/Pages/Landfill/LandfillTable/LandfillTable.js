import React, { useState, useEffect, useRef } from 'react';
import { Typography, Table, Input, Button, Space, Popconfirm, message, Form, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Title from 'antd/es/typography/Title';

const LandfillTable = () => {
  const [landfillData, setLandfillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const searchInput = useRef(null);

  useEffect(() => {
    async function fetchLandfillData() {
      try {
        const response = await axios.get('http://localhost:5000/landfill');
        setLandfillData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Landfill data:', error);
      }
    }
    fetchLandfillData();
  }, []);

  const deleteLandfill = async (landfillId) => {
    try {
      await axios.delete(`http://localhost:5000/landfill/${landfillId}`);
      setLandfillData(landfillData.filter(landfill => landfill._id !== landfillId));
      message.success('Landfill data deleted successfully');
    } catch (error) {
      console.error('Error deleting Landfill data:', error);
      message.error('Failed to delete Landfill data');
    }
  };

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...landfillData];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setLandfillData(newData);
        setEditingKey('');
        await axios.put(`http://localhost:5000/landfill/${key}`, row);
        message.success('Landfill data updated successfully');
      } else {
        message.error('Landfill data not found');
      }
    } catch (error) {
      console.error('Error updating Landfill data:', error);
      message.error('Failed to update Landfill data');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex, placeholder) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'LandfillId',
      dataIndex: '_id',
      key: '_id',
      ...getColumnSearchProps('_id', 'Search LandfillId'),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      editable: true,
      ...getColumnSearchProps('capacity', 'Search capacity'),
    },
    {
      title: 'Operational Timespan',
      dataIndex: 'operationalTimespan',
      key: 'operationalTimespan',
      editable: true,
      ...getColumnSearchProps('operationalTimespan', 'Search operational timespan'),
    },
    {
      title: 'Coordinates',
      dataIndex: 'coordinates',
      key: 'coordinates',
      editable: true,
      ...getColumnSearchProps('coordinates', 'Search coordinates'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="primary" onClick={() => save(record._id)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Space>
            <Popconfirm
              title="Are you sure to delete this Landfill data?"
              onConfirm={() => deleteLandfill(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const paginatedData = landfillData.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="row">
      <div className="col-md-12">
        <Title level={4}>All Landfill Data</Title>
        <Form form={form} component={false}>
          <Table
            dataSource={paginatedData}
            columns={columns}
            loading={loading}
            pagination={false}
            rowKey="_id"
          />
          <Pagination
            current={currentPage}
            total={landfillData.length}
            pageSize={5}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </Form>
      </div>
    </div>
  );
};

export default LandfillTable;
