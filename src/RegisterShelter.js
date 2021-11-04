import {useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import axios from "axios";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/dogcat.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
}))


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
        md: {span: 16},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
        md: {span: 24},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 10,
        },
        sm: {
            span: 16,
            offset: 10,
        },
        md: {
            span: 16,
            offset: 10,
        },
    },
};

function RegisterShelter() {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState("vertical");
    const classes = useStyles()
    let history = useHistory()

    const onFinishRegister = async (values) => {
        console.log(values)
        let name = values.name;
        let password = values.confirm;
        let email = values.email;
        let phoneNumber = values.phonenumber
        let user = {name, password, email, phoneNumber};
        await axios.post("http://localhost:8080/api/shelter/add", user)
        history.push("/")
    };

    return (
            <div className="flex items-center p-20 ">
                <div className=" flex-1 h-full max-w-4xl mx-auto  rounded-lg shadow-xl">
                    <div className="my-auto flex flex-col md:flex-row ">
                        <div className="invisible md:visible h-32 md:h-auto md:w-1/2">
                            <img
                                className="object-cover w-full h-full"
                                src="https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg"
                                alt="img"
                            />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">

                                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                    Register
                                </h1>
                                <div>
                                    <Form
                                        {...formItemLayout}
                                        layout={formLayout}
                                        form={form}
                                        name="register"
                                        onFinish={onFinishRegister}
                                        scrollToFirstError
                                    >
                                        <Form.Item
                                            name="name"
                                            tooltip="What do you want others to call you?"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your username!",
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                                placeholder="Shelter name"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "The input is not valid E-mail!",
                                                },
                                                {
                                                    required: true,
                                                    message: "Please input your E-mail!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Email"/>
                                        </Form.Item>
                                        <Form.Item
                                            name="phonenumber"

                                        >
                                            <Input placeholder="Phone number"/>
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your password!",
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="confirm"
                                            dependencies={["password"]}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please confirm your password!",
                                                },
                                                ({getFieldValue}) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue("password") === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error(
                                                                "The two passwords that you entered do not match!"
                                                            )
                                                        );
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                                type="password"
                                                placeholder="Confirm password"
                                            />
                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} className="">
                                            <Button
                                                // style={buttonStyle({ hover })}
                                                // onPointerOver={() => setHover(true)}
                                                // onPointerOut={() => setHover(false)}
                                                // type="primary"
                                                // htmlType="submit"
                                                // className="rounded-full"
                                                type="submit"
                                                color="secondary" variant="contained"
                                            >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default RegisterShelter;