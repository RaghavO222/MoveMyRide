import React, { useState } from 'react';
import { LogoutOutlined, UserOutlined, CarOutlined, MailOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { Layout, Menu, theme } from 'antd';
import Profile from '../components/Profile'
import Requests from '../components/Requests'
import AddCars from '../components/AddCars'
import AddAccount from '../components/AddAccount'
import { useNavigate } from "react-router";


const { Header, Content, Footer, Sider } = Layout;



const Home = () => {
    const navigate = useNavigate()
    const [selectedKey, setSelectedKey] = useState('1');
    const role = localStorage.getItem('role');


    const menuItems = [
        { key: '1', icon: MailOutlined, label: 'Requests' },
        { key: '2', icon: CarOutlined, label: 'Add Cars' },
        { key: '3', icon: UserOutlined, label: 'Profile' }
    ];

    const adMenuItems = [
        { key: '1', icon: MailOutlined, label: 'Requests' },
        { key: '2', icon: CarOutlined, label: 'Add Cars' },
        { key: '3', icon: UserOutlined, label: 'Profile' },
        { key: '4', icon: UserOutlined, label: 'Add acount' }
    ];

    const itemsToMap = role === 'superadmin' ? adMenuItems : menuItems;
    
    const items = itemsToMap.map(({ key, icon, label }) => ({
        key,
        icon: React.createElement(icon),
        label,
    }));

    const renderContent = () => {
        if (selectedKey === '1') {
            return <Requests />;
        } else if (selectedKey === '2') {
            return <AddCars />;
        } else if (selectedKey === '3') {
            return <Profile />;
        } else if (selectedKey === '4') {
            return <AddAccount />;
        }
    };



    const handleLogout = () => {
        localStorage.removeItem("user-info");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login")
    }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="h-[84px] m-0 text-center text-white whitespace-nowrap flex items-center justify-center">
                        <h1 className="text-sm md:text-2xl font-bold text-white whitespace-nowrap">
                            MoveMyRide
                        </h1>
                    </div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={({ key }) => setSelectedKey(key)}
                        defaultSelectedKeys={['1']}
                        items={items}
                    />

                    <div className="mt-auto p-4">
                        <Button icon={<LogoutOutlined />} onClick={handleLogout} type="primary" danger block>
                            Logout
                        </Button>
                    </div>
                </div>
            </Sider>

            <Layout className="flex flex-col">
                <Header className="p-0" style={{ background: colorBgContainer }} />

                <Content className="m-4 flex-1">
                    <div
                        className="p-6 h-full rounded-lg"
                        style={{ background: colorBgContainer }}
                    >
                        {renderContent()}
                    </div>
                </Content>

                <Footer className="text-center">
                    ©2025 Created by Raghav
                </Footer>
            </Layout>
        </Layout>


    );
};

export default Home;
