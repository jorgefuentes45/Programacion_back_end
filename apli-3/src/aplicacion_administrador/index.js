import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Result } from 'antd';
import Inicio from './Inicio';
import Postres from './Postres';
import Recetas from './Recetas';
import Sugerencias from './Sugerencias';


const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Inicio', '1', <PieChartOutlined />),
  getItem('Postres', '2', <DesktopOutlined />),
  getItem('Recetas', '3', <UserOutlined />, ),
  getItem('Sugerencias', '4', <TeamOutlined />, ),
];



const Aplicacion_administrador = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('1');

  const handleClick = e => {
    setSelectedItem(e.key);
    console.log(selectedItem);
};

  
const RenderContent = () => {
    switch (selectedItem) {
        case '1':
            return <Inicio />;
            
        case '2':
            return <Postres />;
            
        case '3':
            return <Recetas />;
            
            case '4':
            return <Sugerencias />;
            
        default:
            return <Result
                status="404"
                title="404"
                subTitle="Lo siento, esta pagina no existe."
            />;
    }
  };
  
    
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  >
        {items.map(item => {
                            if (item.children) {
                                return (
                                    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                                        {item.children.map(child => (
                                            <Menu.Item key={child.key} onClick={handleClick}>
                                                {child.label}
                                            </Menu.Item>
                                        ))}
                                    </Menu.SubMenu>
                                );
                            }
                            return (
                                <Menu.Item key={item.key} icon={item.icon} onClick={handleClick}>
                                    {item.label}
                                </Menu.Item>
                            );
                        })}
           </Menu> 
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <RenderContent />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};
export default Aplicacion_administrador;