import * as React from 'react';
import { Response } from 'cross-fetch';
import ym from 'react-yandex-metrika';
import starSvg from './Star.svg';

import * as api from '../../api';

import { useAuth } from '../AuthProvider';

import styles from '../DiscussionForm/DiscussionForm.module.css';

type DiscussionCardProps = {
    id: number;
    description: string;
    title: string;
    votes_count: number;
    my_vote: boolean;
};

export default function DiscussionCard(props: DiscussionCardProps) {
    const auth = useAuth();
    const [votesCount, setVotesCount] = React.useState(props.votes_count);
    const [isVoted, setIsVoted] = React.useState(props.my_vote);

    React.useEffect(() => {
        setIsVoted(props.my_vote);
        setVotesCount(props.votes_count);
    }, [props.votes_count, props.my_vote]);

    const handleClickVote: React.ReactEventHandler<HTMLButtonElement> = React.useCallback(
        (e) => {
            e.preventDefault();

            setTimeout(() => {
                ym('reachGoal', 'click_vote_on_discussion');
            }, 0);

            (async () => {
                let finished = false;
                while (!finished) {
                    try {
                        const discussion = await api.voteDiscussion(props.id);

                        setIsVoted(discussion.my_vote);
                        setVotesCount(discussion.votes_count);
                        finished = true;

                        setTimeout(() => {
                            ym('reachGoal', 'vote_on_discussion');
                        }, 0);
                    } catch (e: any) {
                        if (e instanceof Response) {
                            switch (e.status) {
                                case 403:
                                    try {
                                        await auth();
                                    } catch (e) {
                                        finished = true;
                                    }
                                    break;
                                default:
                                    alert('Неизвестная ошибка, попробуйте еще раз');
                                    throw e;
                            }
                        } else {
                            alert('Неизвестная ошибка, попробуйте еще раз');
                            throw e;
                        }
                    }
                }
            })();
        },
        [props.id, auth],
    );

    return (
        <div className={styles.discussionForm}>
            <div className={styles.discussionForm__body}>
                <div className={styles.discussionForm__title} title={props.title}>
                    {props.title}
                </div>
                <div className={styles.discussionForm__description}>
                    {props.description.split('\n').map(function (item, key) {
                        return (
                            <span key={key}>
                                {item}
                                <br />
                            </span>
                        );
                    })}
                </div>
            </div>
            <div className={styles.discussionForm__footer}>
                <div className="button-group">
                    <button type="button" className="button" style={{ width: '100%' }} onClick={handleClickVote}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={starSvg.src} alt="" style={{ verticalAlign: 'text-top' }} />{' '}
                        {isVoted ? 'Передумать' : 'Проголосовать'}
                    </button>
                    <span className="button">{votesCount}</span>
                </div>
            </div>
        </div>
    );
}
