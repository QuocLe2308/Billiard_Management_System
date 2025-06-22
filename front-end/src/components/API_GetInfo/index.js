import Cookies from "js-cookie";
import getRequest from "components/API_Get";
import Swal_show from "components/Swal";
import { useNavigate } from "react-router-dom";

const getinfo_user = () => {
    return new Promise((resolve, reject) => {

        const role = Cookies.get("role_sub");
        if (role == "Admin") {
            var url_send = "admin";
        } else
            if (role == "Nurse") {
                var url_send = "nurse";
            } else
                if (role == "Doctor") {
                    var url_send = "doctor";
                } else
                    if (role == "Elderly Manager") {
                        var url_send = "elderly_manager";
                    } else {
                        var url_send = "user";
                    }
        const url = "/api/" + url_send + "/info";

        getRequest(url, (response) => {
            if (response.data != "") {
                resolve(response.data);
            } else {
                Swal_show('error', 'An error occurred, please log in again!');
                reject({ status: 'error', message: 'An error occurred, please log in again!' });

            }
        });
    });
};

export default getinfo_user;
