import React, { useState, useRef, useEffect } from "react";
import { Button } from "antd";
import axios from 'axios';
import lodash from 'lodash';
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import InputHeadingComponent from '../../components/InputHeadingComponent';
import { FileDrop } from "react-file-drop";
import { emptyStringVerification } from "../../utils";
import "../../assets/fonts/fonts.css";
import styles from "./index.module.css";
import "./demo.css";

import { GET_KYC } from '../../queries/kyc';
import { useGetGraphQL } from '../../hooks/useGraphQl';
import OverlayLoading from "../../components/OverlayLoading";
import ErrorComponent from '../../components/ErrorComponent';
import SuccessComponent from "../../components/SuccessComponent";

const Kyc = (props) => {

    const [name, updateName] = useState('');
    const [email, updateEmail] = useState('');
    const [phone, updatePhone] = useState('');
    // const [desc, updateDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorState, updateErrorState] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("");
    const [successState, updateSuccessState] = useState(false);
    const [successMessage, updateSuccessMessage] = useState("");
    // const [editEnabled, updateEditEnabled] = useState(false);

    // ----------- upload state --------------- //
    const aadharInputRef = useRef(null);
    const [aadharImage, setAadharImage] = useState({ file: null, url: null });
    const setAadharImageData = (file) => {
        setAadharImage({ ...aadharImage, file });
    }
    const setAadharImageUrl = (url) => {
        setAadharImage({ ...aadharImage, url });
    }
    const onAadharFileInputChange = (event) => {
        const { files } = event.target;
        setAadharImageData(files);
        uploadFile(files, setAadharImageUrl);
    };

    const aadharBackInputRef = useRef(null);
    const [aadharBackImage, setAadharBackImage] = useState({ file: null, url: null });
    const setAadharBackImageData = (file) => {
        setAadharBackImage({ ...aadharBackImage, file });
    }
    const setAadharBackImageUrl = (url) => {
        setAadharBackImage({ ...aadharBackImage, url });
    }
    const onAadharBackFileInputChange = (event) => {
        const { files } = event.target;
        setAadharBackImageData(files);
        uploadFile(files, setAadharBackImageUrl);
    };

    const panCardInputRef = useRef(null);
    const [panCardImage, setPanCardImage] = useState({ file: null, url: null });
    const setPanCardImageData = (file) => {
        setPanCardImage({ ...panCardImage, file });
    }
    const setPanCardImageUrl = (url) => {
        setPanCardImage({ ...panCardImage, url });
    }
    const onPanCardFileInputChange = (event) => {
        const { files } = event.target;
        setPanCardImageData(files);
        uploadFile(files, setPanCardImageUrl);
    };

    const uploadFile = async (file, callback) => {
        setLoading(true);
        const token = await localStorage.getItem("AuthenticationService");
        var formData = new FormData();
        formData.append("file", file[0]);
        axios
            .post("https://backend.growinnsteps.com/uploads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `bearer ${JSON.parse(token).jwt}`,
                },
            })
            .then((res) => {
                //setSuccess({ message: "Image uploaded successfully", state: true });
                setLoading(false);
                const { url } = res.data.data;
                callback(url);
            })
            .catch((error) => {
                //setError({ message: "Image could not be uploaded", state: true });
                setLoading(false);
            });
    };

    // ------------- end -------------- //

    const {
        getCall: getKyc,
        state: getKycState,
    } = useGetGraphQL({
        query: GET_KYC,
    });

    const {
        loading: getKycLoading,
        data: getKycData,
        error: getKycError,
    } = getKycState;

    useEffect(() => {
        if (getKycError) {
            const message = lodash.get(getKycError, "networkError.result.errors[0].message", "Error Occured");
            updateErrorState(true);
            updateErrorMessage(message);
        } else if(getKycData){
            const {
              me,
            } = getKycData;
        //    updateName(me.name);
        //    updateEmail(me.email);
        //    updatePhone(`+${me.countryCode} ${me.phoneNumber}`);
        //    setAadharImageUrl(me.aadharCardFront);
        //    setAadharBackImageUrl(me.aadharCardBack);
        //    setPanCardImageUrl(me.panCard);
        }
    }, [getKycState]);

    useEffect(() => {
        getKyc();
    }, []);


    const renderFileDrop = (imageObj) => {
        return (
            <div style={{ marginBottom: '18px' }}>
                {imageObj ? (
                    imageObj.url !== null ? (
                        <div>
                            <img
                                src={imageObj.url}
                                style={{ height: 80, width: "100%" }}
                                alt="preview"
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    width: "100%",
                                    justifyContent: "flex-end",
                                    marginTop: 5,
                                }}
                            >
                                <div
                                    onClick={() => {
                                        imageObj.setImageUrl(null)
                                    }}
                                >
                                    <DeleteOutlineOutlinedIcon style={{ color: "red" }} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <FileDrop
                                onTargetClick={() => {
                                    imageObj.inputRef.current.click();
                                }}
                                onDrop={({ files, events }) => {
                                    imageObj.onFileInputChange(files);
                                }}
                            >
                                <p>
                                    Drag and Drop or <b className={styles.blueText}> browse </b>{" "}
                                    your files
                                </p>
                            </FileDrop>
                            <input
                                onChange={imageObj.onFileInputChange}
                                ref={imageObj.inputRef}
                                type="file"
                                className={styles.hidden}
                            />
                        </div>
                    )
                ) : (
                    <></>
                )}
            </div>
        )
    }


    const renderData = () => {
        if(getKycData){
            return (
                <div>
                    <div className={styles.AddCategoryContainer}>
                        <div className={styles.ProfessionalCategoryText}>
                            KYC
                        </div>
                        {/* <Button
                            className={styles.AddSubCategory}
                            onClick={() => { updateEditEnabled((editEnabled) => {
                               return true;
                            }) }}
                            type="primary"
                            disabled={getKycData.kycStatus === "APPROVED" }
                        >
                            Edit Information
                        </Button> */}
                    </div>
                    <div className={styles.teacherTable}>
                        <div className={styles.row}>
                            <div className={styles.key}>
                                Name
                            </div>
                            <InputHeadingComponent
                                value={name}
                                style={styles.value}
                                fieldVerification={emptyStringVerification}
                                onChange={(event) => {
                                    updateName(event.target.value);
                                }}
                                disabled={true}
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.key}>
                                Email
                            </div>
                            <InputHeadingComponent
                                value={email}
                                style={styles.value}
                                fieldVerification={emptyStringVerification}
                                onChange={(event) => {
                                    updateEmail(event.target.value);
                                }}
                                disabled={true}
                            />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.key}>
                                Phone
                            </div>
                            <InputHeadingComponent
                                value={phone}
                                style={styles.value}
                                fieldVerification={emptyStringVerification}
                                onChange={(event) => {
                                    updatePhone(event.target.value);
                                }}
                                disabled={true}
                            />
                        </div>
                        {/* <div className={styles.row}>
                            <div className={styles.key}>
                                Description
                            </div>
                            <InputHeadingComponent
                                value={desc}
                                style={styles.value}
                                fieldVerification={emptyStringVerification}
                                onChange={(event) => {
                                    updateDesc(event.target.value);
                                }}
                                disabled={!editEnabled}
                            />
                        </div> */}
                        <div className={styles.row}>
                            <div className={styles.key}>
                                Aadhar Card Front
                            </div>
                            <div className={styles.value}>
                                {renderFileDrop({
                                    url: aadharImage.url,
                                    setImageUrl: setAadharImageUrl,
                                    onFileInputChange: onAadharFileInputChange,
                                    inputRef: aadharInputRef,
                                })}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.key}>
                                Aadhar Card Back
                            </div>
                            <div className={styles.value}>
                                {renderFileDrop({
                                    url: aadharBackImage.url,
                                    setImageUrl: setAadharBackImageUrl,
                                    onFileInputChange: onAadharBackFileInputChange,
                                    inputRef: aadharBackInputRef,
                                })}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.key}>
                                Pan Card
                            </div>
                            <div className={styles.value}>
                                {renderFileDrop({
                                    url: panCardImage.url,
                                    setImageUrl: setPanCardImageUrl,
                                    onFileInputChange: onPanCardFileInputChange,
                                    inputRef: panCardInputRef,
                                })}
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }} />
                        <Button
                            className={[styles.AddSubCategory]}
                            onClick={() => { }}
                            type="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            );
        }
    };

    const renderLoading = () => {
        if (loading || getKycLoading) {
            return <OverlayLoading />
        }
        return null;
    };

    const renderError = () => {
        return (
            <ErrorComponent
                open={errorState}
                description={errorMessage}
                handleClose={() => {
                    updateErrorState(false);
                    updateErrorMessage("");
                }}
            />
        );
    };

    const renderSuccess = () => {
        return (
            <SuccessComponent
                open={successState}
                description={successMessage}
                handleClose={() => {
                    updateSuccessState(false);
                    updateSuccessMessage("");
                }}
            />
        );
    };

    return (
        <div>
            {renderData()}
            {renderLoading()}
            {renderError()}
            {renderSuccess()}
        </div>
    );
};

export default Kyc;
