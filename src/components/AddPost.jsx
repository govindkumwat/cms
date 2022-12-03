import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Grid, Text, Button, Row } from "@nextui-org/react";

export const AddPost = () => {
    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [postdata, setPostdata] = useState([])
    const [addres, setAddRes] = useState([])
    const [posting, setposting] = useState(false)

    const addPost = () => {
        setposting(true)
        axios.post(`http://localhost:3003/addpost`, {
            title: title,
            description: description
        }).then((response) => {
            setAddRes(response.data.title)
            setTitle([])
            setDescription([])
            setposting(false)
        })
    }

    useEffect(() => {
        fetch('http://localhost:3003/posts')
            .then((response) => response.json())
            .then((data) => setPostdata(data))
    }, [addres])

    console.log(addres)


    return (
        <div className='maincontainer'>
            <div className='addpost'>
                <div className='addposttitle'>Add Post</div>
                <div className='inputbox'>
                    <input className='' type="text" placeholder='Title goes here' value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <textarea  rows="8" placeholder='Description goes here' value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    <button onClick={() => addPost()}>{posting ? 'Posting...' :  'Post'}</button>
                </div>


            </div>

            <div>
            <h2 className='recent'>Recent Posts</h2>
            {postdata?.slice(0).reverse()?.map((value, index) => {
                return (
                    <div className='postlist'>
                      <p className='title'> {value.title}</p>
                      <p className='description'>{value.description}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
