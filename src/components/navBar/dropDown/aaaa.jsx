import './DropDown.scss'

import { Dropdown as AntdDropDown, Space } from 'antd';
import { CarOutlined, DownOutlined, LogoutOutlined, SmileOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:5173/cars">
        Add new user
      </a>
    ),
    icon: <UserAddOutlined />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Add new car
      </a>
    ),
    icon: <CarOutlined />,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Add new reservation
      </a>
    ),
    icon: <SmileOutlined />,
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Change language
      </a>
    ),
  },
  {
    key: '5',
    danger: true,
    label: 'Logout',
    icon:<LogoutOutlined />,
  },
  
];

const handleClick = () => {
  
}


const DropDown = () => (
  <AntdDropDown
    menu={{
      items,
    }}
    trigger={['click']}
    onClick={handleClick}
   >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <UserOutlined className='dropdown'/>
        <DownOutlined className='dropdown'/>
      </Space>
    </a>
  </AntdDropDown>
);
export default DropDown;