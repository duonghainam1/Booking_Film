import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
    username?: string;
    phone_number?: string;
    email?: string;
};
const Account = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='container  mx-auto w-[700px] my-8 '>
            <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                // style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='p-6'
            >
                <div>
                    <Form.Item<FieldType>
                        label={<span className="text-white">Tên đăng nhập</span>}
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng điền tên đăng nhập!' }]}
                    >
                        <Input className='h-[50px] rounded-xl border border-gray-600 bg-[#020817] placeholder-white' placeholder='Tên đăng nhập' />
                    </Form.Item>

                    <div className='grid grid-cols-2 gap-4'>
                        <Form.Item<FieldType>
                            label={<span className="text-white">Email</span>}
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng điên Email!' }]}
                        >
                            <Input className='h-[50px] rounded-xl border border-gray-600 bg-[#020817] placeholder-white' placeholder='Email' />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label={<span className="text-white">Số điện thoại</span>}
                            name="phone_number"
                            rules={[{ required: true, message: 'Vui lòng điên số điện thoại!' }]}
                        >
                            <Input className='h-[50px] rounded-xl border border-gray-600 bg-[#020817] placeholder-white' placeholder='Số điện thoại' />
                        </Form.Item>
                    </div>
                    <Form.Item className="flex justify-end">
                        <Button type="primary" htmlType="submit" className="w-[130px] h-[40px] bg-gradient-to-tr from-[#6387FF] to-[#FF4747] text-white font-bold rounded-full">
                            Lưu
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default Account