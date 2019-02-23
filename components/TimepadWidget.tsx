import * as React from 'react';
import Head from 'next/head';

export default function TimepadWidget(props: {id: number}) {
    return (
        <Head>
            <script type='text/javascript'
                    async
                    defer
                    charSet='UTF-8'
                    src='https://timepad.ru/js/tpwf/loader/min/loader.js'
                    data-timepad-customized='22110'
                    data-timepad-widget-v2='event_register'>
                    {
                        `(function(){
                            if(window.timepadWidget) {
                                return {}
                            }
                            window.timepadWidget = true;
                            return {
                                "event": {
                                    "id": "${props.id}"
                                },
                                "hidePreloading": true,
                                "display": "popup",
                                "popup": {
                                    "autoShrink": true,
                                    "triggerSelector": ".timepad-widget-button"
                                }
                            }
                        })();`
                    }
            </script>
        </Head>
    )
}
