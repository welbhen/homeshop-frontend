import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './style.css';

const newTab = (product) => {
    return (
        <Tabs>
            <TabList>
                <Tab><b>Description</b></Tab>
                <Tab><b>Specifications</b></Tab>
            </TabList>

            <TabPanel>
                <h6 className="tab-text">
                    {product.description}
                </h6>
            </TabPanel>
            <TabPanel>
                <h6 className="tab-text">
                    {product.additionalInfo}
                </h6>
            </TabPanel>
        </Tabs>        
    );
  
};

export default newTab;