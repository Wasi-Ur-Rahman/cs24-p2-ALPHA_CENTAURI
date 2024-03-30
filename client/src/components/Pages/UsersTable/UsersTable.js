import React, { useState, useEffect } from 'react';
import { Typography, Table, Input, Button, Space, Popconfirm, message, Form, Pagination } from 'antd';
import axios from 'axios';
import Title from 'antd/es/typography/Title';
import { SearchOutlined } from '@ant-design/icons'; // Import SearchOutlined

const UsersTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const pageSize = 6; // Number of items per page

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUserData(userData.filter(user => user._id !== userId));
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
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
      const newData = [...userData];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setUserData(newData);
        setEditingKey('');
        await axios.put(`http://localhost:5000/users/${key}`, row);
        message.success('User updated successfully');
      } else {
        message.error('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    }
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      ...getColumnSearchProps('name'),
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item name="name" style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          );
        }
        return text;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
      ...getColumnSearchProps('email'),
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item name="email" style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          );
        }
        return text;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      editable: true,
      ...getColumnSearchProps('role'),
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item name="role" style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          );
        }
        return text;
      },
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
              title="Are you sure to delete this user?"
              onConfirm={() => deleteUser(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
            <Button onClick={() => edit(record)}>Edit</Button>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      inputType: col.dataIndex === 'age' ? 'number' : 'text',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  }));

  // Pagination change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <Title level={4}>All Users</Title>
        <Form form={form} component={false}>
          <Table
            dataSource={userData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            columns={mergedColumns}
            loading={loading}
            pagination={false}
            rowKey="_id"
          />
        </Form>
        {/* Pagination component */}
        <Pagination
          current={currentPage}
          total={userData.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />
      </div>
    </div>
  );
};

export default UsersTable;
