import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import classNames from 'classnames';

import styles from '../styles/BreakfastPage.module.css';

import calendarImage from '../public/calendar.svg';
import locationImage from '../public/location.svg';
import Head from 'next/head';

const BreakfastPage: NextPageWithLayout = () => {
    return (
        <div className={classNames('relative h-screen overflow-hidden')}>
            <Head>
                <title>krd.dev/breakfast</title>
                <meta name='description'
                      content='Собираемся раз в неделю, завтракаем и болтаем обо всем'
                />
            </Head>
            <div
                className={classNames('max-w-full 2xl:max-w-screen-2xl 2xl:mx-auto relative z-30 flex flex-col justify-items-start')}>
                <div className='flex flex-col justify-items-start sm:flex-row sm:justify-between'>
                    <div className={classNames(styles.headerImage,
                        'w-[159px] h-[145px] mt-[-78px] ml-[8px] pt-[112px] pl-[21px]',
                        'sm:mt-[-88px] sm:ml-[16px]',
                        'md:w-[288px] md:h-[264px] md:mt-[-138px] md:pt-[205px] md:pl-[42px]',
                        'lg:ml-[32px]'
                    )}>
                        <div
                            className={classNames(styles.brutalType, 'font-bold text-white rotate-2 tracking-tighter',
                                'text-[14px] leading-[17px]',
                                'md:text-[24px] md:leading-[30px]'
                            )}>
                            krd.dev/breakfast
                        </div>
                    </div>

                    <div className={classNames(styles.infoImage,
                        'mt-[25px] w-[349px] h-[186px] mr-[-127px] pt-[17px] pl-[43px] self-end',
                        'sm:mt-[-36px] sm:mr-[-140px] sm:pt-[52px] sm:pl-[35px]',
                        'md:w-[635px] md:h-[339px] md:mt-[-18px] md:mr-[-298px] md:pt-[67px] md:pl-[65px]'
                    )}>
                        <div
                            className={classNames(styles.brutalType, 'font-bold text-white tracking-tighter',
                                'text-[16px] leading-[20px]',
                                'sm:text-[13px] sm:leading-[16px]',
                                'md:text-[24px] md:leading-[30px]'
                            )}>
                            <div className='opacity-70'>Ближайший завтрак:</div>
                            <div>
                                <div className='pt-[8px] sm:pt-[12px] md:pt-[18px] flex flex-row justify-items-start'>
                                    <img src={calendarImage.src}
                                         className='w-[24px] h-[24px] sm:w-[18px] sm:h-[18px] md:w-[24px] md:h-[24px]'
                                         alt='' />
                                    <div className='pl-[16px]'>
                                        воскресенье,<br />
                                        21 августа с 9:00
                                    </div>
                                </div>
                                <div className='pt-[18px] sm:pt-[12px] md:pt-[18px] flex flex-row justify-items-start'>
                                    <img src={locationImage.src}
                                         className='w-[24px] h-[24px] sm:w-[18px] sm:h-[18px] md:w-[24px] md:h-[24px]'
                                         alt='' />
                                    <a href='https://yandex.ru/maps/-/CCUReFttdC' target='_blank'
                                       className='inline-block pl-[16px] underline' rel='noreferrer'>
                                        Coffee Set<br />
                                        ул. Чапаева, 86
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames(styles.mainImage,
                    'mt-[-12px] w-[722px] h-[263px] ml-[-363px] pt-[91px] pl-[386px]',
                    'sm:mt-[-92px] sm:w-[746px] sm:h-[272px] sm:ml-[-411px] sm:pt-[78px] sm:pl-[435px]',
                    'md:mt-[34px] md:w-[1798px] md:h-[654px] md:ml-0 md:mr-[-30px] md:self-end md:pt-[218px] md:pl-[1077px]',
                    'lg:w-[1720px] lg:h-[626px] lg:mt-[-24px] lg:ml-[-814px] lg:pt-[193px] lg:pl-[878px] lg:self-start'
                    // 'xl:w-[2510px] xl:h-[913px] xl:mt-[12px] xl:ml-[-1195px] xl:pt-[273px] xl:pl-[1259px] '
                )}>
                    <h1 className={classNames(styles.hagridType, 'font-extrabold text-white tracking-tighter',
                        'text-[21px] leading-[23px] w-[270px]',
                        'md:text-[48px] md:leading-[53px] md:w-[620px]'
                        // 'xl:text-[74px] xl:leading-[82px] xl:w-[960px]',
                    )}>
                        Завтрак в кругу коллег из разработки.
                    </h1>

                    <p className={classNames(styles.brutalType, 'font-bold text-white tracking-tighter',
                        'mt-[24px] text-[16px] leading-[20px] w-[280px]',
                        'sm:mt-[16px] sm:text-[14px] sm:leading-[17px]',
                        'md:mt-[100px] md:text-[24px] md:leading-[30px] md:w-[363px]',
                        'lg:mt-[40px] lg:text-[18px] lg:leading-[22px] lg:w-[228px] lg:ml-[582px]'
                        // 'xl:mt-[70px] xl:text-[24px] xl:leading-[30px] xl:w-[360px] xl:ml-[861px]'
                    )}>
                        Собираемся раз в неделю, завтракаем и болтаем обо всем
                    </p>
                </div>
            </div>
            <div className={classNames('fixed inset-0 z-20', styles.background)}></div>
            <video
                autoPlay
                loop
                muted
                playsInline
                controlsList='nodownload nofullscreen noremoteplayback'
                disablePictureInPicture
                disableRemotePlayback
                className='fixed top-0 left-0 z-10 min-w-full min-h-full max-w-none'
            >
                <source src='https://storage.yandexcloud.net/krddev-static/breakfast-video.mp4' type='video/mp4' />
                <source src='https://storage.yandexcloud.net/krddev-static/breakfast-video.hevc.mp4'
                        type='video/mp4; codecs="hvc1"' />
                <source src='https://storage.yandexcloud.net/krddev-static/breakfast-video.webm' type='video/webm' />
            </video>
        </div>
    );
};

BreakfastPage.getLayout = function getLayout(page: ReactElement) {
    return page;
};

export default BreakfastPage;
