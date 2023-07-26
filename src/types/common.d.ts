export interface IRes<T> {
  code: number;
  data: T;
  msg: '';
}

export interface IEditDrawer<T> {
  /**
   * 抽屉标题
   */
  title: string;
  /**
   * 抽屉显示隐藏
   */
  visible: boolean;
  /**
   * 用来编辑的数据
   */
  rawData?: T;
  /**
   * 点击确定按钮，页面组件接受数据
   */
  submitData: (data: T) => void;
  /**
   * 更改抽屉显示隐藏状态
   */
  toggleVisible: (status?: boolean) => void;
}
