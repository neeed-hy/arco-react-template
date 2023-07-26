import { Account } from '@/types/account';
import { IEditDrawer } from '@/types/common';
import { Drawer, Form, Input } from '@arco-design/web-react';
import { useEffect } from 'react';

const EditCompanyDrawer: React.FC<IEditDrawer<Account>> = (props) => {
  const { visible, submitData, toggleVisible, rawData, title } = props;
  const [form] = Form.useForm<Account>();
  const checkData = () => {
    form
      .validate()
      .then((res) => {
        submitData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);
  useEffect(() => {
    if (rawData) {
      form.setFieldsValue({
        accountName: rawData.accountName,
        id: rawData.id,
      });
    }
  }, [form, rawData]);

  return (
    <Drawer
      width={400}
      title={title}
      visible={visible}
      maskClosable={false}
      onOk={() => {
        checkData();
      }}
      onCancel={() => {
        toggleVisible(false);
      }}
    >
      <Form form={form} layout="vertical" autoComplete="false">
        <Form.Item
          label="用户名称"
          field="accountName"
          rules={[{ required: true, message: '请输入用户名称' }]}
        >
          <Input placeholder="请输入用户名称" />
        </Form.Item>
        <Form.Item field="id" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
export default EditCompanyDrawer;
