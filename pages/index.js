import React from "react"
import {
	Layout,
	Menu,
	Row,
	Col,
	Statistic,
	PageHeader,
	Progress,
	Divider,
	Typography } from "antd";
import {
    UserOutlined
} from "@ant-design/icons";

import CasePerDay from '../components/CasePerDay'

const { Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const Home = ({ data }) => {

	const recoveredCasePercentage = ((data.recovered * 100) / data.cases).toFixed(2)
	const deathsCasePercentage = ((data.deaths * 100) / data.cases).toFixed(2)

    return (
        <Layout>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                }}
            >
                <div className="logo">
					<img src={data.countryInfo.flag} style={{ width: 200 }} />
				</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <PageHeader
                    className="site-layout-background"
					title={data.country}
    				subTitle={`Ultima actualización: ${data.updated}`}
                />
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, textAlign: "center" }}
                    >
						<Row justify="center">
							<Col span={12}>
								<Title level={3}>Total de habitantes</Title>
								<Title level={4}>{(data.population).toLocaleString()}</Title>
							</Col>
						</Row>
						<Divider />
                        <Row justify="center">
							<Col span={4}>
								<Statistic title="Casos Confirmados" value={data.cases} />
							</Col>
							<Col span={4}>
								<Statistic title="Casos Recuperados" value={data.recovered} />
							</Col>
							<Col span={4}>
								<Statistic title="Fallecidos" value={data.deaths} />
							</Col>
						</Row>
						<Divider>% sobre casos confirmados</Divider>
						<Row justify="center">
							<Col span={4}></Col>
							<Col span={4}>
								<Progress type="circle" width={80} percent={recoveredCasePercentage} status="success" format={percent => `${percent}%`} />
							</Col>
							<Col span={4}>
								<Progress type="circle" width={80} percent={deathsCasePercentage} status="exception" format={percent => `${percent}%`} />
							</Col>
						</Row>
						<Divider>Casos x millon de habitantes</Divider>
						<Row justify="center">
							<Col span={6}>
								<Statistic title="Casos x millon" value={data.casesPerOneMillion} />
							</Col>
							<Col span={6}>
								<Statistic title="Fallecidos x millon" value={data.deathsPerOneMillion} />
							</Col>
						</Row>
						<PageHeader
							className="site-layout-background"
							title="Numeros por día"
							subTitle="Ultimos 30 días"
						/>
						<Divider />
						<CasePerDay />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export async function getStaticProps(context) {

	const res = await fetch(`https://corona.lmao.ninja/v3/covid-19/countries/argentina`)
	const data = await res.json()

	/* const results = await data.All */

	if (!data) {
		return {
		  	notFound: true,
		}
	}
	
	return {
	  	props: {
			data,
		}, // will be passed to the page component as props
	}
}

export default Home
