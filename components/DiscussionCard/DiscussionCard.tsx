import * as React from 'react';
import '../DiscussionForm/DiscussionForm.css';

export type DiscussionCardProps = {
    description: string;
    title: string;
    votes: number;
};

export default function DiscussionCard(props: DiscussionCardProps) {
    return (
        <div className="discussion-form">
            <div className="discussion-form__body">
                <div className="discussion-form__title" title={props.title}>
                    {props.title}
                </div>
                <div className="discussion-form__description">
                    {props.description.split('\n').map(function(item, key) {
                        return (
                            <span key={key}>
                                {item}
                                <br />
                            </span>
                        );
                    })}
                </div>
            </div>
            <div className="discussion-form__footer">
                <div className="button-group">
                    <button type="button" className="button" style={{ width: '100%' }}>
                        <img src="/static/star.svg" alt="" style={{ verticalAlign: 'text-top' }} /> Проголосовать
                    </button>
                    <span className="button">{props.votes}</span>
                </div>
            </div>
        </div>
    );
}
