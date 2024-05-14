import React from 'react';
import {Layout, theme} from 'antd';
import NavBar from "./components/NavBar";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./pages/News";
import CreateHeader from './components/CreateHeader';

const {Content, Footer } = Layout;

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <BrowserRouter>
            <Layout>
                <CreateHeader/>
                <Content style={{padding: '0 35px'}}>
                    <NavBar/>
                    <Layout style={{padding: '10px 0', background: colorBgContainer}}>
                        <div className='content'>
                            <Route path="/news">
                                <News/>
                            </Route>
                        </div>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center', background: "grey"}}>
                    Footer
                </Footer>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
