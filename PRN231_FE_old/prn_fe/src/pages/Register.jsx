import React from 'react';
import swal from 'sweetalert'; // Import your swal library if necessary

const Register = () => {
  const register = () => {
    const user_username = document.getElementById('user_username').value;
    const user_fullname = document.getElementById('user_fullname').value;
    const user_email = document.getElementById('user_email').value;
    const user_phone = document.getElementById('user_phone').value;
    const user_sex = document.getElementById('user_sex').value;
    const user_cmnd = document.getElementById('user_cmnd').value;
    const user_password = document.getElementById('user_password').value;
    const user_level = document.getElementById('user_level').value;

    if (!user_username) {
      swal("Vui lòng nhập tài khoản.", "", "info");
      return;
    }
    if (!user_password) {
      swal("Vui lòng nhập mật khẩu.", "", "info");
      return;
    }

    fetch(WEBSITE_URL + prefix + 'modun_account_ajax.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'register',
        user_username,
        user_fullname,
        user_email,
        user_cmnd,
        user_phone,
        user_level,
        user_sex,
        user_password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          swal(data.msg, "", "error");
        } else {
          swal(data.msg, "", "success");
          // Redirect or handle success as needed
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="account-pages flex items-center justify-center mt-12 bg-[url(./views/v1/images/bg-auth.png)] min-h-screen">    
      <div className="container">
        <div className="row justify-center items-center flex">
          <div className='w-3/6 h-3/6'>
            <div className="bg-white border border-blue-500 rounded-lg shadow-md">
              <div className="p-4">
                <div className="p-2 text-center">
                  <h5 className="mb-4">Thêm tài khoản</h5>
                </div>
                <form id="register" className="form-horizontal" onSubmit={(e) => { e.preventDefault(); register(); }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Tài khoản</label>
                      <input type="text" id="user_username" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập tài khoản" required autoComplete="off" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Mật khẩu</label>
                      <input type="password" id="user_password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập mật khẩu" required autoComplete="off" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Họ và tên</label>
                      <input type="text" id="user_fullname" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập họ và tên" required autoComplete="off" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Số CMND - CCCD</label>
                      <input type="text" id="user_cmnd" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập số cmnd - cccd" required autoComplete="off" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Số điện thoại</label>
                      <input type="tel" id="user_phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập số điện thoại" required autoComplete="off" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email</label>
                      <input type="email" id="user_email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nhập địa chỉ email" required autoComplete="off" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Giới tính</label>
                      <select id="user_sex" className="form-select">
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Quyền</label>
                      <select id="user_level" className="form-select">
                        <option value="1">Inter</option>
                        <option value="2">Nhân viên</option>
                        <option value="3">Quản Lý</option>
                        <option value="4">Admin</option>
                      </select>
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600">Tạo</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
