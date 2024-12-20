// src/pages/features
import './styles.scss';

import threadsImage from '../../assets/img/discord messages/Threads.png';
import upvotesImage from '../../assets/img/discord messages/Upvotes.png';
import rankImage from '../../assets/img/discord messages/rank.png';

function Features() {
    return (
        <div className="page features-page">
            <div className="container">
                <div className="feature-showcase">
                    <div className="showcase-title">
                        All Features:
                    </div>

                    <div className="feature">
                        <div className="feature-text">
                            <div className="title">Discord Threads!</div>
                            <div className="description">Botveon will create threads to act as a comment sections!</div>
                        </div>
                        <div className="feature-image">
                            <img src={threadsImage} className='image' alt="discord upvotes" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-text">
                            <div className="title">Discord Upvotes and Downvotes!</div>
                            <div className="description">A simple upvote/downvote system to enhance your channels!</div>
                        </div>
                        <div className="feature-image">
                            <img src={upvotesImage} className='image' alt="discord upvotes" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-text">
                            <div className="title">Level system!</div>
                            <div className="description">Compete against server members and unlock roles!</div>
                        </div>
                        <div className="feature-image">
                            <img src={rankImage} className="image" alt="discord upvotes" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Features;