import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ClassCardGrid from './ClassCardGrid';
Tabs.setUseDefaultStyles(false);


class Sidebar extends Component {
    render () {
        return (
            <div className="sq-side-bar">
                <Tabs selectedIndex={0} className="sq-side-bar--tab-panel">
                    <TabList>
                        <Tab>Custom Classes</Tab>
                        <Tab>Pre-made Classes</Tab>
                    </TabList>
                    <TabPanel>
                        <h2>Custom</h2>
                        <ClassCardGrid />
                    </TabPanel>
                    <TabPanel>
                        <h2>Premade</h2>
                        <ClassCardGrid />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Sidebar