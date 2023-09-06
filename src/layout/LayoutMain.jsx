import { CarOutlined, CarryOutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import NavBar from '../components/navBar/NavBar';
import React from 'react';
import classes from './LayoutMain.module.scss'
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const LayoutMain = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  
  const handleMenuItem = (key) => {
    // Add logic to navigate to different pages based on the key
    switch (key) {
      case '1':
        navigate('/admin/all-customers'); // Navigate to the '/korisnici' route
        break;
      case '2':
        navigate('/cars'); // Navigate to the '/vozila' route
        break;
      case '3':
        navigate('/reservations'); // Navigate to the '/rezervacije' route
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          theme="light"
          mode="inline"        
          defaultSelectedKeys={['3']}
          items={['Korisnici', 'Vozila', 'Rezervacije'].map(
            (label, index) => ({
              key: String(index + 1),
              icon: React.createElement(index === 0 ? UserOutlined : index === 1 ? CarOutlined : CarryOutOutlined),
              label: label,
            }),
          )}
          className={classes.menu}
          onClick={({key}) => handleMenuItem(key)}
        />
      </Sider>
      <Layout>
        <NavBar />
        <Content>
          <div className={classes.wrapper}>
            {children}
          </div>
        </Content>
        <Footer>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutMain;