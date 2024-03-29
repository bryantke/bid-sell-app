import React, { Component } from 'react';
import { createItem } from '../util/APIUtils';
import { POLL_QUESTION_MAX_LENGTH } from '../constants';
import './NewItem.css';
import { Form, Input, Button, Select, Col, notification, Upload, message, Icon } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Dragger } = Upload;

class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: {
                text: ''
            },
            description: {
                text: ''
            },
            itemLength: {
                days: 1,
                hours: 0
            },
            fileList:[],
            uploading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleItemDaysChange = this.handleItemDaysChange.bind(this);
        this.handleItemHoursChange = this.handleItemHoursChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const itemData = {
            itemName: this.state.itemName.text,
            description: this.state.description.text,
            itemLength: this.state.itemLength,
        };

        createItem(itemData, this.state.fileList)
            .then(response => {
                this.props.history.push("/");
            }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create item.');
            } else {
                notification.error({
                    message: 'Marketplace App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a name!'
            }
        } else if (nameText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validateDescription = (descriptionText) => {
        if(descriptionText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a description!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }


    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            itemName: {
                text: value,
                ...this.validateName(value)
            }
        });
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                text: value,
                ...this.validateDescription(value)
            }
        });
    }

    handleItemDaysChange(value) {
        const itemLength = Object.assign(this.state.itemLength, {days: value});
        this.setState({
            itemLength: itemLength
        });
    }

    handleItemHoursChange(value) {
        const itemLength = Object.assign(this.state.itemLength, {hours: value});
        this.setState({
            itemLength: itemLength
        });
    }

    handleImageUpload(info) {

    }

    isFormInvalid() {
        if(this.state.itemName.validateStatus !== 'success') {
            return true;
        }
        if(this.state.description.validateStatus !== 'success') {
            return true;
        }
    }

    render() {
        const { uploading, fileList } = this.state;
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div className="new-item-container">
                <h1 className="page-title">Create Item</h1>
                <div className="new-item-content">
                    <Form onSubmit={this.handleSubmit} className="create-item-form">
                        <FormItem validateStatus={this.state.itemName.validateStatus}
                                  help={this.state.itemName.errorMsg} className="item-form-row">
                            <TextArea
                                placeholder="Enter your item name"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "itemName"
                                value = {this.state.itemName.text}
                                onChange = {this.handleNameChange} />
                        </FormItem>
                        <FormItem validateStatus={this.state.description.validateStatus}
                                  help={this.state.description.errorMsg} className="item-form-row">
                            <TextArea
                                placeholder="Enter a description for your item"
                                style = {{ fontSize: '16px' }}
                                autosize={{ minRows: 3, maxRows: 6 }}
                                name = "description"
                                value = {this.state.description.text}
                                onChange = {this.handleDescriptionChange} />
                        </FormItem>
                        <FormItem className="item-form-row">
                            <Col xs={24} sm={4}>
                                Item listing length:
                            </Col>
                            <Col xs={24} sm={20}>
                                <span style = {{ marginRight: '18px' }}>
                                    <Select
                                        name="days"
                                        defaultValue="1"
                                        onChange={this.handleItemDaysChange}
                                        value={this.state.itemLength.days}
                                        style={{ width: 60 }} >
                                        {
                                            Array.from(Array(8).keys()).map(i =>
                                                <Option key={i}>{i}</Option>
                                            )
                                        }
                                    </Select> &nbsp;Days
                                </span>
                                <span>
                                    <Select
                                        name="hours"
                                        defaultValue="0"
                                        onChange={this.handleItemHoursChange}
                                        value={this.state.itemLength.hours}
                                        style={{ width: 60 }} >
                                        {
                                            Array.from(Array(24).keys()).map(i =>
                                                <Option key={i}>{i}</Option>
                                            )
                                        }
                                    </Select> &nbsp;Hours
                                </span>
                            </Col>
                        </FormItem>
                        <Form.Item label="Upload images">
                            <Upload {...uploadProps}>
                                <Button>
                                    <Icon type="upload" /> Select File
                                </Button>
                            </Upload>
                        </Form.Item>
                        <FormItem className="item-form-row">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    disabled={this.isFormInvalid()}
                                    className="create-item-form-button">Post Item</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewItem;