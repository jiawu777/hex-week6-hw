const validation = {
        email: {
                required:"請輸入 Email",
                pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message:"Email 格式不正確"}
        },
        tel: {
            required:"請輸入電話",
            pattern:{value:/^\d+$/,
            message:"電話格式不正確"},
            minLength:{value:7,message:"電話至少需要7碼"}
        },
        name: {
            required:"請輸入姓名",
            minLength:{value:2,message:"姓名至少需要2個字"}
        },
        address:{
            required:"請輸入收件地址"
        }
}

export default validation;