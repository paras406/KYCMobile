import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import styles from './index.module.css';
import '../../assets/fonts/fonts.css';
import TextButton from '../Textbutton';

const ImageForm = (props) => {
    const { text1, text2, text1Style, text2Style, privacyTextEnabled } = props;
    return (
        <div className={styles.ImageContainer}>
            <div className={styles.text1}>{text1}</div>
            <Row>
                <Col className={[styles.text2, text2Style]} span={18}>
                    {text2}
                </Col>
                <Col span={6} />
            </Row>
            {
                privacyTextEnabled && (
                    <div className={styles.privacy}>
                        <div>
                            <span>By signing up, you agree to our </span>
                            <TextButton text="Terms of Use"/>
                        </div>
                        <div>
                            <span>and </span>
                            <TextButton text="Privacy Policy" />
                        </div>   
                    </div>   
                )
            }
            <div style={{ paddingLeft: '23px' }}>
                <img src="https://picsum.photos/536/354" className={styles.image} />
            </div>
        </div>
    );
}

export default ImageForm;

