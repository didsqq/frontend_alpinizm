import { Layout, Menu, ConfigProvider } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import '../index.css'; // Подключаем стили
import { Avatar } from "antd";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "Home", label: <Link to="/">Home</Link> },
  { key: "Equipment", label: <Link to="/equipment">Equipment</Link> },
  { key: "AboutUs", label: <Link to="/aboutus">About Us</Link> },
  { key: "Blog", label: <Link to="/blog">Blog</Link> },
];

export const LayoutComponent = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Delicious Handrawn, sans-serif',
        },
      }}
    >
      <Layout style={{ minHeight: '200vh' }}>
        <Layout style={{ background: '#0B1D26' }}>
            <Header
              style={{
                background: '#0B1D26',
              }}
            >          
            <div className="header-container">
              <div className="logo">
                <Link to="/">
                  <img src="../public/Logo.svg" alt="Logo" />
                </Link>
              </div>
              
              <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                style={{
                  background: '#0B1D26',
                  fontSize: '22px',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              />

              <div className="profile-icon">
                <Link to="/profile">
                  <img src="../public/Account.svg" alt="Account" />
                </Link>
              </div>
            </div>
          </Header>

          <Content style={{ margin: '16px', background: '#0B1D26' , margin: 0}}>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Content>

          <Footer style={{color: 'white', textAlign: 'center', fontSize: '22px', background: '#0B1D26' }}>
            My Site 2025
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
