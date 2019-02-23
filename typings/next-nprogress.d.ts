declare module "next-nprogress/component" {
    import * as React from 'react';

    export default class NProgressContainer extends React.Component<{
        color?: string;
        spinner?: boolean;
        options?: NProgressConfigureOptions;
        showAfterMs?: number
    }> {}
}
