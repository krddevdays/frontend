import * as React from 'react';
import Markdown from 'markdown-to-jsx';

import './DiscussionCard.css';
import { /* Author, */ AuthorProps } from '../Author/Author';

export type DiscussionCardProps = {
    description: string | null;
    speaker: AuthorProps;
    title: string;
    votes: number;
};

enum UserStates {
    readyToVote = 'Проголосовать',
    voted = 'Передумать',
    author = 'Удалить'
}

export default function DiscussionCard(props: DiscussionCardProps) {
    const [userState, setUserState] = React.useState(
        (): UserStates => {
            // check if user has already voted and deside what state to set as default
            return UserStates.readyToVote;
        }
    );
    return (
        <article className="discussion-card">
            <div className="discussion-card__body">
                <h1 className="discussion-card__title">{props.title}</h1>
                <div className="discussion-card__description">
                    <Markdown options={{ forceBlock: true }}>{props.description}</Markdown>
                </div>
            </div>
            {/* <div className="discussion-card__footer">
                <Author {...props.speaker} />
            </div> */}
            <div
                className="discussion-card__vote-block"
                onClick={() => {
                    switch (userState) {
                        case UserStates.readyToVote:
                            // call API to vote
                            setUserState(UserStates.voted);
                            break;
                        case UserStates.voted:
                            // call API to unvote
                            setUserState(UserStates.readyToVote);
                            break;
                        default:
                            // call API to remove dis shit
                            break;
                    }
                }}
            >
                <img src="/static/star.svg" />
                <p>{userState}</p>
                <p className="discussion-card__vote-block_count">{props.votes}</p>
            </div>
        </article>
    );
}
