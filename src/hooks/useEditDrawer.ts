import { useState } from 'react';

export function useEditDrawer<T>(submitDataCallback: (data: T) => void) {
  /**
   * 抽屉显示隐藏状态
   */
  const [visible, setVisible] = useState(false);
  /**
   * 抽屉标题
   */
  const [title, setTitle] = useState('');
  /**
   * 如果是编辑状态，被编辑的数据
   */
  const [dataToBeEdited, setDataToBeEdited] = useState<T>();

  /**
   * 切换抽屉显示状态。
   * @param status
   */
  const toggleDrawerVisible = (status?: boolean) => {
    const newStatus = status || !visible;
    if (!newStatus) {
      setDataToBeEdited(null);
    }
    setVisible(newStatus);
  };

  /**
   * 点击确定按钮，提交数据
   * @param data
   */
  const submitData = (data: T) => {
    submitDataCallback(data);
  };

  return {
    visible,
    toggleDrawerVisible,
    title,
    setTitle,
    dataToBeEdited,
    setDataToBeEdited,
    submitData,
  };
}
