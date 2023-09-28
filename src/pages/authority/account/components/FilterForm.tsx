import { AccountFilter } from '@/types/account';
import { Form, Input } from '@arco-design/web-react';
import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';

const FormItem = Form.Item;

interface IProps {
  submitFilter: (filterData: AccountFilter) => void;
}

const FilterForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();

  const formDataChange = debounce((_, currentFilterData: AccountFilter) => {
    props.submitFilter(currentFilterData);
  }, 300);

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, []);
  useEffect(() => {
    const accountName = searchParams.get('accountName');
    form.setFieldValue('accountName', accountName || undefined);
  }, [form, searchParams]);

  return (
    <Form layout="inline" form={form} onChange={formDataChange}>
      <FormItem label="用户名称" field="accountName">
        <Input placeholder="请输入用户名称" />
      </FormItem>
    </Form>
  );
};
export default FilterForm;
