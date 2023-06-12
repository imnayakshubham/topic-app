import { ExperimentOutlined } from '@ant-design/icons';
import { Button, Select, Tooltip } from 'antd';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { tones } from '../../data/constansts';
import "./Blog.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PageNotFound } from '../PageNotFound/PageNotFound';


const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],
};

export const Blog = () => {
    const { state: blogData } = useLocation();
    const [selectedTone, setSelectedTone] = useState(tones[0].name)
    const [content, setContent] = useState(`Random Content for ${blogData?.topic_name}`)
    // const [showGeneratedBlog, setShowGeneratedBlog] = useState(false)

    const handleGenerate = () => {
        setContent(`<h2>This mimics the response generated by Generative AI for the topic ${blogData?.topic_name} based on ${selectedTone}.</h2>`)
        // setShowGeneratedBlog(true)
    }

    if (!blogData) return <PageNotFound />

    return (
        <div className='blog__container'>
            <div className='blog'>
                <div className='blog__header'>
                    <h1 className='blog__title'>{blogData?.topic_name}</h1>
                </div>
                <div className='blog__actions'>
                    <Select
                        className='select__tone'

                        style={{
                            width: "10rem"
                        }}
                        options={tones.map((tone) => ({
                            label: tone.name,
                            value: tone.name
                        }))}
                        value={selectedTone}
                        optionFilterProp='children'
                        onChange={(value) => setSelectedTone(value)}
                    />
                    <Tooltip title={"For Generating Blog using Generative AI based on Selected Tone"}>
                        <Button type="primary" htmlType="submit" icon={<ExperimentOutlined />} onClick={() => handleGenerate()}>
                            Generate Blog
                        </Button>
                    </Tooltip>
                </div>
            </div>

            <div className='blog__result'>
                <ReactQuill
                    theme="snow"
                    placeholder={"Type Here...."}
                    modules={modules}
                    onChange={(value) => {
                        setContent(value)
                    }}
                    value={content}
                />
            </div>
        </div>
    )
}