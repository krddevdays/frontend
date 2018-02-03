import React from "react";
import classNames from "classnames";
import styles from "./index.css";

export default class Card extends React.PureComponent {
    render() {
        return (
            <figure className={classNames(styles.container, this.props.className)}
                    itemScope
                    itemType="http://schema.org/Person">
                <img className={styles.photo}
                     src={this.props.photo}
                     alt={this.props.name}
                     title={this.props.name}
                     itemProp="image"/>
                <figcaption className={styles.title} itemProp="name">{this.props.name}</figcaption>
                {this.props.company ?
                    <div className={styles.subtitle} itemProp="worksFor" itemScope
                         itemType="http://schema.org/Organization">
                        <span itemProp="name">{this.props.company}</span>
                    </div>
                    : null
                }
                {this.props.email ?
                    <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
                    : null
                }
            </figure>
        )
    }
}