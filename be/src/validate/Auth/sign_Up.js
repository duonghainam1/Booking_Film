import Joi from 'joi';

export const signUpValidation = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Tên không được để trống',
        'string.min': 'Tên phải dài hơn 3 ký tự',
        'string.max': 'Tên phải ngắn hơn 30 ký tự',
        'any.required': 'Tên không được để trống'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không hợp lệ',
        'any.required': 'Email không được để trống'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Mật khẩu không được để trống',
        'string.min': 'Mật khẩu phải dài hơn 6 ký tự',
        'any.required': 'Mật khẩu không được để trống'
    }),
    phone_number: Joi.string().required().messages({
        'string.empty': 'Số điện thoại không được để trống',
        'any.required': 'Số điện thoại không được để trống'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
        "any.required": "Trường Confirm Password là bắt buộc",
        "any.only": "Mật khẩu không trùng khớp",
    }),
    avatar: Joi.string().uri().messages({
        "string.uri": "Trường Avatar phải là đường dẫn hợp lệ",
    }),
})

