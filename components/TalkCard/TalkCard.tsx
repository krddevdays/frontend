import * as React from 'react';

import './TalkCard.css';
import Author, { AuthorProps } from '../Author/Author';

export type TalkCardProps = {
    description: string | null;
    speaker: AuthorProps;
    title: string;
};

export default function TalkCard(props: TalkCardProps) {
    return (
        <article className="talk-card">
            <div className="talk-card__body">
                <h1 className="talk-card__title">{props.title}</h1>
            </div>
            <div className="talk-card__footer">
                <Author {...props.speaker} />
            </div>
        </article>
    );
}
