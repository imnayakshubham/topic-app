import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, notification } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useMemo } from 'react'

export const AddTopicModal = ({ showAddTopicModal, setshowAddTopicModal, setTopicsData, topicsData }) => {
    const [form] = Form.useForm()
    const closeModal = () => {
        setshowAddTopicModal(false)
        form.resetFields()
    }

    const onFinish = (values) => {
        setTopicsData((prev) => [{ ...values, category: "custom", id: new Date().getTime() }, ...prev])
        notification.success({
            message: "Topic Added to Custom Category Successfully",
            duration: 2
        })
        closeModal()
    }

    const tagOptions = useMemo(() => topicsData.reduce((acc, curr) => {
        acc.push(...curr.key_words)
        return [...new Set(acc)]
    }, []), [topicsData])


    return (
        <Modal title={"Add Topic"} open={showAddTopicModal} footer={null} onCancel={() => closeModal()} >
            <Form
                form={form}
                name="add_topic"
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Topic Name"
                    name="topic_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Topic Name!',
                        },
                    ]}
                >
                    <Input type='text' placeholder='Please input Topic Name!' allowClear />
                </Form.Item>


                <Form.Item
                    label="Key words"
                    name="key_words"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Key word(s)',
                        },
                    ]}
                >
                    <Select
                        mode="tags"
                        placeholder="Enter Key words"
                        options={tagOptions.map((option) => ({
                            label: option,
                            value: option
                        }))}
                        showSearch
                        allowClear
                        optionFilterProp="label" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ float: "right" }} icon={<PlusOutlined />}>
                        Add Topic
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
