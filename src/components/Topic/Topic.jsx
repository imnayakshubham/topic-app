import { Button, Tag, Typography, notification } from 'antd';
import React from 'react'
import "./Topic.css"
import { colorCodes } from '../../data/constansts';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const { Text } = Typography

export const Topic = ({ topicData, setTopicsData }) => {
    const navigateTo = useNavigate()

    const deleteTopic = (id) => {
        setTopicsData((prev) => prev.filter((topic) => topic.id !== id))
        notification.success({
            message: "Topic Delete Successfully",
            duration: 3
        })
    }
    return (
        <div className='topic__card'>
            <div className='topic__card__content'>
                <div className='topic__card__content__title'><Text strong>{topicData?.topic_name}</Text></div>
                <div className='topic__card__content__keywords'>{topicData.key_words?.map((keyword, index) => <Tag key={keyword + index} color={colorCodes[index]}>{keyword}</Tag>)}</div>
            </div>
            <div className='topic__card__action'>
                <Button icon={<EditOutlined />} onClick={() => navigateTo(`/topic/${topicData.id}`, { state: topicData })}>Write</Button>
                <Button danger onClick={() => deleteTopic(topicData.id)} icon={<DeleteOutlined />}>Delete</Button>
            </div>
        </div>
    )
}
