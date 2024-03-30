import React, { useState, useEffect, useRef } from 'react';
import { Typography, Table, Input, Button, Space, Popconfirm, message, Form, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Title from 'antd/es/typography/Title';

const STSTable = () => {
  const [stsData, setStsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const searchInput = useRef(null);

  useEffect(() => {
    async function fetchStsData() {
      try {
        const response = await axios.get('http://localhost:5000/sts');
        setStsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching STS data:', error);
      }
    }
    fetchStsData();
  }, []);

  const deleteSts = async (stsId) => {
    try {
      await axios.delete(`http://localhost:5000/sts/${stsId}`);
      setStsData(stsData.filter(sts => sts._id !== stsId));
      message.success('STS data deleted successfully');
    } catch (error) {
      console.error('Error deleting STS data:', error);
      message.error('Failed to delete STS data');
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
      const newData = [...stsData];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setStsData(newData);
        setEditingKey('');
        await axios.put(`http://localhost:5000/sts/${key}`, row);
        message.success('STS data updated successfully');
      } else {
        message.error('STS data not found');
      }
    } catch (error) {
      console.error('Error updating STS data:', error);
      message.error('Failed to update STS data');
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
      title: 'STSId',
      dataIndex: '_id',
      key: '_id',
      ...getColumnSearchProps('_id', 'Search STSId'),
    },
    {
      title: 'Ward',
      dataIndex: 'ward',
      key: 'ward',
      editable: true,
      ...getColumnSearchProps('ward', 'Search ward'),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      editable: true,
      ...getColumnSearchProps('capacity', 'Search capacity'),
    },
    {
      title: 'Coordinate',
      dataIndex: 'coordinate',
      key: 'coordinate',
      editable: true,
      ...getColumnSearchProps('coordinate', 'Search coordinate'),
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
              title="Are you sure to delete this STS data?"
              onConfirm={() => deleteSts(record._id)}
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
  const paginatedData = stsData.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="row">
      <div className="col-md-12">
        <Title level={4}>All STS Data</Title>
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
            total={stsData.length}
            pageSize={5}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </Form>
      </div>
    </div>
  );
};

export default STSTable;
