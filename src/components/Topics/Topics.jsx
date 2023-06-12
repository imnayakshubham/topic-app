import { Button, Divider, Tabs, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { categories, topicsList } from '../../data/constansts'
import { AddTopicModal } from '../AddTopic/AddTopicModal'
import { Topic } from '../Topic/Topic'
import "./Topics.css"
import { PlusOutlined } from '@ant-design/icons'


const { Text, Title } = Typography

export const Topics = () => {
    const [currentTab, setcurrentTab] = useState("all")
    const [showAddTopicModal, setshowAddTopicModal] = useState(false)
    const [topicsData, setTopicsData] = useState(topicsList)
    const categoryWiseTopics = useMemo(() => {
        if (currentTab === "all") {
            return topicsData
        } else {
            return topicsData.filter((topic) => topic.category === currentTab)
        }
    }, [topicsData, currentTab])

    const handleAddTopic = () => {
        setshowAddTopicModal(true)
    }

    return (
        <div className='topics__container'>
            <div>
                <h2>Categories</h2>
                <Divider />
                <Tabs activeKey={currentTab} defaultActiveKey={currentTab} onChange={(key) => setcurrentTab(key)} tabBarExtraContent={<Button type='primary' icon={<PlusOutlined />} onClick={() => handleAddTopic()}>Add Topic</Button>}>
                    {categories?.map((category) => <Tabs.TabPane tabKey={category.key} key={category.key}
                        tab={<Text>{category.name}</Text>
                        } />)}
                </Tabs>
                <div>
                    <div className='recommend__topics__header'><Title level={5}>Recommend Topics</Title></div>
                    {
                        categoryWiseTopics.map((topic) => <Topic topicData={topic} key={topic.id} setTopicsData={setTopicsData} />)
                    }
                </div>
            </div>
            <AddTopicModal showAddTopicModal={showAddTopicModal} setshowAddTopicModal={setshowAddTopicModal} setTopicsData={setTopicsData} topicsData={topicsData} />
        </div>
    )
}
