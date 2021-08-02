import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import styles from './TalkCard.module.css';
import Author, { AuthorProps } from '../Author/Author';

export type TalkCardProps = {
    description: string | null;
    speaker: AuthorProps;
    title: string;
    poster_image?: string;
};

export default function TalkCard(props: TalkCardProps) {
    const hasPoster = typeof props.poster_image === 'string';
    return (
        <article
            className={classNames(styles.talkCard, {
                [styles.talkCard_modern]: hasPoster
            })}
        >
            {hasPoster && <img className={styles.talkCard__image} src={props.poster_image} alt="" />}
            <div className={styles.talkCard__body}>
                <h1 className={styles.talkCard__title}>{props.title}</h1>
                <div className={styles.talkCard__description}>
                    {props.description && <Markdown options={{ forceBlock: true }}>{props.description}</Markdown>}
                </div>
            </div>
            <div className={styles.talkCard__footer}>
                <Author {...props.speaker} />
            </div>
        </article>
    );
}
