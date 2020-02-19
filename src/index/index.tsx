import React, { useState } from 'react';
import { Container, Tab, Tabs, Box } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import HeaderCom from '../components/header/header';
import './index.less';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 500,
    },
    tabs: {
        width: 120,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));
function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
interface TabPanelProps {
    value: any;
    index: any;
    children?: React.ReactNode;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Container
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Container>
    );
}
const IndexPage: React.FC = () => {
    
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const pages = new Array(30).fill(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setPage(newValue);
    };
    return (
        <div className="home-page">
            <HeaderCom />
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    value={page}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {
                        pages.map((v, i) => {
                            return <Tab  label={i} {...a11yProps(i)} />
                        })
                    }
                </Tabs>
                {
                        pages.map((v, i) => {
                            return <TabPanel value={page} index={i}>
                            第{i}本书内容
                        </TabPanel>
                        })
                    }
            </div>
        </div>
    );
}

export default IndexPage;
