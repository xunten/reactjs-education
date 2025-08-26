import React, { useMemo, useState } from 'react';
import {
  Card,
  Table,
  Typography,
  Button,
  Space,
  Input,
  Tag,
  Dropdown,
  message,
  Select,
  Image,
  Modal,
  Form,
  Upload,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  MoreOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileZipOutlined,
  FileOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useMaterialsByClass } from '../hooks/useMaterials';
import { useClasses } from '../hooks/useClasses';
import { materialsApi } from '../api/materialsApi';
import type { ClassMaterial } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// Map MIME type -> dạng ngắn gọn
const mapFileType = (mime: string): string => {
  if (!mime) return 'Khác';
  if (mime.includes('pdf')) return 'PDF';
  if (mime.includes('word') || mime.includes('doc')) return 'DOCX';
  if (mime.includes('presentation') || mime.includes('ppt')) return 'PPTX';
  if (mime.includes('zip')) return 'ZIP';
  if (mime.includes('png')) return 'PNG';
  if (mime.includes('jpg') || mime.includes('jpeg')) return 'JPG';
  return mime.toUpperCase();
};

// Icon theo fileType
const getFileIcon = (fileType: string, filePath: string) => {
  if (fileType === 'PDF') return <FilePdfOutlined style={{ color: 'red', fontSize: 20 }} />;
  if (fileType === 'DOCX') return <FileWordOutlined style={{ color: 'blue', fontSize: 20 }} />;
  if (fileType === 'PPTX') return <FilePptOutlined style={{ color: 'orange', fontSize: 20 }} />;
  if (fileType === 'ZIP') return <FileZipOutlined style={{ color: 'cyan', fontSize: 20 }} />;
  if (fileType === 'PNG' || fileType === 'JPG') {
    return (
      <Image
        src={filePath}
        width={20}
        height={20}
        preview={false}
        style={{ border: 'none', boxShadow: 'none', objectFit: 'cover' }}
      />
    );
  }
  return <FileOutlined style={{ fontSize: 20 }} />;
};

// Tag màu sắc theo loại file
const getFileTypeTag = (fileType: string) => {
  const colorMap: Record<string, string> = {
    PDF: 'red',
    DOCX: 'blue',
    PPTX: 'orange',
    ZIP: 'cyan',
    JPG: 'green',
    PNG: 'green',
  };
  return <Tag color={colorMap[fileType] || 'default'}>{fileType}</Tag>;
};

const MaterialsPage: React.FC = () => {
  const { classes } = useClasses();
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const { data: materials, isLoading, error } = useMaterialsByClass(selectedClassId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async (id: number) => {
    try {
      await materialsApi.delete(id);
      message.success('Xóa tài liệu thành công');
    } catch {
      message.error('Lỗi khi xóa tài liệu');
    }
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('classId', values.classId);
      if (values.file?.file) {
        formData.append('file', values.file.file);
      }
      await materialsApi.create(formData);
      message.success('Thêm tài liệu thành công');
      setIsModalOpen(false);
      form.resetFields();
    } catch {
      message.error('Lỗi khi thêm tài liệu');
    }
  };

  const materialsWithClass = useMemo(() => {
    if (!materials || !classes) return [];
    return materials.map(m => {
      const cls = classes.find(c => c.id === m.classId);
      return {
        ...m,
        className: cls ? cls.className : 'Không rõ',
        fileType: mapFileType(m.fileType),
      };
    });
  }, [materials, classes]);

  const columns = useMemo(
    () => [
      {
        title: 'Tên tài liệu',
        key: 'title',
        render: (_: unknown, record: ClassMaterial) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getFileIcon(record.fileType, record.filePath)}
            <span>{record.title}</span>
          </div>
        ),
      },
      { title: 'Lớp học', dataIndex: 'className', key: 'className' },
      { title: 'Loại tệp', dataIndex: 'fileType', key: 'fileType', render: (ft: string) => getFileTypeTag(ft) },
      { title: 'Người upload', dataIndex: 'createdBy', key: 'createdBy' },
      {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss'),
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (_: unknown, record: ClassMaterial) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'edit',
                  label: (
                    <Space>
                      <EditOutlined /> Chỉnh sửa
                    </Space>
                  ),
                  onClick: () => {
                    setIsModalOpen(true);
                    form.setFieldsValue(record);
                  },
                },
                {
                  key: 'delete',
                  label: (
                    <Space>
                      <DeleteOutlined /> Xóa
                    </Space>
                  ),
                  danger: true,
                  onClick: () => handleDelete(record.id),
                },
                {
                  key: 'download',
                  label: (
                    <a href={record.filePath} download>
                      <DownloadOutlined /> Tải xuống
                    </a>
                  ),
                },
              ],
            }}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        ),
      },
    ],
    [form]
  );

  if (error) {
    return <div style={{ padding: 24 }}>Lỗi tải dữ liệu: {(error as Error).message}</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Quản lý Tài liệu</Title>

      <Select
        placeholder="Chọn lớp"
        value={selectedClassId ?? undefined}
        onChange={setSelectedClassId}
        allowClear
        style={{ width: 200, marginBottom: 16 }}
        options={classes?.map(c => ({ label: c.className, value: c.id }))}
      />

      <Card
        title={<Text strong>Danh sách Tài liệu</Text>}
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Thêm tài liệu
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={materialsWithClass}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 7 }}
        />
      </Card>

      <Modal
        title="Thêm / Chỉnh sửa tài liệu"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tên tài liệu" rules={[{ required: true, message: 'Nhập tên tài liệu' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="classId" label="Chọn lớp" rules={[{ required: true, message: 'Chọn lớp' }]}>
            <Select options={classes?.map(c => ({ label: c.className, value: c.id }))} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="file" label="File" valuePropName="file">
            <Upload beforeUpload={() => false}>
              <Button icon={<PlusOutlined />}>Chọn file</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaterialsPage;
