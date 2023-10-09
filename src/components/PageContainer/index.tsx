import { PageHeader, PageHeaderProps, Spin } from '@arco-design/web-react';
import { useMemo } from 'react';

type TProps = PageHeaderProps & {
  isLoading?: boolean;
};

const defaultProps: TProps = {
  isLoading: false,
  backIcon: false,
};

const PageContainer: React.FC<TProps> = (props = defaultProps) => {
  const { isLoading } = props;
  // 直接传过去浏览器会报一个warning级别的错误，不好看
  const pageHeaderProps = useMemo(() => {
    const headerProps = Object.entries(props).filter(([key]) => {
      return key !== 'isLoading';
    });
    return Object.fromEntries(headerProps);
  }, [props]);
  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#fff' }}>
      <Spin loading={isLoading} style={{ display: 'block' }}>
        <PageHeader {...pageHeaderProps} />
      </Spin>
    </div>
  );
};
export default PageContainer;
