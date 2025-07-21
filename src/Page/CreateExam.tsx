import React from 'react';
import { Upload, Button, Card, Space, Typography } from 'antd';
import {
  UploadOutlined,
  EditOutlined,
  AppstoreOutlined,
  BankOutlined,
  FileTextOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const uploadProps = {
  name: 'file',
  multiple: true,
  action: '/api/upload',
  onChange(info: any) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} đã tải lên thành công`);
    } else if (status === 'error') {
      message.error(`${info.file.name} tải lên thất bại`);
    }
  },
};

const CreateExam = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <Card className="rounded-xl shadow-lg border-0 overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="p-6">
            <Title level={4} className="!mb-6 !text-gray-800">Tạo đề thi mới</Title>
            
            <Dragger 
              {...uploadProps}
              className="border-2 border-dashed border-blue-100 hover:border-blue-300 rounded-xl bg-blue-50"
            >
              <div className="p-8">
                <CloudUploadOutlined className="!text-4xl !text-blue-500 mb-3" />
                <Text className="block !text-base !font-medium !text-gray-700">
                  Chọn File hoặc kéo thả File vào đây
                </Text>
                <Text type="secondary" className="block !mt-2">
                  Hỗ trợ định dạng: .pdf, .docx, .xlsx, .azt, .tex, ảnh
                  <br />
                  Có thể upload đề thi, bài tập, hoặc bảng đáp án để chấm offline.
                </Text>
                
                <Button 
                  type="primary" 
                  icon={<UploadOutlined />} 
                  className="mt-4"
                >
                  Chọn File
                </Button>
              </div>
            </Dragger>
            
            <div className="mt-5 flex items-center">
              <Text className="!text-blue-600 !font-medium">
                Đề mẫu: Azota PDF | DOCX | Excel | Latex
              </Text>
              <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                Mới
              </span>
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
              <Text className="!text-blue-700 !text-sm">
                Azota đã hỗ trợ nhận dạng đề thi từ ảnh (ảnh chụp đề hoặc viết tay)
              </Text>
            </div>
          </div>
        </Card>
      </div>

      {/* Creation Options */}
      <div className="space-y-4">
        <Card 
          hoverable 
          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <Space align="start">
            <div className="bg-blue-100 p-3 rounded-lg">
              <EditOutlined className="!text-blue-600 !text-xl" />
            </div>
            <div>
              <Text strong className="!text-base block">Tự soạn Đề thi / Bài tập</Text>
              <Text type="secondary" className="!text-sm">
                Sử dụng trình soạn thảo của hệ thống để tạo nhanh
              </Text>
            </div>
          </Space>
        </Card>

        <Card 
          hoverable 
          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <Space align="start">
            <div className="bg-green-100 p-3 rounded-lg">
              <AppstoreOutlined className="!text-green-600 !text-xl" />
            </div>
            <div>
              <Text strong className="!text-base block">Tạo đề thi đánh giá năng lực</Text>
              <Text type="secondary" className="!text-sm">
                Dựa trên bộ đề đánh giá có sẵn
              </Text>
            </div>
          </Space>
        </Card>

        <Card 
          hoverable 
          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <Space align="start">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BankOutlined className="!text-purple-600 !text-xl" />
            </div>
            <div>
              <Text strong className="!text-base block">Tạo đề từ Ma trận đề</Text>
              <Text type="secondary" className="!text-sm">
                Sinh đề tự động từ ma trận thiết kế
              </Text>
            </div>
          </Space>
        </Card>

        <Card 
          hoverable 
          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <Space align="start">
            <div className="bg-orange-100 p-3 rounded-lg">
              <FileTextOutlined className="!text-orange-600 !text-xl" />
            </div>
            <div>
              <Text strong className="!text-base block">Tạo đề offline thủ công</Text>
              <Text type="secondary" className="!text-sm">
                Upload đề giấy hoặc nhập thông tin trực tiếp
              </Text>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default CreateExam;