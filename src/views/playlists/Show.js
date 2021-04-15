import axios from 'axios'
import React, { useEffect, useState } from 'react'
import App from '../../layouts/App'
import Header from '../../components/Header'
import { useParams } from 'react-router'

export default function Index() {

    const {slug} = useParams()
    console.log(slug);
    const [playlist, setPlaylist] = useState([])
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        let isMounted = true
        const getApiData = async (url, set) => {
            let {data} = await axios.get(url)
            console.log(data.data);
            if (isMounted) {
                set(data.data)
            }
        }
            getApiData(`api/playlists/${slug}`, setPlaylist)
            getApiData(`api/playlists/${slug}/videos`, setLessons)
        
        return () => {isMounted=false}

    }, [slug])

    return (
        <App title="Series">
           <Header title={playlist.name}>
               <div className="text-secondary">
               {playlist.description}
               </div>

               <div className="mt-3">
                    <button className="btn btn-secondary me-2">
                       Watch Intro
                   </button>

                   <button className="btn btn-primary">
                       Add to Cart
                   </button>
               </div>
           </Header>

           <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-white border-bottom py-3">
                            <strong>{playlist.name}</strong>
                        </div>
                        <div className="card-body">
                            <ol>
                            {lessons.map((lesson, index) => (
                                <li key={index} className="py-2">
                                    <a href="#" className="text-decoration-none text-dark">
                                        {lesson.title}
                                        <div className="d-flex justify-content-between border-bottom">
                                            <div>
                                                <p className="text-secondary">Episode {lesson.episode}</p>
                                            </div>
                                            <div>
                                                <p>{lesson.runtime}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                
                            ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-md-6" style={{marginTop: -200}}>
                    <div className="card border-0">
                        <img src={playlist.picture} alt={playlist.name} className="card-img-top"/>
                    </div>
                </div>
            </div>
           </div>

            <div className="container">
               <div className="row">
                    <div className="col-md-6">

                    </div>
                 </div>
            </div>
        </App>
    )
}
