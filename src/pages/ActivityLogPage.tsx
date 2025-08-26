import React, { useState } from 'react';
import { Card, Table, Typography, Spin, Alert, Button, Popconfirm, message, Space, Select, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useActivityLogs } from '../hooks/useActivityLogs';
import type { ActivityLog } from '../types';

const { Title } = Typography;
const { Option } = Select;

const CRUD_ACTIONS = ['CREATE', 'UPDATE', 'DELETE'];

const ActivityLogPage: React.FC = () => {
  const { data: activityLogs, isLoading, error, deleteLogs } = useActivityLogs();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | undefined>();
  const [selectedAction, setSelectedAction] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDeleteSelected = () => {
    if (!selectedRowKeys.length) return;
    deleteLogs.mutate(selectedRowKeys as number[], {
      onSuccess: () => {
        message.success(`${selectedRowKeys.length} activity logs deleted`);
        setSelectedRowKeys([]);
      },
      onError: () => {
        message.error('Failed to delete activity logs');
      },
    });
  };

  // Filter data by user, action, and date
  const filteredData = activityLogs?.filter(log => {
    const matchUser = !selectedUser || log.userId === selectedUser;
    const matchAction = !selectedAction || log.actionType === selectedAction;
    const matchDate = !selectedDate || dayjs(log.createdAt).isSame(selectedDate, 'day');
    return matchUser && matchAction && matchDate;
  }) ?? [];

  const columns: ColumnsType<ActivityLog> = [
    {
      title: 'User Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Action',
      dataIndex: 'actionType',
      key: 'actionType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss'),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Target Table',
      dataIndex: 'targetTable',
      key: 'targetTable',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Loading activity logs..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Data Load Error"
          description={`Failed to load activity logs: ${(error as Error).message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Activity Logs
      </Title>

      <Card>
        {/* Filters */}
        <Space style={{ marginBottom: 16, flexWrap: 'wrap' }}>
          <Select
            placeholder="Select User"
            style={{ width: 200 }}
            value={selectedUser}
            onChange={setSelectedUser}
            allowClear
          >
            {activityLogs
              ?.map(l => ({ id: l.userId, name: l.fullName }))
              .filter((v, i, arr) => v.id && arr.findIndex(a => a.id === v.id) === i)
              .map(u => (
                <Option key={u.id} value={u.id}>
                  {u.name}
                </Option>
              ))}
          </Select>

          <Select
            placeholder="Select Action"
            style={{ width: 180 }}
            value={selectedAction}
            onChange={setSelectedAction}
            allowClear
          >
            {CRUD_ACTIONS.map(a => (
              <Option key={a} value={a}>
                {a}
              </Option>
            ))}
          </Select>

          <DatePicker
            placeholder="Select Date"
            style={{ width: 180 }}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </Space>

        {selectedRowKeys.length > 0 && (
          <Popconfirm
            title="Are you sure you want to delete the selected activity logs?"
            onConfirm={handleDeleteSelected}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button danger style={{ marginBottom: 16 }}>
              Delete Selected ({selectedRowKeys.length})
            </Button>
          </Popconfirm>
        )}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
};

export default ActivityLogPage;
